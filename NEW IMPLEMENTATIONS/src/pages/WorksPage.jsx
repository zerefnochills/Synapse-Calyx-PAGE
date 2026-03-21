// ================================================
// WorksPage — converted from synapse-calyx-works.html
// src/pages/WorksPage.jsx
// ================================================

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './WorksPage.module.css'

const CATEGORIES = ['all', 'web', 'identity', 'automation', 'motion']

const FEATURED_PROJECTS = [
  {
    id: 'novae',
    client: 'NOVAE',
    subtitle: 'Streetwear Brand Identity System + Web Platform',
    year: '2025',
    categories: ['identity', 'web'],
    tags: ['Identity', 'Web', 'Featured'],
    problem: 'NOVAE needed more than a logo — they needed a complete identity ecosystem capable of expressing cosmic minimalism across physical and digital touchpoints simultaneously.',
    strategy: 'Developed a "Cosmic Explorer" identity rooted in celestial aesthetics. Every asset was derived from a central brand DNA document before any design was produced.',
    stack: ['Next.js 14', 'Framer Motion', 'Three.js', 'Figma', 'Illustrator', 'Vercel'],
    results: [
      { value: '4.2×', label: 'Engagement Lift' },
      { value: '68%', label: 'Brand Recall' },
      { value: '12wk', label: 'Delivery' },
    ],
    bgStyle: { background: 'linear-gradient(135deg, #0a0a0a, #1a0f00)' },
    textColor: 'rgba(255,180,50,0.06)',
  },
  {
    id: 'nexus',
    client: 'NEXUS PROTOCOL',
    subtitle: 'Full-Stack SaaS Platform + AI Automation Pipeline',
    year: '2025',
    categories: ['web', 'automation'],
    tags: ['Automation', 'Web', 'AI'],
    tagColor: 'rgba(56,189,248,0.1)',
    problem: 'A logistics startup needed a client-facing dashboard that could ingest real-time shipment data, trigger automated alerts, and generate intelligent delivery predictions.',
    strategy: 'We designed a three-layer event-driven architecture: data ingestion (webhooks + queue), AI processing (anomaly detection + route optimization), and real-time React dashboard.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAI API', 'AWS Lambda', 'Socket.io'],
    results: [
      { value: '94%', label: 'Auto-resolved Alerts' },
      { value: '3.8s', label: 'Avg Response Time' },
      { value: '∞', label: 'Scalability' },
    ],
    bgStyle: { background: 'linear-gradient(135deg, #060a14, #0a0f20)' },
    textColor: 'rgba(56,189,248,0.06)',
    reversed: true,
  },
]

