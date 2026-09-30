import { createHmac, timingSafeEqual } from 'node:crypto'

export const AUTH_SESSION_COOKIE = 'veqweris_auth_session'
export const GOOGLE_STATE_COOKIE = 'veqweris_google_state'

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET
}

function encode(value: string) {
  return Buffer.from(value).toString('base64url')
}

function sign(value: string) {
  const secret = getSessionSecret()
  if (!secret) return null
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export type AuthSession = {
  id: string
  name: string
  email: string
  role: 'visitor' | 'admin'
  createdAt: string
  exp: number
}

export function createAuthSession(session: Omit<AuthSession, 'exp'>) {
  const payload = encode(JSON.stringify({ ...session, exp: Date.now() + 1000 * 60 * 60 * 8 }))
  const signature = sign(payload)
  return signature ? `${payload}.${signature}` : null
}

export function readAuthSession(value?: string): AuthSession | null {
  if (!value) return null
  const [payload, signature] = value.split('.')
  const expected = sign(payload)
  if (!payload || !signature || !expected) return null

  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AuthSession
    return session.exp > Date.now() ? session : null
  } catch {
    return null
  }
}
