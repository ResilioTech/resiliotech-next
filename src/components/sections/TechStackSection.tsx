'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const technologies = [
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'Docker', icon: '🐳', category: 'Containerization' },
  { name: 'Kubernetes', icon: '⚙️', category: 'Orchestration' },
  { name: 'Terraform', icon: '🏗️', category: 'IaC' },
  { name: 'Jenkins', icon: '🔧', category: 'CI/CD' },
  { name: 'Prometheus', icon: '📊', category: 'Monitoring' },
  { name: 'Ansible', icon: '📋', category: 'Configuration' },
  { name: 'GitLab', icon: '🦊', category: 'DevOps' },
  { name: 'Grafana', icon: '📈', category: 'Visualization' },
  { name: 'ELK Stack', icon: '🔍', category: 'Logging' },
  { name: 'HashiCorp', icon: '🔐', category: 'Security' },
  { name: 'GitHub Actions', icon: '⚡', category: 'Automation' },
  { name: 'ArgoCD', icon: '🎯', category: 'GitOps' },
  { name: 'Istio', icon: '🕸️', category: 'Service Mesh' },
  { name: 'Helm', icon: '⛵', category: 'Package Manager' },
  { name: 'Datadog', icon: '🐕', category: 'APM' },
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
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Built on <span className="gradient-text">Industry Standards</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            We leverage the most trusted and battle-tested tools in the DevOps ecosystem
          </p>
        </div>

        {/* Floating Tech Grid */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50"></div>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 relative z-10">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={cn(
                  'group relative transition-all duration-1000',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square bg-surface-elevated border border-border rounded-xl p-4 hover:border-primary hover:scale-110 transition-all duration-300 hover:bg-surface group-hover:glow-effect">
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {tech.icon}
                    </span>
                    <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                      {tech.name}
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-xl">
                      <p className="text-sm font-medium text-text-primary whitespace-nowrap">
                        {tech.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {tech.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Badges */}
        <div className={cn(
          'mt-16 flex flex-wrap justify-center items-center gap-8 transition-all duration-1000 delay-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">AWS</span>
            </div>
            <span className="text-sm">Certified Solutions Architect</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">K8s</span>
            </div>
            <span className="text-sm">Certified Kubernetes Administrator</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-accent font-bold text-sm">TF</span>
            </div>
            <span className="text-sm">HashiCorp Certified</span>
          </div>
        </div>
      </div>
    </section>
  )
}