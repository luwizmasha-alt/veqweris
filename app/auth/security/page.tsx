'use client'

import Link from 'next/link'
import { LockKeyhole, Monitor, ShieldCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth-ui'

const sections = [
  { icon: LockKeyhole, title: 'Password', detail: 'Change your account password and review password requirements.', action: 'Change password', href: '/auth/reset-password' },
  { icon: ShieldCheck, title: 'Two-factor authentication', detail: 'Add an authenticator app or recovery codes to protect sign-in.', action: 'Configure MFA', href: '/auth/mfa' },
  { icon: Monitor, title: 'Active sessions', detail: 'Review devices and revoke sessions you no longer recognize.', action: 'Manage sessions', href: '/auth/security' },
]

export default function SecurityPage() {
  return (
    <AuthShell eyebrow="Account controls" title="Security" description="Manage the controls that protect your VEQWERIS account.">
      <div className="space-y-3">
        {sections.map(({ icon: Icon, title, detail, action, href }) => (
          <div key={title} className="rounded-lg border border-white/[0.09] bg-white/[0.02] p-4">
            <div className="flex gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-electric-blue" aria-hidden="true" />
              <div className="min-w-0">
                <h2 className="text-sm font-medium text-foreground">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
                <Link href={href} className="mt-3 inline-flex text-xs font-medium text-electric-blue hover:text-foreground">{action}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground"><Link href="/" className="text-foreground hover:text-electric-blue">Return to VEQWERIS</Link></p>
    </AuthShell>
  )
}
