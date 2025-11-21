"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Video, Users, Calendar, Settings, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingPage() {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomId.trim()) {
      router.push(`/room/${roomId}`)
    }
  }

  const createMeeting = () => {
    const newRoomId = Math.random().toString(36).substring(7)
    router.push(`/room/${newRoomId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Video className="w-5 h-5" />
            </div>
            <span>ZoomClone</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Products
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Resources
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm" onClick={createMeeting}>
              Sign Up Free
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex items-center justify-center py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  Video calls and meetings for everyone
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect, collaborate, and celebrate from anywhere with secure video calling.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button size="lg" className="gap-2 h-12 px-6 text-base" onClick={createMeeting}>
                  <Video className="w-5 h-5" />
                  New Meeting
                </Button>

                <form onSubmit={joinRoom} className="flex w-full sm:w-auto gap-2">
                  <div className="relative w-full sm:w-64">
                    <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter a code or link"
                      className="pl-10 h-12 bg-secondary/50 border-border/50 focus-visible:ring-primary"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="h-12 px-6 text-base disabled:opacity-50"
                    disabled={!roomId.trim()}
                  >
                    Join
                  </Button>
                </form>
              </div>

              <div className="pt-8 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-4">Trusted by companies worldwide</p>
                <div className="flex flex-wrap gap-8 opacity-50 grayscale">
                  {/* Placeholders for logos */}
                  <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">Gallery View</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 aspect-video bg-black/90">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-muted/10 rounded-lg relative overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
                          <Users className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                        Participant {i}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-card border-t border-border/50 flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30 border-t border-border/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need for any meeting</h2>
              <p className="text-muted-foreground">
                Simple, reliable video conferencing for everyone. One platform for all your communication needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                    <Video className="w-6 h-6" />
                  </div>
                  <CardTitle>HD Video & Audio</CardTitle>
                  <CardDescription>
                    Crystal clear video and audio quality with noise suppression and echo cancellation.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <CardTitle>Easy Scheduling</CardTitle>
                  <CardDescription>
                    Schedule meetings in advance and send invitations directly from your calendar.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                    <Settings className="w-6 h-6" />
                  </div>
                  <CardTitle>Secure by Design</CardTitle>
                  <CardDescription>
                    End-to-end encryption and advanced security features to keep your meetings safe.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-lg text-muted-foreground">
              <Video className="w-5 h-5" />
              <span>ZoomClone</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ZoomClone Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
