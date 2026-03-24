// ================================================
// WorksPage — with real media support
// src/pages/WorksPage.jsx
// ================================================

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './WorksPage.module.css'

// ─────────────────────────────────────────────────────────────────────────────
//  DATA — edit this section to add your real projects
//  HOW TO ADD REAL MEDIA:
//    thumbnail: '/works/design/novae-brand-overview.webp'  ← image path in /public
//    videoSrc:  '/works/video/orbit-preview.mp4'           ← self-hosted .mp4
//    youtubeId: 'dQw4w9WgXcQ'                              ← YouTube video ID
//    liveUrl:   'https://yourclient.com'                   ← opens on "View Live"
//  If none of these are set, the card falls back to the existing gradient + text
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ['all', 'web', 'identity', 'automation', 'motion']

const FEATURED_PROJECTS = [
  // ── NOVAE — anchor project, DO NOT REMOVE ────────────────────────────────
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
    // ── Real media (uncomment when ready) ──
    // thumbnail: '/works/design/novae-brand-overview.webp',
    // liveUrl: 'https://novae.example.com',
    // ─────────────────────────────────────
    bgStyle: { background: 'linear-gradient(135deg, #0a0a0a, #1a0f00)' },
    textColor: 'rgba(255,180,50,0.06)',
  },

  // ── NEXUS PROTOCOL ───────────────────────────────────────────────────────
  {
    id: 'nexus',
    client: 'NEXUS PROTOCOL',
    subtitle: 'Full-Stack SaaS Platform + AI Automation Pipeline',
    year: '2025',
    categories: ['web', 'automation'],
    tags: ['Automation', 'Web', 'AI'],
    problem: 'A logistics startup needed a client-facing dashboard that could ingest real-time shipment data, trigger automated alerts, and generate intelligent delivery predictions.',
    strategy: 'We designed a three-layer event-driven architecture: data ingestion (webhooks + queue), AI processing (anomaly detection + route optimization), and real-time React dashboard.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAI API', 'AWS Lambda', 'Socket.io'],
    results: [
      { value: '94%', label: 'Auto-resolved Alerts' },
      { value: '3.8s', label: 'Avg Response Time' },
      { value: '∞', label: 'Scalability' },
    ],
    // thumbnail: '/works/web/nexus-screenshot.webp',
    // liveUrl: null,
    bgStyle: { background: 'linear-gradient(135deg, #060a14, #0a0f20)' },
    textColor: 'rgba(56,189,248,0.06)',
    reversed: true,
  },

  // ── ADD MORE FEATURED PROJECTS HERE ──────────────────────────────────────
  // {
  //   id: 'your-project',
  //   client: 'CLIENT NAME',
  //   subtitle: 'What you built',
  //   year: '2025',
  //   categories: ['web'],          // must match CATEGORIES values
  //   tags: ['Web'],
  //   problem: '...',
  //   strategy: '...',
  //   stack: ['React', 'Node.js'],
  //   results: [{ value: '3×', label: 'Faster' }],
  //   thumbnail: '/works/web/your-screenshot.webp',
  //   liveUrl: 'https://yourclient.com',
  //   bgStyle: { background: 'linear-gradient(135deg, #060a14, #0a0f20)' },
  //   textColor: 'rgba(255,255,255,0.04)',
  // },
]

