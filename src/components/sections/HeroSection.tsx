'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'
import { Rocket, Zap, Shield, BarChart3, Bot } from 'lucide-react'
import '@/styles/animations.css'

const stats = [
  { label: 'Deployment Frequency', value: '10x', highlight: 'Faster' },
  { label: 'Infrastructure Cost', value: '60%', highlight: 'Reduction' },
  { label: 'Time to Market', value: '75%', highlight: 'Faster' },
  { label: 'System Reliability', value: '99.9%', highlight: 'Uptime' },
]

const floatingElements = [
  { icon: Rocket, delay: 0, duration: 6 },
  { icon: Zap, delay: 1, duration: 8 },
  { icon: Shield, delay: 2, duration: 7 },
  { icon: BarChart3, delay: 3, duration: 9 },
  { icon: Bot, delay: 4, duration: 6.5 },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface/30">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <div
              key={index}
              className="absolute opacity-20 animate-bounce animate-pulse"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50"></div>
                <IconComponent className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="animate-on-scroll animate-fade-in-up stagger-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary mb-6">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
                    <Rocket className="relative h-4 w-4" strokeWidth={2} />
                  </span>
                  Enterprise-grade DevOps without enterprise overhead
                </span>
              </div>

              <h1 className="animate-on-scroll animate-fade-in-up stagger-5 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                Platform-grade{' '}
                <span className="gradient-text">
                  DevOps
                </span>{' '}
                for Startups
              </h1>

              <p className="animate-on-scroll animate-fade-in-up stagger-7 mx-auto mt-6 max-w-3xl text-xl text-text-secondary">
                From repo to reliable infra in 30 days - without enterprise overhead.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-on-scroll animate-fade-in-up stagger-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/founding-pilot"
                onClick={() => analytics.trackCTAClick('hero', 'Join Founding Pilot', '/founding-pilot')}
                className="group bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 glow-effect hover:scale-105"
              >
                Join Founding Pilot
                <svg
                  className="ml-2 -mr-1 w-5 h-5 inline transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="https://calendly.com/resiliotech/30min-audit"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackCTAClick('hero', 'Book Free Audit', 'https://calendly.com/resiliotech/30min-audit')}
                className="group px-8 py-4 border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Book Free Audit
                <svg
                  className="ml-2 -mr-1 w-5 h-5 inline transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    'animate-on-scroll animate-fade-in-up text-center',
                    index === 0 && 'stagger-1',
                    index === 1 && 'stagger-2',
                    index === 2 && 'stagger-3',
                    index === 3 && 'stagger-4'
                  )}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-accent mb-1">
                    {stat.highlight}
                  </div>
                  <div className="text-sm text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}