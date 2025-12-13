import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MeetOurPanel from './pages/MeetOurPanel';
import PanelMember from './pages/PanelMember';
import LandingPage from './components/ui/LandingPage';
import StartProject from './pages/StartProject';
import navBg from './assets/nav_background.webp';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${navBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      width: '100%'
    }}>
      {!entered && <LandingPage onEnter={() => setEntered(true)} />}
      {entered && (
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/panel" element={<MeetOurPanel />} />
            <Route path="/panel/:id" element={<PanelMember />} />
            <Route path="/start-project" element={<StartProject />} />
          </Routes>
        </Layout>
      )}
    </div>
  )
}

export default App
