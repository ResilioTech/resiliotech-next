'use client'

import { useState } from 'react'
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NewsletterSignup as NewsletterSignupType } from '@/types/blog'

interface NewsletterSignupProps {
  title?: string
  description?: string
  source?: string
  compact?: boolean
  className?: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSignup({
  title = "Stay in the Loop",
  description = "Get the latest DevOps insights, tutorials, and industry trends delivered to your inbox weekly.",
  source = "newsletter",
  compact = false,
  className
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setErrorMessage('Email address is required')
      setState('error')
      return
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setState('error')
      return
    }

    setState('loading')
    setErrorMessage('')

    try {
      const payload: NewsletterSignupType = {
        email: email.trim(),
        name: name.trim() || undefined,
        source,
        preferences: {
          categories: ['devops', 'tutorials'], // Default preferences
          frequency: 'weekly'
        }
      }

      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'blog-newsletter');
      formData.append('email', email.trim());
      formData.append('firstName', name.trim());
      formData.append('source', source);
      formData.append('interests', 'devops, tutorials');
      formData.append('gdprConsent', 'true');

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setState('success')
      setEmail('')
      setName('')
      
      // Track signup event
      if (typeof window !== 'undefined' && 'gtag' in window) {
        ;(window as any).gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: source,
          custom_parameters: {
            method: 'netlify_forms'
          }
        })
      }

      // Store successful signup in localStorage to prevent modal reappearance
      if (typeof window !== 'undefined') {
        localStorage.setItem('resiliotech_newsletter_subscribed', 'true');
      }

    } catch (error) {
      console.error('Newsletter signup error:', error)
      setErrorMessage('Something went wrong. Please try again.')
      setState('error')
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  if (state === 'success') {
    return (
      <div className={cn(
        'bg-surface border border-border rounded-xl p-6 text-center',
        compact && 'p-4',
        className
      )}>
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          You're all set! 🎉
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          Thank you for subscribing! Check your email for a confirmation link to complete your subscription.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      'bg-surface border border-border rounded-xl p-6',
      compact && 'p-4',
      className
    )}>

      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h3 className={cn(
          'font-semibold text-text-primary mb-2',
          compact ? 'text-lg' : 'text-xl'
        )}>
          {title}
        </h3>
        <p className={cn(
          'text-text-secondary leading-relaxed',
          compact ? 'text-sm' : 'text-base'
        )}>
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!compact && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              disabled={state === 'loading'}
            />
          </div>
        )}

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') {
                setState('idle')
                setErrorMessage('')
              }
            }}
            placeholder="Enter your email address"
            className={cn(
              'w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary/20 outline-none transition-colors',
              state === 'error' 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-border focus:border-primary'
            )}
            disabled={state === 'loading'}
            required
          />
          
          {state === 'error' && errorMessage && (
            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={state === 'loading' || !email.trim()}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300',
            'bg-primary hover:bg-primary-hover text-background disabled:opacity-50 disabled:cursor-not-allowed',
            state === 'loading' && 'cursor-wait',
            compact ? 'py-2.5' : 'py-3'
          )}
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              {compact ? 'Subscribe' : 'Subscribe to Newsletter'}
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-text-muted leading-relaxed">
          We respect your privacy. Unsubscribe at any time. 
          <br />
          No spam, just valuable DevOps insights.
        </p>
      </div>

      {/* Features */}
      {!compact && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">📚</div>
              <div className="text-xs text-text-muted">Weekly Tutorials</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🔧</div>
              <div className="text-xs text-text-muted">Tool Reviews</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📈</div>
              <div className="text-xs text-text-muted">Industry Insights</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}