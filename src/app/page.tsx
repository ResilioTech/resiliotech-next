import dynamic from 'next/dynamic'
import { StructuredData } from '@/components/seo/StructuredData'

// Above-the-fold: SSR with priority loading
const HeroSection = dynamic(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-background via-surface to-surface-elevated"></div>
})

// Below-the-fold: Lazy load to reduce initial JS bundle
const TechStackSection = dynamic(() => import('@/components/sections/TechStackSection').then(mod => ({ default: mod.TechStackSection })), {
  ssr: false,
  loading: () => <div className="py-16 bg-surface-elevated animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-48 bg-surface rounded-xl"></div></div></div>
})

const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-surface rounded-xl"></div></div></div>
})

const ProductsTeaser = dynamic(() => import('@/components/sections/ProductsTeaser').then(mod => ({ default: mod.ProductsTeaser })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-background rounded-xl"></div></div></div>
})

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-32 bg-surface rounded-xl"></div></div></div>
})

export default function HomePage() {
  const organizationData = {
    name: "Resiliotech",
    description: "Enterprise-grade DevOps infrastructure without enterprise overhead. We help fast-moving startups scale their technology through automated CI/CD, infrastructure-as-code, and observability solutions.",
    url: "https://resiliotech.com",
    logo: "https://resiliotech.com/favicon-32x32.png",
    contactPoint: {
      telephone: "+1-555-0123",
      contactType: "customer service",
      email: "hello@resiliotech.com"
    },
    sameAs: [
      "https://www.linkedin.com/company/resilio-tech",
      "https://x.com/resiliotech",
      "https://github.com/resiliotech",
      "https://www.youtube.com/@ResilioTech"
    ],
    foundingDate: "2023",
    areaServed: "Global"
  };

  const servicesData = [
    {
      name: "DevOps Automation",
      description: "End-to-end CI/CD pipelines, automated testing, and deployment strategies",
      provider: "Resiliotech",
      serviceType: "DevOps Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/devops-automation"
    },
    {
      name: "Cloud Infrastructure",
      description: "Scalable, secure, and cost-optimized cloud architecture using Infrastructure-as-Code",
      provider: "Resiliotech",
      serviceType: "Cloud Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/cloud-infrastructure"
    },
    {
      name: "MLOps & Data Pipeline",
      description: "Machine learning operations and automated data workflows for AI-powered applications",
      provider: "Resiliotech",
      serviceType: "MLOps Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/mlops"
    },
    {
      name: "Observability & Monitoring",
      description: "Comprehensive monitoring, logging, and alerting solutions for proactive issue detection",
      provider: "Resiliotech",
      serviceType: "Monitoring Solutions",
      areaServed: "Global",
      url: "https://resiliotech.com/services/observability"
    },
    {
      name: "Security & Compliance",
      description: "DevSecOps integration with automated security scanning and compliance monitoring",
      provider: "Resiliotech",
      serviceType: "Security Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/security"
    }
  ];

  const websiteData = {
    url: "https://resiliotech.com",
    name: "Resiliotech - DevOps Automation for Fast-Moving Startups",
    description: "Enterprise-grade DevOps infrastructure without enterprise overhead. We help startups scale their technology through automated solutions.",
    publisher: "Resiliotech",
    inLanguage: "en-US"
  };

  return (
    <>
      <StructuredData
        organization={organizationData}
        services={servicesData}
        website={websiteData}
      />
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProductsTeaser />
      <CTASection />
    </>
  )
}