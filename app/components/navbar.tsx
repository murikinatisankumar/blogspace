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
        <div className="flex h-16 justify-between items-center flex-row relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse opacity-50"></div>
          
          {/* Interactive glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105 group relative z-10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center bg-neutral-600 relative overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              {/* Loading shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300 relative">
              BlogSpace
              {/* Subtle glow text effect */}
              <span className="absolute inset-0 text-xl font-bold text-primary opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300">BlogSpace</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 relative z-10">
            <Link href="/explore" className="text-sm font-medium hover:text-primary transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-primary/5 active:scale-95">
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/trending" className="text-sm font-medium hover:text-primary transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-primary/5 active:scale-95">
              <span className="relative z-10">Trending</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/topics" className="text-sm font-medium hover:text-primary transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-primary/5 active:scale-95">
              <span className="relative z-10">Topics</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
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
                  <Button size="sm" className="hidden sm:flex relative overflow-hidden group hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    <PenTool className="w-4 h-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Write</span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>
                </Link>

                {/* Notifications */}
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all duration-300 active:scale-95 group">
                    <Bell className="w-4 h-4 group-hover:animate-bounce" />
                    {notificationCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0 animate-pulse hover:animate-bounce"
                      >
                        {notificationCount}
                      </Badge>
                    )}
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full group hover:ring-2 hover:ring-primary/30 transition-all duration-300 active:scale-95">
                      <Avatar className="h-8 w-8 text-zinc-700 bg-gray-950 mx-0.5 relative overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                        <AvatarImage src={userProfile.avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
                        <AvatarFallback className="group-hover:bg-primary/10 transition-colors duration-300">{userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}</AvatarFallback>
                        {/* Glowing ring effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
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
