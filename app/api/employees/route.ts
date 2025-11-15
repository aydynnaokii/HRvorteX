import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock employee data
    const employees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        work_hours: 48,
        stress_level: 8,
        burnout_risk: 'High',
        last_survey_date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        work_hours: 42,
        stress_level: 5,
        burnout_risk: 'Medium',
        last_survey_date: '2024-01-14'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@company.com',
        department: 'Sales',
        work_hours: 38,
        stress_level: 3,
        burnout_risk: 'Low',
        last_survey_date: '2024-01-13'
      }
    ]
    
    return NextResponse.json(employees)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}