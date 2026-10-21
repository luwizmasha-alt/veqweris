'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
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
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<(typeof BASE_SEARCH_ITEMS)[number] & { type: string; description: string }>>([])

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
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) {
      setSearchResults([])
      return
    }

    const matches = SEARCH_ITEMS.filter((item) => {
      const haystack = [item.label, item.description ?? '', item.type ?? '', item.href].join(' ').toLowerCase()
      return terms.every((term) => haystack.includes(term))
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
    const closeForDesktop = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setOpen(false)
      }
    }
    const closeForEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('resize', closeForDesktop)
    window.addEventListener('keydown', closeForEscape)
    return () => {
      window.removeEventListener('resize', closeForDesktop)
      window.removeEventListener('keydown', closeForEscape)
    }
  }, [])

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
    setQuery('')
    setSearchResults([])
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_2px_12px_rgba(16,37,67,0.06)] transition-colors duration-300',
        (scrolled || open) && 'shadow-[0_4px_18px_rgba(16,37,67,0.1)]',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <VeqLogo wordmarkClassName="text-slate-950" />

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
                  active ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950',
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
            <div className="flex items-center overflow-hidden rounded-md border border-slate-300 bg-white transition focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/15">
              <span className="flex h-10 items-center pl-3 text-slate-500">
                <Search aria-hidden="true" className="h-4 w-4" />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search VEQWERIS pages"
                className="h-10 w-full border-0 bg-transparent px-2 text-[0.72rem] uppercase tracking-[0.14em] text-slate-950 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="mr-1 inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-electric-blue"
              >
                Go
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_36px_rgba(16,37,67,0.14)]">
                {searchResults.map((item, index) => (
                  <Link
                    key={`${item.href}-${item.label}-${item.type}-${index}`}
                    href={item.href}
                    onClick={() => {
                      setQuery('')
                      setSearchResults([])
                    }}
                    className="block px-4 py-3 text-sm text-slate-950 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-electric-blue">
                        {item.type}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-slate-600">{item.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            )}
            {query.trim() && searchResults.length === 0 && (
              <p
                className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-[0_16px_36px_rgba(16,37,67,0.14)]"
                aria-live="polite"
              >
                No quick matches. Press Go to search all content.
              </p>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <Link
                  href="/auth/security"
                  className="hidden h-9 items-center rounded-md border border-slate-300 bg-white px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-electric-blue/60 hover:bg-blue-50 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                >
                  Security
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="hidden h-9 items-center rounded-md border border-slate-300 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-electric-blue/60 hover:text-slate-950 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden h-9 items-center rounded-md border border-slate-300 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-electric-blue/60 hover:bg-blue-50 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-900 transition hover:border-electric-blue/60 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue lg:hidden"
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
          'border-slate-200 bg-white transition-[max-height,opacity] duration-500 lg:hidden',
          open ? 'max-h-[calc(100dvh-72px)] overflow-y-auto border-t opacity-100' : 'max-h-0 overflow-hidden opacity-0',
        )}
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
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
                  active ? 'bg-blue-50 text-slate-950' : 'text-slate-600 hover:bg-blue-50 hover:text-slate-950',
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
              className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 placeholder:text-slate-500 focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
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
                className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-900"
              >
                {user?.role === 'admin' ? 'Admin panel' : 'Security'}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-md border border-slate-300 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-600"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-slate-300 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-900"
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
