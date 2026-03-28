import dynamic from 'next/dynamic'
import { StructuredData } from '@/components/seo/StructuredData'

// Above-the-fold: SSR with priority loading
const HeroSection = dynamic(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-background via-surface to-surface-elevated"></div>
})

// Below-the-fold: Lazy load to reduce initial JS bundle
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-surface rounded-xl"></div></div></div>
})

const WhyResilioSection = dynamic(() => import('@/components/sections/WhyResilioSection').then(mod => ({ default: mod.WhyResilioSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-48 bg-surface-elevated rounded-xl"></div></div></div>
})

const HowWeWorkSection = dynamic(() => import('@/components/sections/HowWeWorkSection').then(mod => ({ default: mod.HowWeWorkSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-48 bg-surface rounded-xl"></div></div></div>
})

const TechStackSection = dynamic(() => import('@/components/sections/TechStackSection').then(mod => ({ default: mod.TechStackSection })), {
  ssr: false,
  loading: () => <div className="py-16 bg-surface-elevated" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-48 bg-surface rounded-xl"></div></div></div>
})

const LearnWithUsSection = dynamic(() => import('@/components/sections/LearnWithUsSection').then(mod => ({ default: mod.LearnWithUsSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-48 bg-surface rounded-xl"></div></div></div>
})

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface" style={{ contain: 'content' }}><div className="max-w-7xl mx-auto px-6"><div className="h-32 bg-background rounded-xl"></div></div></div>
})

export default function HomePage() {
  const organizationData = {
    name: "Resilio Tech",
    description: "We help companies deploy, scale, and operate AI systems reliably. From model serving to monitoring — production-grade AI infrastructure by engineers who've run systems at enterprise scale.",
    url: "https://resiliotech.com",
    logo: "https://resiliotech.com/favicon-32x32.png",
    contactPoint: {
      telephone: "",
      contactType: "customer service",
      email: "contact@resiliotech.com"
    },
    sameAs: [
      "https://www.linkedin.com/company/resiliotech",
      "https://x.com/resiliotech",
      "https://github.com/resiliotech",
      "https://www.youtube.com/@ResilioTech"
    ],
    foundingDate: "2024",
    areaServed: "Global"
  };

  const servicesData = [
    {
      name: "AI/ML Deployment & Infrastructure",
      description: "Model serving infrastructure with GPU optimization, CI/CD pipelines for ML models, and Kubernetes-based ML workload orchestration",
      provider: "Resilio Tech",
      serviceType: "AI Infrastructure Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services#deployment"
    },
    {
      name: "MLOps & AI Reliability",
      description: "ML model monitoring, data drift detection, automated retraining pipelines, and SLA-driven AI system reliability",
      provider: "Resilio Tech",
      serviceType: "MLOps Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services#mlops"
    },
    {
      name: "Custom AI Agents & Tooling",
      description: "AI-powered SRE agents, RAG-based knowledge systems, custom LLM integrations, and AI cost optimization tooling",
      provider: "Resilio Tech",
      serviceType: "AI Development",
      areaServed: "Global",
      url: "https://resiliotech.com/services#agents"
    }
  ];

  const websiteData = {
    url: "https://resiliotech.com",
    name: "Resilio Tech — AI Infrastructure That Doesn't Break in Production",
    description: "We deploy ML models to production and make sure they stay up. Production-grade AI infrastructure & reliability.",
    publisher: "Resilio Tech",
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
      <ServicesSection />
      <WhyResilioSection />
      <HowWeWorkSection />
      <TechStackSection />
      <LearnWithUsSection />
      <CTASection />
    </>
  )
}