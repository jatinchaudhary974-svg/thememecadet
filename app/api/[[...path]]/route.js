import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const path = (await params)?.path || []
  const route = Array.isArray(path) ? path.join('/') : ''

  if (route === '' || route === 'health') {
    return NextResponse.json({
      status: 'ok',
      brand: 'THEMEMECADET',
      motto: 'Vision to Execution',
      tagline: 'VEER BHOGYA VASUNDHARA',
      established: 'October 2025',
    })
  }

  return NextResponse.json({ error: 'Not found', route }, { status: 404 })
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
