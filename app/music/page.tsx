import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { MusicCard, PlatformCard } from '@/components/cards'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { RELEASES, MUSIC_PLATFORMS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'VEQWERIS Music produces original artists, singles, albums, soundtracks and scores connected to the VEQWERIS creative universe.',
}

export default function MusicPage() {
  return (
    <main>
      <PageHero
        eyebrow="VEQWERIS Music"
        title="Original sound for original worlds"
        description="VEQWERIS Music creates artists, releases, soundtracks and scores that give the VEQWERIS universe its voice — and stand on their own."
      />

      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Artists & releases"
              title="A catalog in the making"
              description="Singles, albums, soundtracks and scores are in development. Artwork and streaming details will appear as releases are ready."
            />
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder kind="music" ratio="wide" label="Featured Release Reserved" />
          </Reveal>
        </div>
      </Section>

      <Section className="border-b border-border">
        <SectionHeader eyebrow="Releases" title="Upcoming work" />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RELEASES.map((release, i) => (
            <Reveal key={release.title + i} delay={(i % 3) * 90}>
              <MusicCard release={release} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Where to listen"
          title="Streaming platforms"
          description="Official platform links will be added when releases go live. No accounts or availability are implied until then."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MUSIC_PLATFORMS.map((platform, i) => (
            <Reveal key={platform.platformName} delay={(i % 4) * 70}>
              <PlatformCard platform={platform} />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
