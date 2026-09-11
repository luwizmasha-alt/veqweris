import { MediaPlaceholder } from '@/components/media/media-placeholder'
import { StatusBadge } from '@/components/status-badge'
import type { Character, Film, Game, Platform, Release, World } from '@/lib/content'

function MetaRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
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
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-electric-blue/40">
      <MediaPlaceholder kind="world" ratio="wide" label="World Art Reserved" rounded={false} />
      <div className="p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{world.name}</h3>
          <StatusBadge status={world.status} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{world.premise}</p>
      </div>
    </article>
  )
}

export function MusicCard({ release }: { release: Release }) {
  return (
    <article className="group flex flex-col">
      <MediaPlaceholder kind="music" ratio="square" label="Artwork Reserved" />
      <div className="mt-4">
        <MetaRow>
          <span>{release.type}</span>
        </MetaRow>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
          {release.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{release.description}</p>
        <div className="mt-4">
          <StatusBadge status={release.status} />
        </div>
      </div>
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
