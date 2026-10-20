import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type VeqLogoProps = {
  className?: string
  /** show the VEQWERIS wordmark next to the emblem */
  showWordmark?: boolean
  wordmarkClassName?: string
  size?: number
  href?: string | null
}

export function VeqLogo({
  className,
  showWordmark = true,
  wordmarkClassName,
  size = 34,
  href = '/',
}: VeqLogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-1.5 sm:gap-2.5', className)}>
      <Image
        src="/media/brand/veqweris-logo.png"
        alt="VEQWERIS emblem"
        width={size}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
      {showWordmark && (
        <span className={cn('font-sans text-[0.9rem] font-semibold tracking-[0.26em] text-foreground sm:text-[0.95rem]', wordmarkClassName)}>
          VEQWERIS
        </span>
      )}
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="VEQWERIS home" className="inline-flex items-center -ml-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:-ml-3">
        {content}
      </Link>
    )
  }
  return content
}
