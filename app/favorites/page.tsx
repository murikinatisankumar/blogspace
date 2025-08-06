'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Bookmark, MessageCircle, Share2, Clock, Calendar, Search, Filter, X, Users, Eye, MoreHorizontal, Trash2, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '../components/navbar'

interface FavoritePost {
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
  savedAt: string
  type: 'liked' | 'bookmarked'
}

interface FavoriteAuthor {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  posts: number
  followedAt: string
  isFollowing: boolean
  recentPost?: {
    title: string
    publishedAt: string
  }
}

interface Collection {
  id: string
  name: string
  description: string
  postCount: number
  createdAt: string
  isPublic: boolean
}

const mockFavoritePosts: FavoritePost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'sarahchen'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    likes: 124,
    comments: 23,
    views: 1250,
    tags: ['Web Development', 'Technology', 'AI'],
    image: '/modern-web-development.png',
    savedAt: '2024-01-16',
    type: 'liked'
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    excerpt: 'Learn how to structure and optimize React applications for scale, performance, and maintainability.',
    author: {
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'alexrod'
    },
    publishedAt: '2024-01-14',
    readTime: 12,
    likes: 89,
    comments: 15,
    views: 890,
    tags: ['React', 'JavaScript', 'Best Practices'],
    image: '/react-app-architecture.png',
    savedAt: '2024-01-15',
    type: 'bookmarked'
  },
  {
    id: '3',
    title: 'The Art of Clean Code: Writing Maintainable Software',
    excerpt: 'Discover principles and practices for writing clean, readable, and maintainable code that stands the test of time.',
    author: {
      name: 'Emma Thompson',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'emmathompson'
    },
    publishedAt: '2024-01-13',
    readTime: 10,
    likes: 156,
    comments: 31,
    views: 1100,
    tags: ['Clean Code', 'Software Engineering', 'Best Practices'],
    image: '/clean-code-programming.png',
    savedAt: '2024-01-14',
    type: 'bookmarked'
  },
  {
    id: '4',
    title: 'Understanding TypeScript: A Comprehensive Guide',
    excerpt: 'Master TypeScript fundamentals and advanced features to write better, more reliable JavaScript applications.',
    author: {
      name: 'Michael Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'michaelbrown'
    },
    publishedAt: '2024-01-12',
    readTime: 15,
    likes: 203,
    comments: 42,
    views: 1800,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    image: '/typescript-programming.png',
    savedAt: '2024-01-13',
    type: 'liked'
  }
]

const mockFavoriteAuthors: FavoriteAuthor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'Full-stack developer and tech writer passionate about modern web technologies.',
    followers: 1250,
    posts: 45,
    followedAt: '2024-01-10',
    isFollowing: true,
    recentPost: {
      title: 'The Future of Web Development: Trends to Watch in 2024',
      publishedAt: '2024-01-15'
    }
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    username: 'alexrod',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'UX Designer and researcher focused on creating intuitive digital experiences.',
    followers: 890,
    posts: 32,
    followedAt: '2024-01-08',
    isFollowing: true,
    recentPost: {
      title: 'Building Scalable React Applications: Best Practices',
      publishedAt: '2024-01-14'
    }
  },
  {
    id: '3',
    name: 'Emma Thompson',
    username: 'emmathompson',
    avatar: '/placeholder.svg?height=60&width=60',
    bio: 'Backend engineer and API architect with 8+ years of experience.',
    followers: 756,
    posts: 28,
    followedAt: '2024-01-05',
    isFollowing: true,
    recentPost: {
      title: 'The Art of Clean Code: Writing Maintainable Software',
      publishedAt: '2024-01-13'
    }
  }
]

const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Articles about modern web development practices and frameworks',
    postCount: 12,
    createdAt: '2024-01-01',
    isPublic: true
  },
  {
    id: '2',
    name: 'Design Inspiration',
    description: 'Creative design ideas and UI/UX best practices',
    postCount: 8,
    createdAt: '2024-01-05',
    isPublic: false
  },
  {
    id: '3',
    name: 'Career Growth',
    description: 'Tips and insights for professional development',
    postCount: 15,
    createdAt: '2024-01-10',
    isPublic: true
  }
]

