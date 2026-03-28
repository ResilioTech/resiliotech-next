'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Shield, Terminal, Rocket, Clock } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Built by SREs Who\'ve Operated at Fortune 500 Scale',
    description: 'Our team has managed production systems handling millions of authentication requests daily at a Fortune 500 identity & security company.',
  },
  {
    icon: Clock,
    title: '6+ Years of Production Infrastructure Experience',
    description: 'We don\'t just build demos — we build systems that survive Friday deploys. Real production battle scars.',
  },
  {
    icon: Terminal,
    title: 'End-to-End: Jupyter Notebook to Production K8s',
    description: 'From model training to production deployment, monitoring, and continuous improvement. No handoff gaps.',
  },
  {
    icon: Rocket,
    title: 'We Ship, Not Slide',
    description: 'We\'d rather show you a working Kubernetes manifest than a slide deck. Direct, specific, no fluff.',
  },
]

export function WhyResilioSection() {
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
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Why <span className="gradient-text">Resilio Tech</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            We combine deep infrastructure expertise with modern AI/ML knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className={cn(
                  'group flex gap-6 p-6 bg-surface-elevated border border-border rounded-2xl hover:border-primary/50 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
