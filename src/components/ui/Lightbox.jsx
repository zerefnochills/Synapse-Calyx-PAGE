
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const Lightbox = ({ selectedWork, onClose }) => {
    return (
        <AnimatePresence>
            {selectedWork && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        layoutId={`work-card-${selectedWork.index}`}
                        className="relative w-full max-w-5xl bg-[#0f0f13] border border-muted rounded-[24px] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="aspect-[4/3] md:aspect-auto md:h-[60vh]">
                                <img src={selectedWork.img} alt={selectedWork.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl font-bold mb-2"
                                >
                                    {selectedWork.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-primary font-medium mb-6 uppercase tracking-wider text-sm"
                                >
                                    {selectedWork.cat}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-ink/70 mb-8 leading-relaxed"
                                >
                                    Experience the fusion of design and functionality defined by {selectedWork.title}. This project represents a leap forward in digital interaction.
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="btn-primary w-fit flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold"
                                >
                                    View Project Details <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
