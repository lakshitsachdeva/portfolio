'use client';

import { useState, useEffect } from 'react';
import { ApiManager, RateLimitStatus, ModelConfig } from '@/lib/api-manager';
import { Key, AlertCircle, CheckCircle2, Loader2, Info } from 'lucide-react';

interface ApiKeyManagerProps {
  apiManager: ApiManager;
  models: ModelConfig[];
  onApiKeySet?: (model: string, key: string) => void;
}

export default function ApiKeyManager({ apiManager, models, onApiKeySet }: ApiKeyManagerProps) {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<RateLimitStatus | null>(null);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved keys from localStorage
    const saved = localStorage.getItem('gemini_api_keys');
    if (saved) {
      try {
        const keys = JSON.parse(saved);
        setSavedKeys(keys);
        // Apply to API manager
        Object.entries(keys).forEach(([model, key]) => {
          apiManager.setApiKey(model, key as string);
        });
      } catch (e) {
        console.error('failed to load saved API keys', e);
      }
    }

    // Subscribe to status updates
    const unsubscribe = apiManager.onStatusUpdate((newStatus) => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, [apiManager]);

  const handleSetApiKey = (modelName: string, key: string) => {
    if (!key.trim()) {
      alert('please enter a valid API key');
      return;
    }

    apiManager.setApiKey(modelName, key);
    const updated = { ...savedKeys, [modelName]: key };
    setSavedKeys(updated);
    localStorage.setItem('gemini_api_keys', JSON.stringify(updated));
    setApiKeys({ ...apiKeys, [modelName]: '' });
    onApiKeySet?.(modelName, key);
  };

  const handleRemoveApiKey = (modelName: string) => {
    const updated = { ...savedKeys };
    delete updated[modelName];
    setSavedKeys(updated);
    localStorage.setItem('gemini_api_keys', JSON.stringify(updated));
    // Note: API manager still has the key, but we've removed it from saved keys
  };

  const managerStatus = apiManager.getStatus();

  return (
    <div className="space-y-4">
      {/* Current Status Display */}
      {status && (
        <div className={`p-4 rounded-lg border ${
          status.reason === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : status.reason === 'rate_limit'
            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <div className="flex items-center gap-2">
            {status.reason === 'success' ? (
              <CheckCircle2 size={16} />
            ) : status.reason === 'rate_limit' ? (
              <AlertCircle size={16} />
            ) : (
              <Loader2 size={16} className="animate-spin" />
            )}
            <span className="text-sm font-medium lowercase">
              {status.message}
            </span>
            {status.retryAfter && (
              <span className="text-xs opacity-70 ml-auto">
                retry in {status.retryAfter}s
              </span>
            )}
          </div>
        </div>
      )}

      {/* Model Status Overview */}
      <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-zinc-400" />
          <h3 className="text-sm font-medium text-zinc-300 lowercase">model status</h3>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">current model:</span>
            <span className="text-white font-medium">{managerStatus.currentModel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">available:</span>
            <span className="text-green-400">{managerStatus.availableModels.length} models</span>
          </div>
          {managerStatus.rateLimitedModels.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">rate limited:</span>
              <span className="text-yellow-400">{managerStatus.rateLimitedModels.length} models</span>
            </div>
          )}
        </div>
      </div>

      {/* API Key Management */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-300 lowercase flex items-center gap-2">
          <Key size={16} />
          api keys
        </h3>
        
        {models.map((model) => {
          const hasKey = savedKeys[model.name];
          const isExpanded = expandedModel === model.name;

          return (
            <div key={model.name} className="border border-white/5 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedModel(isExpanded ? null : model.name)}
                className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white lowercase">{model.name}</span>
                  {hasKey && (
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                      configured
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-400">
                  {isExpanded ? 'hide' : 'configure'}
                </span>
              </button>

              {isExpanded && (
                <div className="p-3 border-t border-white/5 bg-black/20">
                  {hasKey ? (
                    <div className="space-y-2">
                      <div className="text-xs text-zinc-400">
                        api key configured for this model
                      </div>
                      <button
                        onClick={() => {
                          handleRemoveApiKey(model.name);
                          setExpandedModel(null);
                        }}
                        className="text-xs px-3 py-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors lowercase"
                      >
                        remove key
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder="enter your gemini API key"
                        value={apiKeys[model.name] || ''}
                        onChange={(e) => setApiKeys({ ...apiKeys, [model.name]: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand/50 transition-colors"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSetApiKey(model.name, apiKeys[model.name] || '')}
                          className="flex-1 px-3 py-1.5 bg-brand text-black text-xs font-medium rounded hover:bg-brand/90 transition-colors lowercase"
                        >
                          save key
                        </button>
                        <a
                          href="https://aistudio.google.com/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs font-medium rounded hover:bg-zinc-700 transition-colors lowercase border border-white/10"
                        >
                          get key
                        </a>
                      </div>
                      <div className="text-xs text-zinc-500">
                        priority: {model.priority} • rpm: {model.rpm || 'unlimited'} • tpm: {model.tpm ? `${(model.tpm / 1000).toFixed(0)}k` : 'unlimited'}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