const SMALL_PROJECTS = [
  { id: 'vanta', title: 'Vanta Digital', cat: 'Landing Page', year: '2025', categories: ['web'], desc: 'High-converting landing page system with A/B testing infrastructure and CRO optimization baked in at the architecture level.', stack: ['Next.js', 'Sanity CMS', 'Vercel'], bgStyle: { background: 'linear-gradient(135deg, #080810, #10081a)' }, overlayColor: 'rgba(124,111,255,0.1)' },
  { id: 'pulse', title: 'Pulse Analytics Engine', cat: 'AI Automation', year: '2024', categories: ['automation'], desc: 'Real-time social sentiment analysis pipeline feeding into a brand monitoring dashboard. Processes 10K+ signals/hour.', stack: ['Python', 'OpenAI', 'Supabase'], bgStyle: { background: 'linear-gradient(135deg, #08100a, #0a1810)' }, overlayColor: 'rgba(74,222,128,0.1)' },
  { id: 'arc', title: 'Arc Creative Studio', cat: 'Brand Identity', year: '2024', categories: ['identity'], desc: 'Full brand identity system: logo, typography, color language, motion guidelines, and a 48-page brand standards document.', stack: ['Figma', 'Illustrator', 'After Effects'], bgStyle: { background: 'linear-gradient(135deg, #080810, #10081a)' }, overlayColor: 'rgba(248,113,113,0.1)' },
  { id: 'orbit', title: 'Orbit Reel 2025', cat: 'Motion Graphics', year: '2025', categories: ['motion'], desc: '6-minute brand showreel combining 3D renders, kinetic typography, and live-action compositing for a tech startup.', stack: ['After Effects', 'Cinema 4D', 'DaVinci'], bgStyle: { background: 'linear-gradient(135deg, #080a10, #100814)' }, overlayColor: 'rgba(196,181,253,0.1)' },
  { id: 'core', title: 'Core Operations Suite', cat: 'SaaS Platform', year: '2025', categories: ['web', 'automation'], desc: 'Internal operations platform replacing 4 separate tools: ticket routing, team analytics, and workflow automation.', stack: ['React', 'Node.js', 'PostgreSQL'], bgStyle: { background: 'linear-gradient(135deg, #0a100a, #101808)' }, overlayColor: 'rgba(74,222,128,0.08)' },
  { id: 'mars', title: 'Mars Ventures', cat: 'Brand + Web', year: '2024', categories: ['identity'], desc: 'Venture studio brand identity and investor portal. Clean, authoritative system designed to attract Series A founders.', stack: ['Figma', 'Next.js', 'Framer'], bgStyle: { background: 'linear-gradient(135deg, #100a08, #1a1008)' }, overlayColor: 'rgba(251,146,60,0.08)' },
]

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  useScrollReveal('.reveal')

  const filteredFeatured = FEATURED_PROJECTS.filter(
    (p) => activeFilter === 'all' || p.categories.includes(activeFilter)
  )
  const filteredSmall = SMALL_PROJECTS.filter(
    (p) => activeFilter === 'all' || p.categories.some((c) => c === activeFilter)
  )
  const total = filteredFeatured.length + filteredSmall.length

  return (
    <div>
      {/* ---- PAGE HEADER ---- */}
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.eyebrow}>// 02 — Portfolio</div>
          <h1 className={styles.pageTitle}>Our<br />Works</h1>
        </div>
        <div className={styles.pageHeaderRight}>
          <p className={styles.pageDesc}>
            Architecture breakdowns, case studies, and visual documentation of the
            systems we've built. Every project is a statement. Every statement has a stack.
          </p>
          <div className={styles.worksStats}>
            {[
              { value: '47', label: 'Projects Shipped' },
              { value: '12', label: 'Case Studies' },
              { value: '5', label: 'Disciplines' },
            ].map((s) => (
              <div key={s.label}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---- FILTER BAR ---- */}
      <div className={styles.filterBar}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <span className={styles.filterCount}>Showing {total} projects</span>
      </div>

      {/* ---- WORKS ---- */}
      <main className={styles.worksContainer}>

        {/* Featured case studies */}
        {filteredFeatured.map((project) => (
          <div key={project.id} className={`${styles.caseStudy} reveal`}>
            <div className={`${styles.caseStudyInner} ${project.reversed ? styles.reversed : ''}`}>

              {/* Visual panel */}
              <div className={styles.caseStudyVisual} style={project.bgStyle}>
                <div className={styles.caseStudyVisualInner} style={{ color: project.textColor }}>
                  {project.client}
                </div>
                <div className={styles.caseStudyOverlay} />
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Content panel */}
              <div className={styles.caseStudyContent}>
                <div>
                  <div className={styles.caseMeta}>
                    <span className={styles.caseYear}>// {project.year}</span>
                    <span className={styles.caseStatus}>Live</span>
                  </div>
                  <div className={styles.caseClient}>{project.client}</div>
                  <div className={styles.caseSubtitle}>{project.subtitle}</div>

                  <div className={styles.caseBlock}>
                    <div className={styles.caseBlockLabel}>// The Problem</div>
                    <div className={styles.caseBlockText}>{project.problem}</div>
                  </div>

                  <div className={styles.caseBlock}>
                    <div className={styles.caseBlockLabel}>// Strategy</div>
                    <div className={styles.caseBlockText}>{project.strategy}</div>
                  </div>

                  <div className={styles.techStack}>
                    {project.stack.map((t) => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>

                  <div className={styles.caseResults}>
                    {project.results.map((r) => (
                      <div key={r.label} className={styles.resultItem}>
                        <div className={styles.resultValue}>{r.value}</div>
                        <div className={styles.resultLabel}>{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.caseCta}>
                  <Link to={`/works/${project.id}`} className={styles.viewCase}>
                    View Full Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Divider */}
        {filteredSmall.length > 0 && (
          <div className={styles.sectionDivider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>// Additional Projects</div>
            <div className={styles.dividerLine} />
          </div>
        )}

        {/* Small project grid */}
        <div className={styles.smallGrid}>
          {filteredSmall.map((project) => (
            <Link to={`/works/${project.id}`} key={project.id} className={`${styles.smallCard} reveal`}>
              <div className={styles.smallVisual} style={project.bgStyle}>
                {project.title.split(' ')[0].toUpperCase()}
                <div className={styles.smallOverlay} style={{ background: project.overlayColor }} />
                <div className={styles.projectTags} style={{ top: 16, left: 16 }}>
                  <span className={styles.tag}>{project.categories[0]}</span>
                </div>
              </div>
              <div className={styles.smallContent}>
                <div className={styles.smallCat}>// {project.year} — {project.cat}</div>
                <div className={styles.smallTitle}>{project.title}</div>
                <div className={styles.smallDesc}>{project.desc}</div>
                <div className={styles.smallTech}>
                  {project.stack.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
