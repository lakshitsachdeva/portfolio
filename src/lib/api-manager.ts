/**
 * API Manager with automatic model fallback and rate limit handling
 * Supports multiple API keys and model switching
 */

export interface ModelConfig {
  name: string;
  apiKey?: string;
  baseUrl?: string;
  priority: number; // Lower = higher priority
  rpm?: number; // Requests per minute limit
  tpm?: number; // Tokens per minute limit
  rpd?: number; // Requests per day limit
}

export interface RateLimitStatus {
  model: string;
  reason: 'rate_limit' | 'quota_exceeded' | 'error' | 'success';
  message: string;
  retryAfter?: number; // seconds
}

export interface ApiCallOptions {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  customApiKey?: string;
}

export class ApiManager {
  private models: ModelConfig[] = [];
  private currentModelIndex: number = 0;
  private rateLimitCache: Map<string, { blockedUntil: number; reason: string }> = new Map();
  private customApiKeys: Map<string, string> = new Map(); // model -> apiKey
  private statusCallbacks: ((status: RateLimitStatus) => void)[] = [];

  constructor(models: ModelConfig[]) {
    this.models = models.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Register a callback to receive status updates
   */
  onStatusUpdate(callback: (status: RateLimitStatus) => void) {
    this.statusCallbacks.push(callback);
    return () => {
      this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Add or update a custom API key for a model
   */
  setApiKey(modelName: string, apiKey: string) {
    this.customApiKeys.set(modelName, apiKey);
    // Update the model config
    const model = this.models.find(m => m.name === modelName);
    if (model) {
      model.apiKey = apiKey;
    }
  }

  /**
   * Get current API key for a model (custom or default)
   */
  private getApiKey(model: ModelConfig, customKey?: string): string | undefined {
    if (customKey) return customKey;
    if (this.customApiKeys.has(model.name)) {
      return this.customApiKeys.get(model.name);
    }
    return model.apiKey;
  }

  /**
   * Check if a model is currently rate limited
   */
  private isRateLimited(modelName: string): boolean {
    const cached = this.rateLimitCache.get(modelName);
    if (!cached) return false;
    return Date.now() < cached.blockedUntil;
  }

  /**
   * Mark a model as rate limited
   */
  private markRateLimited(modelName: string, reason: string, retryAfterSeconds: number = 60) {
    this.rateLimitCache.set(modelName, {
      blockedUntil: Date.now() + (retryAfterSeconds * 1000),
      reason
    });
  }

  /**
   * Find the next available model
   */
  private findAvailableModel(startIndex: number = 0): ModelConfig | null {
    for (let i = startIndex; i < this.models.length; i++) {
      const model = this.models[i];
      if (!this.isRateLimited(model.name)) {
        return model;
      }
    }
    // Try from beginning if we started in middle
    for (let i = 0; i < startIndex; i++) {
      const model = this.models[i];
      if (!this.isRateLimited(model.name)) {
        return model;
      }
    }
    return null;
  }

  /**
   * Notify all callbacks of status change
   */
  private notifyStatus(status: RateLimitStatus) {
    this.statusCallbacks.forEach(cb => cb(status));
  }

  /**
   * Make an API call with automatic fallback
   */
  async call(options: ApiCallOptions): Promise<any> {
    const { prompt, model: preferredModel, customApiKey, ...apiOptions } = options;

    // Try preferred model first if specified
    if (preferredModel) {
      const preferred = this.models.find(m => m.name === preferredModel);
      if (preferred && !this.isRateLimited(preferred.name)) {
        try {
          const result = await this.callModel(preferred, prompt, customApiKey, apiOptions);
          this.notifyStatus({
            model: preferred.name,
            reason: 'success',
            message: `using ${preferred.name} (preferred)`
          });
          return result;
        } catch (error: any) {
          if (this.isRateLimitError(error)) {
            const retryAfter = this.extractRetryAfter(error);
            this.markRateLimited(preferred.name, error.message, retryAfter);
            this.notifyStatus({
              model: preferred.name,
              reason: 'rate_limit',
              message: `rate limit hit on ${preferred.name}, switching models...`,
              retryAfter
            });
          } else {
            this.notifyStatus({
              model: preferred.name,
              reason: 'error',
              message: `error on ${preferred.name}: ${error.message}`
            });
          }
        }
      }
    }

    // Try models in priority order
    let attempts = 0;
    const maxAttempts = this.models.length;

    while (attempts < maxAttempts) {
      const model = this.findAvailableModel(this.currentModelIndex);
      
      if (!model) {
        // All models rate limited, wait a bit and retry
        const minWait = Math.min(
          ...Array.from(this.rateLimitCache.values()).map(c => 
            Math.max(0, c.blockedUntil - Date.now())
          )
        );
        
        if (minWait > 0) {
          this.notifyStatus({
            model: 'all',
            reason: 'rate_limit',
            message: `all models rate limited, waiting ${Math.ceil(minWait / 1000)}s...`,
            retryAfter: Math.ceil(minWait / 1000)
          });
          await new Promise(resolve => setTimeout(resolve, Math.min(minWait, 5000)));
          continue;
        }
        
        throw new Error('all models are currently rate limited');
      }

      this.currentModelIndex = this.models.indexOf(model);

      try {
        const result = await this.callModel(model, prompt, customApiKey, apiOptions);
        this.notifyStatus({
          model: model.name,
          reason: 'success',
          message: `using ${model.name}${attempts > 0 ? ` (fallback after ${attempts} attempts)` : ''}`
        });
        return result;
      } catch (error: any) {
        attempts++;
        
        if (this.isRateLimitError(error)) {
          const retryAfter = this.extractRetryAfter(error);
          this.markRateLimited(model.name, error.message, retryAfter);
          this.notifyStatus({
            model: model.name,
            reason: 'rate_limit',
            message: `rate limit on ${model.name}, trying next model...`,
            retryAfter
          });
        } else {
          this.notifyStatus({
            model: model.name,
            reason: 'error',
            message: `error on ${model.name}: ${error.message}`
          });
        }
      }
    }

    throw new Error('failed to get response from any model');
  }

  /**
   * Call a specific model
   */
  private async callModel(
    model: ModelConfig,
    prompt: string,
    customApiKey?: string,
    options: any = {}
  ): Promise<any> {
    const apiKey = this.getApiKey(model, customApiKey);
    
    if (!apiKey) {
      throw new Error(`no API key available for ${model.name}`);
    }

    // This is a generic implementation - adapt based on your API provider
    const baseUrl = model.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';
    const url = `${baseUrl}/models/${model.name}:generateContent`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 2048
        }
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * Check if error is a rate limit error
   */
  private isRateLimitError(error: any): boolean {
    const message = error.message?.toLowerCase() || '';
    return (
      message.includes('rate limit') ||
      message.includes('quota') ||
      message.includes('429') ||
      message.includes('too many requests') ||
      message.includes('resource exhausted')
    );
  }

  /**
   * Extract retry-after from error
   */
  private extractRetryAfter(error: any): number {
    // Try to extract from error message or headers
    if (error.retryAfter) return error.retryAfter;
    if (error.headers?.['retry-after']) {
      return parseInt(error.headers['retry-after'], 10);
    }
    // Default to 60 seconds
    return 60;
  }

  /**
   * Get current status of all models
   */
  getStatus(): {
    currentModel: string;
    availableModels: string[];
    rateLimitedModels: Array<{ name: string; blockedUntil: number; reason: string }>;
  } {
    const currentModel = this.models[this.currentModelIndex]?.name || 'none';
    const availableModels = this.models
      .filter(m => !this.isRateLimited(m.name))
      .map(m => m.name);
    const rateLimitedModels = Array.from(this.rateLimitCache.entries())
      .filter(([_, status]) => Date.now() < status.blockedUntil)
      .map(([name, status]) => ({
        name,
        blockedUntil: status.blockedUntil,
        reason: status.reason
      }));

    return {
      currentModel,
      availableModels,
      rateLimitedModels
    };
  }

  /**
   * Reset rate limits (for testing or manual override)
   */
  resetRateLimits(modelName?: string) {
    if (modelName) {
      this.rateLimitCache.delete(modelName);
    } else {
      this.rateLimitCache.clear();
    }
  }
}

/**
 * Default Gemini model configurations
 */
export const defaultGeminiModels: ModelConfig[] = [
  {
    name: 'gemini-2.5-flash',
    priority: 1,
    rpm: 5,
    tpm: 250000,
    rpd: 20
  },
  {
    name: 'gemini-2.5-flash-lite',
    priority: 2,
    rpm: 10,
    tpm: 250000,
    rpd: 20
  },
  {
    name: 'gemini-3-flash',
    priority: 3,
    rpm: 5,
    tpm: 250000,
    rpd: 20
  },
  {
    name: 'gemini-2.5-flash-tts',
    priority: 4,
    rpm: 3,
    tpm: 10000,
    rpd: 10
  }
];
