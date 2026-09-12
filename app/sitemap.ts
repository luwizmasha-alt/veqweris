import type { MetadataRoute } from 'next'
import { NAV_ITEMS } from '@/lib/site'

const BASE_URL = 'https://veqweris.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['/', ...NAV_ITEMS.map((item) => item.href)]
  return routes.map((route) => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
