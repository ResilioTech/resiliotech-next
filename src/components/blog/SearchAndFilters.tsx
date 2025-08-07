'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Author, Category, Tag, SearchFilters } from '@/types/blog'

interface SearchAndFiltersProps {
  categories: Category[]
  tags: Tag[]
  authors: Author[]
  currentFilters: SearchFilters
  totalResults: number
}

export function SearchAndFilters({
  categories,
  tags,
  authors,
  currentFilters,
  totalResults
}: SearchAndFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(currentFilters.query || '')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<SearchFilters>(currentFilters)

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  // Update URL when filters change
  const updateURL = useCallback((filters: SearchFilters) => {
    const params = new URLSearchParams()
    
    if (filters.query) params.set('q', filters.query)
    if (filters.categories?.length) params.set('category', filters.categories[0])
    if (filters.tags?.length) params.set('tag', filters.tags[0])
    if (filters.authors?.length) params.set('author', filters.authors[0])
    if (filters.sortBy && filters.sortBy !== 'newest') params.set('sort', filters.sortBy)

    const newURL = `/blog${params.toString() ? `?${params.toString()}` : ''}`
    router.push(newURL)
  }, [router])

  // Handle search
  useEffect(() => {
    if (debouncedQuery !== currentFilters.query) {
      updateURL({ ...activeFilters, query: debouncedQuery })
    }
  }, [debouncedQuery, activeFilters, currentFilters.query, updateURL])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    updateURL(newFilters)
  }

  const clearFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...activeFilters }
    delete newFilters[key]
    setActiveFilters(newFilters)
    updateURL(newFilters)
  }

  const clearAllFilters = () => {
    setQuery('')
    setActiveFilters({})
    router.push('/blog')
  }

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || query

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tutorials, and guides..."
            className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-lg"
          />
        </div>
      </div>

      {/* Filters Toggle & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
              showFilters 
                ? 'bg-primary text-background border-primary' 
                : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-text-primary'
            )}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-3 py-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        <div className="text-sm text-text-muted">
          {totalResults.toLocaleString()} articles found
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {query && (
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
              <span className="text-primary">Search: "{query}"</span>
              <button
                onClick={() => {
                  setQuery('')
                  clearFilter('query')
                }}
                className="text-primary hover:text-primary-hover"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {activeFilters.categories?.map(categorySlug => {
            const category = categories.find(c => c.slug === categorySlug)
            return category ? (
              <div key={categorySlug} className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm">
                <span className="text-secondary">Category: {category.name}</span>
                <button
                  onClick={() => clearFilter('categories')}
                  className="text-secondary hover:text-secondary/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : null
          })}

          {activeFilters.tags?.map(tagSlug => {
            const tag = tags.find(t => t.slug === tagSlug)
            return tag ? (
              <div key={tagSlug} className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm">
                <span className="text-accent">Tag: #{tag.name}</span>
                <button
                  onClick={() => clearFilter('tags')}
                  className="text-accent hover:text-accent/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : null
          })}

          {activeFilters.authors?.map(authorId => {
            const author = authors.find(a => a.id === authorId)
            return author ? (
              <div key={authorId} className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm">
                <span className="text-orange-500">Author: {author.name}</span>
                <button
                  onClick={() => clearFilter('authors')}
                  className="text-orange-500 hover:text-orange-500/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : null
          })}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Categories</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <button
                    key={category.slug}
                    onClick={() => {
                      const isSelected = activeFilters.categories?.includes(category.slug)
                      if (isSelected) {
                        clearFilter('categories')
                      } else {
                        handleFilterChange('categories', [category.slug])
                      }
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      activeFilters.categories?.includes(category.slug)
                        ? 'bg-secondary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {tags.slice(0, 20).map(tag => (
                  <button
                    key={tag.slug}
                    onClick={() => {
                      const isSelected = activeFilters.tags?.includes(tag.slug)
                      if (isSelected) {
                        clearFilter('tags')
                      } else {
                        handleFilterChange('tags', [tag.slug])
                      }
                    }}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs transition-colors border',
                      activeFilters.tags?.includes(tag.slug)
                        ? 'bg-accent text-white border-accent'
                        : 'text-text-muted hover:text-text-primary border-border hover:border-accent'
                    )}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Authors */}
            <div className="space-y-4">
              {/* Sort */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Sort By</h3>
                <select
                  value={activeFilters.sortBy || 'newest'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:border-primary outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>

              {/* Authors */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Authors</h3>
                <div className="space-y-2">
                  {authors.map(author => (
                    <button
                      key={author.id}
                      onClick={() => {
                        const isSelected = activeFilters.authors?.includes(author.id)
                        if (isSelected) {
                          clearFilter('authors')
                        } else {
                          handleFilterChange('authors', [author.id])
                        }
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        activeFilters.authors?.includes(author.id)
                          ? 'bg-orange-500 text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                      )}
                    >
                      {author.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}