'use client'

import { useState, useEffect, useRef } from 'react'
import { List, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TableOfContentsItem } from '@/types/blog'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  title?: string
  className?: string
}

export function TableOfContents({ items, title = "Table of Contents", className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Get all headings with IDs
    const headingElements = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) return

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        } else {
          // If no headings are visible, find the one closest to the top
          const aboveViewport = entries
            .filter(entry => entry.boundingClientRect.top < 0)
            .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

          if (aboveViewport.length > 0) {
            setActiveId(aboveViewport[0].target.id)
          }
        }
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: 0
      }
    )

    // Observe all headings
    headingElements.forEach(element => {
      observerRef.current?.observe(element)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [items])

  const scrollToHeading = (id: string, event: React.MouseEvent) => {
    event.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setActiveId(id)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <nav className={cn('bg-surface border border-border rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface-elevated">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-text-primary">
              {title}
            </h3>
          </div>
          <ChevronRight 
            className={cn(
              'w-4 h-4 text-text-muted transition-transform duration-200',
              isCollapsed ? 'rotate-90' : 'rotate-0'
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className={cn(
        'transition-all duration-300 overflow-hidden',
        isCollapsed ? 'max-h-0' : 'max-h-[600px]'
      )}>
        <div className="p-4 max-h-[500px] overflow-y-auto">
          <TOCList
            items={items}
            activeId={activeId}
            onItemClick={scrollToHeading}
            level={0}
          />
        </div>
      </div>
    </nav>
  )
}

interface TOCListProps {
  items: TableOfContentsItem[]
  activeId: string
  onItemClick: (id: string, event: React.MouseEvent) => void
  level: number
}

function TOCList({ items, activeId, onItemClick, level }: TOCListProps) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => onItemClick(item.id, e)}
            className={cn(
              'block py-2 px-3 rounded-lg text-sm transition-all duration-200 hover:bg-surface-elevated',
              activeId === item.id 
                ? 'bg-primary/10 text-primary border-l-2 border-primary font-medium' 
                : 'text-text-secondary hover:text-text-primary',
              level > 0 && 'ml-4 text-xs'
            )}
            style={{ paddingLeft: `${12 + (level * 16)}px` }}
          >
            <span className="line-clamp-2">
              {item.title}
            </span>
          </a>
          
          {/* Nested items */}
          {item.children && item.children.length > 0 && (
            <TOCList
              items={item.children}
              activeId={activeId}
              onItemClick={onItemClick}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
