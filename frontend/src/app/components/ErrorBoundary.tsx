"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} reset={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2, repeatDelay: 1 }}
            className="size-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border-2 border-red-500/20"
          >
            <span className="material-symbols-outlined text-5xl text-red-500">error</span>
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Error</span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          We encountered an unexpected issue. The system has been protected from this error.
        </p>

        {error && (
          <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
            <p className="text-xs text-gray-500 font-mono mb-2">Error Details:</p>
            <p className="text-sm text-red-400 font-mono break-all">{error.message}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-blue-700 transition-all transform active:scale-[0.98] flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            RECOVER SYSTEM
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform active:scale-[0.98] flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            RETURN HOME
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">
            Error Boundary Active • System Protected
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary;