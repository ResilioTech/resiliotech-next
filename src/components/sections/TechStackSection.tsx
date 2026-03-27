'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Inline SVG logos — lightweight, no external assets needed
const techLogos: Record<string, React.ReactNode> = {
  Kubernetes: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <path d="M16 2.5l1 .4 9.5 4.2.8.5.2.9v15l-.2.9-.8.5L17 29.1l-1 .4-1-.4-9.5-4.2-.8-.5-.2-.9v-15l.2-.9.8-.5L15 2.9l1-.4z" fill="#326CE5"/>
      <path d="M16 7a1 1 0 011 1v3.27l2.83 1.63a1 1 0 01-.5 1.87l-.5-.01-2.83-1.64-2.83 1.64a1 1 0 01-1-1.73L15 11.27V8a1 1 0 011-1zm-4.33 9.5a1 1 0 01.37 1.37l-1.64 2.83.19.49a1 1 0 01-1.87.5l-.18-.49.01-.5 1.75-2.83a1 1 0 011.37-.37zm8.66 0a1 1 0 011.37.37l1.75 2.83.01.5-.18.49a1 1 0 01-1.87-.5l.19-.49-1.64-2.83a1 1 0 01.37-1.37zM16 14a2 2 0 110 4 2 2 0 010-4zm-3.5 7.5h7a1 1 0 010 2h-7a1 1 0 010-2z" fill="white" fillOpacity=".9"/>
    </svg>
  ),
  PyTorch: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <path d="M16 3.5l-8.5 5v15.5L16 28.5l8.5-4.5V8.5L16 3.5z" fill="#EE4C2C" fillOpacity=".15"/>
      <path d="M22 11l-6-3.5L10 11v7l6 3.5 6-3.5v-7z" fill="#EE4C2C"/>
      <circle cx="20" cy="9" r="1.5" fill="#EE4C2C"/>
    </svg>
  ),
  'NVIDIA CUDA': (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <path d="M13.2 7.6v1.7c-4.3.5-7 4-7 7.7 0 4.3 3.5 7.7 7.7 7.7 3 0 5.5-1.7 6.8-4.1h-3.2c-.9 1-2.1 1.5-3.6 1.5-2.6 0-4.7-2-4.7-5.1 0-2.8 1.8-5 4.7-5.1v5l6.5-5.5-6.5-5.5v1.7h-.7z" fill="#76B900"/>
      <path d="M19.5 10.5c2.2 1.3 3.5 3.6 3.5 6.5 0 2.5-1.2 4.9-3.2 6.3l1.5 1.3c2.5-1.8 4-4.7 4-7.7 0-3.5-1.8-6.5-4.5-8.2l-1.3 1.8z" fill="#76B900"/>
    </svg>
  ),
  vLLM: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#6366F1" fillOpacity=".15"/>
      <path d="M10 10l4 12h1l3-8 3 8h1l4-12" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  LangChain: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="12" fill="#1C3C3C" fillOpacity=".15"/>
      <path d="M11 20V12h2l3 5 3-5h2v8h-2v-5l-3 4-3-4v5h-2z" fill="#1C3C3C"/>
      <circle cx="22" cy="10" r="2" fill="#10B981"/>
    </svg>
  ),
  'Hugging Face': (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#FFD21E" fillOpacity=".2"/>
      <circle cx="12" cy="14" r="2" fill="#FF9D00"/>
      <circle cx="20" cy="14" r="2" fill="#FF9D00"/>
      <path d="M11 19c0 0 2 3 5 3s5-3 5-3" stroke="#FF9D00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 12c0-1 .5-2 1.5-2.5M23 12c0-1-.5-2-1.5-2.5" stroke="#FF9D00" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  MLflow: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#0194E2" fillOpacity=".15"/>
      <path d="M10 22l6-14 6 14" stroke="#0194E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17h7" stroke="#0194E2" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="9" r="2" fill="#0194E2"/>
    </svg>
  ),
  Ray: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#028CF0" fillOpacity=".15"/>
      <circle cx="16" cy="16" r="3" fill="#028CF0"/>
      <path d="M16 8v5M16 19v5M8 16h5M19 16h5M10.3 10.3l3.6 3.6M18.1 18.1l3.6 3.6M21.7 10.3l-3.6 3.6M13.9 18.1l-3.6 3.6" stroke="#028CF0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Prometheus: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#E6522C" fillOpacity=".15"/>
      <path d="M16 4a12 12 0 100 24 12 12 0 000-24zm0 22.4a3.8 3.8 0 01-3.2-1.8h6.4A3.8 3.8 0 0116 26.4zm5.3-3H10.7v-2h10.6v2zM21.2 20H10.8c-1.1-1.2-1.8-2.5-1.8-4.3 0-1 .7-2 .7-2l1.6-2.6c0-1 .1-2.1.1-2.1h1.7s.1 1.3.2 1.8l2.4-3.7h.6l2.4 3.7c.1-.5.2-1.8.2-1.8h1.7s.1 1.1.1 2.1L22.3 14s.7 1 .7 2c0 1.8-.7 3.1-1.8 4z" fill="#E6522C"/>
    </svg>
  ),
  Grafana: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#F46800" fillOpacity=".15"/>
      <path d="M23.5 14.2c-.1-.6-.3-1-.6-1.4-.2-.2-.4-.4-.6-.5 0-.5-.1-1-.4-1.5-.4-.7-1-1.2-1.7-1.3-.4-.1-.7 0-1 .1-.4-.3-.9-.5-1.4-.5-.2 0-.4 0-.6.1-.3-.3-.7-.4-1.2-.4a2 2 0 00-2 1.7c-.6.1-1.1.5-1.5 1-.5.7-.6 1.5-.4 2.3-.5.4-.8 1-.9 1.7-.2 1.1.3 2.2 1.2 2.8-.1.5 0 1 .2 1.5.4.8 1.2 1.3 2 1.3h.3c.2.5.5.8 1 1.1.5.3 1 .4 1.6.3.3.4.8.7 1.3.8.2 0 .3.1.5.1.6 0 1.2-.3 1.6-.8.5.1 1 0 1.5-.3.6-.4 1-1 1.1-1.7.6-.1 1.1-.4 1.4-.9.6-.8.6-1.8.1-2.7.3-.5.5-1.1.5-1.7a3 3 0 00-1-2.1z" fill="#F46800"/>
    </svg>
  ),
  OpenTelemetry: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#425CC7" fillOpacity=".15"/>
      <circle cx="12" cy="20" r="2.5" fill="#425CC7"/>
      <circle cx="22" cy="10" r="2" fill="#F5A800"/>
      <path d="M14 18.5l6-7" stroke="#425CC7" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 16l4-2M18 20l-2 4" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Terraform: (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <path d="M12.1 5.3v7.5l6.5 3.8V9l-6.5-3.7z" fill="#7B42BC"/>
      <path d="M19.5 9v7.6l6.5-3.8V5.3L19.5 9z" fill="#7B42BC" fillOpacity=".6"/>
      <path d="M5 8.8v7.5l6.5 3.8V12.5L5 8.8z" fill="#7B42BC" fillOpacity=".6"/>
      <path d="M12.1 20.8v7.5l6.5-3.7v-7.5l-6.5 3.7z" fill="#7B42BC"/>
    </svg>
  ),
}

