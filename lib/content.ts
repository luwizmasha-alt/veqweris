import type { Status } from '@/components/status-badge'

export type Division = {
  slug: string
  name: string
  short: string
  description: string
  href: string
  index: string
}

export const DIVISIONS: Division[] = [
  {
    slug: 'systems',
    name: 'VEQWERIS Systems',
    short: 'Intelligent institutional and operational management.',
    description:
      'A platform for visibility and coordination across institutions — departments, people, tasks, workflows, analytics and compliance in one operational picture.',
    href: '/systems',
    index: '01',
  },
  {
    slug: 'studios',
    name: 'VEQWERIS Studios',
    short: 'Film, cinematic storytelling and original creative worlds.',
    description:
      'An original production division developing films, series, characters and worlds — building intellectual property designed to live across formats.',
    href: '/studios',
    index: '02',
  },
  {
    slug: 'music',
    name: 'VEQWERIS Music',
    short: 'Artists, soundtracks, releases and original scores.',
    description:
      'Original music, scores and releases that give the VEQWERIS worlds their sound and extend them beyond the screen.',
    href: '/music',
    index: '03',
  },
  {
    slug: 'gaming',
    name: 'VEQWERIS Gaming',
    short: 'Interactive experiences connected to original worlds and stories.',
    description:
      'Interactive experiences that let audiences step inside VEQWERIS worlds — extending stories, characters and universes into play.',
    href: '/gaming',
    index: '04',
  },
  {
    slug: 'labs',
    name: 'VEQWERIS Labs',
    short: 'Research, experimentation and future-facing technology.',
    description:
      'A research division exploring intelligent systems, interaction and emerging technology that informs everything the company builds.',
    href: '/labs',
    index: '05',
  },
]

export type Capability = {
  title: string
  description: string
}

export const SYSTEMS_CAPABILITIES: Capability[] = [
  { title: 'Institutions', description: 'Organizational visibility across the entire operation.' },
  { title: 'Departments', description: 'Structured departmental operations and ownership.' },
  { title: 'People', description: 'Role-aware coordination across the workplace.' },
  { title: 'Tasks', description: 'Clear work progress and accountability.' },
  { title: 'Workflows', description: 'Structured, repeatable operational processes.' },
  { title: 'Analytics', description: 'Understand performance and trends over time.' },
  { title: 'Reports', description: 'Turn operational activity into useful information.' },
  {
    title: 'Compliance',
    description: 'Visibility into requirements, responsibilities, audits and corrective actions.',
  },
  {
    title: 'Financial Integrity',
    description:
      'Surface potential discrepancies between expected and recorded activity for evidence-based review.',
  },
]

export type Film = {
  title: string
  genre: string
  status: Status
  description: string
  world?: string
}

export const FILMS: Film[] = [
  {
    title: 'Untitled Feature — Reserved',
    genre: 'Science Fiction',
    status: 'Concept',
    description:
      'An original VEQWERIS Studios feature in early creative development. Details will be shared when the project is ready.',
    world: 'World reserved',
  },
  {
    title: 'Untitled Series — Reserved',
    genre: 'Drama',
    status: 'Concept',
    description:
      'A serialized story exploring one of the emerging VEQWERIS worlds. Currently in the writers’ room.',
    world: 'World reserved',
  },
  {
    title: 'Untitled Short — Reserved',
    genre: 'Anthology',
    status: 'In Development',
    description:
      'A short-form cinematic piece designed to introduce the visual language of the VEQWERIS universe.',
    world: 'World reserved',
  },
]

export type Character = {
  name: string
  role: string
  description: string
  world?: string
}

