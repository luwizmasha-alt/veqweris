import { BackgroundVideo } from '@/components/media/background-video'
import { VeqButtonLink } from '@/components/veq-button'
import { SITE_TAGLINE, SYSTEMS_APP_URL } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative z-0 flex min-h-[100svh] items-center overflow-hidden">
      <BackgroundVideo
        src="/media/home/veqweris-logo-reveal.mp4"
        poster="/media/brand/veqweris-logo.png"
        overlay={45}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <div className="max-w-3xl">
          <p
            className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-electric-blue opacity-0"
            style={{ animation: 'veq-reveal-up 0.8s ease-out 0.1s forwards' }}
          >
            VEQWERIS Tech Company
          </p>

          <h1
            className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-foreground opacity-0 sm:text-7xl lg:text-8xl"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.25s forwards' }}
          >
            VEQWERIS
          </h1>

          <p
            className="mt-5 text-lg font-medium uppercase tracking-[0.28em] text-silver opacity-0 sm:text-xl"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.4s forwards' }}
          >
            {SITE_TAGLINE}
          </p>

          <p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.55s forwards' }}
          >
            Technology, systems and creative worlds engineered for what comes next.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animation: 'veq-reveal-up 0.9s ease-out 0.7s forwards' }}
          >
            <VeqButtonLink href={SYSTEMS_APP_URL} size="lg">
              Enter Systems
            </VeqButtonLink>
            <VeqButtonLink href="/studios" variant="secondary" size="lg">
              Explore Studios
            </VeqButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-electric-blue to-transparent" />
        </div>
      </div>
    </section>
  )
}
