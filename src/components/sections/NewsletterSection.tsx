'use client';

import { motion } from 'framer-motion';
import { Mail, TrendingUp, Users, BookOpen, Zap } from 'lucide-react';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export function NewsletterSection() {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Weekly DevOps Insights',
      description: 'In-depth tutorials, best practices, and real-world case studies'
    },
    {
      icon: Zap,
      title: 'Tool Reviews & Updates',
      description: 'Latest tools, updates, and recommendations from our experts'
    },
    {
      icon: TrendingUp,
      title: 'Industry Trends',
      description: 'Stay ahead with emerging DevOps trends and technologies'
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join our community of 5,000+ DevOps professionals'
    }
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
    <section className="py-24 bg-gradient-to-br from-surface to-surface-elevated relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="newsletter-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#newsletter-pattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              left: `${20 + i * 18}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          >
            <Mail className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                  <Mail className="w-4 h-4" />
                  Newsletter
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  Stay Ahead in <span className="text-primary">DevOps</span>
                </h2>
                
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Join 5,000+ DevOps professionals who get weekly insights, tutorials, and industry 
                  updates delivered straight to their inbox. No fluff, just actionable content.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-background/50 border border-border/50 rounded-lg hover:bg-background transition-colors"
                  >
                    <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1 text-sm">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-surface-elevated"
                      style={{
                        background: `linear-gradient(${45 + i * 45}deg, #00D4FF, #6366f1, #10b981)`,
                      }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    5,000+ subscribers
                  </p>
                  <p className="text-xs text-text-muted">
                    Join the DevOps community
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Newsletter Signup Form */}
            <motion.div variants={itemVariants}>
              <div className="p-8 bg-background border border-border rounded-2xl shadow-lg">
                <NewsletterSignup
                  variant="default"
                  showInterests={true}
                  showName={true}
                  source="homepage"
                  title="Get Weekly DevOps Insights"
                  description="Subscribe to receive curated content, tutorials, and industry updates."
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Testimonial */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="max-w-3xl mx-auto p-8 bg-surface-elevated border border-border rounded-xl">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-text-primary italic mb-4">
                "The Resiliotech newsletter has become my go-to source for staying current with DevOps best practices. 
                The content is always practical and immediately applicable to real-world scenarios."
              </blockquote>
              <div className="text-text-secondary">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm">Senior DevOps Engineer at TechCorp</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}