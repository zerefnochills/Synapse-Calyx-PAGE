
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onEnter }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleEnter = () => {
        setIsExiting(true);
        setTimeout(onEnter, 800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
                    onClick={handleEnter}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
                    style={{ backgroundColor: '#060810' }}
                >
                    {/* Subtle violet radial glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(123,108,183,0.08) 0%, transparent 60%)',
                        }}
                    />

                    <div className="relative text-center z-10 p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="mb-10"
                            >
                                <img
                                    src="/SC_pfp.jpg"
                                    alt="Synapse Calyx"
                                    className="w-16 h-16 rounded-full mx-auto"
                                    style={{ border: '1.5px solid rgba(123,108,183,0.3)' }}
                                />
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                style={{
                                    fontFamily: "'PP Neue Machina', sans-serif",
                                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: '#e8eaf0',
                                    marginBottom: '1rem',
                                }}
                            >
                                Synapse Calyx
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '11px',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(232,234,240,0.35)',
                                    marginBottom: '3rem',
                                }}
                            >
                                Creative Intelligence × Digital Systems
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <span
                                    className="inline-block px-8 py-3 rounded-full text-[12px] tracking-[0.15em] uppercase cursor-pointer transition-all duration-300"
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
                                    Enter
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LandingPage;
