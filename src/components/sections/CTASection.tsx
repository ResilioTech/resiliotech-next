'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Search,
  Lightbulb,
  FileText,
  AlertCircle,
  Clock,
  Target,
  TrendingUp,
  Mail,
  type LucideIcon
} from 'lucide-react'

interface CTAOption {
  title: string
  description: string
  icon: LucideIcon
  href: string
  buttonText: string
  highlight: string
  features: string[]
  color: string
}

const ctaOptions: CTAOption[] = [
  {
    title: 'Project Consultation',
    description: 'Get a comprehensive assessment of your project needs with actionable recommendations.',
    icon: Search,
    href: '/contact',
    buttonText: 'Start Consultation',
    highlight: 'Most Popular',
    features: ['Needs Assessment', 'Technical Review', 'Cost Analysis', 'Priority Roadmap'],
    color: 'text-blue-400'
  },
  {
    title: 'Strategy Consultation',
    description: 'One-on-one session with our DevOps experts to discuss your specific challenges.',
    icon: Lightbulb,
    href: '/contact',
    buttonText: 'Book Consultation',
    highlight: '30-min Free',
    features: ['Expert Guidance', 'Custom Strategy', 'Implementation Plan', 'Q&A Session'],
    color: 'text-yellow-400'
  },
  {
    title: 'View Case Studies',
    description: 'See real examples of how we have helped companies optimize their DevOps practices.',
    icon: FileText,
    href: '/projects',
    buttonText: 'View Projects',
    highlight: 'Quick Start',
    features: ['Success Stories', 'Implementation Details', 'Results Achieved', 'Client Testimonials'],
    color: 'text-green-400'
  },
]

interface UrgencyIndicator {
  icon: LucideIcon
  text: string
  color: string
}

const urgencyIndicators: UrgencyIndicator[] = [
  { icon: AlertCircle, text: 'Limited spots available this month', color: 'text-red-400' },
  { icon: Clock, text: 'Free consultation offer available', color: 'text-blue-400' },
  { icon: Target, text: 'Start optimizing today', color: 'text-green-400' },
  { icon: TrendingUp, text: 'Get ahead of the competition', color: 'text-purple-400' },
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
            'inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full font-medium text-sm mb-6 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            urgencyIndicators[currentUrgency].color
          )}>
            {(() => {
              const UrgencyIcon = urgencyIndicators[currentUrgency].icon;
              return (
                <>
                  <UrgencyIcon className="w-4 h-4" strokeWidth={2} />
                  {urgencyIndicators[currentUrgency].text}
                </>
              );
            })()}
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
          {ctaOptions.map((option, index) => {
            const OptionIcon = option.icon;
            return (
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
                    <div className="absolute -top-3 -right-3 bg-primary text-background text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {option.highlight}
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative w-16 h-16 mb-6">
                      <div className={cn(
                        "absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity",
                        option.color
                      )}></div>
                      <div className={cn(
                        "relative w-full h-full rounded-xl bg-gradient-to-br from-surface-elevated to-surface border border-border group-hover:border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                        option.color
                      )}>
                        <OptionIcon className="w-7 h-7" strokeWidth={2} />
                      </div>
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
            );
          })}
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
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary px-8 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105"
              >
                Schedule a Call
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto text-center text-primary hover:text-primary-hover font-semibold px-8 py-3 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" strokeWidth={2} />
                <span>hello@resiliotech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" strokeWidth={2} />
                <span>We respond within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" strokeWidth={2} />
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}