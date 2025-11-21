"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnalyticsData {
  totalPoints: number
  averageScore: number
  recentGrades: Array<{
    taskTitle: string
    points: number
    maxPoints: number
    feedback: string
    gradedAt: string
  }>
}

interface AnalyticsChartProps {
  studentId: string
}

export function AnalyticsChart({ studentId }: AnalyticsChartProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [studentId])

  const loadAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?studentId=${studentId}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading analytics...</div>
  }

  if (!analytics) {
    return <div>No analytics data available</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
            <CardDescription>Your accumulated score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{analytics.totalPoints}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
            <CardDescription>Average performance across tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{analytics.averageScore.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>Your latest task submissions and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentGrades.length === 0 ? (
              <p className="text-sm text-muted-foreground">No graded tasks yet</p>
            ) : (
              analytics.recentGrades.map((grade, index) => (
                <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{grade.taskTitle}</p>
                      <Badge variant={grade.points / grade.maxPoints >= 0.7 ? "default" : "secondary"}>
                        {grade.points}/{grade.maxPoints}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{grade.feedback}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(grade.gradedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {((grade.points / grade.maxPoints) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
