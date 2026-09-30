import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_SESSION_COOKIE, readAuthSession } from '@/lib/auth-session'

export async function GET() {
  const cookieStore = await cookies()
  const session = readAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ user: null }, { status: 401 })

  return NextResponse.json({
    user: {
      id: session.id,
      name: session.name,
      email: session.email,
      role: session.role,
      createdAt: session.createdAt,
    },
  })
}
