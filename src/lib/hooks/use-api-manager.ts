'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiManager, ModelConfig, ApiCallOptions, RateLimitStatus } from '@/lib/api-manager';

export function useApiManager(initialModels: ModelConfig[], defaultApiKey?: string) {
  const [apiManager] = useState(() => {
    const manager = new ApiManager(initialModels);
    // Set default API key if provided
    if (defaultApiKey) {
      initialModels.forEach(model => {
        if (!model.apiKey) {
          manager.setApiKey(model.name, defaultApiKey);
        }
      });
    }
    return manager;
  });

  const [status, setStatus] = useState<RateLimitStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = apiManager.onStatusUpdate((newStatus) => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, [apiManager]);

  const call = useCallback(async (options: ApiCallOptions) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiManager.call(options);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'api call failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiManager]);

  const setApiKey = useCallback((model: string, key: string) => {
    apiManager.setApiKey(model, key);
  }, [apiManager]);

  const getStatus = useCallback(() => {
    return apiManager.getStatus();
  }, [apiManager]);

  return {
    apiManager,
    call,
    setApiKey,
    getStatus,
    status,
    isLoading,
    error
  };
}
