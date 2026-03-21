// ================================================
// Navbar — shared layout component
// src/components/layout/Navbar.jsx
// ================================================

import { Link, useLocation } from 'react-router-dom'
import { useNavbarScroll } from '../../hooks/useNavbar'
import styles from './Navbar.module.css'

export default function Navbar() {
  useNavbarScroll()
  const { pathname } = useLocation()

  const isActive = (path) => pathname === path

  return (
    <nav id="navbar" className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>⚡</div>
        Synapse Calyx
      </Link>

      <ul className={styles.links}>
        <li>
          <Link to="/works" className={isActive('/works') ? styles.active : ''}>
            Works
          </Link>
        </li>
        <li>
          <Link to="/services" className={isActive('/services') ? styles.active : ''}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about') ? styles.active : ''}>
            About
          </Link>
        </li>
        <li>
          <Link to="/blog" className={isActive('/blog') ? styles.active : ''}>
            Blog
          </Link>
        </li>
      </ul>

      <Link to="/order" className={styles.cta}>
        Start a Project
      </Link>
    </nav>
  )
}
