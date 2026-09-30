import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { randomBytes } from 'node:crypto'
import { GOOGLE_STATE_COOKIE } from '@/lib/auth-session'

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const sessionSecret = process.env.AUTH_SESSION_SECRET
  if (!clientId || !sessionSecret) {
    return NextResponse.redirect(new URL('/auth/login?oauth=google_not_configured', request.url))
  }

  const state = randomBytes(32).toString('hex')
  const callbackUrl = process.env.GOOGLE_REDIRECT_URI ?? new URL('/api/auth/google/callback', request.url).toString()
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account',
  }).toString()

  const cookieStore = await cookies()
  cookieStore.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/auth/google',
    maxAge: 60 * 10,
  })

  return NextResponse.redirect(authorizationUrl)
}
