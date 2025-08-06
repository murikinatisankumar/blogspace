'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { User, Bell, Shield, Palette, Camera, Save, Trash2, Eye, EyeOff } from 'lucide-react'
import { Navbar } from '../components/navbar'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    username: 'sarahchen',
    email: 'sarah@example.com',
    bio: 'Full-stack developer and tech writer. Passionate about modern web technologies and sharing knowledge with the community.',
    location: 'San Francisco, CA',
    website: 'https://sarahchen.dev',
    avatar: '/placeholder.svg?height=120&width=120'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    newFollowers: true,
    comments: true,
    likes: false,
    mentions: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowComments: true,
    allowFollows: true
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handlePrivacyUpdate = (field: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and how others see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => handleProfileUpdate('username', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    {profile.bio.length}/500 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileUpdate('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleProfileUpdate('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose what email notifications you'd like to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of activity on your posts
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => handleNotificationUpdate('weeklyDigest', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage your push notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-followers">New Followers</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone follows you
                    </p>
                  </div>
                  <Switch
                    id="new-followers"
                    checked={notifications.newFollowers}
                    onCheckedChange={(checked) => handleNotificationUpdate('newFollowers', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone comments on your posts
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={notifications.comments}
                    onCheckedChange={(checked) => handleNotificationUpdate('comments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="likes">Likes</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone likes your posts
                    </p>
                  </div>
                  <Switch
                    id="likes"
                    checked={notifications.likes}
                    onCheckedChange={(checked) => handleNotificationUpdate('likes', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentions">Mentions</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone mentions you in a post or comment
                    </p>
                  </div>
                  <Switch
                    id="mentions"
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => handleNotificationUpdate('mentions', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Privacy</CardTitle>
                <CardDescription>
                  Control who can see your profile and interact with your content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Show Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your email address on your profile
                    </p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => handlePrivacyUpdate('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-location">Show Location</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your location on your profile
                    </p>
                  </div>
                  <Switch
                    id="show-location"
                    checked={privacy.showLocation}
                    onCheckedChange={(checked) => handlePrivacyUpdate('showLocation', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interaction Settings</CardTitle>
                <CardDescription>
                  Manage how others can interact with your content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-comments">Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others comment on your posts
                    </p>
                  </div>
                  <Switch
                    id="allow-comments"
                    checked={privacy.allowComments}
                    onCheckedChange={(checked) => handlePrivacyUpdate('allowComments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-follows">Allow Follows</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others follow your profile
                    </p>
                  </div>
                  <Switch
                    id="allow-follows"
                    checked={privacy.allowFollows}
                    onCheckedChange={(checked) => handlePrivacyUpdate('allowFollows', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Choose how BlogSpace looks to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      theme === 'light' ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-full h-20 bg-white border rounded mb-2"></div>
                    <p className="text-center font-medium">Light</p>
                  </div>
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      theme === 'dark' ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                    <p className="text-center font-medium">Dark</p>
                  </div>
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      theme === 'system' ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 border rounded mb-2"></div>
                    <p className="text-center font-medium">System</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
