'use client'

import Link from 'next/link'
import { Palette, Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useAuth } from '@/components/auth-provider'
import { NAV_ITEMS, SYSTEMS_APP_URL } from '@/lib/site'
import { VeqLogo } from '@/components/veq-logo'
import { cn } from '@/lib/utils'
import { getUploads } from '@/lib/admin-data'
import {
  CAREER_AREAS,
  CHARACTERS,
  DIVISIONS,
  FILMS,
  GAMES,
  LAB_INITIATIVES,
  RELEASES,
  WORLDS,
} from '@/lib/content'

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
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()
  const isAdmin = isAuthenticated && user?.role === 'admin'
  const [uploadedSearchItems, setUploadedSearchItems] = useState<Array<{ label: string; href: string; type: string; description: string }>>([])
  const SEARCH_ITEMS = useMemo(
    () => [...BASE_SEARCH_ITEMS, ...uploadedSearchItems],
    [uploadedSearchItems],
  )
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [colorTheme, setColorTheme] = useState<'blue' | 'white'>('blue')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<(typeof BASE_SEARCH_ITEMS)[number] & { type: string; description: string }>>([])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('veqweris-color-theme')
    if (savedTheme === 'white') {
      document.documentElement.dataset.colorTheme = 'white'
      setColorTheme('white')
    } else {
      document.documentElement.dataset.colorTheme = 'blue'
    }
  }, [])

  useEffect(() => {
    const syncUploadedSearchItems = async () => {
      try {
        const uploadedItems = (await getUploads()).map((item) => ({
          label: item.title,
          href: item.href || '/music',
          type: item.category.charAt(0).toUpperCase() + item.category.slice(1),
          description: item.description,
        }))
        setUploadedSearchItems(uploadedItems)
      } catch {
        setUploadedSearchItems([])
      }
    }

    void syncUploadedSearchItems()
    window.addEventListener('veqweris-upload-sync', syncUploadedSearchItems)
    window.addEventListener('storage', syncUploadedSearchItems)

    return () => {
      window.removeEventListener('veqweris-upload-sync', syncUploadedSearchItems)
      window.removeEventListener('storage', syncUploadedSearchItems)
    }
  }, [])

  useEffect(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      setSearchResults([])
      return
    }

    const matches = SEARCH_ITEMS.filter((item) => {
      const haystack = [item.label, item.description ?? '', item.type ?? '', item.href].join(' ').toLowerCase()
      return haystack.includes(normalized)
    }).slice(0, 8)

    setSearchResults(matches)
  }, [query, SEARCH_ITEMS])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search/${encodeURIComponent(trimmed)}`)
    setOpen(false)
  }

  const toggleColorTheme = () => {
    const nextTheme = colorTheme === 'blue' ? 'white' : 'blue'
    document.documentElement.dataset.colorTheme = nextTheme
    window.localStorage.setItem('veqweris-color-theme', nextTheme)
    setColorTheme(nextTheme)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || open
          ? 'border-b border-border bg-near-black/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <VeqLogo />

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-1.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] transition-colors 2xl:px-2 2xl:text-[0.67rem]',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-electric-blue" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden w-[190px] 2xl:w-[220px] xl:block">
            <div className="flex items-center overflow-hidden rounded-md border border-border bg-card/85 transition focus-within:border-cyan/60 focus-within:ring-2 focus-within:ring-cyan/15">
              <span className="flex h-10 items-center pl-3 text-muted-foreground">
                <Search aria-hidden="true" className="h-4 w-4" />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search VEQWERIS pages"
                className="h-10 w-full border-0 bg-transparent px-2 text-[0.72rem] uppercase tracking-[0.14em] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="mr-1 inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-electric-blue"
              >
                Go
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card/95 shadow-[0_16px_40px_rgba(16,37,67,0.14)] backdrop-blur-xl">
                {searchResults.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => {
                      setQuery('')
                      setSearchResults([])
                    }}
                    className="block px-4 py-3 text-sm text-foreground transition-colors hover:bg-card"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-electric-blue">
                        {item.type}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleColorTheme}
            aria-label={`Switch to ${colorTheme === 'blue' ? 'white' : 'blue'} theme`}
            aria-pressed={colorTheme === 'white'}
            title={`Switch to ${colorTheme === 'blue' ? 'white' : 'blue'} theme`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary transition hover:border-electric-blue/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            <Palette aria-hidden="true" className="h-4 w-4" />
          </button>
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <Link
                  href="/auth/security"
                  className="hidden h-9 items-center rounded-md border border-border bg-card px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-cyan/50 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  Security
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="hidden h-9 items-center rounded-md border border-border px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition hover:text-foreground sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden h-9 items-center rounded-md border border-border px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-cyan/50 hover:bg-card sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="hidden h-9 items-center rounded-md bg-primary px-4 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_0_0_1px_rgba(23,105,255,0.4)] transition-all duration-300 hover:bg-electric-blue hover:shadow-[0_0_24px_rgba(23,105,255,0.35)] sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Sign up
              </Link>
            </>
          )}

          <Link
            href={SYSTEMS_APP_URL}
            className="hidden h-9 items-center rounded-md bg-primary px-4 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_0_0_1px_rgba(23,105,255,0.4)] transition-all duration-300 hover:bg-electric-blue hover:shadow-[0_0_24px_rgba(23,105,255,0.35)] xl:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Enter Systems
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition hover:border-cyan/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  open && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-current transition-opacity duration-300',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-current transition-transform duration-300',
                  open && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'border-border bg-card/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden',
          open ? 'max-h-[calc(100dvh-72px)] overflow-y-auto border-t opacity-100' : 'max-h-0 overflow-hidden opacity-0',
        )}
        id="mobile-navigation"
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                  active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center gap-2">
            <label className="sr-only" htmlFor="mobile-search">Search VEQWERIS</label>
            <input
              id="mobile-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search VEQWERIS"
              className="h-11 min-w-0 flex-1 rounded-md border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
            />
            <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
              <Search aria-hidden="true" className="h-4 w-4" />
              Search
            </button>
          </form>
          {isAuthenticated ? (
            <>
              <Link
                href={user?.role === 'admin' ? '/admin' : '/auth/security'}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-border bg-card text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground"
              >
                {user?.role === 'admin' ? 'Admin panel' : 'Security'}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-md border border-border text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-border text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="mt-2 inline-flex h-12 items-center justify-center rounded-md bg-primary text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
              >
                Sign up
              </Link>
            </>
          )}
          <Link
            href={SYSTEMS_APP_URL}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-primary text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Enter Systems
          </Link>
        </nav>
      </div>
    </header>
  )
}
