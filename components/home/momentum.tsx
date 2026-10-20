import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'
import { Eyebrow } from '@/components/section-header'
import { SYSTEMS_CAPABILITIES, RELEASES } from '@/lib/content'

export function Momentum() {
  const publishedRelease = RELEASES.find((release) => release.status === 'Published')

  return (
    <Section className="relative border-b border-border">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-6 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Engineering for the way people work, create and connect.
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            From operational tools to original music, VEQWERIS brings technology and creative production together through distinct, evolving projects.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={100}>
            <article className="group flex h-full min-h-[320px] flex-col justify-between rounded-xl border border-border bg-card p-6 transition duration-300 hover:border-electric-blue/45 sm:p-7">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-electric-blue">VEQWERIS Systems</span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">Operational clarity, in one picture.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Explore a platform focused on institutional visibility, coordinated workflows and accountable operations.
                </p>
                <ul className="mt-6 space-y-2">
                  {SYSTEMS_CAPABILITIES.slice(0, 3).map((capability) => (
                    <li key={capability.title} className="flex items-center gap-2 text-xs text-silver">
                      <span className="h-1 w-1 rounded-full bg-cyan" />
                      {capability.title}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/systems" className="mt-8 inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                Explore Systems <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </Reveal>

          <Reveal delay={180}>
            <article className="group flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-[linear-gradient(145deg,rgba(121,87,255,0.12),rgba(14,24,48,0.96)_52%)] p-6 transition duration-300 hover:border-magenta/40 sm:p-7">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fuchsia-300">VEQWERIS Music · Published</span>
                <div className="mt-5 flex items-start gap-4">
                  {publishedRelease?.image && (
                    <Image
                      src={publishedRelease.image}
                      alt={publishedRelease.alt ?? `${publishedRelease.title} artwork`}
                      width={88}
                      height={88}
                      className="h-[88px] w-[88px] shrink-0 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{publishedRelease?.title ?? 'Original music'}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {publishedRelease?.description ?? 'Original music and sound from VEQWERIS.'}
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/music" className="mt-8 inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                Explore Music <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
