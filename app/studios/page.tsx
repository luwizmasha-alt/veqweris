import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { VeqButtonLink } from '@/components/veq-button'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { FilmCard, CharacterCard } from '@/components/cards'
import { FILMS, CHARACTERS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Studios',
  description:
    'VEQWERIS Studios develops original films, series, characters and worlds — building intellectual property designed to live across formats.',
}

const pillars = [
  { title: 'Films', copy: 'Original features and cinematic storytelling.' },
  { title: 'Series', copy: 'Serialized worlds that unfold over time.' },
  { title: 'Characters', copy: 'Figures designed to endure across stories.' },
  { title: 'Worlds', copy: 'Universes that connect every format.' },
  { title: 'Music', copy: 'Scores and sound that give worlds a voice.' },
  { title: 'Gaming', copy: 'Interactive extensions of original stories.' },
]

export default function StudiosPage() {
  return (
    <main>
      {/* Cinematic placeholder hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden border-b border-border pt-16">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(80% 70% at 50% 20%, rgba(45,140,255,0.18), transparent 55%), linear-gradient(180deg, #061326 0%, #02050a 100%)',
          }}
        />
        <div className="veq-grid absolute inset-0 -z-10 opacity-25" />
        <span className="absolute left-6 top-24 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver/50">
          Media Reserved
        </span>

        <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.34em] text-electric-blue">
              VEQWERIS Studios
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
              An original studio for films, worlds and the stories between them
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              VEQWERIS Studios develops original intellectual property — films, series, characters
              and worlds engineered to connect across music, gaming and future stories.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="What we develop"
          title="A connected creative practice"
          description="Every project is designed to belong to something larger — a single, expanding VEQWERIS universe."
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <div className="h-full bg-card p-7">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="Films"
          title="The film catalog"
          description="Projects in development across the VEQWERIS universe. Details are shared as each project is ready."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film, i) => (
            <Reveal key={film.title + i} delay={(i % 3) * 90}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader
          eyebrow="Characters"
          title="The people of the worlds"
          description="Characters are reserved until their stories are ready to be told."
        />
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {CHARACTERS.map((character, i) => (
            <Reveal key={character.name + i} delay={(i % 4) * 80}>
              <CharacterCard character={character} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-b border-border">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <Link
              href="/worlds"
              className="group flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-8 transition-colors hover:border-electric-blue/40"
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  Behind the Worlds
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Explore the original universes that connect films, characters, music and gaming.
                </p>
              </div>
              <span className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-electric-blue">
                Explore Worlds →
              </span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full items-center">
              <div>
                <SectionHeader
                  eyebrow="Original language"
                  title="A cinematic identity of our own"
                  description="VEQWERIS Studios builds its own visual and narrative language — original worlds designed for the long term, not derivative of any existing studio."
                />
                <div className="mt-8">
                  <VeqButtonLink href="/about" variant="secondary">
                    About VEQWERIS
                  </VeqButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
