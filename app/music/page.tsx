import type { Metadata } from 'next'
import { MusicPageClient } from '@/components/music-page-client'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'VEQWERIS Music produces original artists, singles, albums, soundtracks and scores connected to the VEQWERIS creative universe.',
}

export default function MusicPage() {
  return <MusicPageClient />
}
