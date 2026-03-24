// ─────────────────────────────────────────────────────────────
//  Synapse Calyx — Blog Thumbnails
//  Usage: <BlogThumbnail slug="why-agencies-sell-wrong-thing" />
//  Drop into src/components/BlogThumbnail.jsx
// ─────────────────────────────────────────────────────────────

const thumbnails = {

    // ── FEATURED: Strategy / Agency Model ──────────────────────
    'why-agencies-sell-wrong-thing': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            {/* Background */}
            <rect width="600" height="340" fill="#0a0c12" />

            {/* Grid of thin lines */}
            {[0, 1, 2, 3, 4, 5].map(i => (
                <line key={`v${i}`} x1={80 + i * 88} y1="40" x2={80 + i * 88} y2="300"
                    stroke="#ffffff" strokeWidth="0.4" opacity="0.08" />
            ))}
            {[0, 1, 2, 3, 4].map(i => (
                <line key={`h${i}`} x1="60" y1={70 + i * 56} x2="540" y2={70 + i * 56}
                    stroke="#ffffff" strokeWidth="0.4" opacity="0.08" />
            ))}

            {/* Highlighted intersection — the "system" */}
            <rect x="256" y="126" width="88" height="56" fill="none"
                stroke="#7c6ef7" strokeWidth="1" opacity="0.9" />
            <rect x="260" y="130" width="80" height="48" fill="#7c6ef7" opacity="0.08" />

            {/* Corner marks on highlight */}
            {[
                [256, 126], [344, 126], [256, 182], [344, 182]
            ].map(([x, y], i) => (
                <g key={i}>
                    <line x1={x - (i % 2 === 0 ? 6 : -6)} y1={y} x2={x} y2={y}
                        stroke="#7c6ef7" strokeWidth="1.5" />
                    <line x1={x} y1={y - (i < 2 ? 6 : -6)} x2={x} y2={y}
                        stroke="#7c6ef7" strokeWidth="1.5" />
                </g>
            ))}

            {/* Radiating thin lines from center */}
            {[300, 344, 388, 432, 476, 520].map((x, i) => (
                <line key={`r${i}`} x1="300" y1="154" x2={x} y2="300"
                    stroke="#7c6ef7" strokeWidth="0.5" opacity={0.04 + i * 0.04} />
            ))}
            {[300, 256, 212, 168, 124, 80].map((x, i) => (
                <line key={`l${i}`} x1="300" y1="154" x2={x} y2="300"
                    stroke="#7c6ef7" strokeWidth="0.5" opacity={0.04 + i * 0.04} />
            ))}

            {/* Category label */}
            <text x="48" y="316" fill="#7c6ef7" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">STRATEGY</text>
            <line x1="48" y1="322" x2="160" y2="322" stroke="#7c6ef7" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── CASE STUDY: SaaS Support 61% reduction ──────────────────
    'saas-support-ticket-reduction': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* Baseline */}
            <line x1="60" y1="270" x2="540" y2="270" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />

            {/* Y-axis ticks */}
            {[0, 1, 2, 3].map(i => (
                <line key={i} x1="55" y1={270 - i * 60} x2="540" y2={270 - i * 60}
                    stroke="#ffffff" strokeWidth="0.3" opacity="0.06" />
            ))}

            {/* Bars — descending, representing ticket count month over month */}
            {[
                { x: 80, h: 190, color: '#c0392b', opacity: 0.85 },
                { x: 148, h: 175, color: '#c0392b', opacity: 0.7 },
                { x: 216, h: 155, color: '#a0306c', opacity: 0.7 },
                { x: 284, h: 132, color: '#7c4fa0', opacity: 0.7 },
                { x: 352, h: 105, color: '#5a6ab0', opacity: 0.75 },
                { x: 420, h: 78,  color: '#3a8a60', opacity: 0.8 },
                { x: 488, h: 52,  color: '#2a9a50', opacity: 0.9 },
            ].map((b, i) => (
                <g key={i}>
                    <rect x={b.x} y={270 - b.h} width="42" height={b.h}
                        fill={b.color} opacity={b.opacity} rx="2" />
                    <rect x={b.x} y={270 - b.h} width="42" height="2"
                        fill="#ffffff" opacity="0.2" rx="1" />
                </g>
            ))}

            {/* Trend line over bars */}
            <polyline
                points="101,82 169,97 237,117 305,140 373,167 441,194 509,220"
                fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.25"
                strokeDasharray="4 4" />

            {/* Highlight the last bar — success */}
            <rect x="488" y={270 - 52} width="42" height="52"
                fill="none" stroke="#2a9a50" strokeWidth="1" rx="2" opacity="0.6" />

            {/* 61% label */}
            <text x="488" y={270 - 64} fill="#2a9a50" fontSize="11"
                fontFamily="monospace" letterSpacing="1" opacity="0.9">−61%</text>

            {/* Category */}
            <text x="48" y="316" fill="#2a9a50" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">CASE STUDY</text>
            <line x1="48" y1="322" x2="168" y2="322" stroke="#2a9a50" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── TECH: Lighthouse 98 Score ───────────────────────────────
    'lighthouse-98-react-architecture': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* Gauge background arc */}
            <path d="M 180,240 A 120,120 0 1,1 420,240"
                fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.07" strokeLinecap="round" />

            {/* Gauge segments — colored arcs */}
            {/* Red zone 0-50 */}
            <path d="M 180,240 A 120,120 0 0,1 219,151"
                fill="none" stroke="#c0392b" strokeWidth="4" opacity="0.35" strokeLinecap="round" />
            {/* Amber zone 50-89 */}
            <path d="M 219,151 A 120,120 0 0,1 370,123"
                fill="none" stroke="#e67e22" strokeWidth="4" opacity="0.35" strokeLinecap="round" />
            {/* Green zone 90-100 */}
            <path d="M 370,123 A 120,120 0 0,1 420,240"
                fill="none" stroke="#1daa70" strokeWidth="6" opacity="0.9" strokeLinecap="round" />

            {/* Tick marks */}
            {Array.from({ length: 11 }, (_, i) => {
                const angle = -200 + i * 22.2;
                const rad = (angle * Math.PI) / 180;
                const cx = 300, cy = 240, r = 120;
                const x1 = cx + r * Math.cos(rad);
                const y1 = cy + r * Math.sin(rad);
                const x2 = cx + (r + 12) * Math.cos(rad);
                const y2 = cy + (r + 12) * Math.sin(rad);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />;
            })}

            {/* Needle pointing to 98 */}
            <line x1="300" y1="240" x2="407" y2="157"
                stroke="#1daa70" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <circle cx="300" cy="240" r="6" fill="#1daa70" opacity="0.9" />
            <circle cx="300" cy="240" r="3" fill="#0a0c12" />

            {/* Score */}
            <text x="300" y="210" fill="#ffffff" fontSize="42" fontFamily="monospace"
                fontWeight="200" textAnchor="middle" opacity="0.95" letterSpacing="-2">98</text>
            <text x="300" y="228" fill="#1daa70" fontSize="10" fontFamily="monospace"
                textAnchor="middle" letterSpacing="3" opacity="0.7">PERFORMANCE</text>

            {/* Category */}
            <text x="48" y="316" fill="#1daa70" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">ENGINEERING</text>
            <line x1="48" y1="322" x2="188" y2="322" stroke="#1daa70" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── AI REPORT: The Actual AI Stack ──────────────────────────
    'ai-automation-stack-2025': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* Neural network nodes */}
            {/* Input layer */}
            {[80, 140, 200, 260].map((y, i) => (
                <circle key={`in${i}`} cx="120" cy={y} r="8"
                    fill="#2c3e7a" stroke="#5a7adf" strokeWidth="1" opacity="0.8" />
            ))}
            {/* Hidden layer 1 */}
            {[60, 120, 180, 240, 300].map((y, i) => (
                <circle key={`h1${i}`} cx="260" cy={y} r="10"
                    fill="#2c3e7a" stroke="#5a7adf" strokeWidth="1" opacity="0.9" />
            ))}
            {/* Hidden layer 2 */}
            {[80, 150, 220].map((y, i) => (
                <circle key={`h2${i}`} cx="400" cy={y} r="10"
                    fill="#1a3060" stroke="#5a7adf" strokeWidth="1.5" opacity={i === 1 ? 1 : 0.7} />
            ))}
            {/* Output */}
            <circle cx="520" cy="170" r="14" fill="#2c3e7a" stroke="#5a7adf" strokeWidth="2" opacity="1" />
            <circle cx="520" cy="170" r="7" fill="#5a7adf" opacity="0.6" />

            {/* Connections — input to h1 */}
            {[80, 140, 200, 260].flatMap((y1, i) =>
                [60, 120, 180, 240, 300].map((y2, j) => (
                    <line key={`c1-${i}-${j}`} x1="128" y1={y1} x2="250" y2={y2}
                        stroke="#5a7adf" strokeWidth="0.4"
                        opacity={Math.random() * 0.15 + 0.05} />
                ))
            )}
            {/* H1 to H2 */}
            {[60, 120, 180, 240, 300].flatMap((y1, i) =>
                [80, 150, 220].map((y2, j) => (
                    <line key={`c2-${i}-${j}`} x1="270" y1={y1} x2="390" y2={y2}
                        stroke="#5a7adf" strokeWidth="0.5"
                        opacity={j === 1 ? 0.25 : 0.08} />
                ))
            )}
            {/* H2 to output */}
            {[80, 150, 220].map((y, i) => (
                <line key={`c3-${i}`} x1="410" y1={y} x2="506" y2="170"
                    stroke="#5a7adf" strokeWidth={i === 1 ? 1 : 0.5}
                    opacity={i === 1 ? 0.6 : 0.15} />
            ))}

            {/* Active path highlight */}
            <line x1="128" y1="140" x2="250" y2="180" stroke="#7ab0ff" strokeWidth="1" opacity="0.5" />
            <line x1="270" y1="180" x2="390" y2="150" stroke="#7ab0ff" strokeWidth="1.5" opacity="0.6" />
            <line x1="410" y1="150" x2="506" y2="170" stroke="#7ab0ff" strokeWidth="2" opacity="0.8" />

            {/* Category */}
            <text x="48" y="316" fill="#5a7adf" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">AI REPORT</text>
            <line x1="48" y1="322" x2="152" y2="322" stroke="#5a7adf" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── STRATEGY: Brand Guidelines Are Useless ──────────────────
    'brand-guidelines-are-useless': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* "PDF" — the old way */}
            <rect x="60" y="60" width="180" height="230" rx="4"
                fill="#14101a" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
            {/* Page lines — text simulation */}
            {[100, 116, 132, 148, 164, 180, 196, 212, 228, 244].map((y, i) => (
                <line key={i} x1="80" y1={y} x2={i % 4 === 3 ? 180 : 220} y2={y}
                    stroke="#ffffff" strokeWidth="1" opacity="0.1" />
            ))}
            {/* PDF label */}
            <text x="150" y="82" fill="#ffffff" fontSize="9" fontFamily="monospace"
                textAnchor="middle" letterSpacing="2" opacity="0.3">60 PAGE PDF</text>
            {/* X mark */}
            <line x1="70" y1="50" x2="230" y2="300" stroke="#c0392b" strokeWidth="0.5" opacity="0.4" />
            <line x1="230" y1="50" x2="70" y2="300" stroke="#c0392b" strokeWidth="0.5" opacity="0.4" />

            {/* Arrow between old and new */}
            <line x1="265" y1="175" x2="305" y2="175"
                stroke="#ffffff" strokeWidth="1" opacity="0.3" />
            <polygon points="305,170 315,175 305,180" fill="#ffffff" opacity="0.3" />

            {/* "System" — the new way: component tokens */}
            {/* Color tokens */}
            {[
                { x: 330, y: 70, color: '#7c6ef7', label: '' },
                { x: 380, y: 70, color: '#1daa70', label: '' },
                { x: 430, y: 70, color: '#e67e22', label: '' },
                { x: 480, y: 70, color: '#c0392b', label: '' },
                { x: 530, y: 70, color: '#5a7adf', label: '' },
            ].map((t, i) => (
                <g key={i}>
                    <rect x={t.x} y={t.y} width="32" height="32" rx="4"
                        fill={t.color} opacity="0.8" />
                    <rect x={t.x} y={t.y + 36} width="32" height="4" rx="1"
                        fill="#ffffff" opacity="0.12" />
                </g>
            ))}

            {/* Typography scale */}
            {[
                { x: 330, y: 140, w: 200, size: 18, opacity: 0.85 },
                { x: 330, y: 172, w: 150, size: 14, opacity: 0.65 },
                { x: 330, y: 196, w: 180, size: 10, opacity: 0.5 },
                { x: 330, y: 214, w: 120, size: 10, opacity: 0.35 },
            ].map((t, i) => (
                <rect key={i} x={t.x} y={t.y} width={t.w} height={t.size}
                    rx="2" fill="#ffffff" opacity={t.opacity * 0.15} />
            ))}

            {/* Component box */}
            <rect x="330" y="240" width="220" height="60" rx="6"
                fill="none" stroke="#7c6ef7" strokeWidth="1" opacity="0.5" />
            <rect x="340" y="250" width="80" height="32" rx="4"
                fill="#7c6ef7" opacity="0.4" />
            <line x1="434" y1="258" x2="540" y2="258"
                stroke="#ffffff" strokeWidth="1" opacity="0.12" />
            <line x1="434" y1="272" x2="510" y2="272"
                stroke="#ffffff" strokeWidth="1" opacity="0.08" />

            {/* Category */}
            <text x="48" y="316" fill="#7c6ef7" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">STRATEGY</text>
            <line x1="48" y1="322" x2="148" y2="322" stroke="#7c6ef7" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── TECH: Multi-tenant Supabase ─────────────────────────────
    'multi-tenant-supabase-production': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* Three tenant "silos" side by side */}
            {[
                { x: 60, color: '#1a6b5a', label: 'Tenant A' },
                { x: 230, color: '#1a4a8a', label: 'Tenant B' },
                { x: 400, color: '#5a2a8a', label: 'Tenant C' },
            ].map((t, i) => (
                <g key={i}>
                    {/* Silo container */}
                    <rect x={t.x} y="50" width="150" height="210" rx="6"
                        fill={t.color} opacity="0.08" stroke={t.color}
                        strokeWidth="0.8" strokeOpacity="0.5" />
                    {/* Rows (table rows) */}
                    {[0, 1, 2, 3, 4, 5].map(row => (
                        <g key={row}>
                            <rect x={t.x + 10} y={80 + row * 28} width="130" height="20" rx="2"
                                fill={t.color} opacity={row === 0 ? 0.4 : 0.12} />
                            {/* Row ID pill */}
                            <rect x={t.x + 14} y={84 + row * 28} width="24" height="12" rx="2"
                                fill={t.color} opacity="0.5" />
                            {/* Row content lines */}
                            <line x1={t.x + 46} y1={90 + row * 28}
                                x2={t.x + 80 + (row % 3) * 20} y2={90 + row * 28}
                                stroke="#ffffff" strokeWidth="1" opacity="0.15" />
                        </g>
                    ))}
                    {/* Tenant label */}
                    <text x={t.x + 75} y="74" fill={t.color} fontSize="9"
                        fontFamily="monospace" textAnchor="middle" letterSpacing="1"
                        opacity="0.9">{t.label}</text>
                </g>
            ))}

            {/* RLS shield in the middle at bottom */}
            <g transform="translate(285, 270)">
                {/* Shield shape */}
                <path d="M0,-18 L14,-10 L14,4 Q14,16 0,22 Q-14,16 -14,4 L-14,-10 Z"
                    fill="#1a4a8a" stroke="#5a7adf" strokeWidth="1.5" opacity="0.9" />
                {/* Lock icon */}
                <rect x="-5" y="-2" width="10" height="8" rx="1.5"
                    fill="#5a7adf" opacity="0.9" />
                <path d="M-3,-2 L-3,-6 Q-3,-10 0,-10 Q3,-10 3,-6 L3,-2"
                    fill="none" stroke="#5a7adf" strokeWidth="1.5" opacity="0.9" />
            </g>
            <text x="300" y="308" fill="#5a7adf" fontSize="9" fontFamily="monospace"
                textAnchor="middle" letterSpacing="2" opacity="0.6">ROW LEVEL SECURITY</text>

            {/* Connecting lines from silos to RLS */}
            <line x1="135" y1="260" x2="280" y2="272" stroke="#5a7adf" strokeWidth="0.5"
                opacity="0.25" strokeDasharray="3 3" />
            <line x1="305" y1="260" x2="300" y2="252" stroke="#5a7adf" strokeWidth="0.5"
                opacity="0.35" strokeDasharray="3 3" />
            <line x1="475" y1="260" x2="320" y2="272" stroke="#5a7adf" strokeWidth="0.5"
                opacity="0.25" strokeDasharray="3 3" />

            {/* Category */}
            <text x="48" y="328" fill="#5a7adf" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">ENGINEERING</text>
            <line x1="48" y1="334" x2="188" y2="334" stroke="#5a7adf" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── CASE STUDY: Fintech Dashboard 8s → 0.4s ─────────────────
    'fintech-dashboard-rebuild': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* "Before" timeline — long, slow */}
            <text x="60" y="100" fill="#ffffff" fontSize="9" fontFamily="monospace"
                opacity="0.35" letterSpacing="2">BEFORE</text>
            <rect x="60" y="110" width="400" height="28" rx="3"
                fill="#c0392b" opacity="0.15" stroke="#c0392b" strokeWidth="0.5" strokeOpacity="0.4" />
            {/* Loading segments */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x={64 + i * 49} y="114" width="44" height="20" rx="2"
                    fill="#c0392b" opacity={0.08 + i * 0.02} />
            ))}
            <text x="470" y="129" fill="#c0392b" fontSize="11" fontFamily="monospace"
                opacity="0.9">8.2s</text>

            {/* Divider */}
            <line x1="60" y1="160" x2="540" y2="160"
                stroke="#ffffff" strokeWidth="0.3" opacity="0.08" />

            {/* "After" timeline — short, fast */}
            <text x="60" y="188" fill="#ffffff" fontSize="9" fontFamily="monospace"
                opacity="0.35" letterSpacing="2">AFTER</text>
            <rect x="60" y="198" width="24" height="28" rx="3"
                fill="#1daa70" opacity="0.6" stroke="#1daa70" strokeWidth="0.8" strokeOpacity="0.8" />
            <text x="96" y="217" fill="#1daa70" fontSize="11" fontFamily="monospace"
                opacity="0.9">0.4s</text>

            {/* Speed lines radiating right */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <line key={i}
                    x1={96 + i * 8}
                    y1={198 + 14 + (i - 3.5) * 2.5}
                    x2={100 + i * 60}
                    y2={198 + 14 + (i - 3.5) * 8}
                    stroke="#1daa70" strokeWidth={0.5 + (3.5 - Math.abs(i - 3.5)) * 0.2}
                    opacity={0.08 + (3.5 - Math.abs(i - 3.5)) * 0.08}
                    strokeLinecap="round" />
            ))}

            {/* Improvement callout */}
            <text x="540" y="200" fill="#1daa70" fontSize="22" fontFamily="monospace"
                textAnchor="end" fontWeight="300" opacity="0.9" letterSpacing="-1">−95%</text>
            <text x="540" y="216" fill="#1daa70" fontSize="9" fontFamily="monospace"
                textAnchor="end" letterSpacing="2" opacity="0.5">LOAD TIME</text>

            {/* Mini dashboard wireframe */}
            <rect x="60" y="258" width="480" height="56" rx="4"
                fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
            <rect x="68" y="264" width="100" height="44" rx="2" fill="#ffffff" opacity="0.04" />
            <rect x="176" y="264" width="100" height="44" rx="2" fill="#ffffff" opacity="0.04" />
            <rect x="284" y="264" width="100" height="44" rx="2" fill="#ffffff" opacity="0.04" />
            <rect x="392" y="264" width="140" height="44" rx="2" fill="#1daa70" opacity="0.06" />
            {/* Sparkline in last panel */}
            <polyline points="400,300 415,292 430,296 445,284 460,288 475,276 490,280 505,272 520,278"
                fill="none" stroke="#1daa70" strokeWidth="1" opacity="0.4" />

            {/* Category */}
            <text x="48" y="330" fill="#c0392b" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">CASE STUDY</text>
            <line x1="48" y1="336" x2="168" y2="336" stroke="#c0392b" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),

    // ── AI REPORT: Prompt Is Not the Product ────────────────────
    'prompt-is-not-the-product': () => (
        <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect width="600" height="340" fill="#0a0c12" />

            {/* The prompt — left side */}
            <rect x="48" y="80" width="180" height="60" rx="8"
                fill="#1a1e2e" stroke="#5a7adf" strokeWidth="0.8" opacity="0.8" />
            {/* Cursor blink lines */}
            <line x1="64" y1="102" x2="180" y2="102" stroke="#5a7adf" strokeWidth="1" opacity="0.3" />
            <line x1="64" y1="116" x2="148" y2="116" stroke="#5a7adf" strokeWidth="1" opacity="0.2" />
            <rect x="152" y="112" width="2" height="12" rx="1" fill="#5a7adf" opacity="0.8" />
            <text x="138" y="160" fill="#5a7adf" fontSize="9" fontFamily="monospace"
                textAnchor="middle" letterSpacing="2" opacity="0.5">THE PROMPT</text>

            {/* Broken chain link in center */}
            <g transform="translate(300, 120)">
                {/* Link 1 */}
                <rect x="-28" y="-10" width="20" height="20" rx="10"
                    fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
                <rect x="-22" y="-4" width="8" height="8" rx="4"
                    fill="none" stroke="#0a0c12" strokeWidth="2" />
                {/* Gap — broken */}
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#c0392b" strokeWidth="1"
                    opacity="0.6" strokeDasharray="2 3" />
                {/* Link 2 */}
                <rect x="8" y="-10" width="20" height="20" rx="10"
                    fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
                <rect x="14" y="-4" width="8" height="8" rx="4"
                    fill="none" stroke="#0a0c12" strokeWidth="2" />
            </g>

            {/* The system — right side, multi-layered */}
            {[
                { y: 65, w: 180, label: 'Confidence thresholds', opacity: 0.9 },
                { y: 97, w: 160, label: 'Fallback logic', opacity: 0.75 },
                { y: 129, w: 170, label: 'Feedback collection', opacity: 0.6 },
                { y: 161, w: 145, label: 'Edge case testing', opacity: 0.45 },
            ].map((layer, i) => (
                <g key={i}>
                    <rect x={372} y={layer.y} width={layer.w} height="24" rx="3"
                        fill="#2c3e7a" opacity={layer.opacity * 0.3}
                        stroke="#5a7adf" strokeWidth="0.5" strokeOpacity={layer.opacity * 0.6} />
                    <text x={382} y={layer.y + 16} fill="#7ab0ff" fontSize="9"
                        fontFamily="monospace" opacity={layer.opacity * 0.8}
                        letterSpacing="0.5">{layer.label}</text>
                </g>
            ))}

            {/* "=" symbol */}
            <text x="340" y="118" fill="#ffffff" fontSize="18" fontFamily="monospace"
                textAnchor="middle" opacity="0.2" letterSpacing="-1">+</text>
            <text x="340" y="142" fill="#5a7adf" fontSize="9" fontFamily="monospace"
                textAnchor="middle" opacity="0.5" letterSpacing="2">=</text>

            {/* "Product" label below system */}
            <text x="462" y="202" fill="#5a7adf" fontSize="9" fontFamily="monospace"
                textAnchor="middle" letterSpacing="2" opacity="0.5">THE PRODUCT</text>

            {/* Orbiting dots around the system */}
            {[0, 72, 144, 216, 288].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const cx = 462 + 110 * Math.cos(rad);
                const cy = 120 + 80 * Math.sin(rad);
                return <circle key={i} cx={cx} cy={cy} r="3"
                    fill="#5a7adf" opacity={0.1 + i * 0.05} />;
            })}
            <ellipse cx="462" cy="120" rx="110" ry="80"
                fill="none" stroke="#5a7adf" strokeWidth="0.4" opacity="0.1" />

            {/* Category */}
            <text x="48" y="316" fill="#5a7adf" fontSize="10" fontFamily="monospace"
                letterSpacing="3" opacity="0.7">AI REPORT</text>
            <line x1="48" y1="322" x2="152" y2="322" stroke="#5a7adf" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),
};

const BlogThumbnail = ({ slug }) => {
    const Thumb = thumbnails[slug];
    if (!Thumb) {
        // Fallback for unknown slugs
        return (
            <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}>
                <rect width="600" height="340" fill="#0a0c12" />
                <line x1="60" y1="60" x2="540" y2="280" stroke="#ffffff" strokeWidth="0.4" opacity="0.06" />
                <line x1="540" y1="60" x2="60" y2="280" stroke="#ffffff" strokeWidth="0.4" opacity="0.06" />
            </svg>
        );
    }
    return <Thumb />;
};

export default BlogThumbnail;
