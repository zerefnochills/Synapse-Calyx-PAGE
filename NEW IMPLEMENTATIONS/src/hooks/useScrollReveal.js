// ================================================
// useScrollReveal — replaces the IntersectionObserver
// pattern from the HTML files
// ================================================
// Usage:
//   const ref = useScrollReveal()
//   <div ref={ref} className="reveal">...</div>
//
// Or for multiple elements:
//   useScrollReveal('.my-section .reveal')

import { useEffect, useRef } from 'react'

export function useScrollReveal(selector = null) {
  const ref = useRef(null)

  useEffect(() => {
    const elements = selector
      ? document.querySelectorAll(selector)
      : ref.current
        ? [ref.current]
        : []

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector])

  return ref
}

// Staggered version — adds delay to each child
export function useStaggerReveal(delay = 120) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll('.reveal')
    children.forEach((el, i) => {
      el.style.transitionDelay = `${i * delay}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('is-visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [delay])

  return containerRef
}
