'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    content: "Resiliotech transformed our deployment process from a manual nightmare to a seamless automated pipeline. We went from weekly deployments to daily releases with zero downtime.",
    author: "Sarah Chen",
    title: "CTO",
    company: "TechFlow (YC S23)",
    avatar: "SC",
    metrics: { deployments: "10x faster", downtime: "99.9% uptime", costs: "40% cost reduction" },
  },
  {
    content: "The infrastructure audit revealed critical security vulnerabilities we didn't know existed. Their automated monitoring solution now catches issues before they impact customers.",
    author: "Marcus Rodriguez",
    title: "Head of Engineering",
    company: "DataVault (Series A)",
    avatar: "MR",
    metrics: { incidents: "90% fewer incidents", response: "5min response time", security: "Zero breaches" },
  },
  {
    content: "Moving to infrastructure-as-code with Resiliotech's help saved us 60% on cloud costs while improving reliability. The ROI was clear within the first month.",
    author: "Emma Thompson",
    title: "VP Engineering",
    company: "ScaleTech (Series B)",
    avatar: "ET",
    metrics: { costs: "60% cost savings", reliability: "99.99% SLA", scaling: "Auto-scaling" },
  },
]

const logos = [
  { name: "YCombinator", logo: "YC" },
  { name: "Series A", logo: "A" },
  { name: "Series B", logo: "B" },
  { name: "Unicorn", logo: "🦄" },
  { name: "Fortune 500", logo: "500" },
]

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const currentData = testimonials[currentTestimonial]

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Trusted by <span className="gradient-text">Growing Startups</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            See how we've helped startups scale from idea to IPO
          </p>
        </div>

        {/* Main Testimonial */}
        <div className={cn(
          'max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="relative bg-surface border border-border rounded-3xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 w-8 h-8 text-primary opacity-20">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-1.704.629-3.289 1.758-4.467C16.991 7.997 18.763 7 20.728 7c.329 0 .631.053.896.158v-2.921C20.852 4.075 20.131 4 19.35 4c-3.833 0-7.037 2.415-8.59 5.931C10.175 11.278 10 12.647 10 14v7h4.017zm-8.017 0v-7.391c0-1.704.629-3.289 1.758-4.467C8.847 7.997 10.619 7 12.583 7c.329 0 .631.053.896.158v-2.921C12.708 4.075 11.986 4 11.206 4c-3.833 0-7.037 2.415-8.59 5.931C2.031 11.278 1.856 12.647 1.856 14v7h4.144z"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed mb-8">
                "{currentData.content}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-background font-bold text-sm">
                      {currentData.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      {currentData.author}
                    </div>
                    <div className="text-text-secondary">
                      {currentData.title} at {currentData.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className={cn(
          'max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-600',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(currentData.metrics).map(([key, value], index) => (
              <div
                key={key}
                className={cn(
                  'text-center bg-surface-elevated border border-border rounded-xl p-6 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {value}
                </div>
                <div className="text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className={cn(
          'flex justify-center space-x-3 mb-16 transition-all duration-1000 delay-800',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                currentTestimonial === index
                  ? 'bg-primary scale-125'
                  : 'bg-border hover:bg-primary/50'
              )}
            />
          ))}
        </div>

        {/* Company Logos */}
        <div className={cn(
          'text-center transition-all duration-1000 delay-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <p className="text-text-muted text-sm mb-8">
            Trusted by startups at every stage
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logos.map((logo, index) => (
              <div
                key={logo.name}
                className="w-16 h-16 bg-surface-elevated border border-border rounded-xl flex items-center justify-center hover:border-primary hover:bg-surface transition-all duration-300"
              >
                <span className="font-bold text-text-secondary text-sm">
                  {logo.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}