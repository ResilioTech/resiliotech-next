'use client';

import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  MapPin, 
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';

export function ContactHero() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'hello@resiliotech.com',
      action: 'mailto:hello@resiliotech.com'
    },
    {
      icon: Phone,
      title: 'Schedule a Call',
      description: 'Book a free consultation',
      value: '30-minute consultation',
      action: '#contact-form'
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We typically respond within',
      value: '24 hours',
      action: null
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
    <section className="relative py-24 bg-gradient-to-br from-background via-surface to-surface-elevated overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="contact-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#contact-grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Let's Build Something <span className="text-primary">Amazing</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Ready to transform your infrastructure? Have questions about our services? 
              We're here to help you succeed.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`text-center p-8 bg-surface-elevated/50 backdrop-blur-sm border border-border/50 rounded-xl transition-all duration-300 ${
                  method.action ? 'hover:border-primary/30 cursor-pointer' : ''
                }`}
                onClick={() => {
                  if (method.action && method.action.startsWith('#')) {
                    document.querySelector(method.action)?.scrollIntoView({ behavior: 'smooth' });
                  } else if (method.action) {
                    window.location.href = method.action;
                  }
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-xl mb-6">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {method.title}
                </h3>
                
                <p className="text-text-secondary mb-3">
                  {method.description}
                </p>
                
                <p className="text-primary font-semibold">
                  {method.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Info */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-4 p-6 bg-surface-elevated border border-border rounded-xl">
              <MapPin className="w-6 h-6 text-secondary" />
              <div className="text-left">
                <p className="font-semibold text-text-primary">Remote First, Global Team</p>
                <p className="text-sm text-text-muted">Working across PST, EST, and GMT timezones</p>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Trusted by 85+ companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">4.9/5 client satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">24/7 support available</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}