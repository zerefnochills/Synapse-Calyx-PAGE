// ================================================
// Layout — wraps every page
// src/components/layout/Layout.jsx
// ================================================

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useCustomCursor } from '../../hooks/useCustomCursor'
import styles from './Layout.module.css'

export default function Layout() {
  useCustomCursor()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <div id="cursor" className={styles.cursor} />
      <div id="cursor-ring" className={styles.cursorRing} />
      <Navbar />
      <main key={pathname} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
