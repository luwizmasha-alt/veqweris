'use client'

import { useEffect, useMemo, useState } from 'react'
import { PageHero, Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { SectionHeader } from '@/components/section-header'
import { MusicCard, PlatformCard } from '@/components/cards'
import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { getUploads } from '@/lib/admin-data'
import { RELEASES, MUSIC_PLATFORMS, type Release } from '@/lib/content'

const STATUS_ORDER = ['Draft', 'Published', 'In Development'] as const

function toRelease(item: { title: string; status: string; description: string; image?: string; href?: string }): Release {
  return {
    title: item.title,
    type: 'Single',
    status: (item.status as Release['status']) || 'Draft',
    description: item.description,
    image: item.image || '/media/music/iris-drift.svg',
    alt: item.title,
    href: item.href || '/music',
  }
}

export function MusicPageClient() {
  const [musicItems, setMusicItems] = useState<Release[]>([])

  useEffect(() => {
    const savedUploads = getUploads().filter((item) => item.category === 'music')
    const uploadedReleases = savedUploads.map(toRelease)
    const merged = [...uploadedReleases, ...RELEASES]
    setMusicItems(merged)
  }, [])

  const grouped = useMemo(() => {
    const collection: Record<string, Release[]> = {
      Draft: [],
      Published: [],
      'In Development': [],
    }

    musicItems.forEach((release) => {
      const key = STATUS_ORDER.includes(release.status as (typeof STATUS_ORDER)[number])
        ? (release.status as (typeof STATUS_ORDER)[number])
        : 'Draft'

      collection[key].push(release)
    })

    return collection
  }, [musicItems])

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
              description="VEQWERIS Music is shaping a slate of singles, albums and soundtracks that move beyond the screen and into the atmosphere of the worlds themselves."
            />
          </Reveal>
          <Reveal delay={120}>
            <MediaPlaceholder
              kind="music"
              ratio="wide"
              src="/media/music/iris-drift.svg"
              alt="Iris Drift cover art"
              label="Featured Release"
            />
          </Reveal>
        </div>
      </Section>

      {STATUS_ORDER.map((status) => {
        const releases = grouped[status]
        if (releases.length === 0) {
          return null
        }

        return (
          <Section key={status} className="border-b border-border">
            <SectionHeader
              eyebrow={status === 'Draft' ? 'Drafts' : status === 'Published' ? 'Published' : 'In development'}
              title={status === 'Draft' ? 'Drafts' : status === 'Published' ? 'Published releases' : 'In development'}
            />
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
              {releases.map((release, i) => (
                <Reveal key={`${status}-${release.title}-${i}`} delay={(i % 6) * 30}>
                  <MusicCard release={release} />
                </Reveal>
              ))}
            </div>
          </Section>
        )
      })}

      <Section>
        <SectionHeader
          eyebrow="Where to listen"
          title="Streaming platforms"
          description="Official platform links are available for the catalog as releases and distribution updates come online."
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
