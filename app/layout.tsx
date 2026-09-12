import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CursorSystem } from '@/components/cursor-system'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const siteUrl = 'https://veqweris.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VEQWERIS — Intelligence Creates Tomorrow',
    template: '%s — VEQWERIS',
  },
  description:
    'VEQWERIS Tech Company builds intelligent technology, creative worlds and experiences designed for what comes next. Systems, Studios, Music, Gaming and Labs.',
  applicationName: 'VEQWERIS',
  keywords: [
    'VEQWERIS',
    'technology company',
    'intelligent systems',
    'creative studios',
    'gaming',
    'music',
    'research labs',
  ],
  openGraph: {
    type: 'website',
    siteName: 'VEQWERIS',
    title: 'VEQWERIS — Intelligence Creates Tomorrow',
    description:
      'Technology, systems and creative worlds engineered for what comes next.',
    url: siteUrl,
    images: [{ url: '/media/brand/veqweris-logo.png', width: 1232, height: 1232 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VEQWERIS — Intelligence Creates Tomorrow',
    description:
      'Technology, systems and creative worlds engineered for what comes next.',
    images: ['/media/brand/veqweris-logo.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#02050a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <CursorSystem />
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
