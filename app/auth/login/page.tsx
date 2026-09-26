'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getDemoAdminCredentials, useAuth } from '@/components/auth-provider'

export default function LoginPage() {
  const router = useRouter()
  const { login, user, isReady } = useAuth()
  const [email, setEmail] = useState(getDemoAdminCredentials().email)
  const [password, setPassword] = useState(getDemoAdminCredentials().password)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/admin' : '/')
    }
  }, [router, user])

  if (!isReady) {
    return <div className="mx-auto max-w-3xl px-5 py-28 text-center text-muted-foreground">Loading…</div>
  }

  if (user) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const success = login(email, password)

    if (!success) {
      setError('The email or password is incorrect. Try the admin demo credentials below.')
      return
    }

    const nextPath = email.trim().toLowerCase() === getDemoAdminCredentials().email.toLowerCase()
      ? '/admin'
      : '/'

    router.replace(nextPath)
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center px-5 py-24 sm:px-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_30px_rgba(45,140,255,0.08)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(45,140,255,0.18),transparent_45%),linear-gradient(135deg,#061326,#02050a)] p-8 sm:p-10">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-electric-blue">
              Sign in
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Access the VEQWERIS control room.
            </h1>
          </div>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>Use your workspace credentials to continue.</p>
            <div className="rounded-lg border border-border bg-black/20 p-4">
              <p className="font-medium text-foreground">Demo admin access</p>
              <p className="mt-2">Email: {getDemoAdminCredentials().email}</p>
              <p>Password: {getDemoAdminCredentials().password}</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition focus:border-electric-blue"
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
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition focus:border-electric-blue"
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
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-electric-blue"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need an account?{' '}
            <Link href="/auth/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
