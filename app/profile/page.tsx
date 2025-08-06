'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Calendar, LinkIcon, Heart, MessageCircle, Share2, Clock, Users, BookOpen, Edit3, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '../components/navbar'
import { useUserProfile } from '../components/user-profile-context'
import { ProfilePictureUpload } from '../components/profile-picture-upload'

interface UserProfile {
  username: string
  name: string
  avatar: string
  coverImage: string
  bio: string
  location: string
  website: string
  joinedDate: string
  followers: number
  following: number
  posts: number
  totalLikes: number
  totalViews: number
  isOwnProfile: boolean
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  likes: number
  comments: number
  views: number
  tags: string[]
  image: string
  status: 'published' | 'draft'
}

const mockProfile: UserProfile = {
  username: 'sarahchen',
  name: 'Sarah Chen',
  avatar: '/placeholder.svg?height=120&width=120',
  coverImage: '/placeholder.svg?height=300&width=800',
  bio: 'Full-stack developer and tech writer passionate about modern web technologies. I love sharing knowledge and building amazing digital experiences. Always learning, always creating. 🚀',
  location: 'San Francisco, CA',
  website: 'https://sarahchen.dev',
  joinedDate: '2022-03-15',
  followers: 1250,
  following: 340,
  posts: 45,
  totalLikes: 5420,
  totalViews: 28500,
  isOwnProfile: true
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
    views: 1250,
    tags: ['Web Development', 'Technology', 'AI'],
    image: '/modern-web-development.png',
    status: 'published'
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    excerpt: 'Learn how to structure and optimize React applications for scale, performance, and maintainability.',
    publishedAt: '2024-01-10',
    readTime: 12,
    likes: 89,
    comments: 15,
    views: 890,
    tags: ['React', 'JavaScript', 'Best Practices'],
    image: '/react-app-architecture.png',
    status: 'published'
  },
  {
    id: '3',
    title: 'The Art of Clean Code: Writing Maintainable Software',
    excerpt: 'Discover principles and practices for writing clean, readable, and maintainable code that stands the test of time.',
    publishedAt: '2024-01-05',
    readTime: 10,
    likes: 156,
    comments: 31,
    views: 1100,
    tags: ['Clean Code', 'Software Engineering', 'Best Practices'],
    image: '/clean-code-programming.png',
    status: 'published'
  }
]

export default function ProfilePage() {
  const { profile: userProfile, updateProfile } = useUserProfile()
  const [profile, setProfile] = useState<UserProfile>({
    ...mockProfile,
    name: userProfile.name || mockProfile.name,
    username: userProfile.username || mockProfile.username,
    avatar: userProfile.avatar || mockProfile.avatar,
    isOwnProfile: userProfile.isLoggedIn
  })
  const [posts] = useState<BlogPost[]>(mockPosts)
  const [activeTab, setActiveTab] = useState('posts')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    website: profile.website
  })

  // Update profile when userProfile changes
  useEffect(() => {
    if (userProfile.isLoggedIn) {
      setProfile(prev => ({
        ...prev,
        name: userProfile.name,
        username: userProfile.username,
        avatar: userProfile.avatar,
        isOwnProfile: true
      }))
      
      // Update the edit form as well
      setEditForm(prev => ({
        ...prev,
        name: userProfile.name
      }))
    }
  }, [userProfile])

  const handleSaveProfile = () => {
    setProfile(prev => ({
      ...prev,
      ...editForm
    }))
    
    // Update the user context as well
    if (userProfile.isLoggedIn) {
      updateProfile({ name: editForm.name })
    }
    
    setIsEditModalOpen(false)
  }

  const handleAvatarChange = (newAvatar: string) => {
    setProfile(prev => ({
      ...prev,
      avatar: newAvatar
    }))
    
    // Update the user context
    updateProfile({ avatar: newAvatar })
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
          <div className="flex items-start justify-between mb-3">
            <Badge 
              variant={post.status === 'published' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {post.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {post.views.toLocaleString()} views
            </span>
          </div>
          <Link href={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map(tag => (
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
                {post.readTime} min
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
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
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
            <Image
              src={profile.coverImage || "/placeholder.svg"}
              alt="Cover"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                </Avatar>
                {profile.isOwnProfile && (
                  <ProfilePictureUpload
                    currentAvatar={profile.avatar}
                    userName={profile.name}
                    onAvatarChange={handleAvatarChange}
                  />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {profile.isOwnProfile ? (
                      <>
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                  id="bio"
                                  value={editForm.bio}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  value={editForm.location}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label htmlFor="website">Website</Label>
                                <Input
                                  id="website"
                                  value={editForm.website}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                                />
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button onClick={handleSaveProfile} className="flex-1">
                                  Save Changes
                                </Button>
                                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Link href="/settings">
                          <Button variant="outline" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button>Follow</Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <p className="text-lg mb-4 leading-relaxed">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
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
                  <span>
                    <span className="font-bold">{profile.followers}</span> followers
                  </span>
                  <span>
                    <span className="font-bold">{profile.following}</span> following
                  </span>
                  <span>
                    <span className="font-bold">{profile.posts}</span> posts
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{profile.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{profile.totalLikes.toLocaleString()}</div>
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
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">👁</span>
              </div>
              <div className="text-2xl font-bold">{profile.totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
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
                  <p className="text-muted-foreground mb-6">
                    Start sharing your thoughts and ideas with the world.
                  </p>
                  <Link href="/write">
                    <Button>Write Your First Post</Button>
                  </Link>
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

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Activity Dashboard</h3>
                <p className="text-muted-foreground">
                  Detailed activity analytics coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
