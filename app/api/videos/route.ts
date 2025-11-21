import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const videos = await prisma.courseVideo.findMany({
      where: { featured: true },
      orderBy: { views: 'desc' },
      take: 12
    })

    // If no videos in database, return sample data
    if (videos.length === 0) {
      const sampleVideos = [
        { id: '1', title: 'Introduction to Programming', youtubeId: 'zOjov-2OZ0E', subject: 'Computer Science', views: 120000, featured: true },
        { id: '2', title: 'Algebra Fundamentals', youtubeId: 'NybHckSEQBI', subject: 'Mathematics', views: 85000, featured: true },
        { id: '3', title: 'Physics - Motion and Forces', youtubeId: 'ZM8ECpBuQYE', subject: 'Physics', views: 62000, featured: true },
        { id: '4', title: 'Chemistry Basics', youtubeId: 'bka20Q9TN6M', subject: 'Chemistry', views: 58000, featured: true },
        { id: '5', title: 'World History Overview', youtubeId: 'ymI5Uv5cGU4', subject: 'History', views: 45000, featured: true },
        { id: '6', title: 'English Grammar Essentials', youtubeId: 'RvmT68_zd7o', subject: 'English', views: 72000, featured: true },
      ]
      return NextResponse.json({ videos: sampleVideos })
    }

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, youtubeId, subject } = await request.json()

    const video = await prisma.courseVideo.create({
      data: {
        title,
        youtubeId,
        subject,
        featured: true
      }
    })

    return NextResponse.json({ video })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()

    const video = await prisma.courseVideo.update({
      where: { id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({ video })
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