const SMALL_PROJECTS = [
  {
    id: 'vanta',
    title: 'Vanta Digital',
    cat: 'Landing Page',
    year: '2025',
    categories: ['web'],
    desc: 'High-converting landing page system with A/B testing infrastructure and CRO optimization baked in at the architecture level.',
    stack: ['Next.js', 'Sanity CMS', 'Vercel'],
    // thumbnail: '/works/web/vanta-screenshot.webp',
    // liveUrl: 'https://vanta.example.com',
    bgStyle: { background: 'linear-gradient(135deg, #080810, #10081a)' },
    overlayColor: 'rgba(124,111,255,0.1)',
  },
  {
    id: 'pulse',
    title: 'Pulse Analytics Engine',
    cat: 'AI Automation',
    year: '2024',
    categories: ['automation'],
    desc: 'Real-time social sentiment analysis pipeline feeding into a brand monitoring dashboard. Processes 10K+ signals/hour.',
    stack: ['Python', 'OpenAI', 'Supabase'],
    // thumbnail: '/works/web/pulse-screenshot.webp',
    bgStyle: { background: 'linear-gradient(135deg, #08100a, #0a1810)' },
    overlayColor: 'rgba(74,222,128,0.1)',
  },
  {
    id: 'arc',
    title: 'Arc Creative Studio',
    cat: 'Brand Identity',
    year: '2024',
    categories: ['identity'],
    desc: 'Full brand identity system: logo, typography, color language, motion guidelines, and a 48-page brand standards document.',
    stack: ['Figma', 'Illustrator', 'After Effects'],
    // thumbnail: '/works/design/arc-logo-system.webp',
    bgStyle: { background: 'linear-gradient(135deg, #080810, #10081a)' },
    overlayColor: 'rgba(248,113,113,0.1)',
  },
  {
    id: 'orbit',
    title: 'Orbit Reel 2025',
    cat: 'Motion Graphics',
    year: '2025',
    categories: ['motion'],
    desc: '6-minute brand showreel combining 3D renders, kinetic typography, and live-action compositing for a tech startup.',
    stack: ['After Effects', 'Cinema 4D', 'DaVinci'],
    // VIDEO — choose one method:
    // Method A (self-hosted): export a 15–30s .mp4 preview under 8MB
    // videoSrc: '/works/video/orbit-reel-preview.mp4',
    // thumbnail: '/works/video/orbit-reel-thumb.webp',
    // Method B (YouTube):
    // youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
    bgStyle: { background: 'linear-gradient(135deg, #080a10, #100814)' },
    overlayColor: 'rgba(196,181,253,0.1)',
  },
  {
    id: 'core',
    title: 'Core Operations Suite',
    cat: 'SaaS Platform',
    year: '2025',
    categories: ['web', 'automation'],
    desc: 'Internal operations platform replacing 4 separate tools: ticket routing, team analytics, and workflow automation.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    // thumbnail: '/works/web/core-screenshot.webp',
    bgStyle: { background: 'linear-gradient(135deg, #0a100a, #101808)' },
    overlayColor: 'rgba(74,222,128,0.08)',
  },
  {
    id: 'mars',
    title: 'Mars Ventures',
    cat: 'Brand + Web',
    year: '2024',
    categories: ['identity'],
    desc: 'Venture studio brand identity and investor portal. Clean, authoritative system designed to attract Series A founders.',
    stack: ['Figma', 'Next.js', 'Framer'],
    // thumbnail: '/works/design/mars-identity-spread.webp',
    bgStyle: { background: 'linear-gradient(135deg, #100a08, #1a1008)' },
    overlayColor: 'rgba(251,146,60,0.08)',
  },

  // ── ADD MORE SMALL PROJECTS HERE ──────────────────────────────────────────
  // {
  //   id: 'your-project',
  //   title: 'Project Name',
  //   cat: 'Category Label',
  //   year: '2025',
  //   categories: ['web'],
  //   desc: 'Short description of what you built and the outcome.',
  //   stack: ['React'],
  //   thumbnail: '/works/web/your-screenshot.webp',
  //   liveUrl: 'https://yourclient.com',
  //   bgStyle: { background: 'linear-gradient(135deg, #080810, #10081a)' },
  //   overlayColor: 'rgba(124,111,255,0.1)',
  // },
]

// ─────────────────────────────────────────────────────────────────────────────
//  MEDIA COMPONENTS — handles image / video / fallback cleanly
// ─────────────────────────────────────────────────────────────────────────────

// Featured card visual panel — replaces the bgStyle div when thumbnail exists
function FeaturedVisual({ project }) {
  const [imgError, setImgError] = useState(false)

  // If a real thumbnail is set and loaded successfully
  if (project.thumbnail && !imgError) {
    return (
      <div className={styles.caseStudyVisual} style={{ padding: 0, overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={project.client}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Keep the tags overlay */}
        <div className={styles.projectTags} style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        {/* Live badge */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute', bottom: 16, right: 16, zIndex: 2,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4, padding: '4px 10px',
              fontSize: 10, letterSpacing: 2,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'monospace',
              textDecoration: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            VIEW LIVE ↗
          </a>
        )}
      </div>
    )
  }

  // Default: existing gradient + large text fallback (your current design)
  return (
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
  )
}

