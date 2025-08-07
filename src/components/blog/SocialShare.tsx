'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Facebook, Mail, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialShareProps {
  url: string
  title: string
  description?: string
  hashtags?: string[]
  className?: string
}

export function SocialShare({ url, title, description, hashtags, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    url,
    title,
    description: description || title,
    hashtags: hashtags?.join(',') || 'DevOps,CloudInfrastructure,Automation'
  }

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}&hashtags=${shareData.hashtags}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/10',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/10',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:text-green-600',
      bgColor: 'hover:bg-green-600/10',
      href: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`${shareData.description}\n\nRead more: ${shareData.url}`)}`,
    },
  ]

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share this article
      </h3>

      {/* Native Share Button (Mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="md:hidden w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-lg font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share Article
        </button>
      )}

      {/* Desktop Share Buttons */}
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg border border-border transition-all duration-200',
              'text-text-secondary bg-surface hover:scale-105',
              platform.color,
              platform.bgColor
            )}
            onClick={() => {
              // Track social share event
              if (typeof window !== 'undefined' && 'gtag' in window) {
                ;(window as any).gtag('event', 'share', {
                  method: platform.name.toLowerCase(),
                  content_type: 'article',
                  item_id: shareData.url,
                })
              }
            }}
          >
            <platform.icon className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">{platform.name}</span>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border border-border transition-all duration-200',
            'text-text-secondary bg-surface hover:scale-105 hover:text-primary hover:bg-primary/10',
            copied && 'text-green-600 bg-green-600/10 border-green-600/30'
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Share Stats */}
      <div className="flex items-center gap-4 text-sm text-text-muted pt-2">
        <div className="flex items-center gap-1">
          <Share2 className="w-3 h-3" />
          <span>Help others discover this content</span>
        </div>
      </div>

      {/* Hashtags */}
      {hashtags && hashtags.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-text-muted mb-2">Share with hashtags:</p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="px-2 py-1 bg-surface-elevated text-text-muted text-xs rounded-full cursor-pointer hover:bg-primary hover:text-background transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(`#${hashtag}`)
                }}
              >
                #{hashtag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Floating Share Button
export function FloatingShareButton({ url, title, description }: SocialShareProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
            'glassmorphism text-text-primary hover:text-primary hover:scale-110',
            isExpanded && 'bg-primary text-background'
          )}
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Expanded Share Options */}
        {isExpanded && (
          <div className="flex flex-col gap-2 animate-scale-in">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-text-muted hover:text-blue-400 hover:scale-110 transition-all duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-text-muted hover:text-blue-600 hover:scale-110 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-text-muted hover:text-primary hover:scale-110 transition-all duration-200"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}