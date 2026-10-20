import Link from 'next/link'
import { NAV_ITEMS, SITE_FULL_NAME, SITE_TAGLINE, SOCIAL_LINKS } from '@/lib/site'
import { VeqLogo } from '@/components/veq-logo'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-[linear-gradient(180deg,#0a1024_0%,#050816_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <VeqLogo href="/" />
            <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cyan">
              {SITE_TAGLINE}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Intelligent technology and original creative worlds, engineered for what comes next.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-4" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-muted-foreground">
            © {year} {SITE_FULL_NAME}. All rights reserved.
          </p>
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
