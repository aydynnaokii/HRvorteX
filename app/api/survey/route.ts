import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Here you would typically save to a database
    console.log('Survey data received:', data)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Survey submitted successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit survey' },
      { status: 500 }
    )
  }
}