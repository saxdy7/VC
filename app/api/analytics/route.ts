import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        studentProfile: true,
        grades: {
          include: { task: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate statistics
    const totalGrades = await prisma.grade.count({
      where: { studentId: user.id }
    })

    const totalPoints = user.studentProfile?.totalPoints || 0

    const averageScore = totalGrades > 0
      ? await prisma.grade.aggregate({
          where: { studentId: user.id },
          _avg: { points: true }
        })
      : { _avg: { points: 0 } }

    const recentGrades = user.grades.map((grade: any) => ({
      id: grade.id,
      taskName: grade.task.question.substring(0, 50) + '...',
      points: grade.points,
      feedback: grade.feedback,
      date: grade.createdAt
    }))

    return NextResponse.json({
      totalPoints,
      totalTasks: totalGrades,
      averageScore: averageScore._avg.points || 0,
      recentGrades
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
