// ================================================
// WorksPage — media-aware, data driven from worksData.js
// src/pages/WorksPage.jsx
// ================================================

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { FEATURED_PROJECTS, SMALL_PROJECTS, FILTER_TAGS } from '../data/worksData'
import styles from './WorksPage.module.css'

// ─────────────────────────────────────────────────────────────────────────────
//  MEDIA COMPONENTS — handles image / video / fallback cleanly
// ─────────────────────────────────────────────────────────────────────────────

// Featured card visual panel
function FeaturedVisual({ project }) {
  const [imgError, setImgError] = useState(false)

  const fallbackStyle = {
    background: project.thumbnailFallbackColor
      ? `linear-gradient(135deg, ${project.thumbnailFallbackColor}, #0a0c12)`
      : 'linear-gradient(135deg, #0a0a0a, #12101a)',
  }

  if (project.thumbnail && !imgError) {
    return (
      <div className={styles.caseStudyVisual} style={{ padding: 0, overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div className={styles.projectTags} style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
          {(project.categories || []).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveBadge}
            onClick={(e) => e.stopPropagation()}
          >
            VIEW LIVE ↗
          </a>
        )}
      </div>
    )
  }

  // Gradient + large text fallback
  return (
    <div className={styles.caseStudyVisual} style={fallbackStyle}>
      <div
        className={styles.caseStudyVisualInner}
        style={{ color: project.thumbnailFallbackColor ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)' }}
      >
        {project.thumbnailFallbackLabel || project.title}
      </div>
      <div className={styles.caseStudyOverlay} />
      <div className={styles.projectTags}>
        {(project.categories || []).map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// Small card visual — handles image, hover-play video, YouTube, or gradient fallback
function SmallVisual({ project }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [ytActive, setYtActive] = useState(false)

  const fallbackLabel = project.thumbnailFallbackLabel || project.title.split(' ')[0].toUpperCase()
  const fallbackStyle = {
    background: project.thumbnailFallbackColor
      ? `linear-gradient(135deg, ${project.thumbnailFallbackColor}, #0a0c12)`
      : 'linear-gradient(135deg, #080810, #10081a)',
  }

  // YouTube embed
  if (project.youtubeId) {
    return (
      <div className={styles.smallVisual} style={fallbackStyle} onClick={() => setYtActive(true)}>
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
              <>{fallbackLabel}<div className={styles.smallOverlay} /></>
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
          <span className={styles.tag}>{project.category || project.filterTag}</span>
        </div>
      </div>
    )
  }

  // Self-hosted video (hover to play)
  if (project.videoSrc) {
    return (
      <div
        className={styles.smallVisual}
        style={{ ...fallbackStyle, padding: 0, overflow: 'hidden' }}
        onMouseEnter={() => { videoRef.current?.play(); setPlaying(true) }}
        onMouseLeave={() => {
          if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
          setPlaying(false)
        }}
      >
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
          <span className={styles.tag}>{project.category || project.filterTag}</span>
        </div>
      </div>
    )
  }

  // Static image
  if (project.thumbnail && !imgError) {
    return (
      <div className={styles.smallVisual} style={{ ...fallbackStyle, padding: 0, overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div className={styles.projectTags} style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
          <span className={styles.tag}>{project.category || project.filterTag}</span>
        </div>
      </div>
    )
  }

  // Gradient + text fallback
  return (
    <div className={styles.smallVisual} style={fallbackStyle}>
      {fallbackLabel}
      <div className={styles.smallOverlay} />
      <div className={styles.projectTags} style={{ top: 16, left: 16 }}>
        <span className={styles.tag}>{project.category || project.filterTag}</span>
      </div>
    </div>
  )
}

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
//  PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  useScrollReveal('.reveal')

  const filteredFeatured = FEATURED_PROJECTS.filter(
    (p) => activeFilter === 'all' || (p.filterTags || []).includes(activeFilter)
  )
  const filteredSmall = SMALL_PROJECTS.filter(
    (p) => activeFilter === 'all' || p.filterTag === activeFilter
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
        {FILTER_TAGS.map((cat) => (
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
        {filteredFeatured.map((project, i) => (
          <div key={project.id} className={`${styles.caseStudy} reveal`}>
            <div className={`${styles.caseStudyInner} ${i % 2 !== 0 ? styles.reversed : ''}`}>

              {/* Visual panel */}
              <FeaturedVisual project={project} />

              {/* Content panel */}
              <div className={styles.caseStudyContent}>
                <div>
                  <div className={styles.caseMeta}>
                    <span className={styles.caseYear}>// {project.year}</span>
                    <span className={styles.caseStatus}>{project.status || 'Live'}</span>
                  </div>
                  <div className={styles.caseClient}>{project.title}</div>
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
                    {(project.tech || []).map((t) => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>

                  {project.stats && project.stats.length > 0 && (
                    <div className={styles.caseResults}>
                      {project.stats.map((r) => (
                        <div key={r.label} className={styles.resultItem}>
                          <div className={styles.resultValue}>{r.value}</div>
                          <div className={styles.resultLabel}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.caseCta}>
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
              <SmallVisual project={project} />
              <div className={styles.smallContent}>
                <div className={styles.smallCat}>// {project.year} — {project.category || project.filterTag}</div>
                <div className={styles.smallTitle}>{project.title}</div>
                <div className={styles.smallDesc}>{project.description}</div>
                <div className={styles.smallTech}>
                  {(project.tech || []).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}
