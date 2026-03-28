'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Server,
  Activity,
  Bot,
  type LucideIcon
} from 'lucide-react'

interface Service {
  title: string
  description: string
  features: string[]
  icon: LucideIcon
  href: string
  color: string
  iconColor: string
  linkText: string
}

const services: Service[] = [
  {
    title: 'AI/ML Deployment & Infrastructure',
    description: 'We set up model serving infrastructure with GPU optimization, auto-scaling, and CI/CD pipelines for ML models. Cloud-native AI deployment on Kubernetes.',
    features: ['Model Serving & GPU Optimization', 'CI/CD Pipelines for ML Models', 'Cloud-native AI (AWS, GCP, Azure)', 'Kubernetes ML Workload Orchestration'],
    icon: Server,
    href: '/services#deployment',
    color: 'from-primary to-blue-400',
    iconColor: 'text-cyan-400',
    linkText: 'Explore AI/ML Deployment',
  },
  {
    title: 'MLOps & AI Reliability',
    description: 'We set up monitoring for your models, detection for drift, and alerts for when things break. Automated retraining pipelines with SLA-driven reliability.',
    features: ['ML Model Monitoring & Observability', 'Data Drift Detection & Alerting', 'Automated Model Retraining Pipelines', 'SLA-driven AI System Reliability'],
    icon: Activity,
    href: '/services#mlops',
    color: 'from-accent to-green-400',
    iconColor: 'text-green-400',
    linkText: 'Explore MLOps Services',
  },
  {
    title: 'Custom AI Agents & Tooling',
    description: 'AI-powered SRE agents for incident detection and auto-remediation. RAG-based knowledge systems, LLM integrations, and AI cost optimization.',
    features: ['AI-powered SRE Agents', 'RAG-based Internal Knowledge Systems', 'Custom LLM Integrations & Fine-tuning', 'AI Cost Optimization Tooling'],
    icon: Bot,
    href: '/services#agents',
    color: 'from-secondary to-purple-400',
    iconColor: 'text-purple-400',
    linkText: 'Explore AI Agents & Tooling',
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
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
    <section ref={sectionRef} id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            End-to-end AI infrastructure — from Jupyter notebook to production Kubernetes cluster
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const ServiceIcon = service.icon
            return (
              <div
                key={service.title}
                className={cn(
                  'group relative transition-all duration-1000',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="relative h-full bg-surface border border-border rounded-2xl p-8 hover:border-primary hover:scale-105 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div aria-hidden="true" className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500',
                    service.color
                  )} />

                  <div className="relative z-10">
                    <div className="relative w-16 h-16 mb-6">
                      <div aria-hidden="true" className={cn(
                        'absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br',
                        service.color
                      )}></div>
                      <div className={cn(
                        'relative w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br',
                        service.color,
                        hoveredService === index ? 'scale-110' : ''
                      )}>
                        <ServiceIcon className="w-8 h-8 text-white" strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={feature}
                          className={cn(
                            'flex items-center text-sm text-text-muted transition-all duration-300',
                            hoveredService === index ? 'text-text-secondary' : ''
                          )}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-60"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.href}
                      className="group/link inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors"
                    >
                      {service.linkText}
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'mt-16 text-center transition-all duration-1000 delay-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-surface-elevated border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Book a free 30-minute AI infrastructure audit. We&apos;ll assess your current setup and identify the biggest reliability gaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/resiliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Book Free AI Infra Audit
              </a>
              <Link
                href="/services"
                className="border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
