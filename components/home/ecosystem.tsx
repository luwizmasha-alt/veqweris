'use client'

import Link from 'next/link'
import { ArrowUpRight, Clapperboard, Cpu, FlaskConical, Gamepad2, Globe2, Music2 } from 'lucide-react'
import { useState } from 'react'
import { Section } from '@/components/section'
import { SectionHeader } from '@/components/section-header'
import { DIVISIONS } from '@/lib/content'
import { cn } from '@/lib/utils'

function ArrowLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cyan">
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
}

const divisionVisuals = {
  systems: { Icon: Cpu, tone: 'text-electric-blue', wash: 'bg-electric-blue/10', line: 'hover:border-electric-blue/45' },
  studios: { Icon: Clapperboard, tone: 'text-violet', wash: 'bg-violet/10', line: 'hover:border-violet/45' },
  worlds: { Icon: Globe2, tone: 'text-cyan', wash: 'bg-cyan/10', line: 'hover:border-cyan/45' },
  music: { Icon: Music2, tone: 'text-magenta', wash: 'bg-magenta/10', line: 'hover:border-magenta/45' },
  gaming: { Icon: Gamepad2, tone: 'text-primary-blue', wash: 'bg-violet/10', line: 'hover:border-violet/45' },
  labs: { Icon: FlaskConical, tone: 'text-cyan', wash: 'bg-cyan/10', line: 'hover:border-cyan/45' },
}

export function Ecosystem() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = [
    { label: 'All', matches: () => true },
    { label: 'Technology', matches: (slug: string) => slug === 'systems' },
    { label: 'Creative', matches: (slug: string) => ['studios', 'worlds', 'music', 'gaming'].includes(slug) },
    { label: 'Research', matches: (slug: string) => slug === 'labs' },
  ]
  const normalizedQuery = query.trim().toLowerCase()
  const selectedCategory = categories.find((item) => item.label === category) ?? categories[0]
  const visibleDivisions = DIVISIONS.filter((division) => {
    const matchesCategory = selectedCategory.matches(division.slug)
    const matchesQuery = !normalizedQuery || `${division.name} ${division.description} ${division.short}`.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })

  return (
    <Section id="ecosystem" className="scroll-mt-24 border-b border-border">
      <SectionHeader
        eyebrow="The Ecosystem"
        title="One company, six connected divisions"
        description="Technology and original creative work, connected by a shared ambition. Each division has its own focus while contributing to one VEQWERIS vision."
      />

      <div className="mt-10 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter divisions by category">
          {categories.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={category === item.label}
              onClick={() => setCategory(item.label)}
              className={cn(
                'h-9 rounded-md border px-3 text-[0.68rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue/40',
                category === item.label
                  ? 'border-electric-blue/50 bg-electric-blue/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-electric-blue/40 hover:text-foreground',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:max-w-[280px]">
          <span className="sr-only">Search divisions</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a division"
            className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/15"
          />
        </label>
      </div>

      <p className="mb-4 text-xs text-muted-foreground" aria-live="polite">
        Showing {visibleDivisions.length} {visibleDivisions.length === 1 ? 'division' : 'divisions'}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleDivisions.map((division) => {
          const visual = divisionVisuals[division.slug as keyof typeof divisionVisuals]
          const Icon = visual.Icon
          return (
            <article
              key={division.slug}
              className={cn(
                'group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition duration-300 animate-[veq-reveal-up_350ms_ease-out_both] hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(2,5,16,0.35)] sm:p-7',
                visual.line,
              )}
            >
              <div
                className={cn('pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90', visual.wash)}
              />
              <div className="relative">
                <span className={cn('inline-flex h-11 w-11 items-center justify-center rounded-lg', visual.wash, visual.tone)}>
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {division.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {division.description}
                </p>
              </div>
              <div className="relative mt-8">
                <Link href={division.href} className="inline-flex min-h-10 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/50">
                  <ArrowLink label={`Explore ${division.name.replace('VEQWERIS ', '')}`} />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
      {visibleDivisions.length === 0 ? (
        <div className="rounded-lg border border-border bg-card/50 px-5 py-12 text-center">
          <p className="text-sm font-medium text-foreground">No divisions match that search.</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('All') }} className="mt-3 text-xs text-electric-blue hover:text-foreground">
            Reset filters
          </button>
        </div>
      ) : null}
    </Section>
  )
}
