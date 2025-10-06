'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { Rocket, Zap, Shield, BarChart3, Bot } from 'lucide-react'
import '@/styles/animations.css'

const stats = [
  { label: 'Deployment Frequency', value: 'Faster', highlight: '(target)' },
  { label: 'Infrastructure Cost', value: 'Lower', highlight: '(target)' },
  { label: 'Time to Market', value: 'Faster', highlight: '(target)' },
  { label: 'System Reliability', value: 'High', highlight: '(target)' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface/30">
      {/* Simplified Background - CSS only, no extra DOM nodes */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge - simplified markup */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary animate-fade-in-up stagger-3">
            <Rocket className="w-4 h-4" strokeWidth={2} />
            Enterprise-grade DevOps without enterprise overhead
          </span>

          {/* Main Heading - removed extra wrapper */}
          <h1 className="animate-fade-in-up stagger-5 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Platform-grade <span className="gradient-text">DevOps</span> for Startups
          </h1>

          <p className="animate-fade-in-up stagger-7 mx-auto max-w-3xl text-xl text-text-secondary">
            From repo to reliable infra in 30 days - without enterprise overhead.
          </p>

          {/* CTA Buttons - simplified, removed inline SVGs */}
          <div className="animate-fade-in-up stagger-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/founding-pilot"
              onClick={() => analytics.trackCTAClick('hero', 'Join Founding Pilot', '/founding-pilot')}
              className="bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all glow-effect hover:scale-105"
            >
              Join Founding Pilot →
            </Link>

            <Link
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackCTAClick('hero', 'Book a Free 30-min Audit', 'https://calendly.com/resiliotech')}
              className="px-8 py-4 border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              Book Free 30-min Audit →
            </Link>
          </div>

          {/* Stats - simplified structure */}
          <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`animate-fade-in-up text-center stagger-${index + 1}`}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm font-semibold text-accent">{stat.highlight}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}