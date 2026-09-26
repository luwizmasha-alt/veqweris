'use client'

import { useRef, useState, type DragEvent, type FormEvent } from 'react'
import { Check, FileAudio, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ACCEPTED_AUDIO = '.mp3,.wav,.flac,.m4a,audio/mpeg,audio/wav,audio/flac,audio/mp4'

export function MusicUploadForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function selectFile(nextFile?: File) {
    if (!nextFile || !nextFile.type.startsWith('audio/')) return
    setFile(nextFile)
    setSubmitted(false)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files[0])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (file) setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <label
          htmlFor="audio-file"
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center transition-colors ${
            isDragging
              ? 'border-electric-blue bg-electric-blue/10'
              : 'border-electric-blue/35 bg-deep-navy/45 hover:border-electric-blue hover:bg-deep-navy'
          }`}
        >
          <span className="mb-5 flex size-14 items-center justify-center rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue">
            {file ? <FileAudio aria-hidden="true" /> : <Upload aria-hidden="true" />}
          </span>
          <span className="text-base font-medium text-foreground">{file ? file.name : 'Drop an audio file here'}</span>
          <span className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB selected` : 'or browse from your device. MP3, WAV, FLAC or M4A.'}
          </span>
          <input
            ref={inputRef}
            id="audio-file"
            name="audio-file"
            type="file"
            accept={ACCEPTED_AUDIO}
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.[0])}
            required
          />
        </label>
        {file && (
          <button
            type="button"
            onClick={() => {
              setFile(null)
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <X aria-hidden="true" /> Remove file
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card/50 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted-foreground">
            Track title
            <input
              name="title"
              required
              placeholder="e.g. Afterlight"
              className="h-11 rounded-lg border border-input bg-background px-3 text-foreground outline-none transition focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted-foreground">
            Artist name
            <input
              name="artist"
              required
              placeholder="Artist or project"
              className="h-11 rounded-lg border border-input bg-background px-3 text-foreground outline-none transition focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm text-muted-foreground">
          Release type
          <select
            name="releaseType"
            className="h-11 rounded-lg border border-input bg-background px-3 text-foreground outline-none transition focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
          >
            <option>Single</option>
            <option>EP</option>
            <option>Album</option>
            <option>Soundtrack</option>
            <option>Score</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted-foreground">
          Notes
          <textarea
            name="notes"
            rows={4}
            placeholder="Add a short description or release notes"
            className="resize-none rounded-lg border border-input bg-background px-3 py-3 text-foreground outline-none transition focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
          />
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">Upload form preview. Submission handling can be connected to storage next.</p>
          <Button type="submit" size="lg" disabled={!file}>
            {submitted ? (
              <>
                <Check data-icon="inline-start" /> Ready to review
              </>
            ) : (
              'Add to catalog'
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

function UploadIcon() {
  return null
}

UploadIcon.displayName = 'UploadIcon'

export default MusicUploadForm
