'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface UserProfile {
  name: string
  email: string
  username: string
  avatar: string
  isLoggedIn: boolean
}

interface UserProfileContextType {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  login: (name: string, email: string) => void
  logout: () => void
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    username: '',
    avatar: '/placeholder.svg?height=40&width=40',
    isLoggedIn: false
  })

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedLoginState = localStorage.getItem('isLoggedIn')
    const savedUserName = localStorage.getItem('userName')
    const savedUserEmail = localStorage.getItem('userEmail')
    
    if (savedLoginState === 'true' && savedUserName && savedUserEmail) {
      setProfile({
        name: savedUserName,
        email: savedUserEmail,
        username: savedUserName.toLowerCase().replace(/\s+/g, ''),
        avatar: '/placeholder.svg?height=40&width=40',
        isLoggedIn: true
      })
    }
  }, [])

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates }
      
      // If name is updated, also update username
      if (updates.name) {
        updated.username = updates.name.toLowerCase().replace(/\s+/g, '')
      }
      
      return updated
    })
    
    // Update localStorage
    if (updates.name) {
      localStorage.setItem('userName', updates.name)
    }
    if (updates.email) {
      localStorage.setItem('userEmail', updates.email)
    }
  }

  const login = (name: string, email: string) => {
    const newProfile = {
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, ''),
      avatar: '/placeholder.svg?height=40&width=40',
      isLoggedIn: true
    }
    
    setProfile(newProfile)
    
    // Save to localStorage
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', name)
    localStorage.setItem('userEmail', email)
  }

  const logout = () => {
    setProfile({
      name: '',
      email: '',
      username: '',
      avatar: '/placeholder.svg?height=40&width=40',
      isLoggedIn: false
    })
    
    // Clear localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, login, logout }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}
