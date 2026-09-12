import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { DIVISIONS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'VEQWERIS Tech Company builds intelligent systems, creates worlds and explores technologies that shape what comes next.',
}

const connections = [
  {
    k: 'Technology & Systems',
    v: 'Software that brings visibility and coordination to complex organizations.',
  },
  {
    k: 'Creative Production',
    v: 'Films, series, characters and worlds developed as original intellectual property.',
  },
  {
    k: 'Music & Gaming',
    v: 'Sound and interactive experiences that extend our stories beyond the screen.',
  },
  {
    k: 'Research',
    v: 'Exploration of emerging technology that informs everything we build.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About VEQWERIS"
        title="Intelligence creates tomorrow"
        description="VEQWERIS Tech Company builds intelligent systems, creates worlds and explores technologies that shape what comes next."
      />

      <Section className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeader eyebrow="The company" title="One vision across many disciplines" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <p className="text-balance text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
              We operate where intelligent technology meets creative production — engineering the
              systems institutions rely on, and the worlds audiences step into.
            </p>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
              VEQWERIS is deliberately broad. The same standards of precision and long-term thinking
              that shape our software also shape our films, music, games and research. Each division
              strengthens the others, and together they form a single, expanding company.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader eyebrow="How it connects" title="The relationship between our work" />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {connections.map((item, i) => (
            <Reveal key={item.k} delay={(i % 2) * 100}>
              <div className="h-full bg-card p-8">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Explore" title="The VEQWERIS ecosystem" />
        <div className="mt-10 flex flex-col divide-y divide-border border-y border-border">
          {DIVISIONS.map((division) => (
            <Link
              key={division.slug}
              href={division.href}
              className="group flex flex-col gap-2 py-6 transition-colors hover:bg-card/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {division.name}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {division.short}
                </p>
              </div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-electric-blue">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  )
}
