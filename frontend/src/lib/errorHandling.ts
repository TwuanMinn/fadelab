import { useEffect, useState } from 'react';

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: any[];
  message?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data?.error || data?.message || 'Server error occurred',
      statusCode: status,
      code: data?.code,
      details: data?.details
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'Network error. Please check your connection.',
      statusCode: 0,
      code: 'NETWORK_ERROR'
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: error.statusCode || 500,
      code: error.code
    };
  }
};

export const useErrorHandler = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const resetError = () => setError(null);

  const handleError = (err: any) => {
    const apiError = handleApiError(err);
    setError(apiError);
    
    // Log error for debugging
    console.error('Application error:', apiError);
    
    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      window.gtag?.('event', 'exception', {
        description: apiError.message,
        fatal: apiError.statusCode && apiError.statusCode >= 500
      });
    }
  };

  return { error, handleError, resetError };
};

// Retry mechanism for failed requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Timeout wrapper for requests
export const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number = 10000
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new AppError('Request timeout', 408)), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
};