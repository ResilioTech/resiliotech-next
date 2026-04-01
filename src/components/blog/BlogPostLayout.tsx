'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/blog-utils'
import type { BlogPost } from '@/types/blog'

interface BlogPostLayoutProps {
  post: BlogPost
  children: React.ReactNode
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-24 pb-8 bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6 transition-all duration-1000',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              `bg-gradient-to-r ${post.categoryData.color}`
            )}>
              <span>{post.categoryData.name}</span>
              {post.featured && (
                <>
                  <span>•</span>
                  <span className="text-xs">Featured</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6 transition-all duration-1000 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
              {post.title}
            </h1>

            {/* Description */}
            <p className={cn(
              'text-xl text-text-secondary leading-relaxed mb-8 transition-all duration-1000 delay-400',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
              {post.description}
            </p>

            {/* Meta Information */}
            <div className={cn(
              'flex flex-wrap items-center gap-6 text-text-muted mb-8 transition-all duration-1000 delay-600',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-background font-semibold text-sm">
                    {post.authorData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <Link
                    href={`/blog?author=${post.author}`}
                    className="text-text-primary hover:text-primary transition-colors font-medium"
                  >
                    {post.authorData.name}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <span className="text-text-muted">
                    (Updated {formatDate(post.updatedAt)})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime.text}</span>
                <span className="text-text-muted">
                  • {post.readingTime.words.toLocaleString()} words
                </span>
              </div>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.description,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
          
          {/* Internal Linking CTA */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="p-8 md:p-12 bg-surface-elevated border border-border rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-6">
                  <Zap className="w-3 h-3" />
                  Scale Your AI Infrastructure
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  Ready to move from notebook to production?
                </h2>
                <p className="text-lg text-text-secondary mb-8 max-w-2xl leading-relaxed">
                  We help companies deploy, scale, and operate AI systems reliably. 
                  Book a free 30-minute audit to discuss your specific infrastructure challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/resiliotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-background font-bold rounded-lg transition-all duration-300 hover:scale-105 group/btn"
                  >
                    Book Free AI Infra Audit
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-8 py-4 bg-surface hover:bg-surface-elevated border border-border hover:border-primary/30 text-text-primary font-semibold rounded-lg transition-all duration-300"
                  >
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
