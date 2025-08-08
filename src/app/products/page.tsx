import type { Metadata } from 'next';
import { microSaasProducts, featuredProduct } from '@/data/product-features';

export const metadata: Metadata = {
  title: 'DevOps Micro SaaS Products - Resiliotech',
  description: 'Purpose-built DevOps tools that solve specific challenges. From CI/CD automation to intelligent monitoring - focused products that integrate seamlessly.',
  keywords: ['DevOps tools', 'micro SaaS', 'CI/CD automation', 'infrastructure monitoring', 'DevSecOps', 'cloud scaling'],
  openGraph: {
    title: 'DevOps Micro SaaS Products - Resiliotech',
    description: 'Purpose-built DevOps tools for modern development teams. Focused solutions that excel at one thing.',
    images: ['/og-images/products-micro-saas.png'],
  },
  twitter: {
    title: 'DevOps Micro SaaS Products - Resiliotech',
    description: 'Purpose-built DevOps tools for modern development teams. Focused solutions that excel at one thing.',
  },
};

export default function ProductsPage() {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'beta': 'bg-blue-100 text-blue-700 border-blue-200',
      'development': 'bg-yellow-100 text-yellow-700 border-yellow-200', 
      'planning': 'bg-gray-100 text-gray-700 border-gray-200',
      'launched': 'bg-green-100 text-green-700 border-green-200'
    };
    
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.planning;
  };

  const getProductSlug = (productName: string) => {
    const slugMap: { [key: string]: string } = {
      'DeployFlow': 'deployflow',
      'CloudWatch Pro': 'cloudwatch-pro', 
      'SecureOps': 'secureops',
      'InfraScale': 'infrascale'
    };
    
    return slugMap[productName] || productName.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-surface to-surface-elevated relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 60 60">
            <defs>
              <pattern id="products-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
                <circle cx="50" cy="50" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#products-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              📦 Micro SaaS Products
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Purpose-Built <span className="gradient-text">DevOps Tools</span>
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-4xl mx-auto">
              We're building focused micro SaaS products that solve specific DevOps challenges. 
              Each tool excels at one thing and integrates seamlessly with your existing workflow.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{microSaasProducts.length}</div>
                <div className="text-sm text-text-muted">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$29+</div>
                <div className="text-sm text-text-muted">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-text-muted">Beta Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {microSaasProducts.map((product, index) => (
              <div
                key={product.name}
                className="group p-8 bg-surface border border-border rounded-xl hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <span className="text-background font-bold text-sm">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(product.status || 'planning')}`}>
                    {product.status || 'Planning'}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  <a 
                    href={`/products/${getProductSlug(product.name)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {product.name}
                  </a>
                </h2>
                
                <p className="text-accent font-medium mb-4">
                  {product.tagline}
                </p>
                
                <p className="text-text-secondary leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-text-primary">Key Features:</h3>
                  {product.features.map((feature) => (
                    <div key={feature.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-text-primary text-sm">{feature.title}</h4>
                        <p className="text-text-muted text-xs">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-8">
                  <h3 className="font-semibold text-text-primary">Benefits:</h3>
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-text-primary">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Launch */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    {product.pricing.isRevealed ? (
                      <div>
                        <div className="text-lg font-bold text-text-primary">
                          ${product.pricing.startingPrice}
                        </div>
                        <div className="text-xs text-text-muted">
                          {product.pricing.pricingModel}
                        </div>
                      </div>
                    ) : (
                      <div className="text-text-muted">Pricing TBA</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      {product.launchDate && new Date(product.launchDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-text-muted">Launch Date</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <a
                    href={`/products/${getProductSlug(product.name)}`}
                    className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {product.status === 'beta' ? 'Join Beta' : 
                     product.status === 'development' ? 'Get Notified' : 
                     `Learn About ${product.name}`}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Why micro SaaS instead of one platform?',
                answer: 'We believe in focused tools that excel at one specific task. This approach gives you flexibility to choose only what you need and integrate with your existing workflow without vendor lock-in.'
              },
              {
                question: 'Can these products work together?',
                answer: 'Absolutely! While each product is standalone, they\'re designed to integrate seamlessly. For example, DeployFlow can trigger CloudWatch Pro monitoring and SecureOps scanning automatically.'
              },
              {
                question: 'What about pricing and billing?',
                answer: 'Each product has its own pricing model optimized for its use case. You only pay for what you use. We offer bundle discounts when using multiple products together.'
              },
              {
                question: 'Do you offer custom integrations?',
                answer: 'Yes! If you need custom integrations or enterprise features, our consulting team can work with you to build tailored solutions using our product APIs.'
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-background border border-border rounded-lg">
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

      {/* CTA Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Streamline Your DevOps?
          </h2>
          <p className="text-text-secondary mb-8">
            Start with one focused tool and expand as you grow. No vendor lock-in, no complex pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300"
            >
              Get Custom Solutions
            </a>
            <a
              href="mailto:products@resiliotech.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary font-medium rounded-lg transition-all duration-300"
            >
              Contact Product Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}