// ================================================
// useNavbarScroll — adds .scrolled class to navbar
// ================================================
import { useEffect } from 'react'

export function useNavbarScroll(threshold = 50) {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
    if (!navbar) return

    const onScroll = () => {
      if (window.scrollY > threshold) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
}
