'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Strip the first H1 heading since it's already rendered in BlogPostLayout header
  const processedContent = content.replace(/^#\s+.+$/m, '').trimStart()

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-text-primary mt-10 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-text-primary mt-6 mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-text-primary mt-4 mb-2">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary ml-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary ml-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-text-secondary leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-surface/50 rounded-r-lg text-text-muted italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="px-1.5 py-0.5 bg-surface-elevated border border-border rounded text-sm text-primary font-mono">
                {children}
              </code>
            )
          }
          return (
            <code className={`block overflow-x-auto p-4 bg-surface-elevated border border-border rounded-lg text-sm text-text-secondary font-mono ${className || ''}`}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="overflow-x-auto my-4 rounded-lg">{children}</pre>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-text-primary">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-text-secondary">{children}</em>
        ),
        hr: () => <hr className="my-8 border-border" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-border rounded-lg">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 bg-surface-elevated border border-border text-left text-sm font-semibold text-text-primary">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 border border-border text-sm text-text-secondary">{children}</td>
        ),
        img: ({ src, alt }) => (
          <div className="relative w-full my-8">
            <Image 
              src={src || ''} 
              alt={alt || ''} 
              width={1200}
              height={630}
              className="rounded-lg h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}
