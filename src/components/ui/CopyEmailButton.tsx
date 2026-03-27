'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

const EMAIL = 'contact@resiliotech.com'

interface CopyEmailButtonProps {
  className?: string
  showIcon?: boolean
  label?: string
}

export function CopyEmailButton({ className = '', showIcon = true, label }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = EMAIL
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <button
      onClick={handleCopy}
      className={`group inline-flex items-center gap-2 transition-all duration-200 ${className}`}
      title="Copy email to clipboard"
    >
      {label || EMAIL}
      {showIcon && (
        copied
          ? <Check className="w-4 h-4 text-accent flex-shrink-0" />
          : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
      )}
      {copied && <span className="text-xs text-accent font-medium flex-shrink-0">Copied!</span>}
    </button>
  )
}
