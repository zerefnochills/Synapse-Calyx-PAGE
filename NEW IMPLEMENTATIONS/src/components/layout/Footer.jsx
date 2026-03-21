// ================================================
// Footer
// src/components/layout/Footer.jsx
// ================================================

import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Synapse Calyx</div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} — Creative Intelligence Meets Digital Evolution
      </p>
      <ul className={styles.links}>
        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
        <li><a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
      </ul>
    </footer>
  )
}
