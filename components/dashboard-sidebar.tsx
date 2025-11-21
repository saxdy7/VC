"use client"

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  GraduationCap, 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Video, 
  BookOpen, 
  BarChart, 
  Users, 
  ClipboardCheck,
  Youtube,
  Bot,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

interface DashboardSidebarProps {
  userRole: 'student' | 'teacher'
  userName?: string
  userImage?: string
  userEmail?: string
}

export function DashboardSidebar({ userRole, userName, userImage, userEmail }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const studentNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/student' },
    { icon: BarChart, label: 'Analytics', href: '/dashboard/student#analytics' },
    { icon: ClipboardCheck, label: 'Tasks', href: '/dashboard/student#tasks' },
    { icon: Youtube, label: 'Videos', href: '/dashboard/student#videos' },
    { icon: Bot, label: 'AI Help', href: '/dashboard/student#ai-help' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/student#appointments' },
  ]

  const teacherNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/teacher' },
    { icon: Video, label: 'Create Meeting', href: '/dashboard/teacher#meeting' },
    { icon: ClipboardCheck, label: 'Tasks', href: '/dashboard/teacher#tasks' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/teacher#appointments' },
    { icon: Users, label: 'Students', href: '/dashboard/teacher#students' },
  ]

  const navItems = userRole === 'student' ? studentNavItems : teacherNavItems

  const handleNavigation = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (pathname === path) {
        // Same page, just scroll to section
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(href)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">LearnHub</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className={collapsed ? 'mx-auto' : ''}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {userRole === 'student' ? (
                  <GraduationCap className="w-5 h-5 text-primary" />
                ) : (
                  <Users className="w-5 h-5 text-primary" />
                )}
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{userName || 'User'}</div>
                <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || item.href.includes(pathname)
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              )
            })}
          </div>
        </nav>

        <Separator />

        {/* Bottom Actions */}
        <div className="p-2 space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            onClick={() => router.push('/profile')}
          >
            <Settings className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-destructive hover:text-destructive ${collapsed ? 'px-2' : ''}`}
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
