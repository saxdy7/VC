"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
  subject: string
  views: number
  isFeatured: boolean
}

interface VideoLibraryProps {
  subject?: string
}

export function VideoLibrary({ subject }: VideoLibraryProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [subject])

  const loadVideos = async () => {
    try {
      const params = new URLSearchParams()
      if (subject) params.append("subject", subject)
      
      const response = await fetch(`/api/videos?${params}`)
      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos || [])
        if (data.videos.length > 0 && !selectedVideo) {
          setSelectedVideo(data.videos[0])
        }
      }
    } catch (error) {
      console.error("Failed to load videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = async (video: Video) => {
    setSelectedVideo(video)
    
    // Track view
    try {
      await fetch("/api/videos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id }),
      })
      
      // Update local state
      setVideos(videos.map(v => 
        v.id === video.id ? { ...v, views: v.views + 1 } : v
      ))
    } catch (error) {
      console.error("Failed to track view:", error)
    }
  }

  if (loading) {
    return <div>Loading videos...</div>
  }

  return (
    <div className="space-y-4">
      {selectedVideo && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedVideo.title}</CardTitle>
                <CardDescription>{selectedVideo.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge>{selectedVideo.subject}</Badge>
                {selectedVideo.isFeatured && <Badge variant="secondary">Featured</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{selectedVideo.views} views</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Video Library</CardTitle>
          <CardDescription>Course-related educational content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors text-left ${
                  selectedVideo?.id === video.id
                    ? "bg-accent border-primary"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="relative w-32 h-18 flex-shrink-0 bg-muted rounded overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{video.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{video.subject}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
