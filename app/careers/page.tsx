import type { Metadata } from 'next'
import {
  ArrowDown,
  ArrowUpRight,
  Clapperboard,
  Cpu,
  Gamepad2,
  Globe2,
  Lightbulb,
  Music2,
  Orbit,
  Settings2,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { SectionHeader } from '@/components/section-header'
import { CAREER_AREAS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore career areas across VEQWERIS — engineering, product, design, AI research, film, music, gaming, operations and business.',
}

const CAREER_DETAILS: Record<
  string,
  { description: string; icon: LucideIcon; accent: string }
> = {
  Engineering: {
    description: 'Build dependable systems that solve complex, real-world challenges.',
    icon: Cpu,
    accent: 'text-cyan-300 bg-cyan-300/10',
  },
  Product: {
    description: 'Turn ambitious ideas into useful, thoughtful products.',
    icon: Workflow,
    accent: 'text-sky-300 bg-sky-300/10',
  },
  Design: {
    description: 'Make technology and creative experiences feel clear and human.',
    icon: Lightbulb,
    accent: 'text-amber-200 bg-amber-200/10',
  },
  'AI / Research': {
    description: 'Explore emerging technologies and the possibilities they unlock.',
    icon: Orbit,
    accent: 'text-violet-300 bg-violet-300/10',
  },
  'Film / Production': {
    description: 'Develop and bring original stories to life on screen.',
    icon: Clapperboard,
    accent: 'text-rose-300 bg-rose-300/10',
  },
  Music: {
    description: 'Create sound and experiences that move stories forward.',
    icon: Music2,
    accent: 'text-fuchsia-300 bg-fuchsia-300/10',
  },
  Gaming: {
    description: 'Shape interactive worlds that invite people to play and explore.',
    icon: Gamepad2,
    accent: 'text-emerald-300 bg-emerald-300/10',
  },
  Operations: {
    description: 'Help teams, projects, and ideas move with purpose.',
    icon: Settings2,
    accent: 'text-blue-300 bg-blue-300/10',
  },
  Business: {
    description: 'Build relationships and create momentum across our divisions.',
    icon: Globe2,
    accent: 'text-orange-200 bg-orange-200/10',
  },
}

export default function CareersPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-border bg-deep-navy">
        <div className="veq-grid absolute inset-0 -z-10 opacity-40" />
        <div className="absolute -right-40 top-12 -z-10 h-96 w-96 rounded-full bg-electric-blue/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-electric-blue/30 bg-electric-blue/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 veq-pulse" />
              Careers at VEQWERIS
            </p>
            <h1 className="mt-7 max-w-3xl text-balance text-5xl font-black uppercase leading-[0.92] tracking-[0.045em] text-foreground sm:text-7xl">
              Bring curiosity.
              <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-electric-blue to-violet-300 bg-clip-text text-transparent">
                Build what&apos;s next.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Technology, stories, sound, and play — VEQWERIS brings different disciplines
              together to make ideas real.
            </p>
            <a
              href="#disciplines"
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-electric-blue/60 hover:bg-electric-blue/10"
            >
              Explore our disciplines
              <ArrowDown aria-hidden="true" className="h-4 w-4 text-cyan-300" />
            </a>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto flex aspect-square w-full max-w-[29rem] items-center justify-center"
          >
            <div className="absolute inset-[4%] rounded-full border border-electric-blue/15" />
            <div className="absolute inset-[15%] rounded-full border border-dashed border-cyan-200/20" />
            <div className="absolute inset-[27%] rounded-full border border-violet-300/20" />
            <div className="absolute inset-[26%] rounded-full bg-electric-blue/10 blur-2xl" />
            <div className="veq-float relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/15 bg-gradient-to-br from-electric-blue/30 via-deep-navy to-violet-400/20 shadow-[0_0_70px_rgba(23,105,255,0.18)] sm:h-44 sm:w-44">
              <span className="font-mono text-5xl font-bold tracking-[-0.12em] text-foreground sm:text-6xl">
                V<span className="text-cyan-300">.</span>
              </span>
            </div>
            <span className="absolute left-[8%] top-[24%] rounded-full border border-border bg-card/90 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
              Technology
            </span>
            <span className="absolute right-[1%] top-[40%] rounded-full border border-border bg-card/90 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-violet-200 sm:text-xs">
              Creativity
            </span>
            <span className="absolute bottom-[19%] left-[12%] rounded-full border border-border bg-card/90 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald-200 sm:text-xs">
              Discovery
            </span>
            <span className="absolute bottom-[14%] right-[10%] flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card/90 text-cyan-200">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </section>

      <Section id="disciplines" className="border-b border-border">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="A shared ambition"
            title="Many disciplines. One direction."
            description="Explore the different kinds of work that come together across VEQWERIS."
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-1">
            From the first sketch to systems used at scale, good work grows when different
            perspectives meet.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAREER_AREAS.map((area, i) => {
            const { description, icon: Icon, accent } = CAREER_DETAILS[area]

            return (
              <Reveal key={area} delay={(i % 3) * 70}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40 hover:bg-card/80 hover:shadow-[0_12px_36px_rgba(23,105,255,0.08)] sm:p-7">
                  <span className="absolute right-6 top-6 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground/60">
                    0{i + 1}
                  </span>
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {area}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-electric-blue/30 to-transparent transition-all duration-300 group-hover:from-cyan-200/70" />
                </article>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-electric-blue/15 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/70" />
                  Current openings
                </p>
                <h2 className="mt-4 text-balance text-3xl font-black uppercase leading-tight tracking-[0.04em] text-foreground sm:text-4xl">
                  No open roles right now.
                  <span className="block text-muted-foreground">The next chapter is ahead.</span>
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We&apos;re not actively hiring for listed positions today. When opportunities
                  open across our disciplines, you&apos;ll find them here.
                </p>
              </div>
              <a
                href="#disciplines"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-electric-blue/40 bg-electric-blue/10 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-electric-blue/70 hover:bg-electric-blue/20"
              >
                Get to know our work
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-cyan-200 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  )
}
