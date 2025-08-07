'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const ctaOptions = [
  {
    title: 'Free Infrastructure Audit',
    description: 'Get a comprehensive assessment of your current setup with actionable recommendations.',
    icon: '🔍',
    href: '/tools/infrastructure-audit',
    buttonText: 'Start Free Audit',
    highlight: 'Most Popular',
    features: ['Security Assessment', 'Performance Review', 'Cost Analysis', 'Priority Roadmap'],
  },
  {
    title: 'Strategy Consultation',
    description: 'One-on-one session with our DevOps experts to discuss your specific challenges.',
    icon: '💡',
    href: '/contact',
    buttonText: 'Book Consultation',
    highlight: '30-min Free',
    features: ['Expert Guidance', 'Custom Strategy', 'Implementation Plan', 'Q&A Session'],
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate potential savings and improvements from DevOps automation.',
    icon: '💰',
    href: '/tools/roi-calculator',
    buttonText: 'Calculate ROI',
    highlight: 'Quick Start',
    features: ['Cost Savings', 'Time Analysis', 'Resource Optimization', 'Custom Scenarios'],
  },
]

const urgencyIndicators = [
  '🚨 Limited spots available this month',
  '⏰ Free audit offer ends soon',
  '🎯 Start optimizing today',
  '💡 Get ahead of the competition',
]

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentUrgency, setCurrentUrgency] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUrgency((prev) => (prev + 1) % urgencyIndicators.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-surface relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <div className={cn(
            'inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            {urgencyIndicators[currentUrgency]}
          </div>
          
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl mb-6 transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Ready to <span className="gradient-text">Scale Faster</span>?
          </h2>
          
          <p className={cn(
            'text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-400',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Don't let infrastructure bottlenecks slow down your growth. 
            Take the first step towards automated, scalable DevOps.
          </p>
        </div>

        {/* CTA Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((option, index) => (
            <div
              key={option.title}
              className={cn(
                'group relative transition-all duration-1000',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${600 + (index * 150)}ms` }}
            >
              <div className="relative h-full bg-background border border-border rounded-2xl p-8 hover:border-primary hover:scale-105 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
                {/* Highlight Badge */}
                {option.highlight && (
                  <div className="absolute -top-3 -right-3 bg-primary text-background text-xs font-bold px-3 py-1 rounded-full">
                    {option.highlight}
                  </div>
                )}
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                    <span className="text-2xl">{option.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {option.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {option.features.map((feature, featureIndex) => (
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
                    href={option.href}
                    className={cn(
                      'block w-full text-center py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
                      index === 0
                        ? 'bg-primary hover:bg-primary-hover text-background glow-effect'
                        : 'bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary'
                    )}
                  >
                    {option.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={cn(
          'text-center transition-all duration-1000 delay-1200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-background border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every startup's journey is unique. Let's discuss your specific challenges 
              and create a tailored DevOps strategy that fits your needs and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Schedule a Call
              </Link>
              <Link
                href="/about"
                className="text-primary hover:text-primary-hover font-semibold px-8 py-3 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>hello@resiliotech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span>Response within 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}