"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Home, RotateCcw, Star } from "lucide-react"

export default function MeetingEndedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Meeting Ended</h1>
          <p className="text-muted-foreground">You have left the meeting. We hope you had a great session!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button variant="outline" className="h-12 bg-transparent" onClick={() => router.back()}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Rejoin
          </Button>
          <Button className="h-12" onClick={() => router.push("/")}>
            <Home className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </div>

        <div className="pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">How was the quality?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className="w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center text-muted-foreground"
              >
                <Star className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
