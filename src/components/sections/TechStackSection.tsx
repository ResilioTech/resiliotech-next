'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const technologies = [
  { name: 'Kubernetes', category: 'Orchestration' },
  { name: 'Docker', category: 'Containers' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'PyTorch', category: 'ML Framework' },
  { name: 'LangChain', category: 'LLM Framework' },
  { name: 'Terraform', category: 'IaC' },
  { name: 'Prometheus', category: 'Monitoring' },
  { name: 'Grafana', category: 'Observability' },
  { name: 'ArgoCD', category: 'GitOps' },
  { name: 'GitHub Actions', category: 'CI/CD' },
]

export function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Technologies We <span className="gradient-text">Work With</span>
          </h2>
          <p className={cn(
            'mt-3 text-lg text-text-secondary max-w-2xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Battle-tested tools for production AI infrastructure
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={cn(
                'px-5 py-3 bg-surface border border-border rounded-xl hover:border-primary/50 hover:bg-surface-elevated transition-all duration-300',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-sm font-medium text-text-primary">{tech.name}</span>
              <span className="ml-2 text-xs text-text-muted">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}