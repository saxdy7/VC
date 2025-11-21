'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Video, Users, Shield, Zap, LogOut } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  const handleCreateMeeting = () => {
    const newRoomId = generateRoomId()
    const name = userName.trim() || 'Guest'
    router.push(`/room/${newRoomId}?name=${encodeURIComponent(name)}`)
  }

  const handleJoinMeeting = () => {
    if (!roomId.trim()) return
    const name = userName.trim() || 'Guest'
    router.push(`/room/${roomId.trim()}?name=${encodeURIComponent(name)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-balance">VideoConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            {session ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {session.user?.image && (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={32} 
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium">{session.user?.name}</span>
                </button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                  Connect with anyone, anywhere
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Experience crystal-clear video calls with advanced features. No downloads required.
                </p>
              </div>

              {/* Meeting Controls */}
              <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Room ID (optional)</label>
                  <Input
                    placeholder="Enter room ID to join"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    onClick={handleCreateMeeting}
                    className="flex-1 h-12 text-base font-medium"
                    size="lg"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    New Meeting
                  </Button>
                  <Button 
                    onClick={handleJoinMeeting}
                    variant="outline"
                    className="flex-1 h-12 text-base font-medium"
                    size="lg"
                    disabled={!roomId.trim()}
                  >
                    Join Meeting
                  </Button>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">HD</div>
                  <div className="text-sm text-muted-foreground">Video Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">HD Video & Audio</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Crystal-clear video quality with noise cancellation for the best experience
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">100+ Participants</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Host large meetings with up to 100 participants simultaneously
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Secure & Private</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      End-to-end encryption ensures your conversations stay private
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Instant Access</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      No downloads or installations required. Start meeting instantly
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 VideoConnect. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
