import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MeetOurPanel from './pages/MeetOurPanel';
import PanelMember from './pages/PanelMember';
import LandingPage from './components/ui/LandingPage';
import WorksPage from './pages/WorksPage';
import OrderPage from './pages/OrderPage';
import MaintenancePage from './components/ui/MaintenancePage';
import { checkStatus } from './services/api';

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
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    const init = async () => {
      const status = await checkStatus();
      if (status && status.maintenance) {
        setMaintenance(true);
      }
    };
    init();
  }, []);

  if (maintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen w-full">
      <SpeedInsights />
      <Analytics />
      {!entered && <LandingPage onEnter={() => setEntered(true)} />}
      {entered && (
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/panel" element={<MeetOurPanel />} />
            <Route path="/panel/:id" element={<PanelMember />} />
            {/* Redirect legacy routes */}
            <Route path="/start-project" element={<Navigate to="/order" replace />} />
          </Routes>
        </Layout>
      )}
    </div>
  )
}

export default App
