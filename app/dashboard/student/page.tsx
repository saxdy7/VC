'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Calendar, Video, TrendingUp, BookOpen } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function StudentDashboard() {
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userRole="student" />
      
      <div className="flex-1 ml-64">
        <div className="container mx-auto px-8 py-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {session?.user?.name || 'Student'}
            </h1>
            <p className="text-muted-foreground">
              Track your progress and manage your learning activities
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Appointments</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Sessions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Learning Hub
              </CardTitle>
              <CardDescription>
                Use the sidebar to access all your learning tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Explore your learning resources using the sidebar:
              </p>
              <ul className="space-y-2 text-sm">
                <li>📊 <strong>Analytics</strong> - Track your performance</li>
                <li>✅ <strong>Tasks</strong> - View and submit assignments</li>
                <li>🎥 <strong>Videos</strong> - Access course materials</li>
                <li>🤖 <strong>AI Help</strong> - Get instant learning assistance</li>
                <li>💬 <strong>Messages</strong> - Chat with teachers</li>
                <li>📅 <strong>Appointments</strong> - Book sessions with teachers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
