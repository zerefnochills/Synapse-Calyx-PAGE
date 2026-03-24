// ─────────────────────────────────────────────────────────────
//  Synapse Calyx — Intelligence Reports
//  Drop-in replacement for Home.jsx blog section
//  8 genuine articles across: Case Study | Tech | AI | Strategy
// ─────────────────────────────────────────────────────────────

// ── STEP 1: Replace your FEATURED_POST inline JSX data with this object
export const FEATURED_POST = {
    date: 'Feb 2026',
    readTime: '8 min read',
    title: 'Why Most Digital Agencies Are Selling You the Wrong Thing',
    excerpt:
        'The industry has optimized for the screenshot moment — the launch day, the Dribbble post, the awards submission. But real systems are judged by what happens six months later when nobody\'s watching. Here\'s what we actually measure at Synapse, and why it matters more than aesthetics.',
    tags: ['Strategy', 'Systems Thinking', 'Agency Model'],
    slug: 'why-agencies-sell-wrong-thing',
    content: `
Most agencies sell you a deliverable. A landing page. A brand kit. A social media package.
We sell you leverage.

The difference sounds philosophical until you're six months post-launch and your "award-winning" 
website is converting at 0.8% while your competitor's "ugly" site converts at 4.2%.

Here's what actually happened: your agency optimized for the demo. The scroll animation looked 
incredible during the Figma walkthrough. The brand guidelines PDF was beautifully typeset. 
The launch day post got 200 likes.

And none of it was built to last.

─── What We Measure Instead

At Synapse, we track three metrics from day one of every engagement:

1. Time-to-decision for the end user. How fast does a visitor understand what you do and why 
   it matters to them? Not whether the hero section looks premium — whether it communicates 
   in under 4 seconds.

2. Backend resilience under load. Beautiful UIs collapse under traffic spikes because no one 
   tested them at scale. We stress-test before launch, not after.

3. Autonomy score. Can the system operate without human intervention for 72 hours? If your 
   "automated" pipeline requires manual intervention twice a week, it isn't automated — 
   it's just delayed manual work.

─── The Agency Incentive Problem

Traditional agencies get paid for hours or deliverables. Neither incentivizes long-term 
thinking. A 40-hour redesign project earns the same whether the new site doubles conversions 
or tanks them. There's no skin in the game.

We've structured Synapse differently. Our retainer clients get performance clauses built in. 
If we build an automation that doesn't deliver projected time savings within 90 days, we fix 
it for free. Full stop.

─── What This Means For You

Before your next digital engagement, ask three questions:
— "What does success look like 6 months after launch, not 6 days?"
— "How will this system handle 10x the current load?"
— "Who is responsible if it doesn't perform?"

If your agency can't answer all three clearly, you're buying a screenshot, not a system.
    `,
};

