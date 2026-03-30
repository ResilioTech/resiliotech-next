'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'
import {
  Clock,
  ArrowRight,
} from 'lucide-react'

export function CTASection() {
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
    <section ref={sectionRef} className="py-24 bg-surface relative overflow-hidden">
      {/* Background Effects */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div aria-hidden="true" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'text-center transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-background border border-border rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl mb-6">
              Ready to Make Your AI{' '}
              <span className="gradient-text">Production-Ready</span>?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Book a free 30-minute AI infrastructure audit. We&apos;ll assess your current setup, 
              identify reliability gaps, and give you a concrete action plan.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10">
              <a
                href="https://calendly.com/resiliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 glow-effect inline-flex items-center justify-center gap-2"
              >
                Book a Free AI Infra Audit
                <ArrowRight className="w-5 h-5" />
              </a>
              <CopyEmailButton
                className="w-full sm:w-auto text-center text-primary hover:text-primary-hover font-semibold px-8 py-4 transition-colors inline-flex items-center justify-center gap-2"
              />
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" strokeWidth={2} aria-hidden="true" />
                <span>We respond within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Free 30-min consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}