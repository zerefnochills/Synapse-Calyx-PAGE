// ─────────────────────────────────────────────────────────────────────────────
//  Synapse Calyx — Works Data
//  src/data/worksData.js
//
//  HOW TO ADD YOUR REAL WORK:
//    1. Export/screenshot your work as .webp (use squoosh.app)
//    2. Drop files into public/works/design/ or public/works/web/ etc.
//    3. Set thumbnail: '/works/design/your-file.webp'
//    4. For videos: set videoSrc + thumbnail (the thumb shows before play)
//    5. For live sites: set liveUrl to the deployed URL
// ─────────────────────────────────────────────────────────────────────────────

// ── FEATURED PROJECTS (large cards, shown first) ─────────────────────────────
export const FEATURED_PROJECTS = [

    // ── ADD YOUR FEATURED PROJECTS HERE ──────────────────────────────────────
    // {
    //     id: 'your-project-id',           // kebab-case, unique
    //     year: '2025',
    //     status: 'live',                  // 'live' | 'archived' | 'wip'
    //     title: 'PROJECT NAME',           // shown large in card
    //     subtitle: 'What you built',
    //     type: 'web',                     // 'web' | 'design' | 'video'
    //     categories: ['Web', 'Featured'],
    //     filterTags: ['web'],
    //     thumbnail: '/works/web/your-screenshot.webp',
    //     thumbnailFallbackLabel: 'NAME',
    //     thumbnailFallbackColor: '#0a1020',
    //     liveUrl: 'https://yourclient.com',
    //     problem: 'What problem did you solve?',
    //     strategy: 'How did you solve it?',
    //     tech: ['React', 'Node.js'],
    //     stats: [
    //         { value: '3x', label: 'Conversion Increase' },
    //     ],
    //     isFeatured: true,
    // },
];

// ── SMALL PROJECTS (3-column grid at bottom) ──────────────────────────────────
export const SMALL_PROJECTS = [

    // ── ADD YOUR PROJECTS HERE ────────────────────────────────────────────────
    // Copy any block below and fill in your real data.
    //
    // {
    //     id: 'your-project',
    //     year: '2025',
    //     type: 'design',                  // 'design' | 'web' | 'video' | 'automation'
    //     category: 'IDENTITY',            // displayed label
    //     filterTag: 'identity',           // 'web' | 'identity' | 'automation' | 'motion'
    //     title: 'Project Name',
    //     description: 'Short description of what you built and the outcome.',
    //     tech: ['Figma', 'Illustrator'],
    //     thumbnail: '/works/design/your-file.webp',
    //     thumbnailFallbackLabel: 'NAME',
    //     thumbnailFallbackColor: '#1a0a2a',
    //     liveUrl: null,
    //     // For self-hosted video:
    //     // videoSrc: '/works/video/your-clip.mp4',
    //     // For YouTube embed:
    //     // youtubeId: 'YOUR_VIDEO_ID',
    // },
];

// ── FILTER TAGS (controls the filter buttons at the top) ──────────────────────
// Add new tags here if you add a new category of work.
export const FILTER_TAGS = ['all', 'web', 'identity', 'automation', 'motion'];
