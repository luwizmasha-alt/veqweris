'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'

export default function SignupPage() {
  const router = useRouter()
  const { signup, user, isReady } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    const success = signup(name, email, password)

    if (!success) {
      setError('The account could not be created. Please check your details or choose another email.')
      return
    }

    router.push('/')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center px-5 py-24 sm:px-8">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-[0_0_30px_rgba(45,140,255,0.08)] sm:p-10">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-electric-blue">
          Create account
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Join the VEQWERIS network.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sign up to access the website and request updates for the company ecosystem.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-electric-blue"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-electric-blue"
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
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-electric-blue"
              minLength={6}
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
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
