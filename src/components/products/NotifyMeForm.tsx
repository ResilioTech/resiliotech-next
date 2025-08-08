'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { EarlyAccessSignup } from '@/types/products';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  interestedFeatures: z.array(z.string()).optional(),
  referralSource: z.string().optional(),
  marketingConsent: z.boolean().refine(val => val === true, {
    message: 'Please agree to receive updates about the product launch'
  })
});

type SignupFormData = z.infer<typeof signupSchema>;

interface NotifyMeFormProps {
  onSignup?: (data: EarlyAccessSignup) => void;
  features?: string[];
}

export function NotifyMeForm({ onSignup, features = [] }: NotifyMeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onSignup callback if provided
      onSignup?.(data as EarlyAccessSignup);
      
      // In a real app, this would send data to your backend/email service
      console.log('Early access signup:', data);
      
      // Example: Send to your email service
      // await fetch('/api/early-access', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="p-8 bg-surface-elevated border border-border rounded-xl">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            You&apos;re on the list!
          </h3>
          <p className="text-text-secondary mb-4">
            We&apos;ll notify you as soon as ResilioPlatform is ready for early access.
          </p>
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm text-accent font-medium">
              🎉 Early Access Perks Coming Your Way:
            </p>
            <ul className="text-sm text-text-secondary mt-2 space-y-1">
              <li>• 30% discount on first year</li>
              <li>• Priority support access</li>
              <li>• Exclusive beta features</li>
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto"
    >
      <div className="p-8 bg-surface-elevated border border-border rounded-xl">
        <div className="text-center mb-6">
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Get Early Access
          </h3>
          <p className="text-text-secondary">
            Be among the first to experience the future of DevOps automation
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Feature Interest (if features provided) */}
          {features.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Which features interest you most? (Optional)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {features.slice(0, 4).map((feature, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      {...register('interestedFeatures')}
                      type="checkbox"
                      value={feature}
                      className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Referral Source */}
          <div>
            <select
              {...register('referralSource')}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option value="">How did you hear about us? (Optional)</option>
              <option value="search">Search Engine</option>
              <option value="social">Social Media</option>
              <option value="referral">Friend/Colleague</option>
              <option value="blog">Blog/Article</option>
              <option value="event">Conference/Event</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marketing Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register('marketingConsent')}
                type="checkbox"
                className="w-4 h-4 mt-0.5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-secondary leading-relaxed">
                I agree to receive updates about ResilioPlatform launch, features, and exclusive early access offers. You can unsubscribe anytime.
              </span>
            </label>
            {errors.marketingConsent && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.marketingConsent.message}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing Up...
              </>
            ) : (
              <>
                Get Early Access
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-text-muted text-center leading-relaxed">
            By signing up, you agree to our privacy practices. We respect your inbox and will never spam you.
          </p>
        </form>
      </div>
    </motion.div>
  );
}