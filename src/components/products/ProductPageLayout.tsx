'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  Star,
  Shield,
  Zap,
  GitBranch,
  Activity,
  DollarSign,
  Key,
  TrendingUp,
  Cloud,
  BarChart
} from 'lucide-react';
import { ProductInfo } from '@/types/products';

const iconMap = {
  CheckCircle,
  Shield,
  Zap,
  GitBranch,
  Activity,
  DollarSign,
  Key,
  TrendingUp,
  Cloud,
  BarChart
} as const;

interface ProductPageLayoutProps {
  product: ProductInfo;
}

const statusConfig = {
  beta: {
    label: 'Beta',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: '🚀'
  },
  development: {
    label: 'In Development',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    icon: '🛠️'
  },
  planning: {
    label: 'Coming Soon',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: '✨'
  },
  launched: {
    label: 'Available Now',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: '✅'
  },
  waitlist: {
    label: 'Join Waitlist',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: '📋'
  }
};

export function ProductPageLayout({ product }: ProductPageLayoutProps) {
  const status = statusConfig[product.status as keyof typeof statusConfig];
  const isAvailable = product.status === 'beta' || product.status === 'launched';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${status.color}`}>
                  <span>{status.icon}</span>
                  {status.label}
                </span>
                {product.pricing.isRevealed && (
                  <span className="text-sm text-text-muted">
                    Starting at ${product.pricing.startingPrice}/{product.pricing.pricingModel}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-accent font-medium mb-6">
                  {product.tagline}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                {product.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAvailable ? (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
                  >
                    Join Waitlist
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                <button className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300">
                  View Demo
                </button>
              </div>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-surface-elevated border border-border rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-surface border border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {product.name.split('')[0]}
                      </span>
                    </div>
                    <p className="text-text-muted">Product Demo Coming Soon</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-accent text-background px-4 py-2 rounded-lg text-sm font-semibold">
                  {status.label}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Everything you need to streamline your workflow and scale your operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap] || CheckCircle;
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 bg-surface-elevated border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Built For
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                {product.name} is designed specifically for teams who value efficiency, security, and scalability.
              </p>
              
              <div className="space-y-4">
                {product.targetAudience.map((audience, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-text-primary font-medium">{audience}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-surface-elevated border border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Why Choose {product.name}?
              </h3>
              <div className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {product.pricing.isRevealed && (
        <section className="py-20 bg-surface/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-surface-elevated border border-border rounded-2xl p-12"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Simple, Transparent Pricing
              </h2>
              <div className="text-5xl font-bold text-primary mb-4">
                ${product.pricing.startingPrice}
                <span className="text-lg text-text-muted font-normal">
                  /{product.pricing.pricingModel}
                </span>
              </div>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Start with our {product.status === 'beta' ? 'beta' : 'standard'} plan. 
                No setup fees, no hidden costs. Cancel anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300"
                >
                  {isAvailable ? 'Start Free Trial' : 'Join Waitlist'}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-surface hover:bg-surface-elevated border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
                >
                  Contact Sales
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {isAvailable 
                ? `Join thousands of teams already using ${product.name} to streamline their operations.`
                : `Be among the first to experience ${product.name} when it launches.`
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-all duration-300 group"
              >
                {isAvailable ? 'Start Your Trial' : 'Join Waitlist'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 rounded-lg transition-all duration-300"
              >
                View All Products
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}