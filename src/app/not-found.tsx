'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl font-bold text-surface-elevated select-none">
              404
            </h1>
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-accent rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-secondary rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-text-primary">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
            The page you're looking for might have been moved, deleted, or you may have entered the wrong URL.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <p className="text-text-muted mb-4">Here are some helpful links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/services"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Our Services
            </Link>
            <span className="text-text-muted">•</span>
            <Link
              href="/products"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Products
            </Link>
            <span className="text-text-muted">•</span>
            <Link
              href="/blog"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Blog
            </Link>
            <span className="text-text-muted">•</span>
            <Link
              href="/contact"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Looking for something specific?
          </h3>
          <p className="text-text-secondary mb-4">
            Try searching our site or contact us for help finding what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/services"
              className="bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}