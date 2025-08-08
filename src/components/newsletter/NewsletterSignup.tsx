'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Sparkles,
  TrendingUp,
  Code,
  Cloud
} from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().optional(),
  interests: z.array(z.string()).optional(),
  source: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'Please agree to receive our newsletter'
  })
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline' | 'modal';
  showInterests?: boolean;
  showName?: boolean;
  source?: string;
  className?: string;
  placeholder?: string;
  title?: string;
  description?: string;
}

const newsletterTopics = [
  { id: 'devops-tips', name: 'DevOps Tips & Best Practices', icon: Code },
  { id: 'cloud-news', name: 'Cloud Infrastructure Updates', icon: Cloud },
  { id: 'product-updates', name: 'ResilioPlatform Updates', icon: Sparkles },
  { id: 'case-studies', name: 'Client Success Stories', icon: TrendingUp }
];

export function NewsletterSignup({
  variant = 'default',
  showInterests = false,
  showName = false,
  source,
  className = '',
  placeholder = 'Enter your email address',
  title,
  description
}: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      source: source || 'website'
    }
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for Netlify Forms submission
      const formData = new FormData();
      formData.append('form-name', 'newsletter');
      formData.append('email', data.email);
      formData.append('firstName', data.firstName || '');
      formData.append('source', data.source || source || 'website');
      formData.append('interests', data.interests ? data.interests.join(', ') : 'devops');
      formData.append('gdprConsent', data.gdprConsent.toString());

      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        
        // Track successful signup
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: data.source || source,
            custom_parameters: {
              method: 'netlify_forms'
            }
          });
        }

        // Store successful signup in localStorage to prevent modal reappearance
        if (typeof window !== 'undefined') {
          localStorage.setItem('resiliotech_newsletter_subscribed', 'true');
        }
      } else {
        throw new Error('Failed to subscribe. Please try again.');
      }

    } catch (err) {
      console.error('Newsletter subscription error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${className} ${variant === 'compact' ? 'text-center' : ''}`}
      >
        <div className={`${
          variant === 'compact' 
            ? 'p-4 bg-accent/10 border border-accent/20 rounded-lg' 
            : 'p-6 bg-surface-elevated border border-border rounded-xl'
        }`}>
          <CheckCircle className={`${
            variant === 'compact' ? 'w-6 h-6' : 'w-8 h-8'
          } text-accent mx-auto mb-3`} />
          <h3 className={`${
            variant === 'compact' ? 'text-lg' : 'text-xl'
          } font-bold text-text-primary mb-2`}>
            Welcome to the Newsletter! 🎉
          </h3>
          <p className={`${
            variant === 'compact' ? 'text-sm' : 'text-base'
          } text-text-secondary mb-4`}>
            You're now subscribed to receive DevOps insights, tips, and updates from Resiliotech.
          </p>
          
          <div className="text-xs text-text-muted">
            <p>• Weekly DevOps tips and best practices</p>
            <p>• Early access to new content and resources</p>
            <p>• Exclusive updates on ResilioPlatform development</p>
          </div>

          {variant !== 'compact' && (
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Subscribe another email
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  const getFormClasses = () => {
    switch (variant) {
      case 'compact':
        return 'space-y-3';
      case 'inline':
        return 'flex flex-col sm:flex-row gap-3';
      case 'modal':
        return 'space-y-4';
      default:
        return 'space-y-4';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className={`font-bold text-text-primary mb-2 ${
              variant === 'compact' ? 'text-lg' : 'text-2xl'
            }`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`text-text-secondary ${
              variant === 'compact' ? 'text-sm' : 'text-base'
            }`}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Hidden form for Netlify detection */}
      <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="bot-field" />
        <input type="email" name="email" />
        <input type="text" name="firstName" />
        <input type="text" name="interests" />
        <input type="text" name="source" />
        <input type="checkbox" name="gdprConsent" />
      </form>

      <form onSubmit={handleSubmit(onSubmit)} className={getFormClasses()}>
        {/* Name Field */}
        {showName && variant !== 'inline' && (
          <div>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First name (optional)"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
          </div>
        )}

        {/* Email Field */}
        <div className={variant === 'inline' ? 'flex-1' : ''}>
          <input
            {...register('email')}
            type="email"
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              variant === 'compact' ? 'text-sm' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            variant === 'inline' 
              ? 'px-6 py-3' 
              : variant === 'compact' 
                ? 'w-full px-4 py-2.5 text-sm' 
                : 'w-full px-6 py-3'
          } bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {variant === 'compact' ? 'Joining...' : 'Subscribing...'}
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              {variant === 'compact' ? 'Join' : 'Subscribe'}
            </>
          )}
        </button>

        {/* Interests Selection */}
        {showInterests && variant !== 'inline' && variant !== 'compact' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              What interests you most? (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {newsletterTopics.map((topic) => (
                <label key={topic.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    {...register('interests')}
                    type="checkbox"
                    value={topic.id}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div className="flex items-center gap-2">
                    <topic.icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {topic.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* GDPR Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('gdprConsent')}
              type="checkbox"
              className="w-4 h-4 mt-0.5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className={`text-text-secondary leading-relaxed ${
              variant === 'compact' ? 'text-xs' : 'text-sm'
            }`}>
              I agree to receive the Resiliotech newsletter with DevOps tips, insights, and product updates. 
              You can unsubscribe anytime.
            </span>
          </label>
          {errors.gdprConsent && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.gdprConsent.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
          >
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          </motion.div>
        )}

        {/* Privacy Notice */}
        {variant !== 'compact' && (
          <p className="text-xs text-text-muted leading-relaxed">
            We respect your privacy. No spam, just valuable DevOps insights delivered weekly.
          </p>
        )}
      </form>
    </motion.div>
  );
}