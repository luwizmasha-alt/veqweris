import { cn } from '@/lib/utils'

export function Section({
  children,
  className,
  id,
  as = 'section',
}: {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div'
}) {
  const Tag = as as React.ElementType
  return (
    <Tag id={id} className={cn('py-20 sm:py-28', className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </Tag>
  )
}

/** Full-bleed page hero used on interior pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(0,107,145,0.06), transparent 38%), radial-gradient(80% 60% at 50% 20%, rgba(101,66,184,0.1), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f0f5ff 100%)',
        }}
      />
      <div className="veq-grid absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.34em] text-electric-blue">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black uppercase leading-[0.9] tracking-[0.08em] text-foreground sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}
