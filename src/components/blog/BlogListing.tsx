'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/blog-data'
import type { BlogPost, PaginationInfo, SearchFilters } from '@/types/blog'

interface BlogListingProps {
  posts: BlogPost[]
  pagination: PaginationInfo
  currentFilters: SearchFilters
  loading?: boolean
}

export function BlogListing({ posts, pagination, currentFilters, loading }: BlogListingProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (slug: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev)
      newSet.add(slug)
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-surface-elevated rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-surface-elevated rounded w-3/4" />
                  <div className="h-4 bg-surface-elevated rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-3 bg-surface-elevated rounded" />
                    <div className="h-3 bg-surface-elevated rounded w-5/6" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-3 bg-surface-elevated rounded w-20" />
                    <div className="h-3 bg-surface-elevated rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          No articles found
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          {currentFilters.query 
            ? `No articles match your search for "${currentFilters.query}". Try different keywords or filters.`
            : 'No articles match your current filters. Try adjusting your search criteria.'
          }
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-lg font-semibold transition-colors"
        >
          View All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Posts Grid */}
      <div className="space-y-8">
        {posts.map((post, index) => (
          <article key={post.slug} className="group">
            <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Featured Image */}
                <div className="lg:w-48 lg:flex-shrink-0">
                  <Link href={post.url} className="block">
                    <div className="relative aspect-video lg:aspect-square w-full rounded-xl overflow-hidden bg-surface-elevated">
                      {post.coverImage && !imageErrors.has(post.slug) ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() => handleImageError(post.slug)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={cn(
                            'w-16 h-16 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br',
                            post.categoryData.color
                          )}>
                            {post.categoryData.name.charAt(0)}
                          </div>
                        </div>
                      )}
                      
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-primary text-background text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Category & Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Link
                      href={`/blog?category=${post.categoryData.slug}`}
                      className={cn(
                        'px-3 py-1 rounded-full text-white font-medium hover:scale-105 transition-transform bg-gradient-to-r',
                        post.categoryData.color
                      )}
                    >
                      {post.categoryData.name}
                    </Link>
                    
                    <div className="flex items-center gap-4 text-text-muted">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readingTime.text}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <Link
                          href={`/blog?author=${post.author}`}
                          className="hover:text-text-primary transition-colors"
                        >
                          {post.authorData.name}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl lg:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                    <Link href={post.url}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-text-secondary leading-relaxed line-clamp-3">
                    {post.description || post.excerpt}
                  </p>

                  {/* Tags & Read More */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tagData.slice(0, 3).map(tag => (
                        <Link
                          key={tag.slug}
                          href={`/blog?tag=${tag.slug}`}
                          className="px-2 py-1 bg-surface-elevated hover:bg-primary hover:text-background border border-border hover:border-primary rounded text-xs text-text-muted hover:text-background transition-all duration-200"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                      {post.tagData.length > 3 && (
                        <span className="px-2 py-1 text-xs text-text-muted">
                          +{post.tagData.length - 3} more
                        </span>
                      )}
                    </div>

                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors group/link"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <PaginationButton
            href={pagination.currentPage > 1 ? `?page=${pagination.currentPage - 1}` : null}
            disabled={!pagination.hasPrevPage}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </PaginationButton>

          <div className="flex items-center gap-1 mx-4">
            {Array.from({ length: Math.min(7, pagination.totalPages) }, (_, i) => {
              let pageNumber: number
              
              if (pagination.totalPages <= 7) {
                pageNumber = i + 1
              } else if (pagination.currentPage <= 4) {
                pageNumber = i + 1
              } else if (pagination.currentPage >= pagination.totalPages - 3) {
                pageNumber = pagination.totalPages - 6 + i
              } else {
                pageNumber = pagination.currentPage - 3 + i
              }

              const isActive = pageNumber === pagination.currentPage

              return (
                <PaginationButton
                  key={pageNumber}
                  href={`?page=${pageNumber}`}
                  active={isActive}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </PaginationButton>
              )
            })}
          </div>

          <PaginationButton
            href={pagination.hasNextPage ? `?page=${pagination.currentPage + 1}` : null}
            disabled={!pagination.hasNextPage}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </PaginationButton>
        </div>
      )}
    </div>
  )
}

interface PaginationButtonProps {
  href: string | null
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  'aria-label'?: string
}

function PaginationButton({ href, active, disabled, children, ...props }: PaginationButtonProps) {
  const className = cn(
    'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
    active && 'bg-primary text-background',
    !active && !disabled && 'bg-surface border border-border text-text-secondary hover:border-primary hover:text-text-primary',
    disabled && 'bg-surface-elevated text-text-muted cursor-not-allowed opacity-50'
  )

  if (disabled || !href) {
    return (
      <span className={className} {...props}>
        {children}
      </span>
    )
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}