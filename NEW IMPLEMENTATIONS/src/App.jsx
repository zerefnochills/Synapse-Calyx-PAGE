// ================================================
// App.jsx — Root router
// src/App.jsx
// ================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import WorksPage from './pages/WorksPage'
import OrderPage from './pages/OrderPage'

// Placeholder pages for routes not yet converted
function ComingSoon({ title }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
        // Coming Soon
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--white)' }}>
        {title}
      </h1>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<ComingSoon title="Case Study" />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/services" element={<ComingSoon title="Services" />} />
          <Route path="/about" element={<ComingSoon title="About" />} />
          <Route path="/blog" element={<ComingSoon title="Blog" />} />
          <Route path="*" element={<ComingSoon title="404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
