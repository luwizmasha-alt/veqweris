import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { LAB_INITIATIVES } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Labs',
  description:
    'VEQWERIS Labs is a research and experimentation division exploring intelligent systems, interaction and emerging technology.',
}

export default function LabsPage() {
  return (
    <main>
      <PageHero
        eyebrow="VEQWERIS Labs"
        title="Research into what comes next"
        description="VEQWERIS Labs is where the company explores intelligent systems, interaction and emerging technology — research that informs everything VEQWERIS builds."
      />

      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Approach"
              title="Curious, rigorous, long-term"
              description="Labs is an exploratory division. We investigate ideas that may become future products and experiences — without overstating where the research stands today."
            />
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder kind="image" ratio="wide" label="Research Imagery Reserved" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Focus areas" title="What we explore" />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {LAB_INITIATIVES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 100}>
              <div className="h-full bg-card p-8">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-electric-blue">
                  {item.area}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
