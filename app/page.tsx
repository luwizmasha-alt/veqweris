import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { Momentum } from '@/components/home/momentum'
import { Ecosystem } from '@/components/home/ecosystem'
import { SystemsFeature } from '@/components/home/systems-feature'
import { Vision } from '@/components/home/vision'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <Momentum />
      <Ecosystem />
      <SystemsFeature />
      <Vision />
    </main>
  )
}