// ── STEP 2: Replace your BLOG_CARDS array with this
export const BLOG_CARDS = [
    // ── CASE STUDY ──────────────────────────────────────────
    {
        label: '↗',
        labelColor: '#c0392b',
        date: 'Jan 2026',
        readTime: '9 min read',
        title: 'How We Reduced a SaaS Client\'s Support Tickets by 61% With One Automation',
        excerpt:
            'The client was drowning in repetitive Tier-1 support. Not because their product was broken — because their onboarding was. Here\'s the full breakdown of how we diagnosed, designed, and deployed the fix.',
        tags: ['Case Study', 'Automation'],
        slug: 'saas-support-ticket-reduction',
        content: `
The client: a 12-person SaaS company selling project management tooling to construction firms.
Monthly support tickets: 847. Staff handling them: 2 people, full time.

We were brought in to "build a chatbot." We didn't build a chatbot.

─── Diagnosis First

Before writing a single line of code, we spent two weeks in their support inbox. We tagged 
every ticket by root cause. The breakdown:

- 34% — "How do I connect my existing data?" (onboarding gap)
- 27% — "My import failed, what happened?" (no error messaging)
- 19% — "I forgot how to do X" (missing in-app guidance)
- 12% — Actual bugs
- 8%  — Billing/account (legitimate support)

So 80% of their support load was caused by three fixable design failures. Not complexity. 
Not difficult users. Just missing information at the right moment.

─── What We Built

Rather than a chatbot patching a broken experience, we redesigned three touchpoints:

1. Interactive onboarding checklist (7 steps, contextual, skippable)
   Built in React, state persisted to their existing database. First-time users now see 
   exactly where their data should go and why.

2. Structured error messages with self-serve resolution paths
   Every import failure now returns a human-readable explanation + a direct link to the 
   relevant help doc. No guessing. Zero support tickets for import errors in the first 
   month post-launch.

3. In-app contextual tooltips triggered by inactivity
   If a user hovers on a feature for 3+ seconds without clicking, a tooltip fires. 
   Not intrusive. Not a full tutorial. Just enough to unblock.

─── Results at 90 Days

- Support tickets: 847 → 331 (61% reduction)
- Average first-response time: irrelevant, most issues resolve without tickets now
- Support team bandwidth freed: ~60 hours/month redirected to product feedback loops
- Cost saving: approximately $3,200/month in support labor

The chatbot would have cost more to build and solved nothing structurally.

─── The Lesson

Automation isn't always software. Sometimes it's removing the need for human contact 
entirely by putting the right information in the right place. Diagnose before you build.
        `,
    },

    // ── TECHNICAL DEEP-DIVE ──────────────────────────────────
    {
        label: 'UX',
        labelColor: '#1a6b5a',
        date: 'Dec 2025',
        readTime: '11 min read',
        title: 'The Architecture Behind a 98 Lighthouse Score on a Content-Heavy React Site',
        excerpt:
            'Performance is not a feature you add at the end. It\'s a series of decisions made from day one of architecture. Here\'s every decision we made — and one we almost got wrong.',
        tags: ['Engineering', 'Performance'],
        slug: 'lighthouse-98-react-architecture',
        content: `
When we launched the Meridian editorial platform (a content-heavy news aggregator with 
3,000+ articles), the client asked for "fast." We delivered a 98 Lighthouse performance 
score on mobile. Here's exactly how.

─── The Stack

- React 18 + Vite (not CRA — bundle size matters)
- TanStack Query for server state
- Cloudflare CDN + R2 for all static assets
- PostgreSQL with read replicas for article queries
- Edge rendering via Cloudflare Workers for the index page

─── Decision 1: Images Are Usually the Bottleneck. Treat Them Seriously.

Every article thumbnail is processed through a Cloudflare Worker on upload:
— Converted to WebP (average 40% smaller than JPEG)
— Three sizes generated: 400px, 800px, 1200px
— Served with proper srcset and sizes attributes

This alone dropped our LCP from 4.1s to 1.8s on a 4G connection.

─── Decision 2: Don't Fetch What You Don't Need

The article index page initially fetched full article objects from the API. Each object 
was 4–8KB of JSON including body content, author bios, tags, and metadata.

We created a dedicated /articles/summaries endpoint returning only: id, slug, title, 
excerpt, thumbnail_url, date, read_time, tags. Average payload: 380 bytes per article.

Index load time dropped by 67%.

─── Decision 3: Route-Based Code Splitting From Day One

Every route is a lazy import:
  const ArticlePage = lazy(() => import('./pages/ArticlePage'));

The article editor (admin only) is 340KB of JS. Visitors never download it. 
This sounds obvious — but most React projects don't do it until they notice the bundle 
is 2MB and the CEO is complaining.

─── The Decision We Almost Got Wrong

We nearly implemented a full service worker for offline caching. It would have added 
complexity without meaningful benefit for a news site where content freshness matters.

We caught it in architecture review. The rule: don't add infrastructure for edge cases 
that represent under 2% of user sessions.

─── Final Scores

Performance: 98 | Accessibility: 97 | Best Practices: 100 | SEO: 100

Build time: 4 weeks. Not 4 months.
        `,
    },

    // ── AI & AUTOMATION REPORT ───────────────────────────────
    {
        label: 'AI',
        labelColor: '#2c3e7a',
        date: 'Nov 2025',
        readTime: '7 min read',
        title: 'The AI Automation Stack We\'re Actually Using in Production (2025 Edition)',
        excerpt:
            'Not a list of tools. An honest account of what\'s earning its keep in real client systems, what we stopped using, and the one category where AI still consistently fails.',
        tags: ['AI', 'Infrastructure'],
        slug: 'ai-automation-stack-2025',
        content: `
Every few weeks someone asks us: "What's your AI stack?" The honest answer is that it 
changes — but the principles don't. Here's what's actually in production across our 
client systems as of late 2025.

─── What's Earning Its Keep

DOCUMENT PROCESSING — Claude via API
Legal firms, logistics companies, agencies — all of them have PDF hell. Contracts, 
invoices, reports that need to be parsed, summarized, and routed. Claude handles this 
with high accuracy and low hallucination on structured extraction tasks when given a 
clear schema. We pass it a JSON schema and tell it to extract or return null. 
It reliably returns null when data isn't present, which is rare and valuable.

LEAD ENRICHMENT — Perplexity API + custom scoring
When a form submission comes in, we run the company name through Perplexity to extract 
context: industry, size, recent news, tech stack signals. This gets scored against an 
ICP rubric and routed to Slack with a priority tag. Sales time-to-first-contact dropped 
from 4 hours average to 11 minutes for high-score leads.

EMAIL DRAFT GENERATION — GPT-4o for first drafts
Not autonomous. Never autonomous. We use it to generate first-draft outreach and 
follow-up sequences which a human edits and approves. The ROI is in the blank-page 
problem — drafts get done 8x faster, then reviewed.

─── What We Stopped Using

Zapier AI Steps — Too slow, too expensive, too opaque when things break.
We migrated every workflow to n8n (self-hosted). Full control, better error handling, 
no per-operation pricing that compounds at scale.

Auto-publishing AI content — We tried it for a client blog. Traffic dropped 22% in 
two months. Google's systems detect patterns, not just individual pieces. 
Human editing is not optional.

─── Where AI Still Consistently Fails

Anything requiring judgment about interpersonal context. Customer sentiment analysis 
sounds useful until you realize a sarcastic "great, another update" gets tagged 
as positive. We always put a human in the loop for any output that touches a customer 
relationship directly.

─── The Principle Underneath All of This

AI is leverage, not replacement. Every deployment we build asks: what is the human 
doing right now that they shouldn't have to do? Then we automate that specific thing, 
measure it, and leave everything judgment-sensitive in human hands.
        `,
    },

    // ── STRATEGY / OPINION ───────────────────────────────────
    {
        label: 'SYS',
        labelColor: '#4a2c6b',
        date: 'Oct 2025',
        readTime: '6 min read',
        title: 'Why Your Brand Guidelines Are Probably Useless',
        excerpt:
            'A 60-page PDF that nobody reads is not a brand system. It\'s a liability. Here\'s what a functional brand system actually looks like — and why most agencies deliver the wrong thing.',
        tags: ['Strategy', 'Branding'],
        slug: 'brand-guidelines-are-useless',
        content: `
Let's be precise about what a brand guidelines document is: a record of decisions made 
at one moment in time, handed to people who weren't in the room, and expected to produce 
consistent output across dozens of future contexts.

Most brand guidelines fail at this task entirely.

─── The Problem Is the Format

A PDF is a static artifact. Brand application is a dynamic activity. 

The gap between these two realities is where inconsistency lives. A new team member reads 
the guidelines on day one, doesn't use them again for three weeks, and then makes a 
judgment call on a social post that slowly drifts the brand over 18 months.

This isn't a discipline problem. It's a systems problem.

─── What a Functional Brand System Actually Requires

1. A living component library, not a PDF
   Every brand element should exist as a usable component that applies the rules 
   automatically. Figma's component system is the minimum viable version of this. 
   A design system in code (Storybook, shadcn, etc.) is the full version.

2. Decision logic, not just rules
   Guidelines say: "Use the primary blue for CTAs." Useful. 
   Systems thinking says: "When you face X context, make Y decision, because Z reason." 
   The because is what transfers judgment to new contributors.

3. Embedded, not referenced
   The best brand systems are invisible. They're embedded in templates, in Notion docs, 
   in the Figma auto-layout defaults. You don't consult them — you use tools built on top 
   of them without knowing the rules exist.

─── What This Means Practically

When Synapse completes a brand engagement, the deliverable isn't the PDF. 
It's the Figma component library with documented variants, the token system that maps 
to code, and the decision tree for the two or three scenarios that cause 80% of 
brand inconsistency.

The PDF is the summary. The system is the product.

Ask your next branding agency: "How will this work in six months when the person 
who was in the briefing has left?" Their answer will tell you everything.
        `,
    },

    // ── TECHNICAL DEEP-DIVE ──────────────────────────────────
    {
        label: 'DEV',
        labelColor: '#1a4a6b',
        date: 'Sep 2025',
        readTime: '10 min read',
        title: 'Building a Multi-Tenant Architecture on Supabase: Lessons From Production',
        excerpt:
            'Row-level security, shared schemas, and the edge case that nearly cost us a client. A technical post-mortem on building multi-tenancy correctly the first time.',
        tags: ['Engineering', 'Database'],
        slug: 'multi-tenant-supabase-production',
        content: `
Multi-tenancy is one of those architectural decisions that's trivial to implement badly 
and genuinely difficult to implement well. We learned this while building a client portal 
system for a consulting firm with 14 organizational clients — each needing isolated data, 
custom branding, and user-level permissions.

─── The Three Approaches (And Why We Chose The Third)

Approach 1: Separate databases per tenant
Maximum isolation. Maximum operational overhead. At 14 clients with potential to scale 
to 100+, this means 100 database instances, 100 backup jobs, 100 connection pools. 
Not viable at our scale.

Approach 2: Shared schema, tenant_id column everywhere
Simple to start. Catastrophic if you forget one WHERE clause. We've seen this in the wild 
— a missed filter on an analytics endpoint exposed one client's data to another. 
That's a GDPR incident.

Approach 3: Shared schema + Row Level Security (RLS) enforced at database level
This is what we built on Supabase. Every table has a tenant_id column. RLS policies are 
defined at the Postgres level. The application layer cannot access data outside its 
tenant context — not because of application logic, but because the database physically 
prevents it.

─── The Implementation

Every table follows the same pattern:

  -- Enable RLS
  ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

  -- Allow reads only for matching tenant
  CREATE POLICY "tenant_isolation" ON documents
    FOR ALL USING (tenant_id = auth.jwt() ->> 'tenant_id');

The tenant_id is embedded in the JWT at login time. Supabase's auth.jwt() function 
makes it available to every RLS policy. No application code needed — the isolation 
is structural.

─── The Edge Case That Nearly Broke Us

Webhooks.

External services (Stripe, Slack, etc.) send webhooks without user context. 
Our initial implementation processed webhooks using a service account with elevated 
privileges — bypassing RLS entirely.

This meant our webhook handler could theoretically write to any tenant's data if 
a routing bug occurred. We caught it in code review before production, but it was 
a close call.

The fix: webhook handlers receive a tenant_id in the payload, set it as a local 
Postgres variable at the start of the transaction, and RLS evaluates against that. 
Service account access is scoped to a single transaction with explicit tenant context.

─── Outcome

14 tenants, 100% data isolation verified by automated security tests, 
zero cross-tenant data incidents, and a system that scales to hundreds of tenants 
without architectural changes.

The extra week we spent on this upfront has saved us from an incident that would have 
ended the engagement and potentially the client's business.
        `,
    },

    // ── CASE STUDY ──────────────────────────────────────────
    {
        label: '↗',
        labelColor: '#7a2c1a',
        date: 'Aug 2025',
        readTime: '8 min read',
        title: 'Rebuilding a Fintech Dashboard: From 8-Second Load to Sub-Second',
        excerpt:
            'The dashboard worked. The users hated it. Load times over 8 seconds, no real-time updates, and a UI built for the person who built it — not the person using it. This is how we fixed it in six weeks.',
        tags: ['Case Study', 'Performance'],
        slug: 'fintech-dashboard-rebuild',
        content: `
The client: a lending operations firm processing 200–400 loan applications daily. 
Their ops team spent 6+ hours a day in a dashboard that took 8 seconds to load and 
required a manual refresh to see updated data.

The ask: "make it faster." The reality: the whole thing needed to be rebuilt.

─── What the Audit Found

Week 1 was pure observation. We sat with two ops team members and watched them work. 
The findings:

- The dashboard fetched 100% of all-time data on every load. 6,000+ applications, 
  loaded client-side, then filtered in JS. This is why it took 8 seconds.

- Users had developed "workarounds" for the UI — e.g. exporting to Excel to do 
  things the dashboard should have done natively.

- The most-used action (status update) required 4 clicks and a page refresh. 
  This happened ~80 times per day per user.

─── The Architecture We Built

Backend changes:
- Paginated API (50 records default, server-side filtering)
- WebSocket connection for real-time status updates (Socket.io)
- Redis cache for aggregate metrics (totals, averages) — recalculated every 60s, 
  not on every request

Frontend changes:
- Virtual scrolling for the main table (renders only visible rows)
- Inline status update with optimistic UI (updates visually instantly, 
  syncs in background)
- Pinned filters that persist across sessions (localStorage)
- Status change audit log visible inline — no separate page

─── Results

Load time: 8.2s → 0.4s (95% reduction)
Status update action: 4 clicks → 1 click
User-reported satisfaction: surveyed before and after
  Before: 2.1/5 average rating
  After: 4.6/5 average rating

Hours saved per ops team member per week: approximately 3.5 hours
  (Measured by session recording comparison over 30 days)

─── The Real Lesson

Users don't complain about slow dashboards. They adapt to them. They build workarounds. 
They open Excel. They stop trusting the tool and trust their memory instead.

The 8-second load time wasn't just a performance problem. It was eroding trust in 
the data itself. Some ops staff admitted they'd stopped using the analytics section 
"because it always feels outdated." It wasn't. The data was current. But the experience 
communicated otherwise.

Performance is also a perception problem.
        `,
    },

    // ── AI & AUTOMATION REPORT ───────────────────────────────
    {
        label: 'AI',
        labelColor: '#2c3e7a',
        date: 'Jul 2025',
        readTime: '5 min read',
        title: 'The Prompt Is Not the Product: Why Most AI Features Fail After Launch',
        excerpt:
            'Every week a founder shows us an AI feature they\'re proud of. It works beautifully in demos. Six weeks post-launch it\'s been quietly disabled. Here\'s why — and the four things that actually make AI features stick.',
        tags: ['AI', 'Product Strategy'],
        slug: 'prompt-is-not-the-product',
        content: `
The feature looked great in the deck. "AI-powered recommendations based on user history." 
The demo used curated test data and produced impressive results. 

The founder launched it. Six weeks later it was disabled because it was "confusing users."

This is not an unusual story. We've seen it repeatedly. The problem is almost never 
the model — it's everything surrounding the model.

─── The Four Failure Modes

1. The demo data problem
   AI features are evaluated on clean, representative data during development. 
   Real users produce messy, incomplete, contradictory data. The model hasn't failed — 
   it was never tested against realistic input.

   Fix: Build a "red team" test set of worst-case real inputs before launch. 
   If the feature handles those, it's ready.

2. The confidence display problem
   Users don't know what an AI doesn't know. If a recommendation system returns a 
   result with 40% confidence, should it display that result? With what framing? 
   Most implementations don't answer this question — they just show the output and 
   trust the user to interpret it correctly.

   Fix: Every AI output needs an explicit confidence threshold below which it either 
   shows nothing or shows "we don't have enough information yet" rather than a low-quality guess.

3. The feedback loop problem
   AI features improve with feedback. Most products don't collect it. 
   A thumbs up/down takes 2 hours to implement and makes the model improvable over time. 
   Most teams ship without it because "we'll add it later." Later never comes.

   Fix: Build feedback collection before you build the feature. Non-negotiable.

4. The trust destruction problem
   One obviously wrong output from an AI feature costs 10 correct outputs to recover from. 
   Users remember the failure, not the nine successes. AI features need to be right 
   on the cases that matter most, not on average.

   Fix: Identify the highest-stakes output scenarios and hard-code guardrails or human 
   review for those specific cases. Let the model handle the low-stakes volume.

─── The Summary

The prompt is a prototype. The product is the system around it: 
the fallback logic, the confidence handling, the feedback collection, 
the edge case testing, the trust management.

Build that system before you build the feature.
        `,
    },
];