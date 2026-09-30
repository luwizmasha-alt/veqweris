'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthButton, AuthField, AuthNotice, AuthShell } from '@/components/auth-ui'

export default function MfaPage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const verifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((resolve) => window.setTimeout(resolve, 300))
    setLoading(false)
    setError('MFA verification is not connected to an authenticator provider yet.')
  }

  return (
    <AuthShell eyebrow="Step-up authentication" title="Verify your identity" description="Enter the 6-digit verification code from your authenticator app.">
      <form className="space-y-5" onSubmit={verifyCode}>
        <AuthField id="code" label="Verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="000000" autoComplete="one-time-code" required />
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="submit" loading={loading}>Verify</AuthButton>
      </form>
      <div className="mt-5 text-center text-xs">
        <Link href="/auth/security" className="text-electric-blue hover:text-foreground">Use a recovery code</Link>
      </div>
    </AuthShell>
  )
}
