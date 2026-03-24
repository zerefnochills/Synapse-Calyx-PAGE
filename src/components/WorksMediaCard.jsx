// ─────────────────────────────────────────────────────────────────────────────
//  Synapse Calyx — WorksMediaCard
//  Drop this into src/components/WorksMediaCard.jsx
//
//  This component handles all 3 media types cleanly:
//    - 'design' / 'web' → shows <img> with fallback to text label
//    - 'video'          → autoplays muted loop on hover, shows thumb at rest
//    - youtubeId        → shows embedded YouTube iframe on click
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState } from 'react';

// ── FEATURED card media (large, left panel) ───────────────────────────────────
export const FeaturedMedia = ({ project }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [ytActive, setYtActive] = useState(false);

    const handleMouseEnter = () => {
        if (project.type === 'video' && project.videoSrc && videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setPlaying(false);
        }
    };

    const style = {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: project.thumbnailFallbackColor || '#0a0c12',
        cursor: project.liveUrl ? 'pointer' : 'default',
    };

    // ── YouTube embed ──
    if (project.youtubeId) {
        return (
            <div style={style} onClick={() => setYtActive(true)}>
                {!ytActive ? (
                    <>
                        {project.thumbnail && !imgError ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                onError={() => setImgError(true)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        ) : (
                            <FallbackLabel label={project.thumbnailFallbackLabel} />
                        )}
                        <PlayButton />
                    </>
                ) : (
                    <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                        allow="autoplay; fullscreen"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title={project.title}
                    />
                )}
            </div>
        );
    }

    // ── Self-hosted video ──
    if (project.type === 'video' && project.videoSrc) {
        return (
            <div style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {project.thumbnail && !imgError && (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        onError={() => setImgError(true)}
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            opacity: playing ? 0 : 1,
                            transition: 'opacity 0.3s',
                            zIndex: 1,
                        }}
                    />
                )}
                <video
                    ref={videoRef}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {!playing && <PlayButton />}
            </div>
        );
    }

    // ── Image (design / web) ──
    if (project.thumbnail && !imgError) {
        return (
            <div style={style}>
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {project.liveUrl && <LiveBadge />}
            </div>
        );
    }

    // ── Fallback (no image yet) ──
    return (
        <div style={style}>
            <FallbackLabel label={project.thumbnailFallbackLabel} />
        </div>
    );
};

// ── SMALL card media (grid cards) ─────────────────────────────────────────────
export const SmallMedia = ({ project }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [ytActive, setYtActive] = useState(false);

    const handleMouseEnter = () => {
        if (project.type === 'video' && project.videoSrc && videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setPlaying(false);
        }
    };

    const containerStyle = {
        width: '100%',
        aspectRatio: '600 / 340',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: project.thumbnailFallbackColor || '#0a0c12',
    };

    if (project.youtubeId && ytActive) {
        return (
            <div style={containerStyle}>
                <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                    allow="autoplay; fullscreen"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title={project.title}
                />
            </div>
        );
    }

    if (project.type === 'video' && project.videoSrc) {
        return (
            <div style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {project.thumbnail && !imgError && (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        onError={() => setImgError(true)}
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            opacity: playing ? 0 : 1,
                            transition: 'opacity 0.3s',
                        }}
                    />
                )}
                <video
                    ref={videoRef}
                    src={project.videoSrc}
                    muted loop playsInline preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {!playing && <SmallPlayButton />}
            </div>
        );
    }

    if (project.thumbnail && !imgError) {
        return (
            <div style={containerStyle}>
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <FallbackLabel label={project.thumbnailFallbackLabel} />
        </div>
    );
};

// ── Reusable sub-components ───────────────────────────────────────────────────

const FallbackLabel = ({ label }) => (
    <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
        <span style={{
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.06)',
            userSelect: 'none',
        }}>
            {label}
        </span>
    </div>
);

const PlayButton = () => (
    <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
    }}>
        <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 4l9 5-9 5V4z" fill="white" opacity="0.9" />
            </svg>
        </div>
    </div>
);

const SmallPlayButton = () => (
    <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
    }}>
        <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4 2.5l7 4-7 4v-8z" fill="white" opacity="0.9" />
            </svg>
        </div>
    </div>
);

const LiveBadge = () => (
    <div style={{
        position: 'absolute', bottom: 12, right: 12, zIndex: 2,
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 4, padding: '3px 8px',
        fontSize: 10, letterSpacing: 2,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'monospace',
    }}>
        VIEW LIVE ↗
    </div>
);

export default { FeaturedMedia, SmallMedia };
