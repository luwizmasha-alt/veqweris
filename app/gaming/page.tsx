import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { FlowDiagram } from '@/components/flow-diagram'
import { GameCard } from '@/components/cards'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { GAMES, GAME_FLOW } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Gaming',
  description:
    'VEQWERIS Gaming builds interactive experiences connected to original worlds, stories and characters.',
}

export default function GamingPage() {
  return (
    <main>
      <PageHero
        eyebrow="VEQWERIS Gaming"
        title="Step inside the worlds"
        description="VEQWERIS Gaming turns stories into experiences — interactive worlds that extend films, characters and universes into play."
      />

      <Section className="border-b border-border">
        <Reveal>
          <MediaPlaceholder
            kind="video"
            ratio="ultrawide"
            label="Key Art / Trailer Reserved"
            sublabel="Game key art, a gameplay reveal or an announce trailer will play here."
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              A single cinematic frame that introduces the flagship experience — ready to hold key
              art, gameplay visuals or an announce trailer.
            </p>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-silver/60">
              Cinematic media deferred
            </span>
          </div>
        </Reveal>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="The creative strategy"
          title="From story to interactive world"
          description="Gaming is part of a broader creative ecosystem — a strategy for extending original stories, not a technical description of how games are built."
        />
        <div className="mt-12">
          <FlowDiagram steps={GAME_FLOW} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Projects"
          title="Games in development"
          description="Interactive experiences currently in early creative design. Artwork, trailers and details are reserved."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {GAMES.map((game, i) => (
            <Reveal key={game.title + i} delay={(i % 2) * 120}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
