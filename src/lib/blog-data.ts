import 'server-only'
import { cache } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, Author, Category, Tag, BlogStats } from '@/types/blog'
import { getRelatedPosts as _getRelatedPosts, getAllTagsFromPosts } from './blog-utils'

export { formatDate } from './blog-utils'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const BLOG_IMAGE_DIR = path.join(process.cwd(), 'public', 'blog-images')

export const AUTHORS: Author[] = [
  {
    id: "resilio-tech-team",
    name: "Resilio Tech Team",
    bio: "Building AI infrastructure tools and sharing knowledge to help companies deploy ML systems reliably.",
    avatar: "/team/placeholder-1.jpg",
    social: {
      linkedin: "resilio-tech",
      github: "resiliotech"
    }
  }
]

export const CATEGORIES: Category[] = [
  {
    id: "ai-reliability",
    name: "AI Reliability",
    description: "Production AI reliability, model monitoring, drift detection, and resilience engineering for ML systems",
    slug: "ai-reliability",
    color: "from-rose-500 to-orange-500"
  },
  {
    id: "mlops",
    name: "MLOps",
    description: "Machine learning operations, CI/CD for models, automated retraining, and ML pipelines",
    slug: "mlops",
    color: "from-sky-500 to-indigo-500"
  },
  {
    id: "model-deployment",
    name: "Model Deployment",
    description: "ML model serving, GPU optimization, cost management, and production deployment strategies",
    slug: "model-deployment",
    color: "from-amber-500 to-yellow-500"
  }
]

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractTableOfContents(content: string) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const toc: { id: string; title: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      id: slugify(match[2]),
      title: match[2],
      level: match[1].length,
    })
  }
  return toc
}

function resolveAuthor(authorName: string): Author {
  // Match by name (case-insensitive, flexible)
  const found = AUTHORS.find(
    a => a.name.toLowerCase() === authorName.toLowerCase()
  )
  return found || AUTHORS[0]
}

function resolveCategory(categorySlug?: string): Category {
  if (!categorySlug) return CATEGORIES[0]
  const found = CATEGORIES.find(c => c.slug === categorySlug || c.id === categorySlug)
  return found || CATEGORIES[0]
}

function resolveTags(tags: string[]): Tag[] {
  return tags.map(t => ({
    id: slugify(t),
    name: t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: slugify(t),
  }))
}

function resolveCoverImage(slug: string, explicitCover?: string): string | undefined {
  const generatedCover = path.join(BLOG_IMAGE_DIR, `${slug}.svg`)

  if (fs.existsSync(generatedCover)) {
    return `/blog-images/${slug}.svg`
  }

  return explicitCover
}

function parsePost(filename: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (data.draft) return null

  const slug = filename.replace(/\.(md|mdx)$/, '')
  const stats = readingTime(content)
  const authorData = resolveAuthor(data.author || 'Resilio Tech Team')
  const categoryData = resolveCategory(data.category)
  const tagData = resolveTags(data.tags || [])
  const resolvedCoverImage = resolveCoverImage(slug, data.coverImage || data.image)
  const socialImage = data.social?.image || resolvedCoverImage

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    publishedAt: data.date || data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: authorData.id,
    category: categoryData.slug,
    tags: data.tags || [],
    coverImage: resolvedCoverImage,
    featured: data.featured || false,
    seo: data.seo,
    social: (data.social || socialImage) ? {
      ...(data.social || {}),
      image: socialImage,
    } : undefined,
    content,
    readingTime: {
      text: stats.text,
      minutes: Math.ceil(stats.minutes),
      words: stats.words,
    },
    excerpt: data.description || content.slice(0, 160).replace(/[#*\n]/g, '').trim(),
    tableOfContents: extractTableOfContents(content),
    authorData,
    categoryData,
    tagData,
    url: `/blog/${slug}`,
  }
}

let _cachedPosts: BlogPost[] | null = null

const loadAllPosts = cache(() => {
  if (_cachedPosts) return _cachedPosts

  if (!fs.existsSync(BLOG_DIR)) {
    _cachedPosts = []
    return _cachedPosts
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => /\.(md|mdx)$/.test(f))
  const posts = files
    .map(f => parsePost(f))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  _cachedPosts = posts
  return _cachedPosts
})

export function getAllPosts(): BlogPost[] {
  return loadAllPosts()
}

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  return loadAllPosts().find(post => post.slug === slug) || null
})

export const getAllTags = cache((): Tag[] => {
  return getAllTagsFromPosts(loadAllPosts())
})

export function getCategories(): Category[] {
  return CATEGORIES
}

export function getAuthors(): Author[] {
  return AUTHORS
}

export const getBlogStats = cache((): BlogStats => {
  const posts = getAllPosts()
  const tags = getAllTags()

  return {
    totalPosts: posts.length,
    totalCategories: CATEGORIES.length,
    totalTags: tags.length,
    totalAuthors: AUTHORS.length,
    recentPosts: posts.slice(0, 5),
    popularPosts: posts.filter(p => p.featured),
    trendingTags: tags.filter(t => t.trending).slice(0, 10),
  }
})

export function getRelatedPosts(currentPost: BlogPost, maxPosts: number = 3): BlogPost[] {
  return _getRelatedPosts(currentPost, loadAllPosts(), maxPosts)
}
