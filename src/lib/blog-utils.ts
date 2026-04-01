import type { BlogPost, Tag } from '@/types/blog'

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], maxPosts: number = 3): BlogPost[] {
  const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug)

  const scoredPosts = otherPosts.map(otherPost => {
    let score = 0
    if (otherPost.categoryData.slug === currentPost.categoryData.slug) score += 10
    const sharedTags = otherPost.tagData.filter(tag =>
      currentPost.tagData.some(postTag => postTag.slug === tag.slug)
    )
    score += sharedTags.length * 3
    if (otherPost.author === currentPost.author) score += 5
    return { post: otherPost, score }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
    .map(item => item.post)
}

export function getAllTagsFromPosts(posts: BlogPost[]): Tag[] {
  const tagCounts = new Map<string, number>()
  const tagMap = new Map<string, Tag>()

  posts.forEach(post => {
    post.tagData.forEach(tag => {
      tagCounts.set(tag.slug, (tagCounts.get(tag.slug) || 0) + 1)
      if (!tagMap.has(tag.slug)) tagMap.set(tag.slug, tag)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([slug, count]) => ({
      ...tagMap.get(slug)!,
      usageCount: count,
      trending: count > 1,
    }))
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
}
