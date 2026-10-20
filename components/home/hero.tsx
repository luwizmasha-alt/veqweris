import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { BackgroundVideo } from '@/components/media/background-video'
import { VeqButtonLink } from '@/components/veq-button'
import { SITE_TAGLINE } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative z-0 flex min-h-[100svh] items-center overflow-hidden border-b border-border">
      <BackgroundVideo
        src="/media/home/veqweris-logo-reveal.mp4"
        objectPosition="center 42%"
        overlay={48}
      />
      <div className="veq-grid pointer-events-none absolute inset-0 z-[1] opacity-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,8,22,0.12)_0%,rgba(5,8,22,0.04)_56%,rgba(5,8,22,0.18)_100%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase tracking-[0.28em] text-cyan opacity-0 sm:text-sm"
            style={{ animation: 'veq-reveal-up 0.8s ease-out 0.1s forwards' }}
          >
            Independent technology company
          </p>

          <h1
            className="mt-6 text-balance text-5xl font-semibold leading-[0.92] tracking-tight text-foreground opacity-0 sm:text-7xl lg:text-[6.5rem]"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.25s forwards' }}
          >
            VEQWERIS
          </h1>

          <p
            className="mt-6 max-w-xl text-sm font-semibold uppercase tracking-[0.18em] text-silver opacity-0 sm:text-base sm:tracking-[0.24em]"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.4s forwards' }}
          >
            {SITE_TAGLINE}
          </p>

          <p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.55s forwards' }}
          >
            Technology, intelligent systems, and creative worlds engineered for what comes next.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.7s forwards' }}
          >
            <VeqButtonLink href="/systems" size="lg" className="gap-3">
              Explore our systems <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </VeqButtonLink>
            <VeqButtonLink href="/studios" variant="secondary" size="lg">
              Discover our studios
            </VeqButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 opacity-0" style={{ animation: 'veq-reveal-up 0.9s ease-out 0.82s forwards' }}>
            {['Intelligent systems', 'Original stories', 'Interactive worlds', 'Research & prototypes'].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-silver/90 sm:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[420px] items-center justify-center lg:flex">
          <div className="absolute h-[390px] w-[390px] rounded-full border border-cyan/15" />
          <div className="absolute h-[310px] w-[310px] rounded-full border border-violet/25" />
          <div className="absolute h-[220px] w-[220px] rounded-full bg-electric-blue/10 blur-3xl" />
          <div className="absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-electric-blue shadow-[0_0_20px_rgba(23,105,255,0.7)]" />
          <div className="absolute bottom-[22%] left-[16%] h-1.5 w-1.5 rounded-full bg-electric-blue shadow-[0_0_16px_rgba(23,105,255,0.6)]" />
          <div className="absolute bottom-5 right-4 border-l border-cyan/50 pl-4 font-mono text-[0.62rem] uppercase leading-6 tracking-[0.16em] text-muted-foreground">
            <span className="block text-cyan">01 / 06</span>
            Connected divisions
          </div>
        </div>
      </div>

      <a href="#ecosystem" aria-label="Scroll to our divisions" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em]">Explore</span>
        <ArrowDown aria-hidden="true" className="h-4 w-4" />
      </a>
    </section>
  )
}
