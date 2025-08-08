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
  Users
} from 'lucide-react';

export function ProductsTeaser() {
  const features = [
    { icon: GitBranch, title: 'Automated CI/CD', description: 'Production-ready pipelines in minutes' },
    { icon: Cloud, title: 'Infrastructure as Code', description: 'Declarative infrastructure management' },
    { icon: Activity, title: 'Intelligent Monitoring', description: 'AI-powered observability and alerts' }
  ];

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                Introducing <span className="text-primary">ResilioPlatform</span>
              </h2>
              
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                The future of DevOps automation is here. Our comprehensive platform eliminates 
                infrastructure complexity and accelerates development workflows with intelligent automation.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Deploy from development to production in minutes, not hours</span>
                </div>
                <div className="flex items-center gap-3 text-text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Achieve 99.9% uptime with self-healing infrastructure</span>
                </div>
                <div className="flex items-center gap-3 text-text-primary">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Reduce cloud costs by up to 40% with intelligent optimization</span>
                </div>
              </div>

              {/* Launch Info */}
              <div className="flex items-center gap-4 p-4 bg-surface-elevated border border-border rounded-lg mb-8">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-text-primary font-medium">Launching December 2024</p>
                  <p className="text-sm text-text-muted">Join 1,200+ developers on the waitlist</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary font-medium rounded-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-text-muted">
              <Users className="w-4 h-4" />
              <span className="text-sm">Trusted by developers at</span>
              <div className="flex items-center gap-2 ml-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded opacity-60"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-secondary to-accent rounded opacity-60"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded opacity-60"></div>
                <span className="text-sm">50+ companies</span>
              </div>
            </motion.div>
          </div>

          {/* Features Preview */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="p-8 bg-surface-elevated border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-text-primary">Platform Features</h3>
              </div>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-background/50 border border-border/50 rounded-lg hover:border-primary/30 transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">{feature.title}</h4>
                      <p className="text-sm text-text-secondary">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
                >
                  Explore All Features
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}