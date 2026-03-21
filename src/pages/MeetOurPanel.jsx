
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team';
import { ArrowUpRight } from 'lucide-react';

const MeetOurPanel = () => {
    return (
        <div className="pt-10 px-6 max-w-7xl mx-auto pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="inline-block px-4 py-1.5 rounded-full glass-card border-2 border-purple-500/30 gradient-text-primary text-sm font-bold mb-4">
                    The Team
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text-rainbow">
                    Meet Our Panel
                </h1>
                <p className="text-ink/70 max-w-2xl mx-auto text-lg">
                    The minds behind the innovation. Architects, designers, and strategists building the future.
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <motion.a
                        href="https://forms.gle/dKLqcXTezEbQz6359"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 group min-h-[48px]"
                    >
                        Apply Now
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.a>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative glass-card border-2 border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-400/40 transition-all duration-300 hover:glow-purple"
                    >
                        <div className="aspect-square overflow-hidden relative">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-500 hover:scale-105" loading="lazy" decoding="async" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>

                        <div className="p-6 relative">
                            <h3 className="text-2xl font-bold mb-1 gradient-text-primary group-hover:gradient-text-rainbow transition-all duration-300">{member.name}</h3>
                            <p className="text-sm gradient-text-secondary mb-4 font-medium">{member.role}</p>
                            <p className="text-ink/60 line-clamp-2 text-sm mb-6">{member.bio}</p>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to={`/panel/${member.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold gradient-text-primary hover:gradient-text-rainbow transition-all"
                                >
                                    View Profile <ArrowUpRight size={16} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MeetOurPanel;
