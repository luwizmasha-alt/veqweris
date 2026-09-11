import { Reveal } from '@/components/reveal'

/**
 * Visualizes a creative IP relationship (not software architecture) as a
 * sequence of connected stages.
 */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, i) => (
        <Reveal as="li" key={step} delay={i * 70} className="flex items-center gap-3">
          <span className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
            <span className="font-mono text-[0.6rem] text-electric-blue">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-sm font-medium tracking-tight text-foreground">{step}</span>
          </span>
          {i < steps.length - 1 && (
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              aria-hidden="true"
              className="hidden shrink-0 text-electric-blue/60 sm:block"
            >
              <path d="M12 1l5 5-5 5M17 6H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
        </Reveal>
      ))}
    </ol>
  )
}
