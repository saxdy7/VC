'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Video, LogOut, Mail, User, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">VideoConnect</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <Card className="p-8 space-y-6 bg-card/50 backdrop-blur-sm border-border/50">
            {/* Avatar and Name */}
            <div className="flex flex-col items-center gap-4">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-primary/20"
                />
              ) : (
                <div className="w-30 h-30 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary" />
                </div>
              )}
              <div className="text-center">
                <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                <p className="text-muted-foreground mt-1">VideoConnect Member</p>
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Account Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                  <p className="text-base font-medium mt-1">{session.user?.email}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Display Name</p>
                  <p className="text-base font-medium mt-1">{session.user?.name}</p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-base font-medium mt-1">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base font-medium"
                onClick={() => router.push('/')}
              >
                <Video className="w-5 h-5 mr-2" />
                Start New Meeting
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-6 bg-muted/30 border-border/50">
            <div className="space-y-2">
              <h3 className="font-semibold">Account Information</h3>
              <p className="text-sm text-muted-foreground">
                Your account is secured with Google OAuth. We use this information to personalize your experience and keep your meetings secure.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
