import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Computes a vertical offset for a scroll-linked parallax effect, clamped to
 * +/- maxOffset, based on the element's position relative to the viewport
 * center. Only active while the element is in view, and disabled entirely
 * when the user prefers reduced motion.
 */
export function useParallax(maxOffset = 160) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    let frameId: number | null = null
    let isInView = false

    const measure = () => {
      frameId = null
      if (!element || !isInView) return

      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const progress = (viewportHeight / 2 - elementCenter) / viewportHeight
      const clamped = Math.max(-1, Math.min(1, progress))
      setOffset(clamped * maxOffset)
    }

    const requestMeasure = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(measure)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting
        }
        if (isInView) requestMeasure()
      },
      { threshold: 0 },
    )

    observer.observe(element)
    window.addEventListener('scroll', requestMeasure, { passive: true })
    window.addEventListener('resize', requestMeasure)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestMeasure)
      window.removeEventListener('resize', requestMeasure)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [maxOffset, prefersReducedMotion])

  return { ref, offset }
}
