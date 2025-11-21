import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// GET - Fetch tasks
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tasks = await prisma.task.findMany({
      where: studentId ? { studentId } : { teacherId: user.id },
      include: { grades: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create task
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { studentId, studentName, question, points } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const task = await prisma.task.create({
      data: {
        teacherId: user.id,
        studentId,
        studentName,
        question,
        points: parseInt(points) || 10
      }
    })

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Grade task
export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { taskId, answer, isCorrect, feedback, points } = await request.json()

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        answer,
        isCorrect,
        feedback,
        points: parseInt(points)
      }
    })

    // Create grade entry
    if (isCorrect !== null) {
      await prisma.grade.create({
        data: {
          studentId: task.studentId,
          taskId: task.id,
          points: parseInt(points),
          feedback
        }
      })

      // Update student total points
      await prisma.studentProfile.update({
        where: { userId: task.studentId },
        data: {
          totalPoints: {
            increment: parseInt(points)
          }
        }
      })
    }

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Error grading task:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
