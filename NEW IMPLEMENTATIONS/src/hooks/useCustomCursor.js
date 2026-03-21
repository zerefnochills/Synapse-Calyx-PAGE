// ================================================
// useCustomCursor — the custom cursor from the HTML files
// ================================================
// Usage: Call once at the top of your App.jsx
//   useCustomCursor()
// Then add #cursor and #cursor-ring divs to your layout.

import { useEffect } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let rx = 0, ry = 0, cx = 0, cy = 0
    let rafId

    const onMouseMove = (e) => {
      cx = e.clientX
      cy = e.clientY
      cursor.style.left = cx + 'px'
      cursor.style.top = cy + 'px'
    }

    const animateRing = () => {
      rx += (cx - rx) * 0.12
      ry += (cy - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animateRing)
    }

    const onEnter = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      ring.style.width = '60px'
      ring.style.height = '60px'
    }

    const onLeave = () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      ring.style.width = '40px'
      ring.style.height = '40px'
    }

    document.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animateRing)

    // Attach to interactive elements
    const attachToElements = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachToElements()

    // Re-attach when DOM changes (for dynamically rendered content)
    const mutationObserver = new MutationObserver(attachToElements)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      mutationObserver.disconnect()
    }
  }, [])
}
