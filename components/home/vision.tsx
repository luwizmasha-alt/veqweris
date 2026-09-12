import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-header'
import { VeqButtonLink } from '@/components/veq-button'
import { SYSTEMS_APP_URL } from '@/lib/site'

export function Vision() {
  return (
    <>
      <Section className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>The Vision</Eyebrow>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              VEQWERIS is building for the long term — infrastructure and creative experiences
              that connect technology, storytelling and research into one continuous ambition.
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 120%, rgba(11,92,255,0.22), transparent 60%), linear-gradient(180deg, #02050a, #061326)',
          }}
        />
        <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build systems. Create worlds. Engineer what comes next.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <VeqButtonLink href={SYSTEMS_APP_URL} size="lg">
                Enter Systems
              </VeqButtonLink>
              <VeqButtonLink href="/about" variant="secondary" size="lg">
                About VEQWERIS
              </VeqButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
