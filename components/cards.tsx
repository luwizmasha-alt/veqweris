import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { StatusBadge } from '@/components/status-badge'
import type { Character, Film, Game, Platform, Release, World } from '@/lib/content'

function MetaRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-silver/70">
      {children}
    </div>
  )
}

export function FilmCard({ film }: { film: Film }) {
  return (
    <article className="group flex flex-col">
      <MediaPlaceholder kind="poster" ratio="poster" label="Poster Reserved" />
      <div className="mt-4 flex flex-1 flex-col">
        <MetaRow>
          <span>{film.genre}</span>
          {film.world && <span className="text-silver/50">/ {film.world}</span>}
        </MetaRow>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {film.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {film.description}
        </p>
        <div className="mt-4">
          <StatusBadge status={film.status} />
        </div>
      </div>
    </article>
  )
}

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="group flex flex-col">
      <MediaPlaceholder kind="character" ratio="portrait" label="Character Reserved" />
      <div className="mt-4">
        <MetaRow>
          <span>{character.role}</span>
          {character.world && <span className="text-silver/50">/ {character.world}</span>}
        </MetaRow>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
          {character.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {character.description}
        </p>
      </div>
    </article>
  )
}

export function WorldCard({ world }: { world: World }) {
  const content = (
    <>
      <MediaPlaceholder kind="world" ratio="wide" label="World Art Reserved" rounded={false} />
      <div className="p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{world.name}</h3>
          <StatusBadge status={world.status} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{world.premise}</p>
      </div>
    </>
  )

  if (world.href) {
    return (
      <a href={world.href} className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-electric-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/60">
        {content}
      </a>
    )
  }

  return <article className="group overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-electric-blue/40">{content}</article>
}

export function MusicCard({ release }: { release: Release }) {
  const content = (
    <>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#081827]">
        <MediaPlaceholder
          kind="music"
          ratio="square"
          src={release.image}
          alt={release.alt ?? release.title}
          label={release.title}
          className="!aspect-[1/1]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,140,255,0.18),_transparent_55%)]" />
      </div>
      <div className="mt-2.5">
        <MetaRow>
          <span>{release.type}</span>
        </MetaRow>
        <h3 className="mt-1 text-[0.74rem] font-semibold tracking-[0.08em] text-foreground uppercase">
          {release.title}
        </h3>
        <p className="mt-0.5 text-[0.62rem] leading-relaxed text-muted-foreground">{release.description}</p>
        <div className="mt-2">
          <StatusBadge status={release.status} />
        </div>
      </div>
    </>
  )

  const isPublishedRelease = release.status === 'Published' || release.status === 'Released'

  if (isPublishedRelease && release.href) {
    return (
      <a
        href={release.href}
        target={release.href.startsWith('http') ? '_blank' : undefined}
        rel={release.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="group block rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,22,38,0.98),rgba(5,12,20,0.96))] p-2.5 shadow-[0_12px_40px_rgba(2,5,10,0.52)] transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/60 hover:shadow-[0_20px_50px_rgba(45,140,255,0.18)]"
      >
        {content}
      </a>
    )
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,22,38,0.98),rgba(5,12,20,0.96))] p-2.5 shadow-[0_12px_40px_rgba(2,5,10,0.52)] transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/60 hover:shadow-[0_20px_50px_rgba(45,140,255,0.18)]">
      {content}
    </article>
  )
}

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-electric-blue/40">
      <MediaPlaceholder kind="game" ratio="wide" label="Game Art Reserved" rounded={false} />
      <div className="p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{game.title}</h3>
          <StatusBadge status={game.status} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{game.description}</p>
        {game.world && (
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-silver/60">
            {game.world}
          </p>
        )}
      </div>
    </article>
  )
}

export function PlatformCard({ platform }: { platform: Platform }) {
  const content = (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-6 transition-colors duration-300 hover:border-electric-blue/40">
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {platform.platformName}
        </h3>
        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
          {platform.availability}
        </p>
      </div>
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="text-electric-blue">
        <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  )

  if (platform.officialUrl) {
    return (
      <a href={platform.officialUrl} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }
  return <div aria-disabled className="opacity-90">{content}</div>
}
