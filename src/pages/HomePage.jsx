// ================================================
// HomePage — converted from synapse-calyx-homepage.html
// src/pages/HomePage.jsx
// ================================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import styles from './HomePage.module.css'

/* ---- Small reusable sub-components ---- */

function HeroBg() {
  return (
    <>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />
      <div className={styles.heroNoise} />
    </>
  )
}

function Ticker() {
  const items = [
    'Web Development', 'UI/UX Design', 'AI Automation',
    'Graphic Design', 'Video Editing', 'Motion Graphics', 'System Architecture',
  ]
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className={styles.ticker}>
      <div className={styles.tickerInner}>
        {all.map((item, i) => (
          <span key={i}>
            {item}
            <span className={styles.tickerSep}>///</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ text }) {
  return <div className={styles.sectionLabel}>{text}</div>
}

/* ---- Main page ---- */

export default function HomePage() {
  // Wire up scroll reveals
  useScrollReveal('.reveal')

  return (
    <div className={styles.page}>

      {/* ======== HERO ======== */}
      <section className={styles.hero}>
        <HeroBg />
        <div className={styles.heroContent}>
          <div className={`${styles.heroNumber} ${styles.animFadeUp1}`}>
            // 001 — Synapse Calyx Studio
          </div>
          <h1 className={`${styles.heroTitle} ${styles.animFadeUp2}`}>
            We Build<br />
            <em className={styles.heroTitleEm}>Intelligent</em><br />
            Digital Systems
          </h1>
          <p className={`${styles.heroSub} ${styles.animFadeUp3}`}>
            Precision engineering for the digital age. We don't make websites.
            We architect living, breathing systems where design becomes infrastructure
            and intelligence becomes a product.
          </p>
          <div className={`${styles.heroActions} ${styles.animFadeUp4}`}>
            <Link to="/works" className={styles.btnPrimary}>
              Enter the System →
            </Link>
            <Link to="/works" className={styles.btnGhost}>
              View Our Work <span>→</span>
            </Link>
          </div>
        </div>

        <div className={`${styles.heroMetrics} ${styles.animFadeLeft}`}>
          {[
            { value: '47+', label: 'Systems Deployed' },
            { value: '100%', label: 'Delivery Rate' },
            { value: '∞', label: 'Scale Ceiling' },
          ].map((m) => (
            <div key={m.label} className={styles.metric}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>Scroll to explore</span>
        </div>
      </section>

      {/* ======== TICKER ======== */}
      <Ticker />

      {/* ======== MANIFESTO ======== */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>

          <div className={`${styles.manifestoLeft} reveal`}>
            <SectionLabel text="// 01 — Origin" />
            <h2 className={styles.manifestoTitle}>
              Built on a<br />
              <span>Different Premise</span>
            </h2>
            <blockquote className={styles.manifestoQuote}>
              "Most agencies give you deliverables. We give you systems that outlive
              the brief and infrastructure that compounds over time."
            </blockquote>
          </div>

          <div className={styles.manifestoRight}>
            {[
              {
                n: '[01]', title: 'The Problem With Modern Agencies',
                text: 'The digital landscape is littered with beautiful things that don\'t work, and functional things that are invisible. Agencies optimize for the portfolio shot. Nobody builds for the long game — for the system that runs at 3am without supervision.',
              },
              {
                n: '[02]', title: 'Our Architecture-First Approach',
                text: 'Every project begins with systems thinking. Before a single pixel is placed or a line of code is written, we map the entire data architecture, the user decision tree, the automation layers, and the edge cases nobody thought of.',
              },
              {
                n: '[03]', title: 'Intelligence as a Core Feature',
                text: 'We integrate AI not as a feature or a selling point, but as a fundamental layer of operation. Your CRM learns. Your workflows adapt. Your content evolves. We\'re not building apps — we\'re building entities that improve themselves.',
              },
              {
                n: '[04]', title: 'Aesthetic as Signal',
                text: 'Monochrome minimalism isn\'t an aesthetic choice — it\'s a philosophical one. Noise is the enemy of signal. Every design decision we make is about amplifying what matters and eliminating what doesn\'t.',
              },
            ].map((block) => (
              <div key={block.n} className={`${styles.manifestoBlock} reveal`}>
                <h3 className={styles.manifestoBlockTitle} data-n={block.n}>
                  {block.title}
                </h3>
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== PHILOSOPHY STATEMENT ======== */}
      <div className={styles.philosophy}>
        <p className={`${styles.philosophyStatement} reveal`}>
          "We believe digital infrastructure is the{' '}
          <strong>most consequential art form</strong> of our time — invisible to
          most, but shaping every interaction, every decision, every exchange of
          value that moves through the network."
        </p>
      </div>

      {/* ======== FUTURE SECTION ======== */}
      <section className={styles.future}>
        <div className={styles.futureInner}>
          <div className={`${styles.futureHeader} reveal`}>
            <h2 className={styles.futureTitle}>The Future of Digital Systems</h2>
            <p className={styles.futureSub}>
              Three forces reshaping how we build, deploy, and experience digital
              products in the next decade.
            </p>
          </div>
          <div className={styles.futureGrid}>
            {[
              {
                node: '// Node_01', title: 'Autonomous Operations',
                text: 'The best digital systems run without human intervention. Workflows that trigger workflows. Pipelines that self-optimize. Infrastructure that monitors and heals itself.',
              },
              {
                node: '// Node_02', title: 'Interface as Identity',
                text: 'As products commoditize, the interface becomes the product. The feel of a button, the rhythm of a transition, the density of information — these are brand decisions and revenue decisions.',
              },
              {
                node: '// Node_03', title: 'Contextual Intelligence',
                text: 'Static websites are digital tombstones. The future belongs to systems that understand context: who is visiting, what they need, what they\'ve done, what they\'re likely to do next.',
              },
            ].map((card) => (
              <div key={card.node} className={`${styles.futureCard} reveal`}>
                <div className={styles.futureCardN}>{card.node}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <div className={styles.futureCardLine} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SERVICE HINTS ======== */}
      <section className={styles.servicesHint}>
        <div className={`${styles.servicesHintHeader} reveal`}>
          <h2 className={styles.servicesHintTitle}>Our Capabilities</h2>
          <p className={styles.servicesHintDesc}>
            Five disciplines. One methodology. Every service we offer is designed
            to integrate with the others — because isolated outputs are the root
            of digital mediocrity.
          </p>
        </div>
        <div className={`${styles.servicesList} reveal`}>
          {[
            { title: 'Web Development', sub: 'Full-stack systems, React architecture, API integration' },
            { title: 'UI / UX Design', sub: 'Interface systems, user experience strategy' },
            { title: 'AI Automation', sub: 'Workflow intelligence, pipeline engineering' },
            { title: 'Graphic Design / GFX', sub: 'Visual identity, aesthetic systems, motion assets' },
          ].map((s) => (
            <Link to="/services" key={s.title} className={styles.serviceItem}>
              <div>
                <h4>{s.title}</h4>
                <p>{s.sub}</p>
              </div>
              <div className={styles.serviceArrow}>↗</div>
            </Link>
          ))}
          <Link to="/services" className={`${styles.serviceItem} ${styles.serviceItemFull}`}>
            <div>
              <h4>Video Editing & Motion</h4>
              <p>Post-production, motion graphics, animation systems</p>
            </div>
            <div className={styles.serviceArrow}>↗</div>
          </Link>
        </div>
      </section>

      {/* ======== NAV CARDS ======== */}
      <section className={styles.navCards}>
        <div className={styles.navCardsTitle}>// Explore Synapse Calyx</div>
        <div className={styles.navCardsGrid}>
          {[
            { label: 'Portfolio', title: 'Our Works', desc: 'Case studies, architecture breakdowns, and visual documentation of systems we\'ve built.', to: '/works' },
            { label: 'Capabilities', title: 'Services', desc: 'Five disciplines. One methodology. See the full breakdown of what we build and how.', to: '/services' },
            { label: 'Initiate', title: 'Start a Project', desc: 'Submit your brief. Our panel will analyze and architect the optimal trajectory.', to: '/order' },
            { label: 'Intelligence', title: 'Blog', desc: 'Systems thinking, design philosophy, and intelligence reports from our engineering team.', to: '/blog' },
          ].map((card, i) => (
            <Link to={card.to} key={card.title} className={`${styles.navCard} reveal`} data-delay={String(i + 1)}>
              <div className={styles.navCardBg} />
              <div className={styles.navCardLabel}>{card.label}</div>
              <div className={styles.navCardTitle}>{card.title}</div>
              <div className={styles.navCardDesc}>{card.desc}</div>
              <div className={styles.navCardArrow}>↗</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
