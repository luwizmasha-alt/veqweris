'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthButton, AuthField, AuthNotice, AuthShell, PasswordField, PasswordRequirements } from '@/components/auth-ui'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError('Choose a password that meets all requirements.')
      return
    }
    setLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))
    setLoading(false)
    setError('Password reset tokens are not configured for this deployment.')
  }

  return (
    <AuthShell eyebrow="Credential update" title="Create a new password" description="Use a valid reset link to choose a new password for your account.">
      {message ? <AuthNotice kind="success">{message}</AuthNotice> : null}
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <PasswordField id="password" label="New password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
        <PasswordRequirements password={password} />
        <PasswordField id="confirm-password" label="Confirm new password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required />
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="submit" loading={loading}>Reset password</AuthButton>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground"><Link href="/auth/login" className="text-foreground hover:text-electric-blue">Back to sign in</Link></p>
    </AuthShell>
  )
}
