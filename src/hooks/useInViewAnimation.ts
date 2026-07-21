import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element has entered the viewport, triggering once via
 * IntersectionObserver at a low threshold so animations start slightly early.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}
