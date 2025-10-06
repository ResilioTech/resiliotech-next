'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const technologies = [
  { name: 'Kubernetes', logo: '/tech-logos/1-kubernetes.svg', category: 'Orchestration' },
  { name: 'Docker', logo: '/tech-logos/2-docker.svg', category: 'Containerization' },
  { name: 'AWS', logo: '/tech-logos/3-aws.svg', category: 'Cloud' },
  { name: 'Azure', logo: '/tech-logos/4-azure.svg', category: 'Cloud' },
  { name: 'Google Cloud', logo: '/tech-logos/5-google-cloud.svg', category: 'Cloud' },
  { name: 'Terraform', logo: '/tech-logos/6-terraform.svg', category: 'IaC' },
  { name: 'Ansible', logo: '/tech-logos/7-ansible.svg', category: 'Configuration' },
  { name: 'Jenkins', logo: '/tech-logos/8-jenkins.svg', category: 'CI/CD' },
  { name: 'GitHub Actions', logo: '/tech-logos/9-gitHub-actions.svg', category: 'Automation' },
  { name: 'Prometheus', logo: '/tech-logos/10-prometheus.svg', category: 'Monitoring' },
  { name: 'Grafana', logo: '/tech-logos/11-grafana.svg', category: 'Visualization' },
  { name: 'Helm', logo: '/tech-logos/12-helm.svg', category: 'Package Manager' },
  { name: 'ArgoCD', logo: '/tech-logos/13-argocd.svg', category: 'GitOps' },
  { name: 'Elasticsearch', logo: '/tech-logos/14-elasticsearch.svg', category: 'Logging' },
  { name: 'Vault', logo: '/tech-logos/15-vault.svg', category: 'Security' },
  { name: 'Gitlab CI/CD', logo: '/tech-logos/16-gitlab.svg', category: 'CI/CD' },
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
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square bg-surface-elevated border border-border rounded-xl p-3 hover:border-primary hover:scale-110 transition-all duration-300 hover:bg-surface group-hover:shadow-xl group-hover:shadow-primary/10">
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        width={64}
                        height={64}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        priority={index < 8}
                      />
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    <div className="bg-background border border-primary/30 rounded-lg px-3 py-2 shadow-xl">
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