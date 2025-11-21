import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: Request) {
  try {
    const { question, answer, isCorrect } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question required' }, { status: 400 })
    }

    // Simple AI-like response (in production, integrate with OpenAI or similar)
    let aiResponse = ''

    if (isCorrect === false && answer) {
      aiResponse = `I see you answered "${answer}" for the question: "${question}". 

Let me help you understand this better:

The answer you provided isn't quite correct. Here are some key points to consider:

1. Review the fundamental concepts related to this question
2. Break down the problem into smaller parts
3. Try to identify where your reasoning might have gone off track

Would you like me to explain the correct approach? Remember, making mistakes is part of learning! Keep practicing and you'll master this concept.`
    } else if (!answer) {
      aiResponse = `You're working on: "${question}"

Here are some tips to help you get started:

1. Read the question carefully and identify what's being asked
2. Think about the concepts and principles that apply here
3. Break down the problem into manageable steps
4. Try your best - even if you're not 100% sure!

Remember, the goal is to learn and improve. Don't worry about making mistakes - they're valuable learning opportunities!`
    } else {
      aiResponse = `Great job on answering the question: "${question}"! 

Keep up the excellent work! Here are some ways to continue improving:

1. Try to explain your reasoning - this deepens understanding
2. Look for connections to other concepts you've learned
3. Challenge yourself with more complex problems

You're doing wonderfully! Keep learning and growing! 🌟`
    }

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