const technologies = [
  { name: 'Kubernetes', category: 'Orchestration' },
  { name: 'PyTorch', category: 'ML Framework' },
  { name: 'NVIDIA CUDA', category: 'GPU Compute' },
  { name: 'vLLM', category: 'Model Serving' },
  { name: 'LangChain', category: 'LLM Framework' },
  { name: 'Hugging Face', category: 'ML Models' },
  { name: 'MLflow', category: 'MLOps' },
  { name: 'Ray', category: 'Distributed ML' },
  { name: 'Prometheus', category: 'Monitoring' },
  { name: 'Grafana', category: 'Observability' },
  { name: 'OpenTelemetry', category: 'Telemetry' },
  { name: 'Terraform', category: 'IaC' },
]

export function TechStackSection() {
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
    <section ref={sectionRef} className="py-24 bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Technologies We <span className="gradient-text">Work With</span>
          </h2>
          <p className={cn(
            'mt-3 text-lg text-text-secondary max-w-2xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Battle-tested tools for production AI infrastructure
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={cn(
                'group flex flex-col items-center gap-3 p-5 bg-surface border border-border rounded-xl hover:border-primary/40 hover:bg-surface-elevated transition-all duration-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {techLogos[tech.name]}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-text-primary">{tech.name}</div>
                <div className="text-[11px] text-text-muted mt-0.5">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}