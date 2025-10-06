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

        {/* Simplified Tech Grid - removed tooltips and extra wrappers */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={cn(
                'aspect-square bg-surface-elevated border border-border rounded-xl p-3 hover:border-primary hover:scale-110 transition-all',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
              title={`${tech.name} - ${tech.category}`}
            >
              <Image
                src={tech.logo}
                alt={`${tech.name} logo`}
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority={index < 8}
              />
            </div>
          ))}
        </div>

        {/* Simplified Certification Badges - removed extra wrapper divs */}
        <div className={cn(
          'mt-16 flex flex-wrap justify-center gap-6 text-sm text-text-secondary transition-all',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}>
          <span>🏆 AWS Certified Solutions Architect</span>
          <span>🏆 Certified Kubernetes Administrator</span>
          <span>🏆 HashiCorp Certified</span>
        </div>
      </div>
    </section>
  )
}