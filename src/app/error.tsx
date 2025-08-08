'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
            <div className="relative w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl font-bold text-text-primary">
            Something went wrong
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
            We encountered an unexpected error. Our team has been notified and is working to fix this issue.
          </p>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
            <code className="text-sm text-red-700 break-all">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
        </div>

        {/* Support Information */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Need Help?
          </h3>
          <p className="text-text-secondary mb-4">
            If this problem persists, please contact our support team with the error details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Contact Support
            </Link>
            <Link
              href="mailto:support@resiliotech.com"
              className="bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Email Us
            </Link>
          </div>
          
          {/* Error ID for user reference */}
          {error.digest && (
            <div className="mt-4 p-2 bg-surface-elevated rounded text-xs text-text-muted">
              Reference ID: {error.digest}
            </div>
          )}
        </div>

        {/* Quick Recovery Tips */}
        <div className="mt-8 text-sm text-text-muted">
          <p className="mb-2">Common solutions:</p>
          <ul className="text-left max-w-md mx-auto space-y-1">
            <li>• Refresh the page or try again</li>
            <li>• Check your internet connection</li>
            <li>• Clear your browser cache</li>
            <li>• Try again in a few minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}