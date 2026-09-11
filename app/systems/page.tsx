import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { VeqButtonLink } from '@/components/veq-button'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { SYSTEMS_CAPABILITIES } from '@/lib/content'
import { SYSTEMS_APP_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Systems',
  description:
    'VEQWERIS Systems brings visibility, coordination, accountability and operational clarity to institutions — departments, people, tasks, workflows, analytics and compliance.',
}

const audience = [
  'CEOs',
  'Directors',
  'Principals',
  'Administrators',
  'Managers',
  'Business leaders',
  'Institutional decision-makers',
]

export default function SystemsPage() {
  return (
    <main>
      <PageHero
        eyebrow="VEQWERIS Systems"
        title="See the whole operation. Coordinate with confidence."
        description="VEQWERIS Systems is a platform for institutional visibility and operational clarity — helping leaders understand what is happening across their organization and hold work accountable."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <VeqButtonLink href={SYSTEMS_APP_URL} size="lg">
            Enter VEQWERIS Systems
          </VeqButtonLink>
          <VeqButtonLink href="/about" variant="secondary" size="lg">
            About the company
          </VeqButtonLink>
        </div>
      </PageHero>

      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Why it matters"
              title="Visibility, coordination and accountability in one place"
              description="Organizations lose clarity as they grow. VEQWERIS Systems is built to restore it — connecting the moving parts of an institution into a single, understandable operational picture."
            />
          </Reveal>
          <Reveal delay={140}>
            <MediaPlaceholder
              kind="dashboard"
              ratio="wide"
              label="Systems Preview Reserved"
              sublabel="A product preview will appear here."
            />
          </Reveal>
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="Capabilities"
          title="What VEQWERIS Systems provides"
          description="High-level capabilities designed around clarity — not complexity."
        />
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS_CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 3) * 80}>
              <div className="h-full bg-card p-7">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeader eyebrow="Who it's for" title="Built for the people accountable for the whole" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="flex flex-wrap gap-3">
              {audience.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-silver"
                >
                  {role}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 120%, rgba(11,92,255,0.2), transparent 60%), linear-gradient(180deg, #02050a, #061326)',
          }}
        />
        <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to see your operation clearly?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Enter the VEQWERIS Systems application to explore the platform.
            </p>
            <div className="mt-9 flex justify-center">
              <VeqButtonLink href={SYSTEMS_APP_URL} size="lg">
                Enter VEQWERIS Systems
              </VeqButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
