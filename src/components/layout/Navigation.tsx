'use client'

import { useState, useEffect, memo, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  RefreshCw,
  Cloud,
  Bot,
  Activity,
  Shield,
  Lightbulb,
  type LucideIcon
} from 'lucide-react'

interface ServiceItem {
  name: string
  href: string
  description: string
  icon: LucideIcon
  color: string
}

const services: ServiceItem[] = [
  {
    name: 'DevOps Automation',
    href: '/services/devops-automation',
    description: 'End-to-end CI/CD pipelines and infrastructure automation',
    icon: RefreshCw,
    color: 'text-blue-400'
  },
  {
    name: 'Cloud Infrastructure',
    href: '/services/cloud-infrastructure',
    description: 'Scalable, secure cloud architecture design and implementation',
    icon: Cloud,
    color: 'text-cyan-400'
  },
  {
    name: 'MLOps & Data Pipeline',
    href: '/services/mlops',
    description: 'Machine learning operations and automated data workflows',
    icon: Bot,
    color: 'text-purple-400'
  },
  {
    name: 'Observability & Monitoring',
    href: '/services/observability',
    description: 'Comprehensive monitoring, logging, and alerting solutions',
    icon: Activity,
    color: 'text-green-400'
  },
  {
    name: 'Security & Compliance',
    href: '/services/security',
    description: 'DevSecOps integration and compliance automation',
    icon: Shield,
    color: 'text-orange-400'
  },
  {
    name: 'Consulting & Strategy',
    href: '/contact?service=consulting',
    description: 'Expert guidance on DevOps transformation and strategy',
    icon: Lightbulb,
    color: 'text-yellow-400'
  }
]

const navigationItems = [
  { name: 'Home', href: '/', hasDropdown: false },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Products', href: '/products', hasDropdown: false },
  { name: 'Founding Pilot', href: '/founding-pilot', hasDropdown: false },
  { name: 'Roadmap', href: '/roadmap', hasDropdown: false },
  { name: 'Changelog', href: '/changelog', hasDropdown: false },
  { name: 'Blog', href: '/blog', hasDropdown: false },
  { name: 'About', href: '/about', hasDropdown: false }
]

// Constants for repeated class strings
const NAV_LINK_BASE = 'px-3 py-2 text-sm font-medium transition-colors rounded-md'
const NAV_LINK_ACTIVE = 'text-primary bg-surface-elevated'
const NAV_LINK_INACTIVE = 'text-text-secondary hover:text-text-primary hover:bg-surface'
const CTA_CLASSES = 'bg-primary hover:bg-primary-hover text-background rounded-lg font-semibold text-sm transition-all duration-300 glow-effect hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'

// SVG Icons as components to avoid duplication
const ChevronIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={cn('ml-1 h-4 w-4 transition-transform', isOpen && 'rotate-180')}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
))
ChevronIcon.displayName = 'ChevronIcon'

const MenuIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={cn('h-6 w-6 transition-transform', isOpen && 'rotate-90')}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
))
MenuIcon.displayName = 'MenuIcon'

const CloseIcon = memo(() => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
))
CloseIcon.displayName = 'CloseIcon'

// Service menu item component
const ServiceMenuItem = memo(({ service, isMobile = false }: { service: ServiceItem; isMobile?: boolean }) => {
  const IconComponent = service.icon

  if (isMobile) {
    return (
      <Link
        href={service.href}
        className="flex items-center py-2 text-sm text-text-muted hover:text-text-primary transition-colors group"
      >
        <IconComponent className={cn("mr-2 w-4 h-4", service.color)} strokeWidth={2} />
        {service.name}
      </Link>
    )
  }

  return (
    <Link
      href={service.href}
      className="flex items-start p-3 rounded-lg hover:bg-surface-elevated transition-all duration-300 group"
    >
      <div className="relative mr-3 mt-1">
        <div className={cn("absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity", service.color)} />
        <div className={cn(
          "relative w-8 h-8 rounded-lg bg-gradient-to-br from-surface-elevated to-surface border border-border group-hover:border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110",
          service.color
        )}>
          <IconComponent className="w-4 h-4" strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  )
})
ServiceMenuItem.displayName = 'ServiceMenuItem'

export const Navigation = memo(function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const pathname = usePathname()

  // Memoized active link checker
  const isActiveLink = useCallback((href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }, [pathname])

  // Scroll handler with throttling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }, [pathname])

  // Callbacks
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), [])
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])
  const openServicesDropdown = useCallback(() => setIsServicesDropdownOpen(true), [])
  const closeServicesDropdown = useCallback(() => setIsServicesDropdownOpen(false), [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-background font-bold text-sm">R</span>
                </div>
                <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-text-primary">Resiliotech</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-baseline ml-10 space-x-4 lg:space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={openServicesDropdown}
                      onMouseLeave={closeServicesDropdown}
                      className={cn(
                        'flex items-center',
                        NAV_LINK_BASE,
                        isActiveLink(item.href) ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE
                      )}
                      aria-label="Services menu"
                      aria-expanded={isServicesDropdownOpen}
                    >
                      {item.name}
                      <ChevronIcon isOpen={isServicesDropdownOpen} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        NAV_LINK_BASE,
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        isActiveLink(item.href) ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Services Mega Menu */}
                  {item.hasDropdown && (
                    <div
                      onMouseEnter={openServicesDropdown}
                      onMouseLeave={closeServicesDropdown}
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
                            <ServiceMenuItem key={service.href} service={service} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/founding-pilot"
              className={cn('hidden md:block px-4 lg:px-6 py-2', CTA_CLASSES)}
            >
              <span className="md:inline lg:hidden">Join Pilot</span>
              <span className="hidden lg:inline">Join Pilot</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
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
          onClick={closeMobileMenu}
          aria-hidden="true"
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
              onClick={closeMobileMenu}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors',
                    isActiveLink(item.href) ? 'text-primary' : NAV_LINK_INACTIVE
                  )}
                >
                  {item.name}
                </Link>

                {item.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <ServiceMenuItem key={service.href} service={service} isMobile />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-border">
              <Link
                href="/founding-pilot"
                className={cn('block w-full px-6 py-3 text-center', CTA_CLASSES)}
              >
                Join Pilot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
