import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const sizes = {
  default: 'h-11 px-6',
  lg: 'h-12 px-8',
  sm: 'h-9 px-4 text-[0.65rem]',
} as const

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(45,140,255,0.4)] hover:bg-electric-blue hover:shadow-[0_0_24px_rgba(45,140,255,0.35)]',
  secondary:
    'border border-border bg-transparent text-foreground hover:border-electric-blue/60 hover:bg-secondary hover:text-foreground',
  ghost: 'text-muted-foreground hover:text-foreground',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function VeqButtonLink({
  variant = 'primary',
  size = 'default',
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  const external = href.startsWith('http')
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, sizes[size], variants[variant], className)}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </Link>
  )
}

export function VeqButton({
  variant = 'primary',
  size = 'default',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
