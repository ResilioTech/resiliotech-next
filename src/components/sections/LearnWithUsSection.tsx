'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Youtube, BookOpen, Linkedin, ArrowRight } from 'lucide-react'

export function LearnWithUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Learn <span className="gradient-text">With Us</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            We share everything we learn — real use cases, real production lessons
          </p>
        </div>

        <div className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@ResilioTech"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 p-8 bg-surface border border-border rounded-2xl hover:border-red-400/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <Youtube className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-red-400 transition-colors flex items-center gap-2">
                  YouTube Channel
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Coming Soon
                </span>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed text-sm">
              Technical deep-dives on MLOps, AI infrastructure, and production reliability.
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2"><span className="text-red-400">▸</span> Deploying LLMs to K8s</li>
              <li className="flex items-center gap-2"><span className="text-red-400">▸</span> GPU Cost Optimization in Practice</li>
            </ul>
          </a>

          {/* Blog */}
          <Link
            href="/blog"
            className="group flex flex-col gap-6 p-8 bg-surface border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                  Technical Blog
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed text-sm">
              In-depth articles on AI reliability, deployment patterns, and infrastructure automation.
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2"><span className="text-primary">▸</span> Why Your ML Models Fail in Production</li>
              <li className="flex items-center gap-2"><span className="text-primary">▸</span> Building an MLOps Pipeline on Kubernetes</li>
              <li className="flex items-center gap-2"><span className="text-primary">▸</span> How We Cut GPU Costs by 40%</li>
            </ul>
          </Link>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/resiliotech"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 p-8 bg-surface border border-border rounded-2xl hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Linkedin className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  LinkedIn
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed text-sm">
              Follow our building-in-public journey and weekly AI infra insights.
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> Weekly AI Infra insights</li>
              <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> Behind-the-scenes updates</li>
            </ul>
          </a>
        </div>

        {/* Building in Public badge */}
        <div className={cn(
          'mt-12 text-center transition-all duration-1000 delay-600',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border rounded-full text-sm font-medium text-text-secondary">
            🔨 Building in Public — Follow our journey on <a href="https://www.linkedin.com/company/resiliotech" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover transition-colors ml-1">LinkedIn</a>
          </span>
        </div>
      </div>
    </section>
  )
}
