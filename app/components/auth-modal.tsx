'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Github, Mail } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (nameFromEmail: string, email: string) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    
    // Extract name from email (part before @)
    const nameFromEmail = email.split('@')[0]
      .split(/[._-]/) // Split on dots, underscores, hyphens
      .map(part => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
      .join(' ')
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLogin(nameFromEmail, email)
    }, 1000)
  }

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Placeholder for register logic
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to BlogSpace</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmitLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => onLogin('GitHub User', 'github@example.com')}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" onClick={() => onLogin('Google User', 'google@example.com')}>
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleSubmitRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => console.log('Register with GitHub')}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" onClick={() => console.log('Register with Google')}>
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <Button variant="link" className="text-sm text-muted-foreground">
            Continue as Anonymous
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
