'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Refined desktop cursor: a small precision dot with a thin electric-blue ring
 * that gently expands over interactive elements. Enabled only on fine-pointer
 * devices and disabled under prefers-reduced-motion. Never required to operate
 * the site — it is purely decorative and does not intercept pointer events.
 */
export function CursorSystem() {
  const [enabled, setEnabled] = useState(false)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('veq-cursor-active')

    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let mouseX = ringX
    let mouseY = ringY
    let raf = 0

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = !!target.closest?.(interactiveSelector)
      ringRef.current?.setAttribute('data-hover', isInteractive ? 'true' : 'false')
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('veq-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        data-hover="false"
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-electric-blue/60 transition-[width,height,opacity,background-color,margin] duration-200 ease-out data-[hover=true]:-ml-6 data-[hover=true]:-mt-6 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:bg-electric-blue/5"
        style={{ boxShadow: '0 0 12px rgba(45,140,255,0.25)' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-electric-blue"
      />
    </div>
  )
}
