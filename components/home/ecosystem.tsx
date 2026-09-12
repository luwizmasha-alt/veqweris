import Link from 'next/link'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { DIVISIONS } from '@/lib/content'
import { cn } from '@/lib/utils'

function ArrowLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-electric-blue">
      {label}
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function Ecosystem() {
  return (
    <Section id="ecosystem" className="border-b border-border">
      <SectionHeader
        eyebrow="The Ecosystem"
        title="One company, five connected divisions"
        description="VEQWERIS operates across technology and creative production. Each division stands on its own — and shares a single vision, identity and creative universe."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
        {DIVISIONS.map((division, i) => {
          // Systems and Labs span wider for editorial rhythm.
          const wide = division.slug === 'systems'
          return (
            <Reveal
              key={division.slug}
              delay={i * 80}
              className={wide ? 'md:col-span-6' : 'md:col-span-3'}
            >
              <Link
                href={division.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-7 transition-colors duration-300 hover:border-electric-blue/40"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 100% 0%, rgba(45,140,255,0.12), transparent 55%)',
                  }}
                />
                <div
                  className={
                    wide
                      ? 'relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12'
                      : 'relative'
                  }
                >
                  <div className={wide ? 'lg:max-w-xs' : ''}>
                    {wide && (
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-electric-blue">
                        Featured division
                      </span>
                    )}
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {division.name}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      'text-sm leading-relaxed text-muted-foreground',
                      wide ? 'lg:max-w-md lg:text-base' : 'mt-3 max-w-md',
                    )}
                  >
                    {division.description}
                  </p>
                </div>
                <div className="relative mt-8">
                  <ArrowLink label={`Explore ${division.name.replace('VEQWERIS ', '')}`} />
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
