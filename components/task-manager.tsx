"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description: string
  maxPoints: number
  dueDate: string
  studentId: string
  studentName?: string
  submission?: {
    content: string
    submittedAt: string
  }
  grade?: {
    points: number
    feedback: string
  }
}

interface TaskManagerProps {
  userRole: "teacher" | "student"
  userId: string
}

export function TaskManager({ userRole, userId }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form states
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [maxPoints, setMaxPoints] = useState("100")
  const [studentId, setStudentId] = useState("")

  useEffect(() => {
    loadTasks()
  }, [userId])

  const loadTasks = async () => {
    try {
      const params = new URLSearchParams()
      if (userRole === "teacher") {
        params.append("teacherId", userId)
      } else {
        params.append("studentId", userId)
      }
      
      const response = await fetch(`/api/tasks?${params}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error("Failed to load tasks:", error)
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          maxPoints: parseInt(maxPoints),
          studentId,
        }),
      })

      if (response.ok) {
        setTitle("")
        setDescription("")
        setMaxPoints("100")
        setStudentId("")
        setShowCreateForm(false)
        loadTasks()
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGrade = async (taskId: string, points: number, feedback: string) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId,
          points,
          feedback,
        }),
      })

      if (response.ok) {
        loadTasks()
      }
    } catch (error) {
      console.error("Failed to grade task:", error)
    }
  }

  return (
    <div className="space-y-4">
      {userRole === "teacher" && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "Create New Task"}
          </Button>
        </div>
      )}

      {showCreateForm && userRole === "teacher" && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPoints">Max Points</Label>
                  <Input
                    id="maxPoints"
                    type="number"
                    value={maxPoints}
                    onChange={(e) => setMaxPoints(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </div>
                <Badge variant={task.grade ? "default" : "secondary"}>
                  {task.grade ? `${task.grade.points}/${task.maxPoints}` : `${task.maxPoints} pts`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {task.submission && (
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium">Submission:</p>
                  <p className="text-sm text-muted-foreground">{task.submission.content}</p>
                </div>
              )}

              {task.grade && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Feedback:</p>
                  <p className="text-sm text-muted-foreground">{task.grade.feedback}</p>
                </div>
              )}

              {userRole === "teacher" && task.submission && !task.grade && (
                <div className="space-y-2 mt-4">
                  <Label>Grade this task</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Points"
                      max={task.maxPoints}
                      id={`points-${task.id}`}
                    />
                    <Input
                      placeholder="Feedback"
                      id={`feedback-${task.id}`}
                    />
                    <Button
                      onClick={() => {
                        const points = (document.getElementById(`points-${task.id}`) as HTMLInputElement).value
                        const feedback = (document.getElementById(`feedback-${task.id}`) as HTMLInputElement).value
                        handleGrade(task.id, parseInt(points), feedback)
                      }}
                    >
                      Submit Grade
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
