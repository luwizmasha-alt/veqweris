import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/lib/admin-data'

export const ADMIN_SESSION_COOKIE = 'veqweris_admin_session'
export const ADMIN_SESSION_SECRET = 'veqweris-admin-session-secret'

export async function generateAdminSessionToken() {
  const identity = `${ADMIN_SESSION_SECRET}:${DEFAULT_ADMIN_EMAIL}:${DEFAULT_ADMIN_PASSWORD}`
  const encoded = new TextEncoder().encode(identity)
  const digest = await crypto.subtle.digest('SHA-256', encoded)

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function validateAdminSessionValue(value?: string) {
  if (!value) {
    return false
  }

  const expected = await generateAdminSessionToken()
  return value === expected
}
