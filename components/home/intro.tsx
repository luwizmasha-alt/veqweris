import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-header'

export function Intro() {
  return (
    <Section className="border-b border-border">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>The Company</Eyebrow>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
            What VEQWERIS builds
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            VEQWERIS Tech Company builds intelligent technology, creative worlds and experiences
            designed for what comes next.
          </p>
          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            We operate at the intersection of intelligent systems and creative production —
            engineering software that brings clarity to complex organizations, and developing
            films, music, games and research that extend a single connected vision.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
