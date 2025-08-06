'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, Save, Send, ImageIcon, Bold, Italic, List, Link2, Quote, X, Upload } from 'lucide-react'
import { Navbar } from '../components/navbar'
import Image from 'next/image'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setCoverImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
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

  const insertFormatting = (format: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        break
      case 'list':
        formattedText = `- ${selectedText}`
        break
      case 'link':
        formattedText = `[${selectedText}](url)`
        break
      default:
        formattedText = selectedText
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  const readingTime = Math.ceil(content.split(' ').length / 200)

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} onAuthClick={() => {}} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Write Your Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {coverImage ? (
                      <div className="relative">
                        <Image
                          src={coverImage || "/placeholder.svg"}
                          alt="Cover"
                          width={400}
                          height={200}
                          className="rounded-lg mx-auto"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => setCoverImage(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">Drop your image here</p>
                          <p className="text-sm text-muted-foreground">or click to browse</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Choose Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file)
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your story title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Formatting Toolbar */}
                <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertFormatting('bold')}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertFormatting('italic')}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertFormatting('quote')}
                  >
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertFormatting('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertFormatting('link')}
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    ref={textareaRef}
                    id="content"
                    placeholder="Tell your story..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {content.split(' ').length} words • {readingTime} min read
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button onClick={addTag} disabled={!currentTag.trim()}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {coverImage && (
                        <Image
                          src={coverImage || "/placeholder.svg"}
                          alt="Cover"
                          width={800}
                          height={400}
                          className="rounded-lg w-full"
                        />
                      )}
                      <h1 className="text-3xl font-bold">{title || 'Untitled'}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{readingTime} min read</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      )}
                      <div className="prose prose-lg max-w-none">
                        {content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>

                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Engaging Title</h4>
                  <p className="text-muted-foreground">Make it clear and compelling</p>
                </div>
                <div>
                  <h4 className="font-medium">Strong Opening</h4>
                  <p className="text-muted-foreground">Hook readers from the first sentence</p>
                </div>
                <div>
                  <h4 className="font-medium">Use Tags</h4>
                  <p className="text-muted-foreground">Help readers discover your content</p>
                </div>
                <div>
                  <h4 className="font-medium">Add Images</h4>
                  <p className="text-muted-foreground">Visual content increases engagement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
