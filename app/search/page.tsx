'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { CAREER_AREAS, CHARACTERS, DIVISIONS, FILMS, GAMES, LAB_INITIATIVES, RELEASES, WORLDS } from '@/lib/content'
import { getUploads } from '@/lib/admin-data'

const BASE_SEARCH_ITEMS = [
  ...DIVISIONS.map((item) => ({ label: item.name, href: item.href, type: 'Section', description: item.short })),
  ...FILMS.map((item) => ({ label: item.title, href: '/studios', type: 'Film', description: item.description })),
  ...CHARACTERS.map((item) => ({ label: item.name, href: '/studios', type: 'Character', description: item.role })),
  ...WORLDS.map((item) => ({ label: item.name, href: '/worlds', type: 'World', description: item.premise })),
  ...RELEASES.map((item) => ({ label: item.title, href: item.href || '/music', type: 'Release', description: item.description })),
  ...GAMES.map((item) => ({ label: item.title, href: '/gaming', type: 'Game', description: item.description })),
  ...LAB_INITIATIVES.map((item) => ({ label: item.title, href: '/labs', type: 'Lab', description: item.description })),
  ...CAREER_AREAS.map((item) => ({ label: item, href: '/careers', type: 'Career', description: 'Career area' })),
  { label: 'About', href: '/about', type: 'Page', description: 'Company overview' },
  { label: 'Systems', href: '/systems', type: 'Page', description: 'Operational platform' },
  { label: 'Studios', href: '/studios', type: 'Page', description: 'Creative production and IP' },
  { label: 'Worlds', href: '/worlds', type: 'Page', description: 'Story worlds and lore' },
  { label: 'Music', href: '/music', type: 'Page', description: 'Original releases and sound' },
  { label: 'Gaming', href: '/gaming', type: 'Page', description: 'Interactive experiences' },
  { label: 'Labs', href: '/labs', type: 'Page', description: 'Research and experimentation' },
  { label: 'Careers', href: '/careers', type: 'Page', description: 'Career opportunities' },
]

function toRoomSlug(label: string) {
  return encodeURIComponent(label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'room')
}

export default function SearchPage() {
  const [items, setItems] = useState(BASE_SEARCH_ITEMS)
  const [query, setQuery] = useState('')
  const [uploadStatus, setUploadStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const loadUploadedItems = async () => {
      try {
        const uploaded = (await getUploads()).map((item) => ({
          label: item.title,
          href: item.href || '/systems',
          type: item.category.charAt(0).toUpperCase() + item.category.slice(1),
          description: item.description,
        }))
        setItems([...BASE_SEARCH_ITEMS, ...uploaded])
        setUploadStatus('ready')
      } catch (error) {
        console.error('Unable to load uploaded search content.', error)
        setUploadStatus('error')
      }
    }

    void loadUploadedItems()
  }, [])

  const filteredItems = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return items

    return items.filter((item) => {
      const searchableText = `${item.label} ${item.type} ${item.description}`.toLowerCase()
      return terms.every((term) => searchableText.includes(term))
    })
  }, [items, query])

  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8">
      <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-[0_20px_60px_rgba(2,5,10,0.35)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-electric-blue">Search directory</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Explore VEQWERIS</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Search projects, divisions, and career areas across the site.
        </p>

        <label className="mt-7 flex h-12 items-center gap-3 rounded-lg border border-border bg-near-black/40 px-4 transition focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/20">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-electric-blue" />
          <span className="sr-only">Search VEQWERIS content</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “music”, “research”, or a project name"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>

        <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
          {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          {uploadStatus === 'loading' ? ' · Loading published content…' : null}
          {uploadStatus === 'error' ? ' · Some published content could not be loaded.' : null}
        </p>

        <div className="mt-4 space-y-3">
          {filteredItems.length > 0 ? filteredItems.map((item, index) => (
            <Link
              key={`${item.href}-${item.label}-${item.type}-${index}`}
              href={`/search/${toRoomSlug(item.label)}`}
              className="block rounded-xl border border-border bg-near-black/40 p-4 transition-colors hover:border-electric-blue/50 hover:bg-card"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-medium text-foreground">{item.label}</span>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-electric-blue">
                  {item.type}
                </span>
              </div>
              {item.description && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}
            </Link>
          )) : (
            <p className="rounded-xl border border-dashed border-border bg-near-black/40 p-6 text-sm text-muted-foreground">
              No matches yet. Try a different name or a broader search.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
