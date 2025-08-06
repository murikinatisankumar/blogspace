'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Clock, Grid, List, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from './components/navbar'
import { AuthModal } from './components/auth-modal'
import { FloatingWriteButton } from './components/floating-write-button'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    username: string
  }
  publishedAt: string
  readTime: number
  likes: number
  comments: number
  tags: string[]
  image: string
  isLiked: boolean
  isBookmarked: boolean
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    content: 'Full blog content here...',
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'sarahchen'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    likes: 124,
    comments: 23,
    tags: ['Web Development', 'Technology', 'AI'],
    image: '/modern-web-development.png',
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    excerpt: 'Learn how to structure and optimize React applications for scale, performance, and maintainability.',
    content: 'Full blog content here...',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'alexrod'
    },
    publishedAt: '2024-01-14',
    readTime: 12,
    likes: 89,
    comments: 15,
    tags: ['React', 'JavaScript', 'Best Practices'],
    image: '/react-app-architecture.png',
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    title: 'The Art of Minimalist Design in Digital Products',
    excerpt: 'Discover how minimalist design principles can enhance user experience and create more impactful digital products.',
    content: 'Full blog content here...',
    author: {
      name: 'Emma Thompson',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'emmathompson'
    },
    publishedAt: '2024-01-13',
    readTime: 6,
    likes: 156,
    comments: 31,
    tags: ['Design', 'UX/UI', 'Minimalism'],
    image: '/minimalist-interface.png',
    isLiked: false,
    isBookmarked: true
  }
]

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Persist login state and user data
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn')
    if (savedLoginState === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const trendingPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3)

  const handleLike = (postId: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleBookmark = (postId: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handleLogin = (nameFromEmail: string, email: string) => {
    setIsLoggedIn(true)
    // Store user info in localStorage
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', nameFromEmail)
    localStorage.setItem('userEmail', email)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      {/* Hero Section with Left-Side Animated Landscape */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            
            {/* Left Side - Animated Landscape */}
            <div className="flex justify-center lg:justify-start">
              <div className="landscape-container">
                {/* Mountain backdrop */}
                <div className="mountain">
                  <div className="backdrop"></div>
                  <div className="zig zag1"></div>
                  <div className="zig zag2"></div>
                  <div className="zig zag3"></div>
                  <div className="zig zag4"></div>
                </div>

                {/* Range */}
                <div className="range">
                  <div className="r1"></div>
                  <div className="r2"></div>
                  <div className="r3"></div>
                  <div className="r4"></div>
                  <div className="r5"></div>
                  <div className="r6"></div>
                  <div className="r7"></div>
                </div>

                {/* Trees - Back layer */}
                <div className="tree treeBack tree1">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree2">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree3">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree4">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree5">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree6">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree7">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeBack tree8">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>

                {/* Trees - Mid layer */}
                <div className="tree treeMid tree1">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeMid tree2">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeMid tree3">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeMid tree4">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeMid tree5">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>

                {/* Trees - Front layer */}
                <div className="tree treeFront tree1">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeFront tree2">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeFront tree3">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>
                <div className="tree treeFront tree4">
                  <div className="top"></div>
                  <div className="mid"></div>
                  <div className="bot"></div>
                  <div className="base"></div>
                </div>

                {/* Tower */}
                <div className="tower">
                  <div className="shadow"></div>
                  <div className="flagPole"></div>
                  <div className="roof1"></div>
                  <div className="roof2"></div>
                  <div className="wall">
                    <div className="w1"></div>
                    <div className="w2"></div>
                    <div className="w3"></div>
                    <div className="w4"></div>
                    <div className="w5"></div>
                  </div>
                  <div className="legs">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className="support1">
                      <div className="criss"></div>
                      <div className="cross"></div>
                      <div className="flat"></div>
                    </div>
                    <div className="support2">
                      <div className="criss"></div>
                      <div className="cross"></div>
                      <div className="flat"></div>
                    </div>
                  </div>
                  <div className="railing">
                    <div className="r1"></div>
                    <div className="r2"></div>
                    <div className="r3"></div>
                    <div className="r4"></div>
                    <div className="r5"></div>
                    <div className="r6"></div>
                    <div className="r7"></div>
                    <div className="r8"></div>
                    <div className="r9"></div>
                    <div className="top"></div>
                    <div className="bot1"></div>
                    <div className="bot2"></div>
                  </div>
                </div>

                {/* Clouds */}
                <div className="cloud big">
                  <div className="circle c1"></div>
                  <div className="circle c2"></div>
                  <div className="circle c3"></div>
                  <div className="circle c4"></div>
                  <div className="circle c5"></div>
                  <div className="circle c6"></div>
                  <div className="circle c7"></div>
                  <div className="circle c8"></div>
                </div>
                <div className="cloud small">
                  <div className="circle c1"></div>
                  <div className="circle c2"></div>
                  <div className="circle c3"></div>
                  <div className="circle c4"></div>
                  <div className="circle c5"></div>
                  <div className="circle c6"></div>
                  <div className="circle c7"></div>
                  <div className="circle c8"></div>
                </div>

                {/* Birds */}
                <div className="birds front">
                  <div className="bird b1">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b2">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b3">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b4">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b5">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b6">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="birds back">
                  <div className="bird b7">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b8">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b9">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b10">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b11">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bird b12">
                    <div className="body"></div>
                    <div className="wing1">
                      <div className="wing2">
                        <div className="wing3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  Share Your Stories
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                  Discover amazing stories, share your thoughts, and connect with writers from around the world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="btn-enhanced" onClick={() => isLoggedIn ? null : setShowAuthModal(true)}>
                  {isLoggedIn ? (
                    <Link href="/write">Write a Story</Link>
                  ) : (
                    'Get Started'
                  )}
                </Button>
                <Button variant="outline" size="lg" className="btn-magnetic">
                  <Link href="/explore">Explore Stories</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Stories</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">Writers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Readers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tags Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
              : 'space-y-6'
            }>
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {viewMode === 'grid' && (
                    <div className="relative h-48">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">@{post.author.username}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? 'text-red-500' : ''}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(post.id)}
                        className={post.isBookmarked ? 'text-primary' : ''}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">Load More Stories</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Posts */}
            <Card>
              <CardHeader>
                <h3 className="font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div key={post.id} className="flex gap-3">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <Link href={`/blog/${post.id}`}>
                        <h4 className="font-medium hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {post.author.name} • {post.likes} likes
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <h3 className="font-bold">Popular Tags</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      <FloatingWriteButton 
        isLoggedIn={isLoggedIn}
        onAuthClick={() => setShowAuthModal(true)}
      />
    </div>
  )
}
