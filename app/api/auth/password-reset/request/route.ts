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

  // A provider must be wired before this endpoint can issue reset tokens or email links.
  if (!process.env.AUTH_EMAIL_PROVIDER) {
    return NextResponse.json(
      { error: 'Password reset is not configured on this deployment.' },
      { status: 503 },
    )
  }

  return NextResponse.json({
    message: 'If an account exists for this email address, password reset instructions have been sent.',
  })
}
