'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Brain, Loader2 } from 'lucide-react'

interface AIChatbotProps {
  question?: string
  studentAnswer?: string
  isCorrect?: boolean
}

export default function AIChatbot({ question, studentAnswer, isCorrect }: AIChatbotProps) {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [userQuestion, setUserQuestion] = useState('')

  const getHelp = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question || userQuestion,
          answer: studentAnswer,
          isCorrect
        })
      })

      if (res.ok) {
        const data = await res.json()
        setResponse(data.response)
      }
    } catch (error) {
      console.error('Error getting AI help:', error)
      setResponse('Sorry, I encountered an error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold">AI Learning Assistant</h3>
          <p className="text-sm text-muted-foreground">Get instant help and explanations</p>
        </div>
      </div>

      {!question && (
        <Textarea
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask me anything about your studies..."
          className="mb-4"
          rows={3}
        />
      )}

      {!response && (
        <Button onClick={getHelp} disabled={loading || (!question && !userQuestion.trim())} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Get AI Help
            </>
          )}
        </Button>
      )}

      {response && (
        <div className="mt-4 space-y-3">
          <div className="bg-background/50 rounded-lg p-4 whitespace-pre-wrap text-sm">
            {response}
          </div>
          <Button onClick={() => setResponse('')} variant="outline" className="w-full">
            Ask Another Question
          </Button>
        </div>
      )}
    </Card>
  )
}
