'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Rocket, 
  Sparkles, 
  Clock,
  GitBranch,
  Cloud,
  Activity,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Package
} from 'lucide-react';
import { microSaasProducts } from '@/data/product-features';

export function ProductsTeaser() {
  const iconMap = {
    GitBranch,
    Cloud,
    Activity,
    Shield,
    Zap,
    TrendingUp,
    Package
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'beta': 'bg-blue-100 text-blue-700 border-blue-200',
      'development': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'planning': 'bg-gray-100 text-gray-700 border-gray-200',
      'launched': 'bg-green-100 text-green-700 border-green-200'
    };
    
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.planning;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="products-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#products-grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Package className="w-4 h-4" />
              Micro SaaS Products
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Purpose-Built <span className="text-primary">DevOps Tools</span>
            </h2>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-3xl mx-auto">
              Instead of one monolithic platform, we're building focused micro SaaS products that solve specific DevOps challenges. 
              Each tool excels at one thing and integrates seamlessly with your existing workflow.
            </p>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {microSaasProducts.map((product, index) => {
            const topFeature = product.features[0];
            const IconComponent = iconMap[topFeature.icon as keyof typeof iconMap] || Package;
            
            return (
              <motion.div
                key={product.name}
                variants={itemVariants}
                className="group p-8 bg-surface-elevated border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(product.status || 'planning')}`}>
                    {product.status || 'Planning'}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-accent font-medium mb-4">
                    {product.tagline}
                  </p>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-text-primary">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer - Always at bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    {product.pricing.isRevealed ? (
                      <span className="font-semibold text-text-primary">
                        ${product.pricing.startingPrice}/{product.pricing.pricingModel?.split('/')[1]}
                      </span>
                    ) : (
                      <span className="text-text-muted">Pricing TBA</span>
                    )}
                  </div>
                  <div className="text-xs text-text-muted">
                    {product.launchDate && new Date(product.launchDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Streamline Your DevOps?
            </h3>
            <p className="text-text-secondary mb-8">
              Join thousands of developers already using our focused tools to ship faster and more reliably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
              >
                Explore All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary font-medium rounded-lg transition-all duration-300"
              >
                Get Custom Solutions
              </Link>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-text-muted mt-8">
            <Users className="w-4 h-4" />
            <span className="text-sm">Trusted by 50+ development teams</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}