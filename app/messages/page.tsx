'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import Messages from '@/components/messages'
import Image from 'next/image'

export default function MessagesPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users to chat with (teachers or students)
    // For now, using sample data
    setUsers([
      { id: '1', name: 'John Teacher', image: null, role: 'teacher', lastMessage: 'See you in the next session!', time: '2m ago' },
      { id: '2', name: 'Sarah Student', image: null, role: 'student', lastMessage: 'Thank you for the help', time: '1h ago' },
    ])
  }, [])

  if (selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedUser(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Messages
          </Button>
          <Messages
            recipientId={selectedUser.id}
            recipientName={selectedUser.name}
            recipientImage={selectedUser.image}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {users.length === 0 ? (
            <Card className="p-12 text-center bg-card/50">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-xl font-semibold mb-2">No conversations yet</h2>
              <p className="text-muted-foreground">Start a conversation with your teachers or students</p>
            </Card>
          ) : (
            users.map((user: any) => (
              <Card
                key={user.id}
                className="p-4 hover:bg-card/70 transition-colors cursor-pointer bg-card/50"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {user.image ? (
                      <Image src={user.image} alt={user.name} width={48} height={48} className="rounded-full" />
                    ) : (
                      <span className="text-lg font-semibold text-primary">{user.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <span className="text-xs text-muted-foreground">{user.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
