import { cn } from '@/lib/utils'

export type Status =
  | 'Concept'
  | 'In Development'
  | 'Production'
  | 'Announced'
  | 'Released'
  | 'Exploratory'
  | 'Active'

const styles: Record<string, string> = {
  Concept: 'border-silver/30 text-silver',
  'In Development': 'border-electric-blue/50 text-electric-blue',
  Production: 'border-electric-blue/50 text-electric-blue',
  Announced: 'border-primary-blue/60 text-electric-blue',
  Released: 'border-electric-blue/60 text-foreground bg-electric-blue/10',
  Exploratory: 'border-silver/30 text-silver',
  Active: 'border-electric-blue/50 text-electric-blue',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em]',
        styles[status] ?? 'border-silver/30 text-silver',
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  )
}
