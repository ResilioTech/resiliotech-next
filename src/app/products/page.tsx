import type { Metadata } from 'next';
import { ComingSoonHero } from '@/components/products/ComingSoonHero';
import { FeaturePreview } from '@/components/products/FeaturePreview';
import { ProductTimeline } from '@/components/products/ProductTimeline';
import { NotifyMeForm } from '@/components/products/NotifyMeForm';
import { productData, productTimeline } from '@/data/product-features';

export const metadata: Metadata = {
  title: 'Products - Coming Soon',
  description: 'ResilioPlatform: The future of DevOps automation. Get early access to our comprehensive platform that automates your entire DevOps lifecycle.',
  keywords: ['DevOps platform', 'CI/CD automation', 'infrastructure as code', 'coming soon', 'early access'],
  openGraph: {
    title: 'ResilioPlatform - The Future of DevOps Automation',
    description: 'Join thousands waiting for the revolutionary DevOps platform that eliminates complexity and accelerates development.',
    images: ['/og-images/products-coming-soon.png'],
  },
  twitter: {
    title: 'ResilioPlatform - The Future of DevOps Automation',
    description: 'Join thousands waiting for the revolutionary DevOps platform that eliminates complexity and accelerates development.',
  },
};

export default function ProductsPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section with Countdown */}
      <ComingSoonHero 
        productData={productData}
        subscriberCount={1247}
      />

      {/* Feature Preview */}
      <FeaturePreview features={productData.features} />

      {/* Development Timeline */}
      <ProductTimeline timeline={productTimeline} />

      {/* Early Access Form */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Be the First to Experience ResilioPlatform
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Join our exclusive early access program and get special launch benefits
            </p>
          </div>

          <NotifyMeForm 
            features={productData.features.map(f => f.title)}
          />

          {/* Early Access Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: '30% Launch Discount',
                description: 'Save on your first year subscription'
              },
              {
                title: 'Priority Support',
                description: 'Direct access to our engineering team'
              },
              {
                title: 'Beta Feature Access',
                description: 'Try new features before anyone else'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-background border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'When will ResilioPlatform be available?',
                answer: 'We\'re planning to launch in December 2024. Early access subscribers will be notified first and get priority access to the beta.'
              },
              {
                question: 'What makes ResilioPlatform different?',
                answer: 'Unlike other solutions, ResilioPlatform provides end-to-end automation with intelligent monitoring and self-healing capabilities. It\'s designed specifically for fast-moving startups who need enterprise-grade infrastructure without the complexity.'
              },
              {
                question: 'Will there be a free tier?',
                answer: 'Yes! We\'ll offer a generous free tier for small teams and open-source projects. Paid plans will start at $99/developer/month with advanced features and support.'
              },
              {
                question: 'Which cloud providers will be supported?',
                answer: 'We\'ll launch with full support for AWS, Google Cloud, and Azure. Additional providers and on-premises options will be added based on user demand.'
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-surface-elevated border border-border rounded-lg">
                <summary className="p-6 cursor-pointer text-text-primary font-semibold group-open:border-b group-open:border-border">
                  {faq.question}
                </summary>
                <div className="p-6 pt-0 text-text-secondary">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}