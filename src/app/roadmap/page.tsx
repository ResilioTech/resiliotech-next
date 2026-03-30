import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { siteConfig } from '@/lib/config'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'Product Roadmap | AI Infrastructure Tools',
  description: 'See what Resilio Tech is building — AI infrastructure tools, MLOps automation, and reliability solutions for production AI systems.',
  alternates: {
    canonical: 'https://resiliotech.com/roadmap',
  },
  openGraph: {
    title: 'Product Roadmap - Resilio Tech',
    description: 'AI infrastructure tools and services we\'re building',
    url: `${siteConfig.url}/roadmap`,
  }
}

export default async function RoadmapPage() {
  const filePath = path.join(process.cwd(), 'content', 'roadmap.md')
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
            name: "Product Roadmap",
            description: "Public product roadmap for Resilio Tech AI infrastructure",
            url: `${siteConfig.url}/roadmap`,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              🗺️ Product Roadmap
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              What We&apos;re Building
            </h1>
            <p className="text-xl text-text-secondary">
              Our product roadmap for AI infrastructure tools and services.
            </p>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-li:text-text-secondary prose-code:text-primary max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
