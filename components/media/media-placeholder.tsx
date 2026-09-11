import Image from 'next/image'
import { cn } from '@/lib/utils'

type Ratio = 'video' | 'square' | 'poster' | 'portrait' | 'wide' | 'ultrawide'

const ratioClass: Record<Ratio, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  poster: 'aspect-[2/3]',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  ultrawide: 'aspect-[21/9]',
}

export type MediaPlaceholderProps = {
  /** Optional real image source. When present it replaces the placeholder treatment. */
  src?: string
  alt?: string
  label?: string
  sublabel?: string
  ratio?: Ratio
  className?: string
  kind?: 'image' | 'video' | 'poster' | 'character' | 'world' | 'music' | 'game' | 'dashboard'
  rounded?: boolean
}

const kindLabel: Record<NonNullable<MediaPlaceholderProps['kind']>, string> = {
  image: 'IMAGE RESERVED',
  video: 'VIDEO RESERVED',
  poster: 'POSTER RESERVED',
  character: 'CHARACTER RESERVED',
  world: 'WORLD ART RESERVED',
  music: 'ARTWORK RESERVED',
  game: 'GAME ART RESERVED',
  dashboard: 'PREVIEW RESERVED',
}

/**
 * The single media primitive for the site. When `src` is supplied it renders
 * the real asset; otherwise it renders an intentional VEQWERIS-treated
 * placeholder. Real assets replace the placeholder without changing layout.
 */
export function MediaPlaceholder({
  src,
  alt,
  label,
  sublabel,
  ratio = 'video',
  className,
  kind = 'image',
  rounded = true,
}: MediaPlaceholderProps) {
  const isVideoKind = kind === 'video'

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden border border-border bg-deep-navy',
        rounded && 'rounded-lg',
        ratioClass[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src || '/placeholder.svg'}
          alt={alt || label || 'VEQWERIS media'}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <PlaceholderTreatment
          label={label ?? kindLabel[kind]}
          sublabel={sublabel}
          showPlay={isVideoKind}
        />
      )}
    </div>
  )
}

function PlaceholderTreatment({
  label,
  sublabel,
  showPlay,
}: {
  label: string
  sublabel?: string
  showPlay?: boolean
}) {
  return (
    <div className="absolute inset-0">
      {/* atmospheric base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(45,140,255,0.14), transparent 60%), linear-gradient(160deg, #061326 0%, #02050a 100%)',
        }}
      />
      <div className="veq-grid absolute inset-0 opacity-40" />
      {/* corner ticks */}
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-silver/25" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-silver/25" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-silver/25" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-silver/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        {showPlay && (
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-electric-blue/50 bg-background/40 backdrop-blur-sm">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <path d="M1 1.5v13l12-6.5L1 1.5Z" fill="#2D8CFF" />
            </svg>
          </span>
        )}
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver/70">
          {label}
        </span>
        {sublabel && (
          <span className="max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