// Small card visual — handles image, video (hover-play), youtube, or gradient fallback
function SmallVisual({ project }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [ytActive, setYtActive] = useState(false)

  const fallbackLabel = project.title.split(' ')[0].toUpperCase()

  // ── YouTube embed ──
  if (project.youtubeId) {
    return (
      <div
        className={styles.smallVisual}
        style={project.bgStyle}
        onClick={() => setYtActive(true)}
      >
        {!ytActive ? (
          <>
            {project.thumbnail && !imgError ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                onError={() => setImgError(true)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>{fallbackLabel}<div className={styles.smallOverlay} style={{ background: project.overlayColor }} /></>
            )}
            <PlayIcon size={40} />
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
            allow="autoplay; fullscreen"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            title={project.title}
          />
        )}
        <div className={styles.projectTags} style={{ top: 16, left: 16, zIndex: 3 }}>
          <span className={styles.tag}>{project.categories[0]}</span>
        </div>
      </div>
    )
  }

  // ── Self-hosted video (hover to play) ──
  if (project.videoSrc) {
    return (
      <div
        className={styles.smallVisual}
        style={{ ...project.bgStyle, padding: 0, overflow: 'hidden' }}
        onMouseEnter={() => { videoRef.current?.play(); setPlaying(true) }}
        onMouseLeave={() => {
          if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
          setPlaying(false)
        }}
      >
        {/* Thumbnail shown at rest, hidden during play */}
        {project.thumbnail && !imgError && (
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1,
              opacity: playing ? 0 : 1, transition: 'opacity 0.3s',
            }}
          />
        )}
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted loop playsInline preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {!playing && <PlayIcon size={40} />}
        <div className={styles.projectTags} style={{ top: 16, left: 16, zIndex: 3 }}>
          <span className={styles.tag}>{project.categories[0]}</span>
        </div>
      </div>
    )
  }

  // ── Static image ──
  if (project.thumbnail && !imgError) {
    return (
      <div className={styles.smallVisual} style={{ ...project.bgStyle, padding: 0, overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div className={styles.projectTags} style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
          <span className={styles.tag}>{project.categories[0]}</span>
        </div>
      </div>
    )
  }

  // ── Gradient + text fallback (your existing design — nothing changes until you add images) ──
  return (
    <div className={styles.smallVisual} style={project.bgStyle}>
      {fallbackLabel}
      <div className={styles.smallOverlay} style={{ background: project.overlayColor }} />
      <div className={styles.projectTags} style={{ top: 16, left: 16 }}>
        <span className={styles.tag}>{project.categories[0]}</span>
      </div>
    </div>
  )
}

// Small play icon overlay
function PlayIcon({ size = 40 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={size * 0.35} height={size * 0.35} viewBox="0 0 12 12" fill="none">
          <path d="M3 2l8 4-8 4V2z" fill="white" opacity="0.9" />
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE COMPONENT — identical structure to your original, media slots swapped in
// ─────────────────────────────────────────────────────────────────────────────

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
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
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
        </div>
      </header>

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
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

      {/* ── WORKS ───────────────────────────────────────────────────────── */}
      <main className={styles.worksContainer}>

        {/* Featured case studies */}
        {filteredFeatured.map((project) => (
          <div key={project.id} className={`${styles.caseStudy} reveal`}>
            <div className={`${styles.caseStudyInner} ${project.reversed ? styles.reversed : ''}`}>

              {/* Visual panel — now media-aware */}
              <FeaturedVisual project={project} />

              {/* Content panel — unchanged from your original */}
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
                  {/* View Live button — only shows if liveUrl is set */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewCase}
                      style={{ marginRight: 16, opacity: 0.6 }}
                    >
                      View Live ↗
                    </a>
                  )}
                  <Link to={`/works/${project.id}`} className={styles.viewCase}>
                    View Full Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Section divider */}
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

              {/* Small visual — now media-aware */}
              <SmallVisual project={project} />

              {/* Card content — unchanged from your original */}
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
