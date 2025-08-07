'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { BlogStats as BlogStatsType } from '@/types/blog'

interface BlogStatsProps {
  stats: BlogStatsType
}

export function BlogStats({ stats }: BlogStatsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCounts, setAnimatedCounts] = useState({
    posts: 0,
    categories: 0,
    authors: 0,
  })

  useEffect(() => {
    setIsVisible(true)
    
    // Animate counters
    const duration = 1500
    const steps = 50
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setAnimatedCounts({
        posts: Math.round(stats.totalPosts * easeOutQuart),
        categories: Math.round(stats.totalCategories * easeOutQuart),
        authors: Math.round(stats.totalAuthors * easeOutQuart),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedCounts({
          posts: stats.totalPosts,
          categories: stats.totalCategories,
          authors: stats.totalAuthors,
        })
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [stats])

  const statsItems = [
    {
      label: 'Expert Articles',
      value: animatedCounts.posts,
      icon: '📚',
      description: 'In-depth guides and tutorials'
    },
    {
      label: 'Topic Categories',
      value: animatedCounts.categories,
      icon: '🎯',
      description: 'Specialized knowledge areas'
    },
    {
      label: 'Expert Authors',
      value: animatedCounts.authors,
      icon: '👥',
      description: 'Industry professionals'
    },
    {
      label: 'Weekly Updates',
      value: '3+',
      icon: '🚀',
      description: 'Fresh content regularly'
    }
  ]

  return (
    <div className={cn(
      'grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    )}>
      {statsItems.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            'text-center group transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-primary mb-1 font-mono">
              {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </div>
            <div className="text-sm font-semibold text-text-primary mb-1">
              {item.label}
            </div>
            <div className="text-xs text-text-muted leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}