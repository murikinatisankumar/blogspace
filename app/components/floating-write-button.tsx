'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PenTool } from 'lucide-react'
import Link from 'next/link'

interface FloatingWriteButtonProps {
  isLoggedIn: boolean
  onAuthClick: () => void
}

export function FloatingWriteButton({ isLoggedIn, onAuthClick }: FloatingWriteButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isLoggedIn ? (
        <Link href="/write">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <PenTool className="w-6 h-6" />
            <span className="sr-only">Write a post</span>
          </Button>
        </Link>
      ) : (
        <Button
          size="lg"
          onClick={onAuthClick}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <PenTool className="w-6 h-6" />
          <span className="sr-only">Write a post</span>
        </Button>
      )}
    </div>
  )
}
