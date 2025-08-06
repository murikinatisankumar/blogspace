'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, Share2, Bookmark, Clock, TrendingUp, Flame, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '../components/navbar'

interface TrendingPost {
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
  views: number
  tags: string[]
  image: string
  trendingScore: number
  rank: number
}

const mockTrendingPosts: TrendingPost[] = [
  {
    id: '1',
    title: 'The Rise of AI in Web Development: What Developers Need to Know',
    excerpt: 'Artificial Intelligence is transforming how we build web applications. From code generation to automated testing, explore the tools and techniques shaping the future.',
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'sarahchen'
    },
    publishedAt: '2024-01-22',
    readTime: 12,
    likes: 1247,
    comments: 89,
    views: 15420,
    tags: ['AI', 'Web Development', 'Future Tech'],
    image: '/ai-web-dev.png',
    trendingScore: 95,
    rank: 1
  },
  {
    id: '2',
    title: 'Building a Design System That Scales: Lessons from Airbnb',
    excerpt: 'How Airbnb created a design system that serves millions of users across multiple platforms. Key insights and practical tips for your own design system.',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'alexrod'
    },
    publishedAt: '2024-01-21',
    readTime: 15,
    likes: 892,
    comments: 67,
    views: 12350,
    tags: ['Design Systems', 'UX', 'Scalability'],
    image: '/design-system.png',
    trendingScore: 88,
    rank: 2
  },
  {
    id: '3',
    title: 'The Complete Guide to React Server Components',
    excerpt: 'React Server Components are changing how we think about React applications. Learn when and how to use them effectively in your projects.',
    author: {
      name: 'Emma Thompson',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'emmathompson'
    },
    publishedAt: '2024-01-20',
    readTime: 18,
    likes: 756,
    comments: 45,
    views: 9870,
    tags: ['React', 'Server Components', 'Next.js'],
    image: '/react-server-components.png',
    trendingScore: 82,
    rank: 3
  },
  {
    id: '4',
    title: 'Why Every Developer Should Learn TypeScript in 2024',
    excerpt: 'TypeScript adoption is at an all-time high. Discover why major companies are switching and how it can improve your development workflow.',
    author: {
      name: 'Michael Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'michaelbrown'
    },
    publishedAt: '2024-01-19',
    readTime: 10,
    likes: 634,
    comments: 52,
    views: 8940,
    tags: ['TypeScript', 'JavaScript', 'Development'],
    image: '/typescript-2024.png',
    trendingScore: 79,
    rank: 4
  },
  {
    id: '5',
    title: 'The Psychology Behind Addictive App Design',
    excerpt: 'Understanding the psychological principles that make apps engaging and how to apply them ethically in your own designs.',
    author: {
      name: 'Lisa Wang',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'lisawang'
    },
    publishedAt: '2024-01-18',
    readTime: 14,
    likes: 523,
    comments: 38,
    views: 7650,
    tags: ['Psychology', 'UX Design', 'Product Design'],
    image: '/app-psychology.png',
    trendingScore: 75,
    rank: 5
  }
]

const timeframes = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'All Time', value: 'all' }
]

export default function TrendingPage() {
  const [posts] = useState<TrendingPost[]>(mockTrendingPosts)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [activeTab, setActiveTab] = useState('posts')

  const getTrendingIcon = (rank: number) => {
    if (rank === 1) return <Flame className="w-5 h-5 text-red-500" />
    if (rank <= 3) return <TrendingUp className="w-5 h-5 text-orange-500" />
    return <TrendingUp className="w-5 h-5 text-primary" />
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-red-500 bg-red-50 border-red-200'
    if (rank === 2) return 'text-orange-500 bg-orange-50 border-orange-200'
    if (rank === 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-primary bg-primary/10 border-primary/20'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        onAuthClick={() => {}}
        onLogout={() => {}}
      />
      
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Trending Stories
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the most popular and engaging content right now
          </p>
          
          {/* Timeframe Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {timeframes.map(timeframe => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe(timeframe.value)}
                className="rounded-full"
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="posts">Stories</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          {/* Trending Posts */}
          <TabsContent value="posts" className="space-y-6">
            {/* Top 3 Featured */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {posts.slice(0, 3).map(post => (
                <Card key={post.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${getRankColor(post.rank)} font-bold text-lg px-3 py-1`}>
                      #{post.rank}
                    </Badge>
                  </div>
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {getTrendingIcon(post.rank)}
                        <span className="text-sm font-medium">Trending Score: {post.trendingScore}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
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
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-lg font-bold hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-2 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-green-500" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Remaining Posts List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">More Trending Stories</h2>
              {posts.slice(3).map(post => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <Badge className={`${getRankColor(post.rank)} font-bold text-lg px-3 py-2 mb-3`}>
                          #{post.rank}
                        </Badge>
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime} min read
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendingIcon(post.rank)}
                            <span className="text-sm font-medium">Score: {post.trendingScore}</span>
                          </div>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-1 mb-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4 text-blue-500" />
                              {post.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-green-500" />
                              {post.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending Authors */}
          <TabsContent value="authors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(rank => (
                <Card key={rank} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${getRankColor(rank)} font-bold px-3 py-1`}>
                        #{rank}
                      </Badge>
                      {getTrendingIcon(rank)}
                    </div>
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-lg">A{rank}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-1">Author {rank}</h3>
                    <p className="text-muted-foreground text-sm mb-3">@author{rank}</p>
                    <p className="text-sm mb-4 line-clamp-2">
                      Trending author with amazing content and growing audience.
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-4">
                      <div>{Math.floor(Math.random() * 5000) + 1000} followers</div>
                      <div>{Math.floor(Math.random() * 50) + 10} posts</div>
                    </div>
                    <Button size="sm" className="w-full">
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending Topics */}
          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['React', 'AI/ML', 'Design', 'JavaScript', 'Python', 'Blockchain', 'Mobile Dev', 'DevOps', 'Data Science'].map((topic, index) => (
                <Card key={topic} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${getRankColor(index + 1)} font-bold px-3 py-1`}>
                        #{index + 1}
                      </Badge>
                      {getTrendingIcon(index + 1)}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{topic}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {Math.floor(Math.random() * 1000) + 200} trending stories
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{Math.floor(Math.random() * 50) + 10}% this week</span>
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
