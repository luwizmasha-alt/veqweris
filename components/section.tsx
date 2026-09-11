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
            'radial-gradient(90% 60% at 50% -10%, rgba(45,140,255,0.16), transparent 55%), linear-gradient(180deg, #061326 0%, #02050a 100%)',
        }}
      />
      <div className="veq-grid absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.34em] text-electric-blue">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
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
