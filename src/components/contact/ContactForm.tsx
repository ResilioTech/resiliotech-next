'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Calendar,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { ContactFormData } from '@/types/company';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  newsletter: z.boolean().optional()
});

type FormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(contactSchema)
  });

  const projectTypes = [
    { value: 'devops-transformation', label: 'DevOps Transformation' },
    { value: 'cloud-migration', label: 'Cloud Migration' },
    { value: 'ci-cd-setup', label: 'CI/CD Pipeline Setup' },
    { value: 'monitoring-observability', label: 'Monitoring & Observability' },
    { value: 'security-compliance', label: 'Security & Compliance' },
    { value: 'platform-engineering', label: 'Platform Engineering' },
    { value: 'consulting-strategy', label: 'Consulting & Strategy' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-25k', label: 'Under $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: 'over-250k', label: 'Over $250,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const timelines = [
    { value: 'asap', label: 'ASAP (Rush project)' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-months-plus', label: '6+ months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create form data for Netlify
      const formData = new FormData();
      
      // Add the form name for Netlify
      formData.append('form-name', 'contact');
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong. Please try again or email us directly at hello@resiliotech.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
        id="contact-form"
      >
        <div className="p-8 bg-surface-elevated border border-border rounded-2xl">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-text-primary mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Thank you for reaching out! We've received your message and will get back to you 
            within 24 hours. Our team is excited to discuss your project.
          </p>
          
          {/* Next Steps */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-accent mb-3">What happens next?</h4>
            <div className="text-left space-y-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>We'll review your requirements and prepare a tailored response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>Our team will reach out within 24 hours to schedule a consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>We'll provide a detailed project proposal and timeline</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
            >
              Send Another Message
            </button>
            <a
              href="/projects"
              className="px-6 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all"
            >
              View Our Work
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
      id="contact-form"
    >
      <div className="bg-surface-elevated border border-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Start Your Project
          </h2>
          <p className="text-text-secondary">
            Tell us about your project and we'll get back to you with a customized solution.
          </p>
        </div>

        {/* Netlify form with hidden input for bot detection */}
        <form 
          name="contact"
          method="POST" 
          data-netlify="true"
          action="/forms/contact"
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          {/* Hidden input for form name */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="your@company.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
              Company Name
            </label>
            <input
              {...register('company')}
              type="text"
              id="company"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="Your company name (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                <Briefcase className="w-4 h-4" />
                Project Type *
              </label>
              <select
                {...register('projectType')}
                id="projectType"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.projectType.message}
                </p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                <DollarSign className="w-4 h-4" />
                Budget Range *
              </label>
              <select
                {...register('budget')}
                id="budget"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select budget</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                <Calendar className="w-4 h-4" />
                Timeline *
              </label>
              <select
                {...register('timeline')}
                id="timeline"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select timeline</option>
                {timelines.map((timeline) => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.timeline.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
              Project Details *
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={6}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical"
              placeholder="Tell us about your project, current challenges, goals, and any specific requirements..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-start gap-3">
            <input
              {...register('newsletter')}
              type="checkbox"
              id="newsletter"
              className="w-4 h-4 mt-0.5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="newsletter" className="text-sm text-text-secondary leading-relaxed">
              I'd like to receive updates about Resiliotech services, industry insights, and the ResilioPlatform launch. 
              You can unsubscribe anytime.
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
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
            className="w-full px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-text-muted text-center leading-relaxed">
            By submitting this form, you agree to our privacy policy. We respect your privacy and 
            will never share your information with third parties.
          </p>
        </form>
      </div>
    </motion.div>
  );
}