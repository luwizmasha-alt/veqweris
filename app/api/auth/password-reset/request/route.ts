import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let body: { email?: unknown }

  try {
    body = (await request.json()) as { email?: unknown }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  return NextResponse.json(
    { error: 'Password reset is unavailable until an email and identity provider is configured.' },
    { status: 503 },
  )
}
