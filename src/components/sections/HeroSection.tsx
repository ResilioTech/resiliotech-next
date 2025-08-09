'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Deployment Frequency', value: '10x', highlight: 'Faster' },
  { label: 'Infrastructure Cost', value: '60%', highlight: 'Reduction' },
  { label: 'Time to Market', value: '75%', highlight: 'Faster' },
  { label: 'System Reliability', value: '99.9%', highlight: 'Uptime' },
]

const floatingElements = [
  { icon: '🚀', delay: 0, duration: 6 },
  { icon: '⚡', delay: 1, duration: 8 },
  { icon: '🔒', delay: 2, duration: 7 },
  { icon: '📊', delay: 3, duration: 9 },
  { icon: '🤖', delay: 4, duration: 6.5 },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-surface/30">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={cn(
              'absolute text-2xl opacity-20 animate-bounce',
              isVisible ? 'animate-pulse' : ''
            )}
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            {element.icon}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className={cn(
                'transition-all duration-1000 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}>
                <span className="inline-block px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary mb-6">
                  🚀 Enterprise-grade DevOps without enterprise overhead
                </span>
              </div>
              
              <h1 className={cn(
                'text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl transition-all duration-1000 delay-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}>
                Scale Your Startup with{' '}
                <span className="gradient-text">
                  Automated DevOps
                </span>
              </h1>
              
              <p className={cn(
                'mx-auto mt-6 max-w-3xl text-xl text-text-secondary transition-all duration-1000 delay-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}>
                We transform fast-moving startups into scalable tech companies through 
                automated CI/CD, infrastructure-as-code, and comprehensive observability solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
              <Link
                href="/contact"
                className="group bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 glow-effect hover:scale-105"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5 inline transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/projects"
                className="group px-8 py-4 border border-border hover:border-primary bg-surface hover:bg-surface-elevated text-text-primary rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                See Case Studies
                <svg
                  className="ml-2 -mr-1 w-5 h-5 inline transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className={cn(
              'mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 transition-all duration-1000 delay-1100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}>
              {stats.map((stat, index) => {
                // Map stats to relevant project cases
                const projectLinks = {
                  'Deployment Frequency': '/projects/devops-pipeline-automation',
                  'Infrastructure Cost': '/projects/ecommerce-platform-modernization', 
                  'Time to Market': '/projects/devops-pipeline-automation',
                  'System Reliability': '/projects/ecommerce-platform-modernization'
                }
                
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      'text-center group transition-all duration-300 hover:scale-105',
                      'delay-' + (index * 100)
                    )}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-accent mb-1">
                      {stat.highlight}
                    </div>
                    <div className="text-sm text-text-muted mb-2">
                      {stat.label}
                    </div>
                    <Link
                      href={projectLinks[stat.label as keyof typeof projectLinks]}
                      className="text-xs text-primary hover:text-primary-hover transition-colors underline"
                    >
                      See how →
                    </Link>
                  </div>
                )
              })}
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