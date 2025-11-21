'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Video, Calendar, MessageSquare, Users, Copy, BookOpen } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function TeacherDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?role=teacher')
    }
  }, [status, router])

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  const handleCreateMeeting = () => {
    const newRoomId = generateRoomId()
    setRoomId(newRoomId)
  }

  const copyMeetingLink = () => {
    const link = `${window.location.origin}/room/${roomId}?name=${encodeURIComponent(session?.user?.name || 'Teacher')}`
    navigator.clipboard.writeText(link)
    alert('Meeting link copied to clipboard!')
  }

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
      {/* Sidebar */}
      <DashboardSidebar
        userRole="teacher"
        userName={session?.user?.name || undefined}
        userImage={session?.user?.image || undefined}
        userEmail={session?.user?.email || undefined}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300 min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Manage your classes and connect with students</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Students</div>
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
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
              </div>
            </Card>

          </div>

          {/* Create Meeting Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-6 h-6 text-primary" />
                Create Meeting
              </CardTitle>
              <CardDescription>
                Generate an instant meeting link to share with your students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!roomId ? (
                <div className="text-center py-8">
                  <Button onClick={handleCreateMeeting} size="lg">
                    Generate Meeting Link
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={`${window.location.origin}/room/${roomId}`}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={copyMeetingLink} variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => router.push(`/room/${roomId}?name=${encodeURIComponent(session?.user?.name || 'Teacher')}`)}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </Button>
                    <Button onClick={handleCreateMeeting} variant="outline">
                      Generate New
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Teaching Hub
              </CardTitle>
              <CardDescription>
                Use the sidebar to access all teaching tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your classes using the sidebar:
              </p>
              <ul className="space-y-2 text-sm">
                <li>📝 <strong>Tasks</strong> - Create and grade assignments</li>
                <li>💬 <strong>Messages</strong> - Communicate with students</li>
                <li>📅 <strong>Appointments</strong> - Manage student sessions</li>
                <li>👥 <strong>Students</strong> - View your student list</li>
                <li>🎥 <strong>Create Meeting</strong> - Start video sessions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
