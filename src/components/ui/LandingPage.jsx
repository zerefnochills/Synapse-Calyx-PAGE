
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onEnter }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleEnter = () => {
        setIsExiting(true);
        setTimeout(onEnter, 1000); // Wait for exit animation
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={handleEnter}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Custom Background Image - GPU Accelerated */}
                    <div className="absolute inset-0" style={{ willChange: 'transform' }}>
                        <img
                            src="/background.jpg"
                            alt=""
                            className="w-full h-full object-cover blur-sm scale-105"
                            loading="eager"
                            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                        />
                        {/* Dark overlay for readability */}
                        <div className="absolute inset-0 bg-black/80" style={{ transform: 'translateZ(0)' }}></div>
                    </div>

                    {/* Animated Grain/Noise Overlay */}
                    <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, transform: 'translateZ(0)' }}></div>

                    <div className="relative text-center z-10 p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-8"
                        >
                            {/* Place for Logo */}
                            <img src="/SC_pfp.jpg" alt="Synapse Calyx" className="w-24 h-24  mx-auto grayscale border border-white/20" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white mb-4 uppercase"
                        >
                            Synapse Calyx
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/50 tracking-widest text-xs md:text-sm uppercase mb-12"
                        >
                            Creative Intelligence Meets Digital Evolution
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="inline-block px-8 py-3 border border-white text-white tracking-widest text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors duration-300">
                                Enter Experience
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LandingPage;
