import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type VeqLogoProps = {
  className?: string
  /** show the VEQWERIS wordmark next to the emblem */
  showWordmark?: boolean
  size?: number
  href?: string | null
}

export function VeqLogo({
  className,
  showWordmark = true,
  size = 34,
  href = '/',
}: VeqLogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
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
        <span className="font-sans text-[0.95rem] font-semibold tracking-[0.34em] text-foreground">
          VEQWERIS
        </span>
      )}
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="VEQWERIS home" className="inline-flex items-center">
        {content}
      </Link>
    )
  }
  return content
}
