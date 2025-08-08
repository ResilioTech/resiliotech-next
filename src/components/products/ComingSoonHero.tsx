'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Sparkles } from 'lucide-react';
import { ProductInfo } from '@/types/products';

interface ComingSoonHeroProps {
  productData: ProductInfo;
  subscriberCount?: number;
}

export function ComingSoonHero({ productData, subscriberCount = 1247 }: ComingSoonHeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!productData.launchDate) return;

    const targetDate = new Date(productData.launchDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [productData.launchDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-surface-elevated">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
            {productData.name}
          </h1>
          
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            {productData.tagline}
          </p>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {productData.description}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        {productData.launchDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-text-secondary">Launching in</span>
            </div>
            
            <div className="flex justify-center gap-6 max-w-md mx-auto">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-16 h-16 bg-surface-elevated border border-border rounded-lg flex items-center justify-center mb-2"
                  >
                    <span className="text-2xl font-bold text-text-primary">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                  <span className="text-sm text-text-muted uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-text-secondary mb-8"
        >
          <Users className="w-5 h-5 text-accent" />
          <span>
            Join <span className="font-semibold text-accent">{subscriberCount.toLocaleString()}</span> others waiting for launch
          </span>
        </motion.div>

        {/* Key Benefits Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {productData.benefits.slice(0, 3).map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-surface-elevated/50 border border-border/50 rounded-lg backdrop-blur-sm"
            >
              <p className="text-text-primary font-medium">{benefit}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}