export const CHARACTERS: Character[] = [
  {
    name: 'Character Reserved',
    role: 'Lead',
    description: 'A central figure in an upcoming VEQWERIS story. Design and casting are reserved.',
    world: 'World reserved',
  },
  {
    name: 'Character Reserved',
    role: 'Antagonist',
    description: 'A pivotal counterforce whose identity will be revealed alongside the story.',
    world: 'World reserved',
  },
  {
    name: 'Character Reserved',
    role: 'Supporting',
    description: 'Part of the ensemble connecting characters, world and lore.',
    world: 'World reserved',
  },
  {
    name: 'Character Reserved',
    role: 'Supporting',
    description: 'A role that bridges multiple stories within a shared VEQWERIS universe.',
    world: 'World reserved',
  },
]

export type World = {
  name: string
  premise: string
  status: Status
}

export const WORLDS: World[] = [
  {
    name: 'World One — Reserved',
    premise:
      'An original universe under development, designed to connect film, characters, music and gaming.',
    status: 'Concept',
  },
  {
    name: 'World Two — Reserved',
    premise:
      'A second creative universe with its own lore, locations and timeline. Details reserved.',
    status: 'Concept',
  },
]

export const WORLD_FLOW = ['Story', 'Characters', 'World', 'Music', 'Gaming', 'Future Stories']
export const GAME_FLOW = ['Film', 'World', 'Characters', 'Game', 'Expansion', 'Future Story']

export type Release = {
  title: string
  type: 'Single' | 'Album' | 'Soundtrack' | 'Score'
  status: Status
  description: string
}

export const RELEASES: Release[] = [
  {
    title: 'Release Reserved',
    type: 'Soundtrack',
    status: 'In Development',
    description: 'An original score composed for an upcoming VEQWERIS Studios production.',
  },
  {
    title: 'Release Reserved',
    type: 'Single',
    status: 'Concept',
    description: 'An original single from the VEQWERIS Music catalog. Details reserved.',
  },
  {
    title: 'Release Reserved',
    type: 'Album',
    status: 'Concept',
    description: 'A full-length body of work connected to the VEQWERIS creative universe.',
  },
]

export type Platform = {
  platformName: string
  availability: string
  officialUrl: string | null
}

export const MUSIC_PLATFORMS: Platform[] = [
  { platformName: 'YouTube', availability: 'Coming soon', officialUrl: null },
  { platformName: 'YouTube Music', availability: 'Coming soon', officialUrl: null },
  { platformName: 'Spotify', availability: 'Coming soon', officialUrl: null },
  { platformName: 'Apple Music', availability: 'Coming soon', officialUrl: null },
]

export type Game = {
  title: string
  status: Status
  description: string
  world?: string
}

export const GAMES: Game[] = [
  {
    title: 'Untitled Game — Reserved',
    status: 'Concept',
    description:
      'An interactive experience extending a VEQWERIS world into play. In early creative design.',
    world: 'World reserved',
  },
  {
    title: 'Untitled Game — Reserved',
    status: 'In Development',
    description:
      'A narrative-driven experience connected to an original VEQWERIS story and characters.',
    world: 'World reserved',
  },
]

export type LabInitiative = {
  title: string
  area: string
  description: string
}

export const LAB_INITIATIVES: LabInitiative[] = [
  {
    title: 'Intelligent Systems',
    area: 'Artificial Intelligence',
    description:
      'Exploring how intelligent systems can bring clarity and coordination to complex operations.',
  },
  {
    title: 'Human–Computer Interaction',
    area: 'Interaction',
    description:
      'Studying interfaces and interaction models that feel precise, intelligent and human.',
  },
  {
    title: 'Simulation & Digital Worlds',
    area: 'Simulation',
    description:
      'Researching digital environments that support storytelling, play and experimentation.',
  },
  {
    title: 'Emerging Technologies',
    area: 'Future Interfaces',
    description:
      'Investigating emerging technologies that may shape future VEQWERIS products and experiences.',
  },
]

export const CAREER_AREAS: string[] = [
  'Engineering',
  'Product',
  'Design',
  'AI / Research',
  'Film / Production',
  'Music',
  'Gaming',
  'Operations',
  'Business',
]
