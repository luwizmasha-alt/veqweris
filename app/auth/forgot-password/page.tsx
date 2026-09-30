'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthButton, AuthField, AuthNotice, AuthShell } from '@/components/auth-ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        setError(result.error ?? 'Unable to send a reset link right now.')
        return
      }
      setMessage(result.message ?? 'If an account exists for this email address, password reset instructions have been sent.')
    } catch {
      setError('Unable to send a reset link right now. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell eyebrow="Account recovery" title="Forgot your password?" description="Enter your email address and we&apos;ll send instructions to reset your password.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField id="email" label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        {message ? <AuthNotice kind="success">{message}</AuthNotice> : null}
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="submit" loading={loading}>Send reset link</AuthButton>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground"><Link href="/auth/login" className="text-foreground hover:text-electric-blue">Back to sign in</Link></p>
    </AuthShell>
  )
}
