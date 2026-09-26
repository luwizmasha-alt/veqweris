'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { getUploads, saveUploads, type UploadItem } from '@/lib/admin-data'

const PAGE_OPTIONS = [
  { label: 'Systems', value: '/systems' },
  { label: 'Studios', value: '/studios' },
  { label: 'Worlds', value: '/worlds' },
  { label: 'Music', value: '/music' },
  { label: 'Gaming', value: '/gaming' },
  { label: 'Labs', value: '/labs' },
  { label: 'About', value: '/about' },
  { label: 'Careers', value: '/careers' },
]

const MUSIC_PLATFORM_OPTIONS = [
  { label: 'YouTube', value: 'https://www.youtube.com/@veqwerismusicart' },
  { label: 'YouTube Music', value: 'https://music.youtube.com/@veqwerismusicart' },
  { label: 'Spotify', value: 'https://open.spotify.com/search/veqwerismusicart' },
  { label: 'Apple Music', value: 'https://music.apple.com/search?term=veqwerismusicart' },
]

const createDefaultItem = (): Omit<UploadItem, 'id' | 'createdAt'> => ({
  category: 'systems',
  title: '',
  description: '',
  status: 'Draft',
  image: '/media/brand/veqweris-logo.png',
  href: '/systems',
})

export default function AdminPage() {
  const router = useRouter()
  const { user, isReady, logout } = useAuth()
  const [items, setItems] = useState<UploadItem[]>([])
  const [form, setForm] = useState<Omit<UploadItem, 'id' | 'createdAt'>>(createDefaultItem)

  const handleImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '/media/brand/veqweris-logo.png'
      setForm((current) => ({ ...current, image: result }))
      event.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const updateDestinationFromCategory = (category: string) => {
    const normalizedCategory = category.toLowerCase()

    if (normalizedCategory === 'music') {
      setForm((current) => ({
        ...current,
        category,
        href: MUSIC_PLATFORM_OPTIONS[0].value,
      }))
      return
    }

    const matchedPage = PAGE_OPTIONS.find((option) => option.label.toLowerCase() === normalizedCategory)
    const nextHref = matchedPage?.value ?? '/systems'

    setForm((current) => ({
      ...current,
      category,
      href: nextHref,
    }))
  }

  useEffect(() => {
    if (!isReady) {
      return
    }

    if (!user || user.role !== 'admin') {
      router.replace('/auth/login')
      return
    }

    setItems(getUploads())
  }, [isReady, router, user])

  const totalPublished = useMemo(
    () => items.filter((item) => item.status.toLowerCase() === 'published').length,
    [items],
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = form.title.trim()
    const trimmedDescription = form.description.trim()

    if (!trimmedTitle || !trimmedDescription) {
      return
    }

    const nextItem: UploadItem = {
      id: `upload-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...form,
      title: trimmedTitle,
      description: trimmedDescription,
      category: form.category.trim() || 'systems',
      href: form.href.trim() || '/systems',
      image: (form.image ?? '').trim() || '/media/brand/veqweris-logo.png',
    }

    const nextItems = [nextItem, ...items]
    setItems(nextItems)
    saveUploads(nextItems)
    setForm(createDefaultItem())
  }

  if (!isReady || !user || user.role !== 'admin') {
    return <div className="mx-auto max-w-3xl px-5 py-28 text-center text-muted-foreground">Checking access…</div>
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <div className="mb-10 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-electric-blue">
            Admin panel
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">Content manager</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              logout()
              router.replace('/auth/login')
            }}
            className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:bg-card"
          >
            Log out
          </button>
        </div>
      </div>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Items</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{items.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{totalPublished}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Account</p>
          <p className="mt-3 text-xl font-semibold text-foreground">{user.name}</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Add a new item</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-foreground">Category</label>
              <select
                value={form.category}
                onChange={(event) => updateDestinationFromCategory(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
              >
                <option value="systems">Systems</option>
                <option value="studios">Studios</option>
                <option value="worlds">Worlds</option>
                <option value="music">Music</option>
                <option value="gaming">Gaming</option>
                <option value="labs">Labs</option>
                <option value="about">About</option>
                <option value="careers">Careers</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-foreground">Title</label>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                placeholder="Project name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={4}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                placeholder="Write a concise description for the item"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-foreground">Status</label>
                <select
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="In Development">In Development</option>
                  <option value="Production">Production</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-foreground">
                  {form.category.toLowerCase() === 'music' ? 'Platform destination' : 'Destination page'}
                </label>
                <select
                  value={form.href}
                  onChange={(event) => setForm((current) => ({ ...current, href: event.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  {(form.category.toLowerCase() === 'music' ? MUSIC_PLATFORM_OPTIONS : PAGE_OPTIONS).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-foreground">Project photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                className="w-full rounded-md border border-dashed border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-primary-foreground"
              />
              <p className="mt-2 text-xs text-muted-foreground">Select an image from your device. It will be used for this project.</p>
            </div>

            {form.image ? (
              <div className="overflow-hidden rounded-xl border border-border bg-background p-3">
                <img src={form.image} alt="Project preview" className="h-28 w-full rounded-lg object-cover" />
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-electric-blue"
            >
              Upload item
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Uploaded items</h2>
          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No uploads yet. Add your first item.</p>
            ) : (
              items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || '/'}
                  className="block rounded-xl border border-border bg-background p-4 transition hover:border-electric-blue/40 hover:bg-card"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="h-12 w-12 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-electric-blue">{item.category}</p>
                    </div>
                    <span className="rounded-full border border-border px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.href}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
