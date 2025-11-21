'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { GraduationCap, Calendar, Video, BarChart, MessageSquare, LogOut, BookOpen, Youtube, Trophy } from 'lucide-react'
import Image from 'next/image'

export default function StudentDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [appointments, setAppointments] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [recentGrades, setRecentGrades] = useState([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?role=student')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Student Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'Student'} 
                width={40} 
                height={40}
                className="rounded-full"
              />
            )}
            <div className="hidden md:block">
              <div className="font-semibold">{session?.user?.name}</div>
              <div className="text-xs text-muted-foreground">Student</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Track your progress and manage your learning</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Appointments</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0%</div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Sessions
                </h2>
                <Button size="sm">
                  Book Appointment
                </Button>
              </div>
              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No appointments scheduled</p>
                    <p className="text-sm">Book a session with your teacher to get started</p>
                  </div>
                ) : (
                  appointments.map((apt: any) => (
                    <Card key={apt.id} className="p-4 bg-background/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{apt.teacherName}</div>
                          <div className="text-sm text-muted-foreground">{apt.subject}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{apt.date}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Join Session
                      </Button>
                    </Card>
                  ))
                )}
              </div>
            </Card>

            {/* Recent Performance */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                Recent Performance
              </h2>
              <div className="space-y-3">
                {recentGrades.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No grades yet</p>
                    <p className="text-sm">Complete tasks to see your performance</p>
                  </div>
                ) : (
                  recentGrades.map((grade: any) => (
                    <Card key={grade.id} className="p-4 bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{grade.taskName}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-primary">{grade.points}</div>
                          <div className="text-sm text-muted-foreground">pts</div>
                        </div>
                      </div>
                      {grade.feedback && (
                        <p className="text-sm text-muted-foreground">{grade.feedback}</p>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Course Videos Section */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Youtube className="w-5 h-5 text-primary" />
              Recommended Learning Videos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: "Introduction to Programming", subject: "Computer Science", views: "1.2M" },
                { id: 2, title: "Algebra Fundamentals", subject: "Mathematics", views: "850K" },
                { id: 3, title: "Scientific Method Explained", subject: "Science", views: "620K" },
              ].map((video) => (
                <Card key={video.id} className="p-4 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
                  <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <Youtube className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.subject}</span>
                    <span>{video.views} views</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="h-16 text-base" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Book New Appointment
            </Button>
            <Button variant="outline" className="h-16 text-base" size="lg">
              <MessageSquare className="w-5 h-5 mr-2" />
              Message Teacher
            </Button>
            <Button variant="outline" className="h-16 text-base" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Courses
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
