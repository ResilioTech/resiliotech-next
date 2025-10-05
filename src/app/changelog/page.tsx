import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { siteConfig } from '@/lib/config'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Changelog | Weekly Updates',
  description: 'Weekly updates on what we shipped. Follow our progress as we build DevOps tools for startups.',
  openGraph: {
    title: 'Changelog - Resiliotech',
    description: 'Weekly updates on what we shipped',
    url: `${siteConfig.url}/changelog`,
  }
}

export default async function ChangelogPage() {
  const filePath = path.join(process.cwd(), 'content', 'changelog.md')
  const content = await fs.readFile(filePath, 'utf8')

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Changelog",
            description: "Weekly product updates and releases from Resiliotech",
            url: `${siteConfig.url}/changelog`,
            publisher: {
              "@type": "Organization",
              name: siteConfig.name
            }
          })
        }}
      />

      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              <Zap className="w-4 h-4" />
              Updated Weekly
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Changelog
            </h1>
            <p className="text-xl text-text-secondary">
              Track what we ship every week.
            </p>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-li:text-text-secondary prose-code:text-primary max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-16 p-8 bg-surface border border-border rounded-xl text-center">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Get Updates
            </h3>
            <p className="text-text-secondary mb-6">
              Follow us on social media or star our GitHub repos for weekly updates.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-background border border-border hover:border-primary text-text-primary rounded-lg font-medium transition"
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-background border border-border hover:border-primary text-text-primary rounded-lg font-medium transition"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-background border border-border hover:border-primary text-text-primary rounded-lg font-medium transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
