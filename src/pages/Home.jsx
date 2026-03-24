import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import s from './Home.module.css';
import { FEATURED_POST, BLOG_CARDS } from '../data/BlogData';
import BlogThumbnail from '../components/ui/BlogThumbnails';

const TICKER_ITEMS = [
    'Web Development', 'UI / UX Design', 'AI Automation',
    'Graphic Design', 'Video Editing', 'Motion Graphics',
    'Brand Identity', 'System Architecture',
];

const VISION_CARDS = [
    {
        num: '',
        title: 'Autonomous Operations',
        text: 'The best digital systems run without human intervention. Workflows that trigger workflows. Pipelines that self-optimize. Infrastructure that monitors and heals itself. We build things that work at 3am without supervision.',
    },
    {
        num: '',
        title: 'Interface as Identity',
        text: 'As products commoditize, the interface becomes the product. The feel of a button, the rhythm of a transition, the density of information — these are brand decisions and revenue decisions made with the same precision.',
    },
    {
        num: '',
        title: 'Contextual Intelligence',
        text: "Static websites are digital tombstones. The future belongs to systems that understand context: who is visiting, what they need, what they've done, and what they're most likely to do next. We build entities that learn.",
    },
];

const Home = () => {
    useScrollReveal('.reveal');

    const heroGridRef = useRef(null);

    // Parallax hero grid
    useEffect(() => {
        const onScroll = () => {
            if (heroGridRef.current) {
                heroGridRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animated counters
    useEffect(() => {
        const els = document.querySelectorAll('[data-count]');
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const target = parseInt(e.target.dataset.count, 10);
                        let current = 0;
                        const step = target / 50;
                        const timer = setInterval(() => {
                            current = Math.min(current + step, target);
                            e.target.textContent = Math.floor(current);
                            if (current >= target) clearInterval(timer);
                        }, 25);
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ backgroundColor: '#07090e', minHeight: '100vh' }}>

            {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
            <section className={s.hero}>
                <div className={s.heroGrid} ref={heroGridRef} />

                <div className={s.heroEyebrow}>Synapse Calyx</div>

                <h1 className={s.heroTitle}>
                    Design.<br />Intelligence.<br />
                    <em className={s.heroTitleEm}>Systems.</em>
                </h1>

                <p className={s.heroSub}>
                    A founder-led digital studio operating at the intersection of design,
                    engineering, and structured thinking. We don't build websites — we architect
                    living systems.
                </p>

                <div className={s.heroActions}>
                    <Link to="/works" className={s.btnPrimary}>View Our Works →</Link>
                    <Link to="/order" className={s.btnGhost}>Start a Project <span>↗</span></Link>
                </div>

                <div className={s.heroScroll}>
                    <div className={s.heroScrollLine} />
                    <span className={s.heroScrollSpan}>Scroll to read</span>
                </div>

            </section>

            {/* ════════════════════════════════════════════
          TICKER
          ════════════════════════════════════════════ */}
            <div className={s.ticker}>
                <div className={s.tickerInner}>
                    {/* Duplicate items for seamless loop */}
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className={s.tickerSpan}>
                            {item}<em className={s.tickerDivider}>///</em>
                        </span>
                    ))}
                </div>
            </div>

            {/* ════════════════════════════════════════════
          ORIGIN — NARRATIVE
          ════════════════════════════════════════════ */}
            <section className={s.origin}>
                <div className={s.originInner}>

                    <div className={`${s.originLeft} reveal`}>
                        <div className={s.originIndex}></div>
                        <h2 className={s.originTitle}>
                            How<br /><span className={s.originTitleSpan}>Synapse</span><br />Started
                        </h2>
                        <blockquote className={s.originQuote}>
                            "Synapse didn't begin as a company. It began as a frustration."
                        </blockquote>
                    </div>

                    <div className={s.originRight}>
                        <div className={`${s.narrativeBlock} reveal`} data-delay="1">
                            <div className={s.narrativeNum}></div>
                            <h3 className={s.narrativeTitle}>
                                The Problem With Beautiful Things That Don't Work
                            </h3>
                            <p className={s.narrativeText}>
                                I was tired of digital work that looked impressive but lacked depth.
                                Beautiful visuals without architecture. Animation without intention.
                                Sites that won awards and lost clients.
                            </p>
                            <p className={s.narrativeText}>
                                The industry had optimized for the portfolio screenshot, not the
                                Sunday morning when the server goes down, not the conversion rate
                                after the launch buzz fades.
                            </p>
                            <div className={s.narrativePullquote}>
                                "I didn't want to build another agency. I wanted to build a system —
                                something that prioritizes clarity, structure, and long-term thinking."
                            </div>
                            <p className={s.narrativeText}>
                                Synapse was born from that decision. Not from a pitch deck or a business
                                plan. From a conviction that the digital world deserved better foundations.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════
          VISION
          ════════════════════════════════════════════ */}
            <section className={s.vision}>
                <div className={s.visionHeader}>
                    <h2 className={`${s.visionTitle} reveal`}>What We're<br />Building</h2>
                    <p className={`${s.visionIntro} reveal`} data-delay="2">
                        The goal is not to chase trends. The goal is to build foundations.
                        Architecture before aesthetics. Systems before shortcuts.
                        Long-term leverage over short-term hype.<br /><br />
                        In an era dominated by AI and automation, clarity becomes the real
                        competitive advantage. Synapse is positioning itself for that era.
                    </p>
                </div>

                <div className={s.visionCards}>
                    {VISION_CARDS.map((card, i) => (
                        <div key={i} className={`${s.visionCard} reveal`} data-delay={String(i + 1)}>
                            <div className={s.visionCardNum}>{card.num}</div>
                            <h3 className={s.visionCardTitle}>{card.title}</h3>
                            <p className={s.visionCardText}>{card.text}</p>
                            <div className={s.visionCardLine} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════════
          FOUNDER
          ════════════════════════════════════════════ */}
            <section className={s.founder}>
                <div className={s.founderInner}>

                    <div>
                        <div className={`${s.founderBadge} reveal`}>
                            <div className={s.founderBadgeDot} />
                        </div>
                        <h2 className={`${s.founderTitle} reveal`}>Deepak —<br />Founder &amp; CEO</h2>
                        <p className={`${s.founderBody} reveal`} data-delay="1">
                            My name is Deepak. I founded Synapse Calyx with a simple intention:
                            to build something structured, intentional, and intelligent.
                        </p>
                        <p className={`${s.founderBody} reveal`} data-delay="2">
                            To me, design is not decoration. It's structured thinking made visible.
                            Technology is not just functionality — it's leverage when used correctly.
                        </p>
                        <p className={`${s.founderBody} reveal`} data-delay="3">
                            I believe in precision over noise, depth over surface-level aesthetics,
                            and systems over shortcuts. Synapse reflects that mindset in everything we build.
                        </p>
                        <blockquote className={`${s.founderQuote} reveal`} data-delay="4">
                            "We are not here to be loud. We are here to be intentional."
                        </blockquote>
                    </div>

                    <div className={`${s.founderAvatarCol} reveal`} data-delay="2">
                        <div className={s.founderAvatarFrame}>
                            <img src="/deepak.jpg" alt="Deepak Pandey" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
                        </div>
                        <div className={s.founderAvatarCaption}>
                            <strong>Deepak Pandey</strong>
                            Founder &amp; Chief Architect<br />
                            Synapse Calyx Studio
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════════
          BLOG / INTELLIGENCE REPORTS
          ════════════════════════════════════════════ */}
            <section className={s.blog}>
                <div className={`${s.blogHeader} reveal`}>
                    <h2 className={s.blogTitle}>
                        Intelligence<br /><span className={s.blogTitleSpan}>Reports</span>
                    </h2>
                    <a href="#" className={s.blogViewAll}>Read All Articles →</a>
                </div>

                {/* Featured post */}
                <Link to={`/blog/${FEATURED_POST.slug}`} className={`${s.blogFeatured} reveal`}>
                    <div className={s.blogFeaturedImage} style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 10 }}>
                            <div className={s.blogFeaturedImageBadge}>Featured Article</div>
                        </div>
                        <BlogThumbnail slug={FEATURED_POST.slug} />
                    </div>
                    <div className={s.blogFeaturedContent}>
                        <div>
                            <div className={s.blogFeaturedMeta}>
                                <span>{FEATURED_POST.date}</span>
                                <span>{FEATURED_POST.readTime}</span>
                            </div>
                            <h3 className={s.blogFeaturedTitle}>{FEATURED_POST.title}</h3>
                            <p className={s.blogFeaturedExcerpt}>{FEATURED_POST.excerpt}</p>
                            <div className={s.blogFeaturedTags}>
                                {FEATURED_POST.tags.map(tag => (
                                    <span key={tag} className={s.blogTag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <span className={s.blogFeaturedReadmore}>Read Full Article →</span>
                    </div>
                </Link>

                {/* 3-column grid */}
                <div className={s.blogGrid}>
                    {BLOG_CARDS.map((card, i) => (
                        <Link to={`/blog/${card.slug}`} key={i} className={`${s.blogCard} reveal`} data-delay={String(i + 1)}>
                            <div className={s.blogCardImage} style={{ padding: 0, overflow: 'hidden' }}>
                                <BlogThumbnail slug={card.slug} />
                            </div>
                            <div className={s.blogCardBody}>
                                <div className={s.blogCardMeta}>
                                    <span>{card.date}</span>
                                    <span>{card.readTime}</span>
                                </div>
                                <h3 className={s.blogCardTitle}>{card.title}</h3>
                                <p className={s.blogCardExcerpt}>{card.excerpt}</p>
                                <div className={s.blogCardFooter}>
                                    <div className={s.blogCardTags}>
                                        {card.tags.map((tag) => (
                                            <span key={tag} className={s.blogTag}>{tag}</span>
                                        ))}
                                    </div>
                                    <span className={s.blogCardRead}>Read →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════ */}
            <section className={s.ctaSection}>
                <div className={`${s.ctaLabel} reveal`}>Ready to build something real?</div>
                <h2 className={`${s.ctaTitle} reveal`}>
                    Explore<br />Synapse
                </h2>
                <div className={`${s.ctaActions} reveal`} data-delay="2">
                    <Link to="/works" className={s.ctaGhostBtn}>View Works</Link>
                    <Link to="/order" className={s.ctaPrimaryBtn}>Start a Project</Link>
                </div>
            </section>

        </div>
    );
};

export default Home;
