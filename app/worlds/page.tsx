import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { FlowDiagram } from '@/components/flow-diagram'
import { WorldCard } from '@/components/cards'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { WORLDS, WORLD_FLOW } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Worlds',
  description:
    'VEQWERIS Worlds are the original creative universes that connect films, characters, music, gaming and future stories.',
}

export default function WorldsPage() {
  return (
    <main>
      <PageHero
        eyebrow="VEQWERIS Worlds"
        title="Original universes engineered to connect everything"
        description="A world is more than a setting. Each VEQWERIS world is a creative foundation designed to hold films, characters, music, games and the stories still to come."
      />

      <Section className="border-b border-border">
        <Reveal>
          <MediaPlaceholder
            kind="world"
            ratio="ultrawide"
            label="Featured World Reserved"
            sublabel="Key art or a cinematic reveal for the flagship VEQWERIS world will live here."
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              The featured world anchors the universe — a single visual identity that films,
              characters, music and gaming all extend from.
            </p>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-silver/60">
              Cinematic media deferred
            </span>
          </div>
        </Reveal>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="The creative relationship"
          title="How a world grows"
          description="This is a creative IP ecosystem — a story expands into characters, a world, its music, interactive experiences and future stories."
        />
        <div className="mt-12">
          <FlowDiagram steps={WORLD_FLOW} />
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="Universes"
          title="Worlds in development"
          description="Original universes currently taking shape. Lore, art and details are reserved until the worlds are ready."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {WORLDS.map((world, i) => (
            <Reveal key={world.name + i} delay={(i % 2) * 120}>
              <WorldCard world={world} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { k: 'Films & Series', v: 'Cinematic stories anchored in each world.' },
            { k: 'Music & Score', v: 'Original sound that defines the atmosphere.' },
            { k: 'Games & Beyond', v: 'Interactive experiences that expand the universe.' },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 90}>
              <div className="rounded-lg border border-border bg-card p-7">
                <h3 className="text-base font-semibold tracking-tight text-foreground">{item.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
