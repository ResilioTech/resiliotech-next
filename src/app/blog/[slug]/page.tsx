import { Metadata } from 'next'
import { notFound } from 'next/navigation'
// For now, we'll render content as plain text until MDX is properly configured
import { getAllPosts, getPostBySlug } from '@/lib/blog-data'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { SocialShare } from '@/components/blog/SocialShare'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { NewsletterSignup } from '@/components/blog/NewsletterSignup'
// import { BlogPostComponents } from '@/components/blog/BlogPostComponents'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const { title, description, publishedAt, updatedAt, authorData, seo, social } = post

  return {
    title: seo?.title || title,
    description: seo?.description || description,
    keywords: seo?.keywords,
    authors: [{ name: authorData.name }],
    openGraph: {
      title: social?.title || seo?.title || title,
      description: social?.description || seo?.description || description,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: [authorData.name],
      images: social?.image || post.coverImage ? [
        {
          url: social?.image || post.coverImage!,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: social?.title || seo?.title || title,
      description: social?.description || seo?.description || description,
      images: social?.image || post.coverImage ? [social?.image || post.coverImage!] : [],
    },
    alternates: {
      canonical: seo?.canonical || post.url,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ReadingProgress />
      
      <div className="min-h-screen bg-background">
        <BlogPostLayout post={post}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents 
                  items={post.tableOfContents} 
                  title="Table of Contents"
                />
              </div>
            </div>

            {/* Main Content */}
            <article className="lg:col-span-6">
              <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
                <div className="whitespace-pre-wrap">{post.content}</div>
              </div>

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <SocialShare 
                  url={`https://resiliotech.com${post.url}`}
                  title={post.title}
                  description={post.description}
                  hashtags={post.tagData.map(tag => tag.name)}
                />
              </div>

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-bold text-lg">
                      {post.authorData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {post.authorData.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {post.authorData.bio}
                    </p>
                    {post.authorData.social && (
                      <div className="flex gap-4">
                        {post.authorData.social.twitter && (
                          <a
                            href={`https://twitter.com/${post.authorData.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-primary transition-colors"
                          >
                            Twitter
                          </a>
                        )}
                        {post.authorData.social.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${post.authorData.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-primary transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                        {post.authorData.social.github && (
                          <a
                            href={`https://github.com/${post.authorData.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-primary transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                        {post.authorData.social.website && (
                          <a
                            href={post.authorData.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-primary transition-colors"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter Signup */}
                <NewsletterSignup 
                  title="More Like This?"
                  description="Get similar content delivered to your inbox weekly."
                  source={`blog-post-${post.slug}`}
                  compact
                />

                {/* Quick Info */}
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Article Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Published</span>
                      <span className="text-text-primary">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {post.updatedAt && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Updated</span>
                        <span className="text-text-primary">
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-text-muted">Reading Time</span>
                      <span className="text-text-primary">{post.readingTime.text}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Words</span>
                      <span className="text-text-primary">{post.readingTime.words.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {post.tagData.map(tag => (
                        <a
                          key={tag.slug}
                          href={`/blog?tag=${tag.slug}`}
                          className="px-2 py-1 bg-surface-elevated hover:bg-primary hover:text-background border border-border hover:border-primary rounded text-xs text-text-muted hover:text-background transition-all duration-200"
                        >
                          #{tag.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t border-border">
            <RelatedPosts 
              currentPost={post}
              maxPosts={3}
            />
          </div>
        </BlogPostLayout>
      </div>
    </>
  )
}