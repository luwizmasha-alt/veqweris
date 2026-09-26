import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/lib/admin-data'
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const email = String(body.email ?? '').trim().toLowerCase()
  const password = String(body.password ?? '')

  if (email !== DEFAULT_ADMIN_EMAIL.toLowerCase() || password !== DEFAULT_ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: 'Invalid admin credentials' }, { status: 401 })
  }

  const cookieStore = await cookies()
  const token = createAdminSessionToken()
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return NextResponse.json({ ok: true, redirectTo: '/admin' })
}
