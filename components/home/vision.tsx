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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_100%,rgba(101,66,184,0.11),transparent_58%),radial-gradient(45%_60%_at_12%_0%,rgba(21,94,239,0.11),transparent_62%),linear-gradient(145deg,#ffffff,#edf4ff_72%)]" />
        <div className="veq-grid absolute inset-0 -z-10 opacity-20" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <div className="max-w-4xl border-l border-cyan/60 pl-6 sm:pl-10">
              <Eyebrow>Intelligence Creates Tomorrow</Eyebrow>
              <h2 className="mt-7 text-balance text-4xl font-semibold uppercase leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Intelligence creates tomorrow.
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Technology and original creative work, engineered with a long view.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 pl-6 sm:flex-row sm:pl-10">
              <VeqButtonLink href={SYSTEMS_APP_URL} size="lg">
                Enter Systems
              </VeqButtonLink>
              <VeqButtonLink href="/about" variant="secondary" size="lg">
                About VEQWERIS
              </VeqButtonLink>
              <VeqButtonLink href="#ecosystem" variant="ghost" size="lg" className="text-muted-foreground">
                Explore divisions
              </VeqButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
