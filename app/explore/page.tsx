'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, Share2, Bookmark, Clock, Search, Filter, Users, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '../components/navbar'

interface BlogPost {
  id: string
  title: string
  excerpt: string
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
  category: string
}

interface Author {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  posts: number
  isFollowing: boolean
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advanced React Patterns for 2024',
    excerpt: 'Explore cutting-edge React patterns including compound components, render props, and custom hooks.',
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'sarahchen'
    },
    publishedAt: '2024-01-20',
    readTime: 12,
    likes: 234,
    comments: 45,
    tags: ['React', 'JavaScript', 'Frontend'],
    image: '/react-patterns.png',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'The Psychology of User Experience Design',
    excerpt: 'Understanding how cognitive psychology principles can improve your design decisions.',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'alexrod'
    },
    publishedAt: '2024-01-19',
    readTime: 8,
    likes: 189,
    comments: 32,
    tags: ['UX', 'Design', 'Psychology'],
    image: '/ux-psychology.png',
    category: 'Design'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices for creating robust and scalable backend services.',
    author: {
      name: 'Emma Thompson',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'emmathompson'
    },
    publishedAt: '2024-01-18',
    readTime: 15,
    likes: 156,
    comments: 28,
    tags: ['Node.js', 'Backend', 'API'],
    image: '/nodejs-api.png',
    category: 'Technology'
  },
  {
    id: '4',
    title: 'The Art of Technical Writing',
    excerpt: 'How to communicate complex technical concepts clearly and effectively.',
    author: {
      name: 'Michael Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'michaelbrown'
    },
    publishedAt: '2024-01-17',
    readTime: 10,
    likes: 203,
    comments: 41,
    tags: ['Writing', 'Communication', 'Documentation'],
    image: '/technical-writing.png',
    category: 'Writing'
  }
]

const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'Full-stack developer and tech writer',
    followers: 1250,
    posts: 45,
    isFollowing: false
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    username: 'alexrod',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'UX Designer and researcher',
    followers: 890,
    posts: 32,
    isFollowing: true
  },
  {
    id: '3',
    name: 'Emma Thompson',
    username: 'emmathompson',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'Backend engineer and API architect',
    followers: 756,
    posts: 28,
    isFollowing: false
  }
]

const categories = ['All', 'Technology', 'Design', 'Writing', 'Business', 'Lifestyle']

export default function ExplorePage() {
  const [posts] = useState<BlogPost[]>(mockPosts)
  const [authors, setAuthors] = useState<Author[]>(mockAuthors)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('posts')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFollowAuthor = (authorId: string) => {
    setAuthors(authors.map(author => 
      author.id === authorId 
        ? { ...author, isFollowing: !author.isFollowing }
        : author
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        onAuthClick={() => {}}
        onLogout={() => {}}
      />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 bg-slate-400">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            Explore Stories
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing content from writers around the world
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search stories, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-transparent border-double border-slate-600 border-2"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="posts">Stories</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-lg font-bold hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Authors Tab */}
          <TabsContent value="authors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map(author => (
                <Card key={author.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <Link href={`/profile/${author.username}`}>
                      <h3 className="text-xl font-bold hover:text-primary transition-colors mb-1">
                        {author.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3">@{author.username}</p>
                    <p className="text-sm mb-4 line-clamp-2">{author.bio}</p>
                    <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {author.followers} followers
                      </div>
                      <div>
                        {author.posts} posts
                      </div>
                    </div>
                    <Button
                      variant={author.isFollowing ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleFollowAuthor(author.id)}
                      className="w-full"
                    >
                      {author.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['React', 'JavaScript', 'Design', 'UX/UI', 'Node.js', 'Python', 'AI/ML', 'Blockchain', 'Mobile Dev'].map(topic => (
                <Card key={topic} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{topic}</h3>
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {Math.floor(Math.random() * 500) + 100} stories
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Trending</Badge>
                      <Badge variant="outline" className="text-xs">Popular</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
