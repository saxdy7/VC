'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Video, Calendar, MessageSquare, Users, LogOut, Copy, Plus, BookOpen, ClipboardCheck } from 'lucide-react'
import Image from 'next/image'
import { TaskManager } from '@/components/task-manager'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function TeacherDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [roomId, setRoomId] = useState('')
  const [appointments, setAppointments] = useState([])
  const [students, setStudents] = useState([])

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

      {/* Main Content with left margin for sidebar */}
      <main className="ml-64 transition-all duration-300 min-h-screen">
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Manage your meetings, students, and appointments</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Messages</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Create Meeting Section */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Create Meeting
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generate a meeting link to share with your students
                </p>
                {roomId ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-sm text-muted-foreground mb-1">Room ID</div>
                      <div className="text-xl font-mono font-bold">{roomId}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Meeting Link</div>
                      <div className="text-sm break-all">
                        {`${window.location.origin}/room/${roomId}`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={copyMeetingLink} className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button 
                        onClick={() => router.push(`/room/${roomId}?name=${encodeURIComponent(session?.user?.name || 'Teacher')}`)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                      </Button>
                    </div>
                    <Button onClick={() => setRoomId('')} variant="ghost" className="w-full">
                      Generate New Room
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleCreateMeeting} className="w-full h-12" size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Generate Meeting Link
                  </Button>
                )}
              </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Appointments
              </h2>
              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No appointments scheduled</p>
                    <p className="text-sm">Students can book appointments with you</p>
                  </div>
                ) : (
                  appointments.map((apt: any) => (
                    <Card key={apt.id} className="p-4 bg-background/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{apt.studentName}</div>
                          <div className="text-sm text-muted-foreground">{apt.subject}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{apt.date}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Students List */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              My Students
            </h2>
            <div className="space-y-3">
              {students.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No students yet</p>
                  <p className="text-sm">Students will appear here after they book appointments</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student: any) => (
                    <Card key={student.id} className="p-4 bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.sessions} sessions</div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => router.push('/messages')}>
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Task Management Section */}
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Task Management</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <TaskManager userRole="teacher" userId={session?.user?.email || ''} />
            </TabsContent>
            
            <TabsContent value="messages">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Messages
                  </h2>
                  <Button onClick={() => router.push('/messages')}>
                    Open Messages
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Communicate with your students in real-time. Click "Open Messages" to start chatting.
                </p>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="h-16 text-base" size="lg" onClick={() => router.push('/messages')}>
              <MessageSquare className="w-5 h-5 mr-2" />
              Message Students
            </Button>
            <Button variant="outline" className="h-16 text-base" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              View Schedule
            </Button>
            <Button variant="outline" className="h-16 text-base" size="lg">
              <ClipboardCheck className="w-5 h-5 mr-2" />
              Grade Tasks
            </Button>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
