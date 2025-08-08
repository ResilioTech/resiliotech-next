import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProductsTeaser } from '@/components/sections/ProductsTeaser'
import { ProjectsTeaser } from '@/components/sections/ProjectsTeaser'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { ToolsSection } from '@/components/sections/ToolsSection'
import { CTASection } from '@/components/sections/CTASection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProductsTeaser />
      <ProjectsTeaser />
      <NewsletterSection />
      <ToolsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}