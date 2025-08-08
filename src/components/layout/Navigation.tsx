'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ServiceItem {
  name: string
  href: string
  description: string
  icon: string
}

const services: ServiceItem[] = [
  {
    name: 'DevOps Automation',
    href: '/services/devops-automation',
    description: 'End-to-end CI/CD pipelines and infrastructure automation',
    icon: '🔄'
  },
  {
    name: 'Cloud Infrastructure', 
    href: '/services/cloud-infrastructure',
    description: 'Scalable, secure cloud architecture design and implementation',
    icon: '☁️'
  },
  {
    name: 'MLOps & Data Pipeline',
    href: '/services/mlops',
    description: 'Machine learning operations and automated data workflows',
    icon: '🤖'
  },
  {
    name: 'Observability & Monitoring',
    href: '/services/observability',
    description: 'Comprehensive monitoring, logging, and alerting solutions',
    icon: '📊'
  },
  {
    name: 'Security & Compliance',
    href: '/services/security',
    description: 'DevSecOps integration and compliance automation',
    icon: '🔒'
  },
  {
    name: 'Consulting & Strategy',
    href: '/contact?service=consulting',
    description: 'Expert guidance on DevOps transformation and strategy',
    icon: '💡'
  }
]

const navigationItems = [
  { name: 'Home', href: '/', hasDropdown: false },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Products', href: '/products', hasDropdown: false },
  { name: 'Projects', href: '/projects', hasDropdown: false },
  { name: 'Blog', href: '/blog', hasDropdown: false },
  { name: 'About', href: '/about', hasDropdown: false }
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }, [pathname])

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glassmorphism shadow-lg'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center space-x-2 group"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <span className="text-background font-bold text-sm">R</span>
                  </div>
                  <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <span className="text-xl font-bold text-text-primary">
                  Resiliotech
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.hasDropdown ? (
                      <button
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        className={cn(
                          'flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md',
                          isActiveLink(item.href)
                            ? 'text-primary bg-surface-elevated'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                        )}
                        aria-label="Services menu"
                        aria-expanded={isServicesDropdownOpen}
                      >
                        {item.name}
                        <svg
                          className={cn(
                            'ml-1 h-4 w-4 transition-transform',
                            isServicesDropdownOpen ? 'rotate-180' : ''
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'px-3 py-2 text-sm font-medium transition-colors rounded-md',
                          isActiveLink(item.href)
                            ? 'text-primary bg-surface-elevated'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* Services Mega Menu */}
                    {item.hasDropdown && (
                      <div
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        className={cn(
                          'absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-96 transition-all duration-200',
                          isServicesDropdownOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-2 pointer-events-none'
                        )}
                      >
                        <div className="glassmorphism rounded-xl p-6 shadow-xl">
                          <div className="grid gap-4">
                            {services.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className="flex items-start p-3 rounded-lg hover:bg-surface-elevated transition-colors group"
                              >
                                <div className="text-2xl mr-3 mt-1">{service.icon}</div>
                                <div>
                                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                                    {service.name}
                                  </h3>
                                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-hover text-background px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 glow-effect hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={cn('h-6 w-6 transition-transform', isMobileMenuOpen ? 'rotate-90' : '')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            'fixed right-0 top-0 h-full w-80 max-w-[80vw] glassmorphism transform transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold text-text-primary">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors',
                    isActiveLink(item.href)
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.name}
                </Link>
                
                {item.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center py-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                      >
                        <span className="mr-2">{service.icon}</span>
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-6 border-t border-border">
              <Link
                href="/contact"
                className="block w-full bg-primary hover:bg-primary-hover text-background px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}