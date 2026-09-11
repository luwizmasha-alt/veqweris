'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type BackgroundVideoProps = {
  src: string
  poster?: string
  className?: string
  objectPosition?: string
  /** dark overlay opacity 0-100 for readability */
  overlay?: number
  /** optional fallback element when video can't play */
  fallback?: React.ReactNode
}

/**
 * Reusable cinematic background video. Autoplays muted, loops, plays inline,
 * sits behind the interface with a dark overlay for readability, and respects
 * prefers-reduced-motion by falling back to the poster/fallback. Designed to be
 * reused for future media additions — only the homepage supplies a real video
 * in this build.
 */
export function BackgroundVideo({
  src,
  poster,
  className,
  objectPosition = 'center',
  overlay = 55,
  fallback,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShowVideo(false)
      return
    }
    const v = videoRef.current
    if (v) {
      v.play().catch(() => {
        /* autoplay can be blocked; poster remains visible */
      })
    }
  }, [])

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden bg-near-black', className)}>
      {showVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        (fallback ?? (
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(80% 60% at 50% 30%, rgba(45,140,255,0.16), transparent 60%), linear-gradient(180deg, #061326, #02050a)',
            }}
          />
        ))
      )}

      {/* readability overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(2,5,10,${overlay / 100 + 0.1}) 0%, rgba(2,5,10,${overlay / 100}) 45%, rgba(2,5,10,0.92) 100%)`,
        }}
      />
    </div>
  )
}
