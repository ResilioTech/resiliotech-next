'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('form-name', 'bastion-waitlist');
      formData.append('email', email);

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
      <input 
        type="email" 
        name="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com" 
        required 
        disabled={isSubmitting}
        className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted disabled:opacity-50"
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-background font-semibold rounded-xl text-sm transition-colors whitespace-nowrap glow-effect disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
}
