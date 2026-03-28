'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { Zap, Rocket, Shield, BarChart3, Cpu } from 'lucide-react'
import '@/styles/animations.css'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface/30 py-20 sm:py-24">
      {/* Animated Background Grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" style={{ opacity: 0.7 }} />

      {/* Gradient Orbs - use CSS animation on opacity only to avoid CLS */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" style={{ opacity: 0.6, contain: 'strict' }} />
      <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ opacity: 0.6, contain: 'strict' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
        <div className="space-y-12">
          {/* Badge */}
          <div className="animate-fade-in stagger-1">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary">
              <Zap className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Production-Grade AI Infrastructure & Reliability
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="animate-fade-in stagger-2 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-7xl leading-tight">
              AI Infrastructure That{' '}
              <span className="gradient-text">Doesn&apos;t Break</span> in Production
            </h1>

            <p className="animate-fade-in stagger-3 mx-auto max-w-3xl text-lg sm:text-xl text-text-secondary leading-relaxed">
              We help companies deploy, scale, and operate AI systems reliably.
              From model serving to monitoring — production-grade AI infrastructure
              by engineers who&apos;ve run systems at enterprise scale.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in stagger-4 flex flex-col sm:flex-row gap-4 justify-center pt-4">
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

          {/* What We Actually Do */}
          <div className="pt-12 sm:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                {
                  icon: Rocket,
                  title: 'Deploy ML Models',
                  description: 'From notebook to production Kubernetes with zero-downtime deployments',
                  color: 'text-cyan-400',
                },
                {
                  icon: Cpu,
                  title: 'Optimize GPU Costs',
                  description: 'Smart autoscaling & resource management to cut your GPU spend',
                  color: 'text-green-400',
                },
                {
                  icon: BarChart3,
                  title: 'Monitor & Alert',
                  description: 'Detect model drift, latency spikes, and failures before users do',
                  color: 'text-purple-400',
                },
                {
                  icon: Shield,
                  title: 'Guarantee Uptime',
                  description: 'SLA-backed infrastructure by SREs who\'ve run Fortune 500 systems',
                  color: 'text-amber-400',
                },
              ].map((item) => {
                const IconComp = item.icon
                return (
                  <div
                    key={item.title}
                    className="relative group p-5 sm:p-6 bg-surface/60 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300 text-left"
                  >
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <IconComp className={cn('w-6 h-6 mb-3', item.color)} strokeWidth={1.5} aria-hidden="true" />
                      <div className="text-base font-semibold text-text-primary mb-1.5">{item.title}</div>
                      <div className="text-sm text-text-muted leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}