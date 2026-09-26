'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient, redirectUrl } from '@/lib/supabase/client'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus('')
    const supabase = createClient()
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectUrl() } })
    setLoading(false)
    if (result.error) {
      setStatus(mode === 'login' ? 'Invalid email or password.' : 'Unable to create your account. Check your details and try again.')
      return
    }
    if (mode === 'signup') setStatus('Check your email to confirm your account, then sign in.')
    else window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-electric-blue">VEQWERIS Studio Access</p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">Make the next thing real.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Sign in to manage releases, upload music, and keep the VEQWERIS creative system moving.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><Sparkles /> Creator workspace</span><span className="inline-flex items-center gap-2"><LockKeyhole /> Private by default</span></div>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card/70 p-6 shadow-2xl sm:p-8">
          <div className="mb-8 flex gap-2 rounded-lg bg-secondary p-1"><button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-md px-4 py-2 text-sm ${mode === 'login' ? 'bg-background text-foreground' : 'text-muted-foreground'}`}>Sign in</button><button type="button" onClick={() => setMode('signup')} className={`flex-1 rounded-md px-4 py-2 text-sm ${mode === 'signup' ? 'bg-background text-foreground' : 'text-muted-foreground'}`}>Create account</button></div>
          <div className="flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm text-muted-foreground">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3 text-foreground outline-none focus:border-electric-blue" /></label><label className="flex flex-col gap-2 text-sm text-muted-foreground">Password<input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3 text-foreground outline-none focus:border-electric-blue" /></label></div>
          {status && <p role="status" className="mt-5 rounded-lg border border-electric-blue/30 bg-electric-blue/10 p-3 text-sm text-foreground">{status}</p>}
          <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full">{loading ? 'Working…' : mode === 'login' ? 'Enter dashboard' : 'Create account'} <ArrowRight data-icon="inline-end" /></Button>
          <Link href="/music" className="mt-5 block text-center text-sm text-muted-foreground hover:text-foreground">Back to music</Link>
        </form>
      </div>
    </main>
  )
}
