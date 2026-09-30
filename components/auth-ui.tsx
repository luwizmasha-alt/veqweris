'use client'

import Link from 'next/link'
import { Check, Eye, EyeOff, LoaderCircle, ShieldCheck } from 'lucide-react'
import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  aside = true,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  aside?: boolean
}) {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(23,105,255,0.16),transparent_34%),linear-gradient(180deg,rgba(2,7,18,0.2),rgba(2,7,18,0.9))]" />
      <div className="w-full max-w-[440px] animate-[veq-reveal-up_500ms_ease-out_both]">
        <div className="mb-8 flex items-center justify-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-electric-blue" aria-hidden="true" />
          VEQWERIS SYSTEMS
        </div>
        <section className="rounded-xl border border-white/[0.1] bg-[#08111f]/90 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.32),0_0_35px_rgba(23,105,255,0.06)] backdrop-blur-xl sm:p-8">
          <header className="mb-7">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-electric-blue">{eyebrow}</p>
            <h1 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.02em] text-foreground">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </header>
          {children}
        </section>
        {aside ? (
          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
            Protected access to VEQWERIS systems.{' '}
            <Link href="/about" className="text-foreground underline decoration-white/20 underline-offset-4 hover:decoration-electric-blue">
              Learn about VEQWERIS
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  )
}

export function AuthField({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn('block space-y-2', className)}>
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input
        {...props}
        className="h-11 w-full rounded-lg border border-white/[0.12] bg-[#050b16] px-3.5 text-sm text-foreground outline-none transition placeholder:text-slate-600 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/15"
      />
    </label>
  )
}

export function PasswordField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const [visible, setVisible] = useState(false)

  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <span className="relative block">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className="h-11 w-full rounded-lg border border-white/[0.12] bg-[#050b16] px-3.5 pr-11 text-sm text-foreground outline-none transition placeholder:text-slate-600 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/15"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus:outline-none focus:ring-2 focus:ring-electric-blue/40"
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </span>
    </label>
  )
}

export function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    ['At least 8 characters', password.length >= 8],
    ['Uppercase letter', /[A-Z]/.test(password)],
    ['Lowercase letter', /[a-z]/.test(password)],
    ['Number', /\d/.test(password)],
    ['Special character', /[^A-Za-z0-9]/.test(password)],
  ] as const

  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-3">
      <p className="mb-2 text-xs font-medium text-foreground">Password requirements</p>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {requirements.map(([label, valid]) => (
          <p key={label} className={cn('flex items-center gap-1.5 text-[0.7rem]', valid ? 'text-emerald-300' : 'text-muted-foreground')}>
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </p>
        ))}
      </div>
    </div>
  )
}

export function AuthButton({ children, loading = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn('inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/40 disabled:cursor-not-allowed disabled:opacity-60', props.className)}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {loading ? `${children}...` : children}
    </button>
  )
}

export function AuthNotice({ kind = 'error', children }: { kind?: 'error' | 'success' | 'info'; children: ReactNode }) {
  const styles = {
    error: 'border-red-400/25 bg-red-400/[0.06] text-red-200',
    success: 'border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200',
    info: 'border-electric-blue/25 bg-electric-blue/[0.06] text-blue-100',
  }
  return <p role={kind === 'error' ? 'alert' : 'status'} className={cn('rounded-lg border px-3.5 py-3 text-xs leading-5', styles[kind])}>{children}</p>
}