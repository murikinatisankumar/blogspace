'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Bell, PenTool, Menu, X, Settings, User, BookOpen, Heart } from 'lucide-react'
import Link from 'next/link'
import { ThemeSelector } from './theme-selector'
import { useUserProfile } from './user-profile-context'

interface NavbarProps {
  isLoggedIn: boolean
  onAuthClick: () => void
  onLogout: () => void
}

export function Navbar({ isLoggedIn, onAuthClick, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [notificationCount] = useState(3)
  const { profile: userProfile } = useUserProfile()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between bg-slate-200 items-center flex-row">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center bg-neutral-600">
              {/* Placeholder for logo */}
            </div>
            <span className="text-xl font-bold">BlogSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors mx-px my-px px-px py-px border-slate-700 border border-none">
              Explore
            </Link>
            <Link href="/trending" className="text-sm font-medium hover:text-primary transition-colors">
              Trending
            </Link>
            <Link href="/topics" className="text-sm font-medium hover:text-primary transition-colors">
              Topics
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <ThemeSelector />

            {isLoggedIn ? (
              <>
                {/* Write Button */}
                <Link href="/write">
                  <Button size="sm" className="hidden sm:flex">
                    <PenTool className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                </Link>

                {/* Notifications */}
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-4 h-4" />
                    {notificationCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0"
                      >
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 text-zinc-700 bg-gray-950 mx-0.5">
                        <AvatarImage src={userProfile.avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
                        <AvatarFallback>{userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${userProfile.username || 'profile'}`} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-stories" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Stories
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={onAuthClick}>
                  Sign In
                </Button>
                <Button onClick={onAuthClick}>
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/explore" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                href="/trending" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trending
              </Link>
              <Link 
                href="/topics" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Topics
              </Link>
              {isLoggedIn && (
                <Link href="/write" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start">
                    <PenTool className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
