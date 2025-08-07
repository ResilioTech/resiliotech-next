'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/blog-data'
import type { BlogPost } from '@/types/blog'

interface BlogPostLayoutProps {
  post: BlogPost
  children: React.ReactNode
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 bg-surface border-b border-border">
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

      {/* Featured Image */}
      {post.coverImage && !imageError && (
        <div className="relative h-64 md:h-80 lg:h-96 bg-surface-elevated">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}