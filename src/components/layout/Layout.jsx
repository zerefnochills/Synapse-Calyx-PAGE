
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import Lenis from 'lenis'; // Import Lenis directly

const Layout = ({ children }) => {
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

    return (
        <div className="min-h-screen flex flex-col text-ink relative overflow-hidden selection:bg-white selection:text-black">
            {/* Custom Background Image - GPU Accelerated */}
            <div className="fixed inset-0 z-0" style={{ willChange: 'transform' }}>
                <img
                    src="/background.jpg"
                    alt=""
                    className="w-full h-full object-cover blur-sm scale-105"
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/70" style={{ transform: 'translateZ(0)' }}></div>
            </div>

            {/* Noise/Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='.06'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <Navbar />
            <main className="flex-grow pt-[80px] z-10 relative">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
