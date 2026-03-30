'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { faqData } from '@/data/faq'

function FAQItem({ question, answer, isOpen, onToggle, index, isVisible }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={cn(
        'border border-border rounded-xl overflow-hidden transition-all duration-500',
        isOpen ? 'bg-surface-elevated' : 'bg-surface hover:bg-surface-elevated/50',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${(index + 2) * 100}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-text-primary pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-6 pb-6 text-text-secondary leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            'text-3xl font-bold text-text-primary sm:text-4xl transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className={cn(
            'mt-4 text-xl text-text-secondary max-w-2xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            Everything you need to know about working with us
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
