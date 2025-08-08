import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { TechStackSection } from '@/components/sections/TechStackSection'

// Lazy load below-the-fold components
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-surface rounded-xl"></div></div></div>
})

const ProductsTeaser = dynamic(() => import('@/components/sections/ProductsTeaser').then(mod => ({ default: mod.ProductsTeaser })), {
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-background rounded-xl"></div></div></div>
})

const ProjectsTeaser = dynamic(() => import('@/components/sections/ProjectsTeaser').then(mod => ({ default: mod.ProjectsTeaser })), {
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-surface rounded-xl"></div></div></div>
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-background rounded-xl"></div></div></div>
})

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-32 bg-surface rounded-xl"></div></div></div>
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProductsTeaser />
      <ProjectsTeaser />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}