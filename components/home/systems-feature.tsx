import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-header'
import { VeqButtonLink } from '@/components/veq-button'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { SYSTEMS_APP_URL } from '@/lib/site'

const highlights = [
  'Institutional visibility',
  'Departments & people',
  'Tasks & workflows',
  'Analytics & reporting',
  'Compliance visibility',
  'Financial integrity',
]

export function SystemsFeature() {
  return (
    <Section className="border-b border-border">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>VEQWERIS Systems</Eyebrow>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Operational clarity for the institutions that run the world
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            VEQWERIS Systems brings visibility, coordination and accountability into a single
            operational picture — helping leaders understand what is happening across their
            organization and act with confidence.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-silver">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <VeqButtonLink href={SYSTEMS_APP_URL}>Enter VEQWERIS Systems</VeqButtonLink>
            <VeqButtonLink href="/systems" variant="secondary">
              Learn more
            </VeqButtonLink>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <MediaPlaceholder
            kind="dashboard"
            ratio="wide"
            label="Systems Preview Reserved"
            sublabel="An elegant product preview will appear here."
          />
        </Reveal>
      </div>
    </Section>
  )
}
