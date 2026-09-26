'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { DEFAULT_ADMIN_EMAIL } from '@/lib/admin-data'

export default function AdminLoginPage() {
  const router = useRouter()
  const { user, isReady, login } = useAuth()
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/admin' : '/')
    }
  }, [router, user])

  if (user) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const authenticatedUser = login(email, password)

    if (!authenticatedUser) {
      setError('Invalid admin credentials. Please use the authorized administrator account.')
      return
    }

    if (authenticatedUser.role !== 'admin') {
      setError('This account is not authorized for the administrator workspace.')
      return
    }

    router.replace('/admin')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center px-5 py-24 sm:px-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_30px_rgba(255,193,7,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.18),transparent_45%),linear-gradient(135deg,#1a1200,#050805)] p-8 sm:p-10">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-amber-300">
              Restricted access
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Administrator login
            </h1>
          </div>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>This portal is reserved for authorized VEQWERIS administrators.</p>
            <div className="rounded-lg border border-amber-500/30 bg-black/20 p-4">
              <p className="font-medium text-foreground">Private workspace</p>
              <p className="mt-2">Only the official admin account can continue.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Administrator email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition focus:border-amber-400"
                required
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-amber-400"
            >
              Enter admin
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Back to user login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
