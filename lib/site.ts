export const SITE_NAME = 'VEQWERIS'
export const SITE_FULL_NAME = 'VEQWERIS TECH COMPANY'
export const SITE_TAGLINE = 'INTELLIGENCE CREATES TOMORROW'

/**
 * External entrance to the separate VEQWERIS Systems application.
 * Replace with the real application URL when it is available — the website
 * does not need to be redesigned when this changes.
 */
export const SYSTEMS_APP_URL =
  process.env.NEXT_PUBLIC_SYSTEMS_APP_URL || '/systems'

export type NavItem = {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Systems', href: '/systems' },
  { label: 'Studios', href: '/studios' },
  { label: 'Worlds', href: '/worlds' },
  { label: 'Music', href: '/music' },
  { label: 'Gaming', href: '/gaming' },
  { label: 'Labs', href: '/labs' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
]

/**
 * Configurable external / social links. Left empty intentionally — no
 * accounts are invented. Populate when official channels exist.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = []
