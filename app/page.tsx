'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Video, Users, Shield, Zap, LogOut, GraduationCap, BookOpen, MessageSquare, Calendar, BarChart, Brain, Youtube } from 'lucide-react'
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
                  Interactive Learning Platform
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Connect teachers and students for personalized, interactive online learning with real-time evaluation and AI-powered assistance.
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

              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="p-6 text-center bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => router.push(session ? '/dashboard/student' : '/auth/signin?role=student')}>
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">I'm a Student</h3>
                  <p className="text-sm text-muted-foreground">Book appointments, learn, and get evaluated</p>
                </Card>
                <Card className="p-6 text-center bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => router.push(session ? '/dashboard/teacher' : '/auth/signin?role=teacher')}>
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">I'm a Teacher</h3>
                  <p className="text-sm text-muted-foreground">Create meetings, evaluate students, and track progress</p>
                </Card>
              </div>
            </div>

            {/* Right Column - Platform Features */}
            <div className="space-y-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Live Interactive Sessions</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      HD video calls with screen sharing for real-time task evaluation
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Direct Messaging</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Chat directly with teachers and students for quick questions
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Easy Appointment Booking</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Students can book sessions with their teachers seamlessly
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">AI-Powered Assistance</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Get instant help understanding incorrect answers and learning
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Performance Analytics</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Track progress with detailed marks, points, and analysis
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Curated Video Library</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Access top educational videos directly within the platform
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* How It Works Section */}
          <section id="features" className="mt-24 pt-16 border-t border-border/50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">Simple steps to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* For Students */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">For Students</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Sign Up & Choose Role</h4>
                      <p className="text-sm text-muted-foreground">Create your account and select "Student" profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Book Appointments</h4>
                      <p className="text-sm text-muted-foreground">Schedule sessions with your teachers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Join Sessions</h4>
                      <p className="text-sm text-muted-foreground">Share your screen and complete tasks in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">4</div>
                    <div>
                      <h4 className="font-semibold mb-1">Get Evaluated & Learn</h4>
                      <p className="text-sm text-muted-foreground">Receive instant feedback and AI assistance for improvement</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* For Teachers */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">For Teachers</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Sign Up & Choose Role</h4>
                      <p className="text-sm text-muted-foreground">Create your account and select "Teacher" profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Create Meeting Links</h4>
                      <p className="text-sm text-muted-foreground">Generate and share meeting links with students</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Assign Tasks</h4>
                      <p className="text-sm text-muted-foreground">Create questions and watch students perform in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">4</div>
                    <div>
                      <h4 className="font-semibold mb-1">Evaluate & Track</h4>
                      <p className="text-sm text-muted-foreground">Grade students and monitor their progress with analytics</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
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
