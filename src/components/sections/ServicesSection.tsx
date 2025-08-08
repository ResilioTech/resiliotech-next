'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const services = [
  {
    title: 'DevOps Automation',
    description: 'End-to-end CI/CD pipelines, automated testing, and deployment strategies that reduce deployment time from hours to minutes.',
    features: ['CI/CD Pipeline Setup', 'Automated Testing', 'Blue-Green Deployments', 'Rollback Strategies'],
    icon: '🔄',
    href: '/services/devops-automation',
    color: 'from-primary to-blue-400',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable, secure, and cost-optimized cloud architecture using Infrastructure-as-Code principles.',
    features: ['AWS/GCP/Azure Setup', 'Terraform/Pulumi IaC', 'Auto-scaling Configuration', 'Cost Optimization'],
    icon: '☁️',
    href: '/services/cloud-infrastructure',
    color: 'from-secondary to-purple-400',
  },
  {
    title: 'MLOps & Data Pipeline',
    description: 'Machine learning operations and automated data workflows for AI-powered applications.',
    features: ['ML Model Deployment', 'Data Pipeline Automation', 'Model Monitoring', 'A/B Testing'],
    icon: '🤖',
    href: '/services/mlops',
    color: 'from-accent to-green-400',
  },
  {
    title: 'Observability & Monitoring',
    description: 'Comprehensive monitoring, logging, and alerting solutions for proactive issue detection.',
    features: ['Metrics & Dashboards', 'Log Aggregation', 'Alert Management', 'Performance Monitoring'],
    icon: '📊',
    href: '/services/observability',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    title: 'Security & Compliance',
    description: 'DevSecOps integration with automated security scanning and compliance monitoring.',
    features: ['Security Scanning', 'Compliance Automation', 'Access Control', 'Vulnerability Management'],
    icon: '🔒',
    href: '/services/security',
    color: 'from-red-400 to-pink-400',
  },
  {
    title: 'Consulting & Strategy',
    description: 'Expert guidance on DevOps transformation, toolchain selection, and organizational change.',
    features: ['DevOps Assessment', 'Strategy Planning', 'Team Training', 'Process Optimization'],
    icon: '💡',
    href: '/consulting',
    color: 'from-indigo-400 to-cyan-400',
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Complete <span className="gradient-text">DevOps Solutions</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            From infrastructure to deployment, we handle every aspect of your DevOps journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                {/* Background Gradient */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500',
                  service.color
                )} />
                
                {/* Service Icon */}
                <div className="relative z-10">
                  <div className={cn(
                    'w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 bg-gradient-to-br',
                    service.color,
                    hoveredService === index ? 'scale-110 glow-effect' : ''
                  )}>
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
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
                  
                  {/* CTA Link */}
                  <Link
                    href={service.href}
                    className="group/link inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    Explore {service.title} Services
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'mt-16 text-center transition-all duration-1000 delay-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-surface-elevated border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every startup is unique. Let's discuss your specific challenges and create a tailored DevOps strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/projects"
                className="border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}