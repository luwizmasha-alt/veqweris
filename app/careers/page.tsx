import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { CAREER_AREAS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore career areas across VEQWERIS — engineering, product, design, AI research, film, music, gaming, operations and business.',
}

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title="Help build what comes next"
        description="VEQWERIS brings together people across technology and creative disciplines. When roles open, they will be listed here."
      />

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="Disciplines"
          title="Where people build at VEQWERIS"
          description="The areas that shape the company across its divisions."
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CAREER_AREAS.map((area, i) => (
            <Reveal key={area} delay={(i % 3) * 70}>
              <div className="flex h-full items-center gap-3 bg-card p-7">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                <span className="text-base font-medium tracking-tight text-foreground">{area}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card px-6 py-20 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="8" r="5" stroke="#2D8CFF" strokeWidth="1.3" />
                <path d="M13 12l5 5" stroke="#2D8CFF" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              No open positions right now
            </h3>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              We are not actively hiring for listed roles at the moment. New opportunities across
              our divisions will appear on this page as they open.
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
