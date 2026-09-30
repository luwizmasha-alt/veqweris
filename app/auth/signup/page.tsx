'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { AuthButton, AuthField, AuthNotice, AuthShell, PasswordField, PasswordRequirements } from '@/components/auth-ui'

export default function SignupPage() {
  const router = useRouter()
  const { signup, user } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
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
    if (!termsAccepted) {
      setError('Accept the Terms of Service and Privacy Policy to continue.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError('Choose a password that meets all requirements.')
      return
    }
    setLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 250))
    const success = signup(`${firstName.trim()} ${lastName.trim()}`, email, password)

    if (!success) {
      setError('The account could not be created. Please check your details or use another email.')
      setLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <AuthShell eyebrow="New account" title="Create your VEQWERIS account" description="Set up secure access to VEQWERIS systems.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField id="first-name" label="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" required />
          <AuthField id="last-name" label="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" required />
        </div>
        <AuthField id="email" label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        <PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
        <PasswordRequirements password={password} />
        <PasswordField id="confirm-password" label="Confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required />
        {confirmPassword && password !== confirmPassword ? <p className="text-xs text-red-300">Passwords do not match.</p> : null}
        <label className="flex items-start gap-2.5 pt-1 text-xs leading-5 text-muted-foreground">
          <input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-transparent accent-[#1769ff]" />
          <span>I agree to the <Link href="/about" className="text-foreground underline underline-offset-4">Terms of Service</Link> and Privacy Policy.</span>
        </label>
        {error ? <AuthNotice>{error}</AuthNotice> : null}
        <AuthButton type="submit" loading={loading}>Create account</AuthButton>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">Already have an account? <Link href="/auth/login" className="text-foreground hover:text-electric-blue">Sign in</Link></p>
    </AuthShell>
  )
}
