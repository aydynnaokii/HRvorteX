import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // If an external AI backend is configured, forward request there.
    const aiUrl = process.env.AI_BACKEND_URL
    let result: any
    
    if (aiUrl) {
      try {
        const r = await fetch(aiUrl, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(body) 
        })
        result = await r.json()
      } catch (e) {
        result = { risk: 'Unknown', score: 0, error: 'AI backend error' }
      }
    } else {
      // Simple rule-based mock
      const hours = Number(body.work_hours) || 40
      const stress = Number(body.stress) || 5
      const score = Math.round((hours / 40) * 50 + (stress / 10) * 50)
      const risk = score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low'
      result = { risk, score }
    }

    // Trigger Watson & Hedera asynchronously (fire-and-forget)
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    
    try {
      await fetch(`${baseUrl}/api/watson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: body.name, risk: result.risk, score: result.score })
      })
    } catch (e) {
      console.error('Watson API error:', e)
    }

    try {
      await fetch(`${baseUrl}/api/hedera`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: body.name, risk: result.risk, score: result.score })
      })
    } catch (e) {
      console.error('Hedera API error:', e)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Predict API error:', error)
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    )
  }
}