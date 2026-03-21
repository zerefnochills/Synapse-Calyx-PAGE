# Synapse Calyx — Frontend Integration Guide
## React Router DOM + CSS Modules

---

## Option A: Drop into your existing project (recommended)

If you already have a Vite + React app set up, you don't need to replace everything.
Just copy the specific folders you need.

### Step 1 — Install the one dependency you need

```bash
npm install react-router-dom
```

### Step 2 — Copy files into your project

Copy these folders/files from this zip into your `src/`:

```
src/
├── styles/
│   └── globals.css          ← copy this
├── hooks/
│   ├── useScrollReveal.js   ← copy this
│   ├── useCustomCursor.js   ← copy this
│   └── useNavbar.js         ← copy this
├── components/
│   └── layout/
│       ├── Layout.jsx        ← copy this
│       ├── Layout.module.css ← copy this
│       ├── Navbar.jsx        ← copy this
│       ├── Navbar.module.css ← copy this
│       ├── Footer.jsx        ← copy this
│       └── Footer.module.css ← copy this
├── pages/
│   ├── HomePage.jsx          ← copy this
│   ├── HomePage.module.css   ← copy this
│   ├── WorksPage.jsx         ← copy this
│   ├── WorksPage.module.css  ← copy this
│   ├── OrderPage.jsx         ← copy this
│   └── OrderPage.module.css  ← copy this
├── App.jsx                   ← replace yours with this (or adapt)
└── main.jsx                  ← add globals.css import here
```

### Step 3 — Add the global CSS import

In your `src/main.jsx`, make sure globals.css is imported **before** anything else:

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'   // ← ADD THIS LINE
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Step 4 — Wire up the router in App.jsx

If your App.jsx already has a router, add the new routes inside it:

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import WorksPage from './pages/WorksPage'
import OrderPage from './pages/OrderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>            {/* Layout wraps ALL pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/order" element={<OrderPage />} />
          {/* add your other routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### Step 5 — Run it

```bash
npm run dev
# → http://localhost:3000
```

---

## Option B: Fresh project from scratch

If you want to start clean from this zip:

```bash
# 1. Unzip the package
unzip synapse-calyx-frontend.zip
cd synapse-calyx-frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Connecting to the backend

The `vite.config.js` already proxies `/api/*` to `http://localhost:5000`.

So in your React components, you can call the API like this:

```jsx
// Example: submitting the order form
const response = await fetch('/api/v1/submissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
const result = await response.json()
```

No CORS issues in development because Vite proxies the request.

For production, set `VITE_API_URL` in a `.env` file:

```
# .env
VITE_API_URL=https://your-api.railway.app
```

Then in your fetch calls:
```jsx
const API = import.meta.env.VITE_API_URL || ''
fetch(`${API}/api/v1/submissions`, { ... })
```

---

## File structure explained

```
src/
├── styles/
│   └── globals.css
│       CSS variables (--bg, --accent, --font-display etc.)
│       Imported once in main.jsx. All components reference
│       these variables — change them here to retheme everything.
│
├── hooks/
│   ├── useScrollReveal.js
│   │   Watches elements with className="reveal" and adds
│   │   "is-visible" when they scroll into view.
│   │   Use: const ref = useScrollReveal() then <div ref={ref} className="reveal">
│   │   Or:  useScrollReveal('.my-class .reveal') to watch a selector
│   │
│   ├── useCustomCursor.js
│   │   Drives the #cursor and #cursor-ring divs in Layout.jsx.
│   │   Auto-scales on hover over <a> and <button> elements.
│   │
│   └── useNavbar.js
│       Adds .scrolled class to #navbar when page scrolls past 50px.
│
├── components/layout/
│   ├── Layout.jsx        Wraps all pages. Contains cursor divs,
│   │                     Navbar, <Outlet />, and Footer.
│   ├── Navbar.jsx        Fixed top nav. Uses useLocation() for
│   │                     active link highlighting.
│   └── Footer.jsx        Simple bottom footer.
│
└── pages/
    ├── HomePage.jsx      Hero, ticker, manifesto, philosophy,
    │                     future cards, services hints, nav cards.
    ├── WorksPage.jsx     Filter bar, 2 featured case studies,
    │                     6 small project cards.
    └── OrderPage.jsx     7-step multi-step form with sidebar
                          progress tracker and success screen.
```

---

## Customization quick reference

### Change colors
Edit `src/styles/globals.css` — all colors are CSS variables:
```css
:root {
  --bg: #080a0f;        /* main background */
  --accent: #7c6fff;    /* purple accent */
  --accent3: #38bdf8;   /* electric blue */
}
```

### Add a new page
1. Create `src/pages/MyPage.jsx` and `src/pages/MyPage.module.css`
2. Add the route in `App.jsx`:
   ```jsx
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Add a link in `Navbar.jsx`

### Connect order form to backend
In `OrderPage.jsx`, find the `submit` function and replace the comment:
```jsx
const submit = async () => {
  if (!agreed) { alert('Please agree to terms'); return }
  
  const res = await fetch('/api/v1/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: form.fullName,
      email: form.email,
      // ... rest of form fields
    }),
  })
  
  if (res.ok) {
    setSubmitted(true)
  }
}
```

### Add page transitions
The `.main` class in `Layout.module.css` already has a `pageEnter` animation.
Each route change triggers a re-mount (via `key={pathname}`) which replays it.

---

## What each HTML file became

| Original HTML file | React equivalent |
|---|---|
| `synapse-calyx-homepage.html` | `src/pages/HomePage.jsx` + `HomePage.module.css` |
| `synapse-calyx-works.html` | `src/pages/WorksPage.jsx` + `WorksPage.module.css` |
| `synapse-calyx-order.html` | `src/pages/OrderPage.jsx` + `OrderPage.module.css` |
| `synapse-calyx-blueprint.html` | Reference doc only — not a user-facing page |
| Inline `<style>` blocks | Split into `.module.css` files per component |
| Inline `<script>` blocks | Split into `src/hooks/` custom hooks |
| `document.querySelectorAll` | `useScrollReveal` hook with IntersectionObserver |
| `mousemove` cursor logic | `useCustomCursor` hook |
| Navbar scroll listener | `useNavbar` hook |
| Page `<nav>` links | `Navbar.jsx` using React Router `<Link>` |
