
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import navBg from '../../assets/nav_background.webp';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Services', href: '/#services' },
        { name: 'Work', href: '/#work' },
        { name: 'About', href: '/#about' },
        { name: 'The Panel', href: '/panel' },
        { name: 'Contact', href: '/#contact' },
    ];

    const sidebarVars = {
        closed: { x: '-100%', transition: { type: "spring", stiffness: 400, damping: 40 } },
        open: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } }
    };

    const containerVars = {
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.2, staggerChildren: 0.05, staggerDirection: 1 } }
    };

    const linkVars = {
        closed: { x: -20, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    return (
        <>
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={toggleMenu}
                    className="text-white hover:text-white/70 transition-colors p-2 mix-blend-difference"
                    aria-label="Toggle Menu"
                >
                    <div className="space-y-1.5">
                        <span className={`block w-8 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            variants={sidebarVars}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 left-0 bottom-0 z-50 w-full md:w-[600px] overflow-hidden"
                        >
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={navBg}
                                    alt="Navigation Background"
                                    className="w-full h-full object-cover opacity-20"
                                />
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                            </div>

                            <div className="relative z-10 p-10 h-full flex flex-col justify-between border-r border-white/10 shadow-2xl">
                                <div className="mb-12 flex justify-between items-center">
                                    <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase glow-text">Menu</span>
                                    <button onClick={toggleMenu} className="text-white hover:text-white/50 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <motion.div
                                    variants={containerVars}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="flex flex-col gap-6"
                                >
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            variants={linkVars}
                                            whileHover={{ x: 20 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {link.href.startsWith('/#') ? (
                                                <a
                                                    href={link.href}
                                                    className="group flex items-center gap-4 text-4xl md:text-6xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 hover:to-white transition-all tracking-tighter cursor-pointer"
                                                    onClick={toggleMenu}
                                                >
                                                    <span className="text-sm font-mono text-white/30 group-hover:text-accent transition-colors">0{index + 1}</span>
                                                    {link.name}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.href}
                                                    className="group flex items-center gap-4 text-4xl md:text-6xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 hover:to-white transition-all tracking-tighter cursor-pointer"
                                                    onClick={toggleMenu}
                                                >
                                                    <span className="text-sm font-mono text-white/30 group-hover:text-accent transition-colors">0{index + 1}</span>
                                                    {link.name}
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-4">
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Contact</h4>
                                        <a href="mailto:enquiry@synapse.cx" className="text-lg font-light text-white hover:text-accent transition-colors">
                                            enquiry@synapse.cx
                                        </a>
                                    </div>
                                    <div className="flex gap-4">
                                        {/* Social icons could go here */}
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-white/40 tracking-widest uppercase">System Online</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
