'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setProgress(Math.min(100, Math.max(0, progress)))
      setIsVisible(scrollTop > 100)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <>
      {/* Progress Bar */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 h-1 bg-surface-elevated/50 z-50 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Circular Progress Indicator */}
      <div
        className={cn(
          'fixed bottom-8 right-8 z-40 transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        )}
      >
        <div className="relative w-14 h-14">
          {/* Background Circle */}
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-border"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
              style={{
                strokeDasharray: `${24 * 2 * Math.PI}`,
                strokeDashoffset: `${24 * 2 * Math.PI * (1 - progress / 100)}`,
              }}
            />
          </svg>

          {/* Progress Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-text-primary">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Background */}
          <div className="absolute inset-0 glassmorphism rounded-full -z-10" />
        </div>
      </div>

      {/* Reading Stats Popup */}
      {progress > 0 && (
        <ReadingStats progress={progress} />
      )}
    </>
  )
}

interface ReadingStatsProps {
  progress: number
}

function ReadingStats({ progress }: ReadingStatsProps) {
  const [timeRemaining, setTimeRemaining] = useState('')
  const [wordsRead, setWordsRead] = useState(0)

  useEffect(() => {
    // Get article content for calculations
    const articleContent = document.querySelector('article')?.textContent || ''
    const totalWords = articleContent.split(/\s+/).length
    const averageWordsPerMinute = 200
    
    const currentWordsRead = Math.round((progress / 100) * totalWords)
    const remainingWords = totalWords - currentWordsRead
    const remainingMinutes = Math.ceil(remainingWords / averageWordsPerMinute)

    setWordsRead(currentWordsRead)
    setTimeRemaining(remainingMinutes > 0 ? `${remainingMinutes} min left` : 'Complete!')
  }, [progress])

  if (progress < 10) return null

  return (
    <div
      className={cn(
        'fixed bottom-24 right-8 z-30 transition-all duration-300',
        progress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <div className="glassmorphism rounded-lg p-3 text-sm text-text-primary min-w-[120px]">
        <div className="text-xs text-text-muted mb-1">Reading Progress</div>
        <div className="font-semibold">{Math.round(progress)}% complete</div>
        <div className="text-xs text-text-muted mt-1">{timeRemaining}</div>
      </div>
    </div>
  )
}