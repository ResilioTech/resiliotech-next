export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
  postCount?: number
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  color: string
  postCount?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  usageCount?: number
  trending?: boolean
}

export interface BlogPostFrontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  tags: string[]
  coverImage?: string
  featured?: boolean
  draft?: boolean
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    canonical?: string
  }
  social?: {
    image?: string
    title?: string
    description?: string
  }
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string
  content: string
  readingTime: {
    text: string
    minutes: number
    words: number
  }
  excerpt: string
  tableOfContents: TableOfContentsItem[]
  relatedPosts?: BlogPost[]
  authorData: Author
  categoryData: Category
  tagData: Tag[]
  url: string
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface SearchResult extends BlogPost {
  relevanceScore: number
  highlightedMatches: {
    title?: string
    content?: string
    excerpt?: string
  }
}

export interface BlogStats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  totalAuthors: number
  recentPosts: BlogPost[]
  popularPosts: BlogPost[]
  trendingTags: Tag[]
}

export interface SearchFilters {
  query?: string
  categories?: string[]
  tags?: string[]
  authors?: string[]
  dateRange?: {
    from?: Date
    to?: Date
  }
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending' | 'relevance'
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface BlogListingProps {
  posts: BlogPost[]
  categories: Category[]
  tags: Tag[]
  authors: Author[]
  pagination: PaginationInfo
  filters?: SearchFilters
  stats: BlogStats
}

export interface ReadingProgress {
  percentage: number
  timeRemaining: string
  wordsRead: number
  currentSection?: string
}

export interface NewsletterSignup {
  email: string
  name?: string
  preferences?: {
    categories?: string[]
    frequency?: 'daily' | 'weekly' | 'monthly'
  }
  source?: string
}

export interface SocialShare {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'reddit' | 'email' | 'copy'
  url: string
  title: string
  description?: string
  hashtags?: string[]
}

export interface BlogAnalytics {
  pageViews: number
  readingTime: number
  scrollDepth: number
  socialShares: Record<string, number>
  searchQueries: Array<{
    query: string
    count: number
    timestamp: Date
  }>
  popularContent: Array<{
    slug: string
    views: number
    avgTimeOnPage: number
  }>
}