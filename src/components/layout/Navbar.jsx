
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
        closed: {
            x: '-100%',
            opacity: 0,
            transition: {
                type: "tween",
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const containerVars = {
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.3, staggerChildren: 0.08, staggerDirection: 1 } }
    };

    const linkVars = {
        closed: { x: -50, opacity: 0, scale: 0.8 },
        open: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <>
            <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
                <button
                    onClick={toggleMenu}
                    className="text-white hover:text-white/70 transition-colors p-3 md:p-2 mix-blend-difference min-w-[48px] min-h-[48px] flex items-center justify-center"
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
                        {/* Backdrop - Enhanced Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
                        />

                        {/* Drawer - Premium Glassmorphism */}
                        <motion.div
                            variants={sidebarVars}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 left-0 bottom-0 z-50 w-full md:w-[600px] overflow-hidden max-w-full"
                            style={{ willChange: 'transform', WebkitOverflowScrolling: 'touch' }}
                        >
                            {/* Background Layer with Gradient */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={navBg}
                                    alt="Navigation Background"
                                    className="w-full h-full object-cover opacity-30 blur-sm"
                                    loading="eager"
                                />
                                {/* Glassmorphism overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-xl"></div>
                                {/* Subtle gradient accent */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
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
                                    className="flex flex-col gap-0"
                                >
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            variants={linkVars}
                                            whileHover={{ x: 20, scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="border-b border-white/10 last:border-b-0"
                                        >
                                            {link.href.startsWith('/#') ? (
                                                <a
                                                    href={link.href}
                                                    className="group flex items-center gap-4 text-2xl md:text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 hover:to-white transition-all tracking-tighter cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] py-4"
                                                    onClick={toggleMenu}
                                                >
                                                    <span className="text-xs font-mono text-white/30 group-hover:text-white group-hover:scale-110 transition-all duration-300">0{index + 1}</span>
                                                    {link.name}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.href}
                                                    className="group flex items-center gap-4 text-2xl md:text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 hover:to-white transition-all tracking-tighter cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] py-4"
                                                    onClick={toggleMenu}
                                                >
                                                    <span className="text-xs font-mono text-white/30 group-hover:text-white group-hover:scale-110 transition-all duration-300">0{index + 1}</span>
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
