'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { AuthButton, AuthField, AuthNotice, AuthShell, PasswordField } from '@/components/auth-ui'

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/admin' : '/')
    }
  }, [router, user])

  if (user) {
    return null
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    const authenticatedUser = login(email, password)

    if (!authenticatedUser) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.replace(authenticatedUser.role === 'admin' ? '/admin' : '/')
  }

  return (
    <AuthShell eyebrow="Secure access" title="Welcome back" description="Sign in to access your VEQWERIS account.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField id="email" label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        <PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        <div className="flex items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#1769ff]" />
            Remember me
          </label>
          <Link href="/auth/forgot-password" className="text-electric-blue hover:text-foreground">Forgot password?</Link>
        </div>
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="submit" loading={loading}>Sign in</AuthButton>
      </form>
      <div className="my-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground before:h-px before:flex-1 before:bg-white/[0.1] after:h-px after:flex-1 after:bg-white/[0.1]">Or</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" disabled className="h-10 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground opacity-70">Continue with Google</button>
        <button type="button" disabled className="h-10 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground opacity-70">Continue with Microsoft</button>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">Don&apos;t have an account? <Link href="/auth/signup" className="text-foreground hover:text-electric-blue">Create account</Link></p>
    </AuthShell>
  )
}
