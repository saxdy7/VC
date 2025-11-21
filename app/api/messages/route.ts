import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: Fetch messages between two users
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const otherUserId = searchParams.get('userId')

    if (!otherUserId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUser.id }
        ]
      },
      include: {
        sender: { select: { name: true, image: true } },
        receiver: { select: { name: true, image: true } }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Send a new message
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { receiverId, content } = await request.json()

    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Receiver ID and content required' }, { status: 400 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const message = await prisma.message.create({
      data: {
        senderId: currentUser.id,
        receiverId,
        content
      },
      include: {
        sender: { select: { name: true, image: true } },
        receiver: { select: { name: true, image: true } }
      }
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Mark messages as read
export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { senderId } = await request.json()

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.message.updateMany({
      where: {
        senderId,
        receiverId: currentUser.id,
        read: false
      },
      data: { read: true }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error marking messages as read:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
