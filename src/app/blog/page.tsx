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
      <section className="py-16 bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              DevOps <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
              Expert insights, best practices, and real-world experiences from our team 
              helping startups scale their infrastructure and development processes.
            </p>
            
            {/* Blog Stats */}
            <BlogStats stats={stats} />
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
            <div className="lg:col-span-1 space-y-8">
              {/* Newsletter Signup */}
              <NewsletterSignup 
                title="Stay Updated"
                description="Get the latest DevOps insights and tutorials delivered to your inbox."
                source="blog-sidebar"
                compact
              />

              {/* Popular Tags */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.trendingTags.slice(0, 15).map(tag => (
                    <a
                      key={tag.slug}
                      href={`/blog?tag=${tag.slug}`}
                      className="px-3 py-1 bg-surface-elevated hover:bg-primary hover:text-background border border-border hover:border-primary rounded-full text-sm text-text-secondary hover:text-background transition-all duration-200"
                    >
                      #{tag.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {stats.recentPosts.slice(0, 5).map(post => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(post.publishedAt).toLocaleDateString()} • {post.readingTime.text}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.slice(0, 8).map(category => {
                    const categoryPostCount = allPosts.filter(
                      post => post.categoryData.slug === category.slug
                    ).length
                    
                    return (
                      <a
                        key={category.slug}
                        href={`/blog?category=${category.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      >
                        <span className="text-text-secondary hover:text-text-primary text-sm">
                          {category.name}
                        </span>
                        <span className="text-xs text-text-muted bg-surface-elevated px-2 py-1 rounded-full">
                          {categoryPostCount}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}