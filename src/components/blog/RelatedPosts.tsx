'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRelatedPosts, formatDate } from '@/lib/blog-data'
import type { BlogPost } from '@/types/blog'

interface RelatedPostsProps {
  currentPost: BlogPost
  maxPosts?: number
  className?: string
}

export function RelatedPosts({ currentPost, maxPosts = 3, className }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className={cn('space-y-8', className)}>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
          Continue Reading
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Explore more articles on similar topics to deepen your DevOps knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post, index) => (
          <RelatedPostCard 
            key={post.slug} 
            post={post} 
            index={index}
          />
        ))}
      </div>

      {/* View All Posts CTA */}
      <div className="text-center pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border hover:border-primary rounded-lg text-text-primary hover:text-primary font-medium transition-all duration-300 hover:scale-105"
        >
          View All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

interface RelatedPostCardProps {
  post: BlogPost
  index: number
}

function RelatedPostCard({ post, index }: RelatedPostCardProps) {
  return (
    <article className="group h-full">
      <Link href={post.url} className="block h-full">
        <div className="h-full bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105">
          {/* Featured Image */}
          <div className="relative aspect-video bg-surface-elevated overflow-hidden">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
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

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                'px-2 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r',
                post.categoryData.color
              )}>
                {post.categoryData.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
                {post.description || post.excerpt}
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, 'MMM dd')}
                  </time>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readingTime.text}</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Alternative: Compact Related Posts List
export function CompactRelatedPosts({ currentPost, maxPosts = 5 }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span>📖</span>
        Related Articles
      </h3>
      
      <div className="space-y-4">
        {relatedPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={post.url}
            className="block group"
          >
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-elevated transition-colors">
              {/* Small thumbnail or icon */}
              <div className={cn(
                'w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br',
                post.categoryData.color
              )}>
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{post.categoryData.name}</span>
                  <span>•</span>
                  <span>{post.readingTime.text}</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}