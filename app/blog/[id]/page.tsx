'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Heart, MessageCircle, Share2, Bookmark, Clock, Calendar, User, Send, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '../../components/navbar'

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: '/placeholder.svg?height=32&width=32',
      username: 'johndoe'
    },
    content: 'Great article! Really helped me understand the concepts better.',
    createdAt: '2024-01-15T10:30:00Z',
    likes: 5,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=32&width=32',
      username: 'janesmith'
    },
    content: 'Thanks for sharing this. Looking forward to more content like this!',
    createdAt: '2024-01-15T11:45:00Z',
    likes: 3,
    isLiked: true
  }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [likes, setLikes] = useState(124)

  const post = {
    id: params.id,
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `
      Web development is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will shape how we build and interact with web applications. In this comprehensive guide, we'll explore the most significant trends that developers should keep an eye on.

      ## 1. AI-Powered Development Tools

      Artificial Intelligence is revolutionizing the way we write code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools for developers. These tools can help with:

      - Code completion and suggestions
      - Bug detection and fixing
      - Documentation generation
      - Code refactoring

      ## 2. WebAssembly (WASM) Adoption

      WebAssembly continues to gain traction as a way to run high-performance applications in the browser. Languages like Rust, C++, and Go can now be compiled to WASM, opening up new possibilities for web applications.

      ## 3. Edge Computing and CDNs

      The rise of edge computing is changing how we think about web application architecture. By processing data closer to users, we can achieve:

      - Lower latency
      - Better performance
      - Improved user experience
      - Reduced server costs

      ## 4. Progressive Web Apps (PWAs)

      PWAs continue to bridge the gap between web and native applications. With improved browser support and new APIs, PWAs are becoming more capable than ever.

      ## Conclusion

      The future of web development is bright, with new technologies and approaches constantly emerging. By staying informed about these trends, developers can build better, more efficient, and more user-friendly applications.
    `,
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      username: 'sarahchen',
      bio: 'Full-stack developer and tech writer. Passionate about modern web technologies and sharing knowledge with the community.',
      followers: 1250,
      following: 340,
      posts: 45
    },
    publishedAt: '2024-01-15T08:00:00Z',
    readTime: 8,
    tags: ['Web Development', 'Technology', 'AI'],
    image: '/modern-web-development.png'
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ))
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'Current User',
          avatar: '/placeholder.svg?height=32&width=32',
          username: 'currentuser'
        },
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cover Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${post.author.username}`} className="font-medium hover:text-primary">
                  {post.author.name}
                </Link>
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
              </div>
            </div>
            
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </header>

        {/* Article Actions */}
        <div className="flex items-center justify-between py-4 border-y mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleLike}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>
            <Button variant="ghost">
              <MessageCircle className="w-5 h-5 mr-2" />
              {comments.length}
            </Button>
            <Button variant="ghost">
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={isBookmarked ? 'text-primary' : ''}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('- ')) {
              const listItems = paragraph.split('\n').filter(item => item.startsWith('- '))
              return (
                <ul key={index} className="list-disc pl-6 mb-4">
                  {listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Author Bio */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/profile/${post.author.username}`} className="text-xl font-bold hover:text-primary">
                    {post.author.name}
                  </Link>
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    size="sm"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
                <p className="text-muted-foreground mb-3">{post.author.bio}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{post.author.followers} followers</span>
                  <span>{post.author.following} following</span>
                  <span>{post.author.posts} posts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
          
          {/* Add Comment */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Link href={`/profile/${comment.author.username}`} className="font-medium hover:text-primary">
                            {comment.author.name}
                          </Link>
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(comment.createdAt)}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="mb-3">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCommentLike(comment.id)}
                          className={comment.isLiked ? 'text-red-500' : ''}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
