'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Camera, Upload, X, RotateCcw, Check } from 'lucide-react'
import Image from 'next/image'

interface ProfilePictureUploadProps {
  currentAvatar: string
  userName: string
  onAvatarChange: (newAvatar: string) => void
}

export function ProfilePictureUpload({ currentAvatar, userName, onAvatarChange }: ProfilePictureUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    if (imageFile) {
      handleImageUpload(imageFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleSave = async () => {
    if (selectedImage) {
      setIsUploading(true)
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onAvatarChange(selectedImage)
      setIsUploading(false)
      setIsOpen(false)
      setSelectedImage(null)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setIsOpen(false)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  const presetAvatars = [
    '/placeholder.svg?height=120&width=120&text=Avatar1',
    '/placeholder.svg?height=120&width=120&text=Avatar2',
    '/placeholder.svg?height=120&width=120&text=Avatar3',
    '/placeholder.svg?height=120&width=120&text=Avatar4',
    '/placeholder.svg?height=120&width=120&text=Avatar5',
    '/placeholder.svg?height=120&width=120&text=Avatar6'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 shadow-lg"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current/Preview Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={selectedImage || currentAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userName[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              {selectedImage && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                  onClick={handleRemoveImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="space-y-4">
            <Label>Upload New Picture</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                {isDragOver ? 'Drop your image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 5MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          {/* Preset Avatars */}
          <div className="space-y-3">
            <Label>Or choose a preset</Label>
            <div className="grid grid-cols-6 gap-2">
              {presetAvatars.map((avatar, index) => (
                <button
                  key={index}
                  className={`relative rounded-full overflow-hidden border-2 transition-colors ${
                    selectedImage === avatar 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedImage(avatar)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={avatar || "/placeholder.svg"} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  {selectedImage === avatar && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSave} 
              disabled={!selectedImage || isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isUploading}>
              Cancel
            </Button>
          </div>

          {/* Tips */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• For best results, use a square image</p>
            <p>• Recommended size: 400x400 pixels or larger</p>
            <p>• Supported formats: JPG, PNG, GIF</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
