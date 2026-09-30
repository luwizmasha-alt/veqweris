'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AuthButton, AuthNotice, AuthShell } from '@/components/auth-ui'

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const resendVerification = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    await new Promise((resolve) => window.setTimeout(resolve, 300))
    setLoading(false)
    setError('Email delivery is not configured for this deployment.')
  }

  return (
    <AuthShell eyebrow="Account verification" title="Verify your email" description="Confirm your email address to activate secure access to VEQWERIS systems.">
      <div className="space-y-5 text-sm leading-6 text-muted-foreground">
        <div className="rounded-lg border border-electric-blue/20 bg-electric-blue/[0.06] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-electric-blue">Verification required</p>
          <p className="mt-2">A verification link will be sent to the email address on your account.</p>
        </div>
        {message ? <AuthNotice kind="success">{message}</AuthNotice> : null}
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="button" loading={loading} onClick={resendVerification}>Resend email</AuthButton>
        <p className="text-center text-xs">Didn&apos;t receive the email? You can request another verification email once delivery is configured.</p>
        <p className="text-center text-xs"><Link href="/auth/login" className="text-foreground hover:text-electric-blue">Back to sign in</Link></p>
      </div>
    </AuthShell>
  )
}
