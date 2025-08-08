import { Metadata } from 'next'
import { BlogListing } from '@/components/blog/BlogListing'
import { SearchAndFilters } from '@/components/blog/SearchAndFilters'
import { BlogStats } from '@/components/blog/BlogStats'
import { NewsletterSignup } from '@/components/blog/NewsletterSignup'
import { 
  getAllPosts, 
  getAllTags, 
  getCategories, 
  getAuthors, 
  getBlogStats 
} from '@/lib/blog-data'
import type { SearchFilters } from '@/types/blog'

export const metadata: Metadata = {
  title: 'DevOps Blog | Latest Insights & Best Practices',
  description: 'Discover the latest DevOps trends, cloud infrastructure guides, CI/CD best practices, and startup scaling strategies from our expert team.',
  keywords: [
    'DevOps blog',
    'cloud infrastructure',
    'CI/CD tutorials',
    'Kubernetes guides',
    'AWS best practices',
    'startup DevOps',
    'infrastructure automation',
    'monitoring and observability'
  ],
  openGraph: {
    title: 'DevOps Blog | Resiliotech',
    description: 'Expert insights on DevOps, cloud infrastructure, and scaling strategies for startups',
    type: 'website',
    url: 'https://resiliotech.com/blog',
    images: [
      {
        url: '/og-images/blog-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Resiliotech DevOps Blog',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps Blog | Resiliotech',
    description: 'Expert insights on DevOps, cloud infrastructure, and scaling strategies for startups',
    images: ['/og-images/blog-main.jpg'],
  },
}

interface BlogPageProps {
  searchParams: {
    q?: string
    category?: string
    tag?: string
    author?: string
    sort?: 'newest' | 'oldest' | 'popular' | 'trending'
    page?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const {
    q: query,
    category,
    tag,
    author,
    sort = 'newest',
    page = '1'
  } = searchParams

  // Build filters from search params
  const filters: SearchFilters = {
    query,
    sortBy: sort,
    ...(category && { categories: [category] }),
    ...(tag && { tags: [tag] }),
    ...(author && { authors: [author] }),
  }

  // Get all data
  const allPosts = getAllPosts()
  const categories = getCategories()
  const tags = getAllTags()
  const authors = getAuthors()
  const stats = getBlogStats()

  // Apply filters and pagination
  let filteredPosts = allPosts

  // Filter by category
  if (filters.categories && filters.categories.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      filters.categories!.includes(post.categoryData.slug)
    )
  }

  // Filter by tag
  if (filters.tags && filters.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      post.tagData.some(tag => filters.tags!.includes(tag.slug))
    )
  }

  // Filter by author
  if (filters.authors && filters.authors.length > 0) {
    filteredPosts = filteredPosts.filter(post =>
      filters.authors!.includes(post.author)
    )
  }

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      case 'popular':
        // For now, use featured posts as popular (you can implement view tracking later)
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'trending':
        // Simple trending logic based on recent posts with high tag usage
        const aScore = a.tagData.reduce((sum, tag) => sum + (tag.usageCount || 0), 0)
        const bScore = b.tagData.reduce((sum, tag) => sum + (tag.usageCount || 0), 0)
        return bScore - aScore
      default: // newest
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
  })

  // Pagination
  const currentPage = parseInt(page)
  const postsPerPage = 12
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex)

  const pagination = {
    currentPage,
    totalPages,
    totalItems: sortedPosts.length,
    itemsPerPage: postsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-surface to-surface-elevated relative overflow-hidden border-b border-border">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 60 60">
            <defs>
              <pattern id="blog-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
                <circle cx="50" cy="50" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#blog-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              DevOps Blog
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              DevOps <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert insights, best practices, and real-world experiences from our team 
              helping startups scale their infrastructure and development processes.
            </p>
            
            {/* Blog Stats */}
            <div className="mb-8">
              <BlogStats stats={stats} />
            </div>

            {/* Quick Category Links */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {categories.slice(0, 4).map(category => (
                <a
                  key={category.slug}
                  href={`/blog?category=${category.slug}`}
                  className="px-4 py-2 bg-background/50 hover:bg-primary hover:text-background border border-border hover:border-primary rounded-lg text-sm font-medium text-text-secondary hover:text-background transition-all duration-300 hover:scale-105"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchAndFilters
            categories={categories}
            tags={tags}
            authors={authors}
            currentFilters={filters}
            totalResults={sortedPosts.length}
          />
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Categories Bar */}
          <div className="lg:hidden mb-8">
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Browse Categories</h3>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {categories.slice(0, 6).map(category => {
                  const categoryPostCount = allPosts.filter(
                    post => post.categoryData.slug === category.slug
                  ).length
                  
                  return (
                    <a
                      key={category.slug}
                      href={`/blog?category=${category.slug}`}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-background hover:bg-primary hover:text-background border border-border hover:border-primary rounded-lg text-sm font-medium text-text-secondary hover:text-background transition-all duration-300"
                    >
                      {category.name}
                      <span className="text-xs bg-surface-elevated px-1.5 py-0.5 rounded-full">
                        {categoryPostCount}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogListing
                posts={paginatedPosts}
                pagination={pagination}
                currentFilters={filters}
                loading={false}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories - Now at the top and more prominent */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Browse by Category
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {categories.slice(0, 6).map(category => {
                    const categoryPostCount = allPosts.filter(
                      post => post.categoryData.slug === category.slug
                    ).length
                    
                    return (
                      <a
                        key={category.slug}
                        href={`/blog?category=${category.slug}`}
                        className="group flex items-center justify-between p-3 bg-background/50 hover:bg-background border border-border hover:border-primary/30 rounded-lg transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary/60 rounded-full group-hover:bg-primary transition-colors"></div>
                          <span className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-text-muted bg-surface-elevated group-hover:bg-primary/10 group-hover:text-primary px-2.5 py-1 rounded-full transition-all duration-300">
                          {categoryPostCount}
                        </span>
                      </a>
                    )
                  })}
                  
                  {categories.length > 6 && (
                    <button className="group flex items-center justify-center p-3 bg-background/30 hover:bg-primary/5 border border-border border-dashed hover:border-primary/20 rounded-lg transition-all duration-300">
                      <span className="text-sm font-medium text-text-muted group-hover:text-primary transition-colors">
                        View All Categories ({categories.length})
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Newsletter Signup */}
              <NewsletterSignup 
                title="Join 5,000+ DevOps Pros"
                description="Get weekly insights, tutorials, and industry updates. No spam, just actionable content."
                source="blog-sidebar"
                compact={true}
              />

              {/* Popular Tags */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.trendingTags.slice(0, 12).map(tag => (
                    <a
                      key={tag.slug}
                      href={`/blog?tag=${tag.slug}`}
                      className="px-3 py-1.5 bg-surface-elevated hover:bg-primary hover:text-background border border-border hover:border-primary rounded-full text-sm text-text-secondary hover:text-background transition-all duration-200 hover:scale-105"
                    >
                      #{tag.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Latest Posts
                </h3>
                <div className="space-y-3">
                  {stats.recentPosts.slice(0, 4).map(post => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                    >
                      <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-text-muted">
                        {new Date(post.publishedAt).toLocaleDateString()} • {post.readingTime.text}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}