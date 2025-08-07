'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Check, ExternalLink, AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

// Custom MDX Components for blog posts
export const BlogPostComponents = {
  // Headings with anchor links
  h1: (props: any) => (
    <h1 id={generateId(props.children)} className="text-3xl font-bold text-text-primary mt-8 mb-4 scroll-mt-24" {...props} />
  ),
  h2: (props: any) => (
    <h2 id={generateId(props.children)} className="text-2xl font-bold text-text-primary mt-8 mb-4 scroll-mt-24" {...props} />
  ),
  h3: (props: any) => (
    <h3 id={generateId(props.children)} className="text-xl font-semibold text-text-primary mt-6 mb-3 scroll-mt-24" {...props} />
  ),
  h4: (props: any) => (
    <h4 id={generateId(props.children)} className="text-lg font-semibold text-text-primary mt-6 mb-3 scroll-mt-24" {...props} />
  ),
  h5: (props: any) => (
    <h5 id={generateId(props.children)} className="text-base font-semibold text-text-primary mt-4 mb-2 scroll-mt-24" {...props} />
  ),
  h6: (props: any) => (
    <h6 id={generateId(props.children)} className="text-sm font-semibold text-text-primary mt-4 mb-2 scroll-mt-24" {...props} />
  ),

  // Paragraphs
  p: (props: any) => (
    <p className="text-text-secondary leading-relaxed mb-6" {...props} />
  ),

  // Links
  a: (props: any) => (
    <a 
      className="text-primary hover:text-primary-hover underline decoration-primary/30 hover:decoration-primary transition-colors inline-flex items-center gap-1" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {props.children}
      {props.href?.startsWith('http') && <ExternalLink className="w-3 h-3" />}
    </a>
  ),

  // Lists
  ul: (props: any) => (
    <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6 ml-4" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside text-text-secondary space-y-2 mb-6 ml-4" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),

  // Blockquotes
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 text-text-primary italic rounded-r-lg" {...props} />
  ),

  // Tables
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-border rounded-lg overflow-hidden" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-surface-elevated px-4 py-3 text-left text-sm font-semibold text-text-primary border-b border-border" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-sm text-text-secondary border-b border-border" {...props} />
  ),

  // Code blocks
  pre: (props: any) => (
    <CodeBlock {...props} />
  ),
  
  // Inline code
  code: (props: any) => (
    <code className="px-2 py-1 bg-surface-elevated text-primary rounded text-sm font-mono" {...props} />
  ),

  // Images
  img: (props: any) => (
    <BlogImage {...props} />
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="my-8 border-t border-border" {...props} />
  ),

  // Custom components
  Callout,
  CodeBlock,
  BlogImage,
  TweetEmbed,
  VideoEmbed,
}

// Utility function to generate IDs for headings
function generateId(children: any): string {
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
  return ''
}

// Custom Code Block Component
interface CodeBlockProps {
  children: any
  className?: string
}

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const code = children?.props?.children || ''
  const language = className?.replace('language-', '') || 'text'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className="relative group my-6">
      {/* Language badge */}
      <div className="flex items-center justify-between bg-surface-elevated border-b border-border px-4 py-2 rounded-t-lg">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors rounded"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      <pre className="bg-background border border-border border-t-0 rounded-b-lg p-4 overflow-x-auto text-sm leading-relaxed" {...props}>
        <code className="text-text-primary font-mono">
          {code}
        </code>
      </pre>
    </div>
  )
}

// Custom Image Component
interface BlogImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}

function BlogImage({ src, alt, width, height, caption, ...props }: BlogImageProps) {
  return (
    <figure className="my-8">
      <div className="relative rounded-xl overflow-hidden bg-surface-elevated">
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className="w-full h-auto"
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-text-muted text-center mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Custom Callout Component
interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'tip'
  title?: string
  children: React.ReactNode
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-600'
    },
    error: {
      icon: AlertTriangle,
      bgColor: 'bg-red-500/10 border-red-500/30',
      iconColor: 'text-red-500',
      titleColor: 'text-red-600'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/10 border-green-500/30',
      iconColor: 'text-green-500',
      titleColor: 'text-green-600'
    },
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-500',
      titleColor: 'text-purple-600'
    }
  }

  const { icon: Icon, bgColor, iconColor, titleColor } = config[type]

  return (
    <div className={cn('my-6 p-4 rounded-lg border', bgColor)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={cn('font-semibold mb-2', titleColor)}>
              {title}
            </h4>
          )}
          <div className="text-text-secondary text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Tweet Embed Component (placeholder)
interface TweetEmbedProps {
  id: string
  username: string
}

function TweetEmbed({ id, username }: TweetEmbedProps) {
  return (
    <div className="my-6 p-6 bg-surface border border-border rounded-xl text-center">
      <div className="text-text-muted mb-2">Tweet from @{username}</div>
      <a
        href={`https://twitter.com/${username}/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary-hover underline"
      >
        View Tweet
      </a>
    </div>
  )
}

// Video Embed Component
interface VideoEmbedProps {
  src: string
  title?: string
  width?: number
  height?: number
}

function VideoEmbed({ src, title, width = 560, height = 315 }: VideoEmbedProps) {
  return (
    <div className="my-6">
      <div className="relative aspect-video bg-surface-elevated rounded-xl overflow-hidden">
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}