'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Search, PenTool, Wrench } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    description: 'We assess your current AI infrastructure and identify reliability gaps. Free 30-minute call — no commitment, just clarity.',
    color: 'from-primary to-blue-400',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Architect',
    description: 'We design a production-grade AI infrastructure tailored to your scale, stack, and budget. No over-engineering, no under-building.',
    color: 'from-accent to-green-400',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Implement & Operate',
    description: 'We build, deploy, monitor, and continuously improve. You ship AI features — we make sure the infrastructure holds.',
    color: 'from-secondary to-purple-400',
  },
]

export function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-3xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Simple, transparent process. No surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className={cn(
                  'group relative text-center transition-all duration-1000',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className={cn(
                    'w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br transition-transform duration-300 group-hover:scale-110',
                    step.color
                  )}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-surface-elevated border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
