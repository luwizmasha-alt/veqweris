import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-header'
import { Cpu, Lightbulb, Network, Orbit } from 'lucide-react'

const principles = [
  { title: 'Intelligent engineering', description: 'Build considered systems for complex, real-world work.', Icon: Cpu, tone: 'text-cyan' },
  { title: 'Creative innovation', description: 'Develop original stories, music and interactive ideas.', Icon: Lightbulb, tone: 'text-magenta' },
  { title: 'Future-ready technology', description: 'Explore emerging tools with curiosity and discipline.', Icon: Orbit, tone: 'text-violet' },
  { title: 'Connected experiences', description: 'Let each project contribute to a broader creative vision.', Icon: Network, tone: 'text-electric-blue' },
]

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

      <div className="mt-20 border-t border-border pt-8">
        <Eyebrow>Why VEQWERIS</Eyebrow>
        <div className="mt-7 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map(({ title, description, Icon, tone }) => (
            <article key={title} className="border-b border-border py-6 last:border-b-0 sm:even:border-l sm:even:pl-6 xl:border-b-0 xl:border-l xl:pl-6 xl:first:border-l-0 xl:first:pl-0">
              <Icon aria-hidden="true" className={`h-5 w-5 ${tone}`} strokeWidth={1.7} />
              <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
