
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Track scroll for navbar background
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Works', href: '/works' },
        { name: 'Order', href: '/order' },
        { name: 'The Panel', href: '/panel' },
    ];

    const isActive = (href) => {
        if (href.startsWith('/#')) return false;
        return location.pathname === href || location.pathname.startsWith(href + '/');
    };

    const handleNavClick = (e, href) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const hash = href.split('#')[1];

            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            } else {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* ── Top Bar ─────────────────────────── */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? 'rgba(8,10,15,0.92)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            src="/SC_pfp.jpg"
                            alt="Synapse"
                            className="w-8 h-8 rounded-full"
                            style={{ border: '1.5px solid rgba(123,108,183,0.3)' }}
                        />
                        <span
                            className="text-sm font-semibold tracking-[0.15em] uppercase hidden sm:block"
                            style={{
                                fontFamily: "'PP Neue Machina', sans-serif",
                                color: 'var(--color-ink)',
                            }}
                        >
                            Synapse Calyx
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative py-1 text-[13px] tracking-[0.08em] uppercase transition-colors duration-200"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: isActive(link.href) ? '#e8eaf0' : 'rgba(232,234,240,0.5)',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => { e.target.style.color = '#e8eaf0'; }}
                                onMouseLeave={(e) => {
                                    if (!isActive(link.href)) e.target.style.color = 'rgba(232,234,240,0.5)';
                                }}
                            >
                                {link.name}
                                {/* Active indicator */}
                                {isActive(link.href) && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-0.5 left-0 right-0 h-px"
                                        style={{ backgroundColor: 'var(--color-primary)' }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        to="/order"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[12px] tracking-[0.12em] uppercase rounded-full transition-all duration-300"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: '#e8eaf0',
                            border: '1px solid rgba(123,108,183,0.4)',
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(123,108,183,0.15)';
                            e.currentTarget.style.borderColor = 'rgba(123,108,183,0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(123,108,183,0.4)';
                        }}
                    >
                        Start a Project
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] relative z-50"
                        aria-label="Toggle Menu"
                        style={{ background: 'none', border: 'none' }}
                    >
                        <span
                            className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                            style={{
                                backgroundColor: '#e8eaf0',
                                transform: isOpen ? 'rotate(45deg) translateY(3.25px)' : 'none',
                            }}
                        />
                        <span
                            className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                            style={{
                                backgroundColor: '#e8eaf0',
                                transform: isOpen ? 'rotate(-45deg) translateY(-3.25px)' : 'none',
                            }}
                        />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Menu ─────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                            style={{ backgroundColor: 'rgba(8,10,15,0.85)', backdropFilter: 'blur(8px)' }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-[72px] left-0 right-0 z-50 px-6 pt-8 pb-12"
                            style={{
                                backgroundColor: 'rgba(8,10,15,0.98)',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.3 }}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="block py-3 text-2xl font-semibold tracking-tight transition-colors duration-200"
                                            style={{
                                                fontFamily: "'PP Neue Machina', sans-serif",
                                                color: isActive(link.href) ? '#e8eaf0' : 'rgba(232,234,240,0.4)',
                                                textDecoration: 'none',
                                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8"
                            >
                                <Link
                                    to="/order"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase rounded-full transition-all"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        color: '#e8eaf0',
                                        border: '1px solid rgba(123,108,183,0.4)',
                                    }}
                                >
                                    Start a Project
                                </Link>
                            </motion.div>

                            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                <p className="text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(232,234,240,0.3)' }}>
                                    enquiry.synapse@outlook.com
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
