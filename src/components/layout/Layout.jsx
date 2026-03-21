
import Navbar from './Navbar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import layoutStyles from './Layout.module.css';

const Layout = ({ children }) => {
    const [scrollPct, setScrollPct] = useState(0);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Reading progress bar
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="noise-overlay min-h-screen flex flex-col relative" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}>
            {/* Reading progress bar */}
            <div className={layoutStyles.readingProgress} style={{ width: `${scrollPct}%` }} />

            {/* Subtle top gradient accent */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123,108,183,0.08) 0%, transparent 70%)',
                }}
            />

            <Navbar />
            <main className="flex-grow pt-[72px] z-10 relative">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
