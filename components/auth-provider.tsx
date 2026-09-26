'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AUTH_STORAGE_KEY,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  ensureSeededUsers,
  saveUsers,
  type SiteUser,
} from '@/lib/admin-data'

type AuthContextValue = {
  user: SiteUser | null
  isReady: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SiteUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    ensureSeededUsers()

    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as SiteUser)
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }

    setIsReady(true)
  }, [])

  const login = useCallback((email: string, password: string) => {
    const users = ensureSeededUsers()
    const foundUser = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password,
    )

    if (!foundUser) {
      return false
    }

    setUser(foundUser)
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser))
    return true
  }, [])

  const signup = useCallback((name: string, email: string, password: string) => {
    const users = ensureSeededUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (!name.trim() || !normalizedEmail || password.length < 6) {
      return false
    }

    const alreadyExists = users.some(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail,
    )

    if (alreadyExists) {
      return false
    }

    const newUser: SiteUser = {
      id: `guest-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'visitor',
      createdAt: new Date().toISOString(),
    }

    const nextUsers = [...users, newUser]
    saveUsers(nextUsers)
    setUser(newUser)
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, isReady, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

export function getDemoAdminCredentials() {
  return {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
  }
}
