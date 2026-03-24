// ================================================
// WorksCaseStudy — individual case study / project detail
// src/pages/WorksCaseStudy.jsx
// ================================================

import { useState, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { FEATURED_PROJECTS, SMALL_PROJECTS } from '../data/worksData'
import styles from './WorksCaseStudy.module.css'

// Merge all projects into one searchable list
const ALL_PROJECTS = [...FEATURED_PROJECTS, ...SMALL_PROJECTS]

// ─────────────────────────────────────────────────────────────────────────────
//  Hero Visual — full-width media panel at top of case study
// ─────────────────────────────────────────────────────────────────────────────

function HeroVisual({ project }) {
  const videoRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const [ytActive, setYtActive] = useState(false)
  const [playing, setPlaying] = useState(false)

  const fallbackBg = project.thumbnailFallbackColor
    ? { background: `linear-gradient(135deg, ${project.thumbnailFallbackColor}, #0a0c12)` }
    : { background: 'linear-gradient(135deg, #0a0a0a, #12101a)' }
  const label = (project.title || '').toUpperCase()
  const fallbackText = project.thumbnailFallbackLabel || label
  const fallbackColor = 'rgba(255,255,255,0.06)'

  // YouTube embed
  if (project.youtubeId) {
    return (
      <div className={styles.heroVisual} style={fallbackBg} onClick={() => setYtActive(true)}>
        {!ytActive ? (
          <>
            {project.thumbnail && !imgError ? (
              <img
                src={project.thumbnail}
                alt={label}
                onError={() => setImgError(true)}
                className={styles.heroImg}
              />
            ) : (
              <div className={styles.heroFallbackText} style={{ color: fallbackColor }}>
                {fallbackText}
              </div>
            )}
            <PlayButton />
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
            allow="autoplay; fullscreen"
            className={styles.heroIframe}
            title={label}
          />
        )}
      </div>
    )
  }

  // Self-hosted video
  if (project.videoSrc) {
    return (
      <div
        className={styles.heroVisual}
        style={{ ...fallbackBg, padding: 0, overflow: 'hidden', cursor: 'pointer' }}
        onMouseEnter={() => { videoRef.current?.play(); setPlaying(true) }}
        onMouseLeave={() => {
          if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
          setPlaying(false)
        }}
      >
        {project.thumbnail && !imgError && (
          <img
            src={project.thumbnail}
            alt={label}
            onError={() => setImgError(true)}
            className={styles.heroImg}
            style={{ opacity: playing ? 0 : 1, transition: 'opacity 0.3s' }}
          />
        )}
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted loop playsInline preload="metadata"
          className={styles.heroVideo}
        />
        {!playing && <PlayButton />}
      </div>
    )
  }

  // Static image
  if (project.thumbnail && !imgError) {
    return (
      <div className={styles.heroVisual} style={{ padding: 0, overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={label}
          onError={() => setImgError(true)}
          className={styles.heroImg}
        />
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

  // Gradient fallback
  return (
    <div className={styles.heroVisual} style={fallbackBg}>
      <div className={styles.heroFallbackText} style={{ color: fallbackColor }}>
        {project.thumbnailFallbackLabel || label}
      </div>
    </div>
  )
}

function PlayButton() {
  return (
    <div className={styles.playBtn}>
      <div className={styles.playBtnCircle}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5l10 5-10 5V5z" fill="white" opacity="0.9" />
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WorksCaseStudy() {
  const { id } = useParams()
  const project = ALL_PROJECTS.find((p) => p.id === id)

  // Unknown project → redirect back to works list
  if (!project) return <Navigate to="/works" replace />

  const label = project.title
  const tags = project.categories || (project.filterTag ? [project.filterTag] : [])

  return (
    <div className={styles.page}>

      {/* ── BACK LINK ─────────────────────────────────────────────────────── */}
      <div className={styles.backRow}>
        <Link to="/works" className={styles.backLink}>
          ← Back to Works
        </Link>
      </div>

      {/* ── HERO VISUAL ───────────────────────────────────────────────────── */}
      <HeroVisual project={project} />

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className={styles.container}>
        <header className={styles.caseHeader}>
          <div className={styles.caseMeta}>
            <span className={styles.caseYear}>// {project.year}</span>
            <span className={styles.caseStatus}>Live</span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
              >
                View Live ↗
              </a>
            )}
          </div>

          <h1 className={styles.caseTitle}>{label}</h1>
          {(project.subtitle || project.cat) && (
            <p className={styles.caseSubtitle}>{project.subtitle || project.cat}</p>
          )}

          <div className={styles.tags}>
            {tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>
        </header>

        {/* ── BODY CONTENT ────────────────────────────────────────────────── */}
        <div className={styles.caseBody}>

          {/* Left: narrative blocks */}
          <div className={styles.narrative}>

            {project.problem && (
              <section className={styles.block}>
                <div className={styles.blockLabel}>// The Problem</div>
                <p className={styles.blockText}>{project.problem}</p>
              </section>
            )}

            {project.strategy && (
              <section className={styles.block}>
                <div className={styles.blockLabel}>// Strategy</div>
                <p className={styles.blockText}>{project.strategy}</p>
              </section>
            )}

            {(project.description || project.desc) && !project.problem && (
              <section className={styles.block}>
                <div className={styles.blockLabel}>// Overview</div>
                <p className={styles.blockText}>{project.description || project.desc}</p>
              </section>
            )}

          </div>

          {/* Right: sidebar */}
          <aside className={styles.sidebar}>

            {/* Tech stack */}
            <div className={styles.sideBlock}>
              <div className={styles.sideLabel}>// Stack</div>
              <div className={styles.techStack}>
                {(project.tech || project.stack || []).map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
            </div>

            {/* Results */}
            {(project.stats || project.results) && (project.stats || project.results).length > 0 && (
              <div className={styles.sideBlock}>
                <div className={styles.sideLabel}>// Results</div>
                <div className={styles.results}>
                  {(project.stats || project.results).map((r) => (
                    <div key={r.label} className={styles.resultItem}>
                      <div className={styles.resultValue}>{r.value}</div>
                      <div className={styles.resultLabel}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>

        {/* ── FOOTER CTA ──────────────────────────────────────────────────── */}
        <div className={styles.footerCta}>
          <Link to="/works" className={styles.backLink}>
            ← All Projects
          </Link>
          <Link to="/order" className={styles.ctaBtn}>
            Start a Project →
          </Link>
        </div>

      </div>
    </div>
  )
}
