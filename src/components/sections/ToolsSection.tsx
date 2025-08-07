'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const tools = [
  {
    title: 'ROI Calculator',
    description: 'Calculate the potential return on investment from DevOps automation and infrastructure optimization.',
    icon: '💰',
    href: '/tools/roi-calculator',
    features: ['Cost Savings Analysis', 'Time-to-Market Impact', 'Resource Optimization', 'Custom Scenarios'],
    color: 'from-green-400 to-emerald-500',
    popular: true,
  },
  {
    title: 'Infrastructure Audit',
    description: 'Comprehensive assessment of your current infrastructure setup and security posture.',
    icon: '🔍',
    href: '/tools/infrastructure-audit',
    features: ['Security Assessment', 'Performance Review', 'Cost Analysis', 'Recommendation Report'],
    color: 'from-blue-400 to-cyan-500',
    popular: false,
  },
  {
    title: 'DevOps Maturity Assessment',
    description: 'Evaluate your organization\'s DevOps maturity level and get personalized improvement roadmap.',
    icon: '📊',
    href: '/tools/maturity-assessment',
    features: ['Maturity Scoring', 'Gap Analysis', 'Roadmap Planning', 'Best Practices Guide'],
    color: 'from-purple-400 to-pink-500',
    popular: false,
  },
  {
    title: 'Cost Optimization Calculator',
    description: 'Analyze your cloud spending and identify opportunities for significant cost reductions.',
    icon: '⚡',
    href: '/tools/cost-calculator',
    features: ['Cloud Cost Analysis', 'Rightsizing Recommendations', 'Reserved Instances Planning', 'Savings Projections'],
    color: 'from-orange-400 to-red-500',
    popular: false,
  },
]

const benefits = [
  {
    icon: '🎯',
    title: 'Accurate Projections',
    description: 'Data-driven insights based on industry benchmarks and real-world scenarios.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Get comprehensive reports and recommendations in minutes, not weeks.',
  },
  {
    icon: '📈',
    title: 'Actionable Insights',
    description: 'Specific recommendations with implementation priorities and timelines.',
  },
  {
    icon: '💡',
    title: 'Expert Guidance',
    description: 'Built by DevOps experts with years of optimization experience.',
  },
]

export function ToolsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
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
            Free <span className="gradient-text">Assessment Tools</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Get instant insights into your infrastructure, costs, and optimization opportunities
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className={cn(
                'group relative transition-all duration-1000',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-full bg-background border border-border rounded-2xl p-8 hover:border-primary hover:scale-105 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
                {/* Popular Badge */}
                {tool.popular && (
                  <div className="absolute -top-3 -right-3 bg-primary text-background text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                {/* Background Gradient */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500',
                  tool.color
                )} />
                
                <div className="relative z-10">
                  {/* Tool Icon */}
                  <div className={cn(
                    'w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 bg-gradient-to-br group-hover:scale-110 group-hover:glow-effect',
                    tool.color
                  )}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {tool.features.map((feature, featureIndex) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-text-muted"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-60"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Link
                    href={tool.href}
                    className={cn(
                      'block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
                      tool.popular 
                        ? 'bg-primary hover:bg-primary-hover text-background glow-effect'
                        : 'bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary'
                    )}
                  >
                    Try Free Tool
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={cn(
          'transition-all duration-1000 delay-800',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-background border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Why Use Our Assessment Tools?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={cn(
                    'text-center group transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  )}
                  style={{ transitionDelay: `${1000 + (index * 100)}ms` }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'mt-16 text-center transition-all duration-1000 delay-1200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Optimize Your Infrastructure?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Start with a free assessment and discover how much you could save with proper DevOps automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/roi-calculator"
              className="bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-lg font-semibold transition-all duration-300 glow-effect hover:scale-105"
            >
              Calculate Your ROI
            </Link>
            <Link
              href="/contact"
              className="border border-border hover:border-primary bg-background hover:bg-surface text-text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Expert Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}