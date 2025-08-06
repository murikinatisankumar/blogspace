'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Calendar, LinkIcon, Heart, MessageCircle, Share2, Clock, Users, BookOpen, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '../../components/navbar'

interface UserProfile {
  username: string
  name: string
  avatar: string
  bio: string
  location: string
  website: string
  joinedDate: string
  followers: number
  following: number
  posts: number
  isFollowing: boolean
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  likes: number
  comments: number
  tags: string[]
  image: string
}

const mockProfile: UserProfile = {
  username: 'sarahchen',
  name: 'Sarah Chen',
  avatar: '/placeholder.svg?height=120&width=120',
  bio: 'Full-stack developer and tech writer. Passionate about modern web technologies and sharing knowledge with the community. Always learning, always building.',
  location: 'San Francisco, CA',
  website: 'https://sarahchen.dev',
  joinedDate: '2022-03-15',
  followers: 1250,
  following: 340,
  posts: 45,
  isFollowing: false
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    publishedAt: '2024-01-15',
    readTime: 8,
    likes: 124,
    comments: 23,
    tags: ['Web Development', 'Technology', 'AI'],
    image: '/modern-web-development.png'
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    excerpt: 'Learn how to structure and optimize React applications for scale, performance, and maintainability.',
    publishedAt: '2024-01-10',
    readTime: 12,
    likes: 89,
    comments: 15,
    tags: ['React', 'JavaScript', 'Best Practices'],
    image: '/react-app-architecture.png'
  },
  {
    id: '3',
    title: 'The Art of Clean Code: Writing Maintainable Software',
    excerpt: 'Discover principles and practices for writing clean, readable, and maintainable code that stands the test of time.',
    publishedAt: '2024-01-05',
    readTime: 10,
    likes: 156,
    comments: 31,
    tags: ['Clean Code', 'Software Engineering', 'Best Practices'],
    image: '/clean-code-programming.png'
  }
]

const mockLikedPosts: BlogPost[] = [
  {
    id: '4',
    title: 'Understanding TypeScript: A Comprehensive Guide',
    excerpt: 'Master TypeScript fundamentals and advanced features to write better, more reliable JavaScript applications.',
    publishedAt: '2024-01-12',
    readTime: 15,
    likes: 203,
    comments: 42,
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    image: '/typescript-programming.png'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'A practical guide to choosing between CSS Grid and Flexbox for your layout needs.',
    publishedAt: '2024-01-08',
    readTime: 7,
    likes: 178,
    comments: 28,
    tags: ['CSS', 'Web Design', 'Layout'],
    image: '/css-grid-flexbox.png'
  }
]

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [posts] = useState<BlogPost[]>(mockPosts)
  const [likedPosts] = useState<BlogPost[]>(mockLikedPosts)
  const [activeTab, setActiveTab] = useState('posts')

  const handleFollow = () => {
    setProfile(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  const PostCard = ({ post }: { post: BlogPost }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="flex-1 p-6">
          <Link href={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32 mx-auto md:mx-0">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                      variant={profile.isFollowing ? "outline" : "default"}
                      onClick={handleFollow}
                    >
                      {profile.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-lg mb-4">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                  )}
                  {profile.website && (
                    <Link href={profile.website} className="flex items-center gap-1 hover:text-primary">
                      <LinkIcon className="w-4 h-4" />
                      {profile.website.replace('https://', '')}
                    </Link>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(profile.joinedDate)}
                  </span>
                </div>
                
                <div className="flex gap-6 text-sm">
                  <Link href={`/profile/${profile.username}/followers`} className="hover:text-primary">
                    <span className="font-bold">{profile.followers}</span> followers
                  </Link>
                  <Link href={`/profile/${profile.username}/following`} className="hover:text-primary">
                    <span className="font-bold">{profile.following}</span> following
                  </Link>
                  <span>
                    <span className="font-bold">{profile.posts}</span> posts
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{profile.posts}</div>
              <div className="text-sm text-muted-foreground">Stories Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">
                {posts.reduce((total, post) => total + post.likes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{profile.followers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="liked">Liked ({likedPosts.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6 mt-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">
                    {profile.username} hasn't published any stories yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="liked" className="space-y-6 mt-6">
            {likedPosts.length > 0 ? (
              likedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No liked posts</h3>
                  <p className="text-muted-foreground">
                    {profile.username} hasn't liked any stories yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {profile.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Website</h4>
                    <Link 
                      href={profile.website} 
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {profile.website.replace('https://', '')}
                    </Link>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Joined</h4>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(profile.joinedDate)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Activity</h4>
                    <p className="text-muted-foreground">
                      {profile.posts} posts • {profile.followers} followers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
