import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MeetOurPanel from './pages/MeetOurPanel';
import PanelMember from './pages/PanelMember';
import LandingPage from './components/ui/LandingPage';
import StartProject from './pages/StartProject';
import MaintenancePage from './components/ui/MaintenancePage';
import { checkStatus } from './services/api';
import navBg from './assets/synapse_background.png';

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
