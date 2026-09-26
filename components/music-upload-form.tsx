'use client'

import { useRef, useState } from 'react'
import { Check, FileAudio, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ACCEPTED_TYPES = 'audio/mpeg,audio/wav,audio/x-wav,audio/mp4,audio/flac'

export function MusicUploadForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setFileName(file?.name ?? '')
    setSubmitted(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!fileName) {
      inputRef.current?.focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Private upload</p>
          <h3 className="mt-2 font-sans text-2xl font-medium tracking-tight">Add a release</h3>
        </div>
        <FileAudio aria-hidden="true" className="size-6 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="music-file" className="mb-2 block text-sm font-medium">Audio file</label>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex min-h-32 w-full flex-col items-center justify-center border border-dashed border-border bg-background px-6 text-center transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Upload aria-hidden="true" className="mb-3 size-5 text-muted-foreground" />
            <span className="text-sm font-medium">{fileName || 'Choose an audio file'}</span>
            <span className="mt-1 text-xs text-muted-foreground">MP3, WAV, M4A or FLAC</span>
          </button>
          <input ref={inputRef} id="music-file" name="audio" type="file" accept={ACCEPTED_TYPES} onChange={handleFileChange} className="sr-only" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="release-title" className="mb-2 block text-sm font-medium">Release title</label>
            <input id="release-title" name="title" type="text" placeholder="Enter title" required className="h-11 w-full border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div>
            <label htmlFor="artist-name" className="mb-2 block text-sm font-medium">Artist name</label>
            <input id="artist-name" name="artist" type="text" placeholder="Enter artist" required className="h-11 w-full border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="release-type" className="mb-2 block text-sm font-medium">Release type</label>
            <select id="release-type" name="type" defaultValue="Single" className="h-11 w-full border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option>Single</option>
              <option>Album</option>
              <option>Soundtrack</option>
              <option>Score</option>
            </select>
          </div>
          <div>
            <label htmlFor="release-date" className="mb-2 block text-sm font-medium">Release date</label>
            <input id="release-date" name="date" type="date" className="h-11 w-full border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div>
          <label htmlFor="release-notes" className="mb-2 block text-sm font-medium">Notes <span className="font-normal text-muted-foreground">(optional)</span></label>
          <textarea id="release-notes" name="notes" rows={3} placeholder="Add context about this release" className="w-full resize-y border border-border bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Files are limited to one track per upload.</p>
          <Button type="submit" disabled={submitted}>
            {submitted ? <><Check data-icon="inline-start" /> Uploaded</> : 'Upload track'}
          </Button>
        </div>
      </div>
    </form>
  )
}
