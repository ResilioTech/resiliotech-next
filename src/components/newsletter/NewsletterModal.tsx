'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'time' | 'scroll' | 'exit' | 'manual';
}

export function NewsletterModal({ isOpen, onClose, trigger = 'manual' }: NewsletterModalProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Check if user has already subscribed or dismissed recently
    const hasSubscribed = localStorage.getItem('resiliotech_newsletter_subscribed');
    const recentlyDismissed = localStorage.getItem('resiliotech_newsletter_dismissed');
    const dismissedTime = recentlyDismissed ? parseInt(recentlyDismissed) : 0;
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

    if (hasSubscribed || dismissedTime > oneDayAgo) {
      setShouldShow(false);
      return;
    }

    setShouldShow(true);
  }, [isOpen]);

  const handleClose = () => {
    localStorage.setItem('resiliotech_newsletter_dismissed', Date.now().toString());
    setShouldShow(false);
    onClose();
  };

  const handleSubscribed = () => {
    localStorage.setItem('resiliotech_newsletter_subscribed', 'true');
    setShouldShow(false);
    onClose();
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-surface-elevated border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-text-muted hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-8 pb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-text-primary mb-3"
            >
              Stay Ahead in DevOps
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary leading-relaxed"
            >
              Join 5,000+ developers receiving weekly insights, tips, and updates 
              on the latest DevOps practices and tools.
            </motion.p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-8 pb-6"
          >
            <div className="space-y-3">
              {[
                { icon: '🚀', text: 'Weekly DevOps best practices and tutorials' },
                { icon: '🛠️', text: 'Early access to new tools and resources' },
                { icon: '📈', text: 'Exclusive case studies and success stories' },
                { icon: '🎯', text: 'ResilioPlatform updates and beta access' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-lg">{benefit.icon}</span>
                  <span className="text-text-secondary">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="px-8 pb-8"
          >
            <NewsletterSignup
              variant="modal"
              source={`modal_${trigger}`}
              placeholder="Enter your email"
              showInterests={true}
              onSubscribed={handleSubscribed}
            />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="px-8 pb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
              <Sparkles className="w-3 h-3" />
              <span>Join the community of DevOps professionals</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to trigger modal based on user behavior
export function useNewsletterModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Time-based trigger (after 30 seconds)
    const timeBasedTimer = setTimeout(() => {
      setIsModalOpen(true);
    }, 30000);

    // Scroll-based trigger (after scrolling 50% of the page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50) {
        setIsModalOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsModalOpen(true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeBasedTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return {
    isModalOpen,
    setIsModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false)
  };
}