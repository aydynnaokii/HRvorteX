import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock dashboard data
    const dashboardData = {
      total_employees: 150,
      surveys_submitted: 45,
      high_risk_count: 12,
      medium_risk_count: 18,
      low_risk_count: 15,
      avg_work_hours: 42.5,
      avg_stress_level: 6.2,
      department_breakdown: {
        Engineering: { high: 5, medium: 6, low: 4 },
        Marketing: { high: 3, medium: 4, low: 3 },
        Sales: { high: 2, medium: 5, low: 2 },
        HR: { high: 1, medium: 1, low: 3 },
        Finance: { high: 1, medium: 2, low: 3 }
      }
    }
    
    return NextResponse.json(dashboardData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}