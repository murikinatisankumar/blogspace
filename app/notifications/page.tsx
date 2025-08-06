'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, UserPlus, Bell, Check, X, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '../components/navbar'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'mention'
  user: {
    name: string
    username: string
    avatar: string
  }
  content?: string
  post?: {
    id: string
    title: string
  }
  createdAt: string
  isRead: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    post: {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2024'
    },
    createdAt: '2024-01-15T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    content: 'Great article! Really helped me understand the concepts better.',
    post: {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2024'
    },
    createdAt: '2024-01-15T09:15:00Z',
    isRead: false
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Alex Rodriguez',
      username: 'alexrod',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    createdAt: '2024-01-14T16:45:00Z',
    isRead: true
  },
  {
    id: '4',
    type: 'mention',
    user: {
      name: 'Emma Thompson',
      username: 'emmathompson',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    content: 'Thanks for the insights @sarahchen! This really helped with my project.',
    post: {
      id: '2',
      title: 'Building Scalable React Applications: Best Practices'
    },
    createdAt: '2024-01-14T14:20:00Z',
    isRead: true
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Michael Brown',
      username: 'michaelbrown',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    post: {
      id: '3',
      title: 'The Art of Clean Code: Writing Maintainable Software'
    },
    createdAt: '2024-01-13T11:30:00Z',
    isRead: true
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return `${Math.floor(diffInDays / 7)}w ago`
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />
      case 'mention':
        return <Bell className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return `liked your post "${notification.post?.title}"`
      case 'comment':
        return `commented on your post "${notification.post?.title}"`
      case 'follow':
        return 'started following you'
      case 'mention':
        return `mentioned you in a comment on "${notification.post?.title}"`
      default:
        return 'sent you a notification'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.isRead
    return notification.type === activeTab
  })

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className={`transition-colors ${!notification.isRead ? 'bg-primary/5 border-primary/20' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
              {getNotificationIcon(notification.type)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Link href={`/profile/${notification.user.username}`} className="font-medium hover:text-primary">
                {notification.user.name}
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(notification.createdAt)}
                </span>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {getNotificationText(notification)}
            </p>
            
            {notification.content && (
              <div className="bg-muted rounded-lg p-3 mb-2">
                <p className="text-sm italic">"{notification.content}"</p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark as read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNotification(notification.id)}
              >
                <X className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your latest activity
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="like">
              Likes ({notifications.filter(n => n.type === 'like').length})
            </TabsTrigger>
            <TabsTrigger value="comment">
              Comments ({notifications.filter(n => n.type === 'comment').length})
            </TabsTrigger>
            <TabsTrigger value="follow">
              Follows ({notifications.filter(n => n.type === 'follow').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
