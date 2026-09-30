import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_SESSION_COOKIE, GOOGLE_STATE_COOKIE, createAuthSession } from '@/lib/auth-session'

type GoogleTokenResponse = { access_token?: string }
type GoogleProfile = { sub?: string; name?: string; email?: string; email_verified?: boolean }

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const savedState = cookieStore.get(GOOGLE_STATE_COOKIE)?.value
  const redirectToLogin = (reason: string) => NextResponse.redirect(new URL(`/auth/login?oauth=${reason}`, request.url))

  cookieStore.delete(GOOGLE_STATE_COOKIE)
  if (!code || !state || !savedState || state !== savedState) return redirectToLogin('google_invalid_state')

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? new URL('/api/auth/google/callback', request.url).toString()
  if (!clientId || !clientSecret || !process.env.AUTH_SESSION_SECRET) return redirectToLogin('google_not_configured')

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
    })
    if (!tokenResponse.ok) return redirectToLogin('google_exchange_failed')

    const token = (await tokenResponse.json()) as GoogleTokenResponse
    if (!token.access_token) return redirectToLogin('google_exchange_failed')

    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { authorization: `Bearer ${token.access_token}` },
    })
    if (!profileResponse.ok) return redirectToLogin('google_profile_failed')

    const profile = (await profileResponse.json()) as GoogleProfile
    if (!profile.sub || !profile.email || profile.email_verified === false) return redirectToLogin('google_profile_failed')

    const session = createAuthSession({
      id: `google-${profile.sub}`,
      name: profile.name?.trim() || profile.email,
      email: profile.email.trim().toLowerCase(),
      role: 'visitor',
      createdAt: new Date().toISOString(),
    })
    if (!session) return redirectToLogin('google_not_configured')

    cookieStore.set(AUTH_SESSION_COOKIE, session, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return NextResponse.redirect(new URL('/', request.url))
  } catch {
    return redirectToLogin('google_unavailable')
  }
}
