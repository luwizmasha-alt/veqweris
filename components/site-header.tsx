'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { NAV_ITEMS, SYSTEMS_APP_URL } from '@/lib/site'
import { VeqLogo } from '@/components/veq-logo'
import { cn } from '@/lib/utils'
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
  const { isAuthenticated, user, logout } = useAuth()
  const isAdmin = isAuthenticated && user?.role === 'admin'
  const SEARCH_ITEMS = isAdmin
    ? [...BASE_SEARCH_ITEMS, { label: 'Admin', href: '/admin', type: 'Admin', description: 'Content management area' }]
    : BASE_SEARCH_ITEMS
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<(typeof BASE_SEARCH_ITEMS)[number]>>([])

  useEffect(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      setSearchResults([])
      return
    }

    const matches = SEARCH_ITEMS.filter((item) => {
      const haystack = [item.label, item.description ?? '', item.type ?? '', item.href].join(' ').toLowerCase()
      return haystack.includes(normalized)
    }).slice(0, 6)

    setSearchResults(matches)
  }, [query])

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || open
          ? 'border-b border-border bg-near-black/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <VeqLogo />

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search VEQWERIS"
              aria-label="Search VEQWERIS pages"
              className="h-10 w-full rounded-full border border-border bg-card/80 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric-blue/60 focus:outline-none"
            />
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="M16 16L21 21" />
            </svg>

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-near-black/95 shadow-[0_20px_40px_rgba(2,5,10,0.55)] backdrop-blur-xl">
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
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-md px-3 py-2 text-[0.8rem] font-medium tracking-wide transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
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

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="hidden h-10 items-center rounded-md border border-border bg-card px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground sm:inline-flex"
                >
                  Admin
                </Link>
              )}
              {!isAdmin && (
                <Link
                  href="/"
                  className="hidden h-10 items-center rounded-md border border-border bg-card px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground sm:inline-flex"
                >
                  My account
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="hidden h-10 items-center rounded-md border border-border px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground sm:inline-flex"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden h-10 items-center rounded-md border border-border px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground transition hover:bg-card sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="hidden h-10 items-center rounded-md bg-primary px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_0_1px_rgba(45,140,255,0.4)] transition-all duration-300 hover:bg-electric-blue hover:shadow-[0_0_24px_rgba(45,140,255,0.35)] sm:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}

          <Link
            href={SYSTEMS_APP_URL}
            className="hidden h-10 items-center rounded-md bg-primary px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_0_1px_rgba(45,140,255,0.4)] transition-all duration-300 hover:bg-electric-blue hover:shadow-[0_0_24px_rgba(45,140,255,0.35)] lg:inline-flex"
          >
            Enter Systems
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
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
          'overflow-hidden border-border bg-near-black/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden',
          open ? 'max-h-[80vh] border-t opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-3 text-lg font-medium tracking-wide transition-colors',
                  active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          {isAuthenticated ? (
            <>
              <Link
                href={user?.role === 'admin' ? '/admin' : '/'}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-md border border-border bg-card text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground"
              >
                {user?.role === 'admin' ? 'Admin panel' : 'My account'}
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
