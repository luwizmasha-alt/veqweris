export type UserRole = 'admin' | 'visitor'

export type SiteUser = {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: string
}

export type UploadItem = {
  id: string
  category: string
  title: string
  description: string
  status: string
  image: string
  href: string
  createdAt: string
}

export const AUTH_STORAGE_KEY = 'veqweris-auth-user'
export const USERS_STORAGE_KEY = 'veqweris-users'
export const UPLOADS_STORAGE_KEY = 'veqweris-admin-uploads'

export const DEFAULT_ADMIN_EMAIL = 'admin@veqweris.com'
export const DEFAULT_ADMIN_PASSWORD = 'veqwerisadmin'

const defaultAdminUser: SiteUser = {
  id: 'veqweris-admin',
  name: 'VEQWERIS Admin',
  email: DEFAULT_ADMIN_EMAIL,
  password: DEFAULT_ADMIN_PASSWORD,
  role: 'admin',
  createdAt: new Date().toISOString(),
}

export const DEFAULT_UPLOADS: UploadItem[] = [
  {
    id: 'launch-system',
    category: 'systems',
    title: 'Operations Overview',
    description: 'Institutional operating dashboard for teams, tasks, and reporting layers.',
    status: 'Published',
    image: '/media/brand/veqweris-logo.png',
    href: '/systems',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'music-draft',
    category: 'music',
    title: 'Signal / Noise',
    description: 'Cinematic score and soundtrack concept for the VEQWERIS universe.',
    status: 'Draft',
    image: '/media/music/signal-noise.svg',
    href: '/music',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'music-in-dev',
    category: 'music',
    title: 'Atlas of Echoes',
    description: 'A layered narrative album tracing memory, motion and the emotional topology of an imagined world.',
    status: 'In Development',
    image: '/media/music/atlas-of-echoes.svg',
    href: '/music',
    createdAt: new Date().toISOString(),
  },
]

function readStorage<T>(storageKey: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey)
    if (!rawValue) {
      return fallback
    }

    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

function writeStorage<T>(storageKey: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value))
}

export function ensureSeededUsers(): SiteUser[] {
  const storedUsers = readStorage<SiteUser[]>(USERS_STORAGE_KEY, [])

  if (storedUsers.length > 0) {
    return storedUsers
  }

  writeStorage(USERS_STORAGE_KEY, [defaultAdminUser])
  return [defaultAdminUser]
}

export function saveUsers(users: SiteUser[]) {
  writeStorage(USERS_STORAGE_KEY, users)
}

export function getUploads(): UploadItem[] {
  const storedUploads = readStorage<UploadItem[]>(UPLOADS_STORAGE_KEY, [])
  if (storedUploads.length > 0) {
    return storedUploads
  }

  writeStorage(UPLOADS_STORAGE_KEY, DEFAULT_UPLOADS)
  return DEFAULT_UPLOADS
}

export function saveUploads(items: UploadItem[]) {
  writeStorage(UPLOADS_STORAGE_KEY, items)
}