export default function FavoritesPage() {
  const [posts, setPosts] = useState<FavoritePost[]>(mockFavoritePosts)
  const [authors, setAuthors] = useState<FavoriteAuthor[]>(mockFavoriteAuthors)
  const [collections] = useState<Collection[]>(mockCollections)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'liked' | 'bookmarked'>('all')
  const [activeTab, setActiveTab] = useState('posts')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || post.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const likedPosts = posts.filter(post => post.type === 'liked')
  const bookmarkedPosts = posts.filter(post => post.type === 'bookmarked')

  const handleRemovePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleUnfollowAuthor = (authorId: string) => {
    setAuthors(authors.filter(author => author.id !== authorId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const PostCard = ({ post }: { post: FavoritePost }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant={post.type === 'liked' ? 'default' : 'secondary'} className="text-xs">
                {post.type === 'liked' ? (
                  <>
                    <Heart className="w-3 h-3 mr-1 fill-current" />
                    Liked
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3 h-3 mr-1 fill-current" />
                    Bookmarked
                  </>
                )}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Saved {formatRelativeTime(post.savedAt)}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in new tab
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => handleRemovePost(post.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove from favorites
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Link href={`/profile/${post.author.username}`} className="text-sm font-medium hover:text-primary">
                {post.author.name}
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>
          
          <Link href={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.views.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                {post.comments}
              </span>
            </div>
          </div>
        </div>
        <div className="w-32 h-32 relative">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Card>
  )

  const AuthorCard = ({ author }: { author: FavoriteAuthor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/profile/${author.username}`} className="font-bold hover:text-primary">
                {author.name}
              </Link>
              <p className="text-sm text-muted-foreground">@{author.username}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ExternalLink className="w-4 h-4 mr-2" />
                View profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => handleUnfollowAuthor(author.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Unfollow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{author.bio}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {author.followers} followers
          </span>
          <span>{author.posts} posts</span>
        </div>
        
        {author.recentPost && (
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-1">Latest post:</p>
            <Link href={`/blog/${author.id}`} className="text-sm font-medium hover:text-primary line-clamp-1">
              {author.recentPost.title}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(author.recentPost.publishedAt)}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-xs text-muted-foreground">
            Following since {formatDate(author.followedAt)}
          </span>
          <Button size="sm" variant="outline">
            Following
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold">{collection.name}</h3>
          <Badge variant={collection.isPublic ? 'default' : 'secondary'} className="text-xs">
            {collection.isPublic ? 'Public' : 'Private'}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {collection.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {collection.postCount} posts
          </span>
          <span className="text-xs text-muted-foreground">
            Created {formatDate(collection.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            Your saved posts, followed authors, and curated collections
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{likedPosts.length}</div>
              <div className="text-sm text-muted-foreground">Liked Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{bookmarkedPosts.length}</div>
              <div className="text-sm text-muted-foreground">Bookmarked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{authors.length}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">📚</span>
              </div>
              <div className="text-2xl font-bold">{collections.length}</div>
              <div className="text-sm text-muted-foreground">Collections</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search your saved posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All ({posts.length})
                </Button>
                <Button
                  variant={selectedFilter === 'liked' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('liked')}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Liked ({likedPosts.length})
                </Button>
                <Button
                  variant={selectedFilter === 'bookmarked' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('bookmarked')}
                >
                  <Bookmark className="w-4 h-4 mr-1" />
                  Saved ({bookmarkedPosts.length})
                </Button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      {selectedFilter === 'liked' ? (
                        <Heart className="w-6 h-6 text-muted-foreground" />
                      ) : selectedFilter === 'bookmarked' ? (
                        <Bookmark className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Search className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {searchQuery ? 'No posts found' : 'No saved posts yet'}
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery 
                        ? `No posts match "${searchQuery}"`
                        : 'Start exploring and save posts you love!'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Authors Tab */}
          <TabsContent value="authors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.length > 0 ? (
                authors.map(author => (
                  <AuthorCard key={author.id} author={author} />
                ))
              ) : (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No followed authors</h3>
                      <p className="text-muted-foreground">
                        Discover amazing writers and follow them to see their latest content.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Organize your saved content into collections
              </p>
              <Button>
                Create Collection
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.length > 0 ? (
                collections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))
              ) : (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">No collections yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Create collections to organize your favorite content by topic or theme.
                      </p>
                      <Button>Create Your First Collection</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
