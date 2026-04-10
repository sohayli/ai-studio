import { NextRequest } from 'next/server'

const API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions'
const API_KEY = process.env.AI_API_KEY || ''
const MODEL = process.env.AI_MODEL || 'gpt-4o-mini'

export async function POST(req: NextRequest) {
  try {
    const { messages, stream = false } = await req.json()

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream
      })
    })

    if (!response.ok) {
      const error = await response.text()
      return new Response(JSON.stringify({ error }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (stream) {
      // Stream response
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })
    }

    const data = await response.json()
    return Response.json(data)

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}