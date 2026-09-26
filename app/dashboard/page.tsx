'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, AudioLines, CheckCircle2, LogOut, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { createClient().auth.getUser().then(({ data }) => { if (!data.user) window.location.href = '/auth'; else { setUserEmail(data.user.email ?? ''); setLoading(false) } }) }, [])

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file) return
    setMessage('Uploading…')
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
    const path = `${crypto.randomUUID()}-${safeName}`
    const { error } = await createClient().storage.from('music').upload(path, file, { contentType: file.type, upsert: false })
    setMessage(error ? 'Upload could not be completed. Make sure the music storage bucket is configured.' : 'Track uploaded and ready for review.')
  }

  if (loading) return <main className="min-h-screen px-5 pb-20 pt-32"><div className="mx-auto max-w-5xl text-muted-foreground">Loading workspace…</div></main>
  return <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8"><div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.3em] text-electric-blue">Creator workspace</p><h1 className="mt-3 text-4xl font-semibold text-foreground">Dashboard</h1><p className="mt-2 text-muted-foreground">Signed in as {userEmail}</p></div><Button variant="outline" onClick={async () => { await createClient().auth.signOut(); window.location.href = '/' }}><LogOut data-icon="inline-start" /> Sign out</Button></div><div className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><aside className="rounded-2xl border border-border bg-card/60 p-6"><AudioLines className="text-electric-blue" /><h2 className="mt-6 text-xl font-medium text-foreground">Music catalog</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Upload audio files and keep release metadata together for review.</p><Link href="/music" className="mt-8 inline-flex items-center gap-2 text-sm text-foreground hover:text-electric-blue"><ArrowLeft /> View public music page</Link></aside><form onSubmit={upload} className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"><h2 className="text-2xl font-medium text-foreground">Upload a new track</h2><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm text-muted-foreground">Track title<input required value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3 text-foreground outline-none focus:border-electric-blue" /></label><label className="flex flex-col gap-2 text-sm text-muted-foreground">Artist name<input required value={artist} onChange={(e) => setArtist(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3 text-foreground outline-none focus:border-electric-blue" /></label></div><label className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-electric-blue/40 bg-electric-blue/5 p-6 text-center text-sm text-muted-foreground hover:border-electric-blue"><Upload className="mb-3 text-electric-blue" />{file ? <span className="text-foreground">{file.name}</span> : <span>Choose MP3, WAV, FLAC or M4A</span>}<input required type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="sr-only" /></label>{message && <p role="status" className="mt-5 flex items-center gap-2 text-sm text-foreground">{message.includes('ready') && <CheckCircle2 className="text-electric-blue" />}{message}</p>}<Button type="submit" size="lg" disabled={!file} className="mt-6">Upload track</Button></form></div></div></main>
}
