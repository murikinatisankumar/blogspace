'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Palette, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Apply data-theme attribute for minimal theme
    if (theme === 'minimal') {
      document.documentElement.setAttribute('data-theme', 'minimal')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'minimal':
        return <Palette className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('minimal')}>
          <Palette className="mr-2 h-4 w-4" />
          Minimal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
