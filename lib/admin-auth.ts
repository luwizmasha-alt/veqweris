import { createHash } from 'node:crypto'
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/lib/admin-data'

export const ADMIN_SESSION_COOKIE = 'veqweris_admin_session'
export const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? 'veqweris-admin-session-secret'

export function createAdminSessionToken() {
  const input = `${ADMIN_SESSION_SECRET}:${DEFAULT_ADMIN_EMAIL}:${DEFAULT_ADMIN_PASSWORD}`
  return createHash('sha256').update(input).digest('hex')
}

export function validateAdminSessionValue(value?: string) {
  if (!value) {
    return false
  }

  const expected = createAdminSessionToken()
  return value === expected
}
