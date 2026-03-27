'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { Zap } from 'lucide-react'
import '@/styles/animations.css'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface/30 py-20 sm:py-24">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
        <div className="space-y-12">
          {/* Badge */}
          <div className="animate-fade-in-up stagger-3">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary">
              <Zap className="w-4 h-4" strokeWidth={2} />
              Production-Grade AI Infrastructure & Reliability
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="animate-fade-in-up stagger-5 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-7xl leading-tight">
              AI Infrastructure That{' '}
              <span className="gradient-text">Doesn&apos;t Break</span> in Production
            </h1>

            <p className="animate-fade-in-up stagger-7 mx-auto max-w-3xl text-lg sm:text-xl text-text-secondary leading-relaxed">
              We help companies deploy, scale, and operate AI systems reliably.
              From model serving to monitoring — production-grade AI infrastructure
              by engineers who&apos;ve run systems at enterprise scale.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up stagger-8 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackCTAClick('hero', 'Book a Free AI Infra Audit', 'https://calendly.com/resiliotech')}
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all glow-effect hover:scale-105"
            >
              Book a Free AI Infra Audit →
            </a>

            <Link
              href="#services"
              onClick={() => analytics.trackCTAClick('hero', 'See What We Do', '#services')}
              className="inline-flex items-center justify-center px-8 py-4 border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              See What We Do →
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="pt-12 sm:pt-16">
            <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
              {[
                { value: '6+', highlight: 'Years', label: 'SRE Experience' },
                { value: 'F500', highlight: 'Scale', label: 'Enterprise Systems' },
                { value: 'E2E', highlight: 'Coverage', label: 'Notebook to K8s' },
                { value: '24h', highlight: 'Response', label: 'We Move Fast' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-accent mb-1">{stat.highlight}</div>
                  <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}