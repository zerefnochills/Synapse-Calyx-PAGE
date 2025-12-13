
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
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-4">
                    The Team
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                    Meet Our Panel
                </h1>
                <p className="text-ink/70 max-w-2xl mx-auto text-lg">
                    The minds behind the innovation. Architects, designers, and strategists building the future.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-[#0f0f13] border border-muted rounded-[24px] overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,108,240,0.15)]"
                    >
                        <div className="aspect-square overflow-hidden relative">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>

                        <div className="p-6 relative">
                            <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                            <p className="text-sm text-accent mb-4 font-medium">{member.role}</p>
                            <p className="text-ink/60 line-clamp-2 text-sm mb-6">{member.bio}</p>

                            <Link
                                to={`/panel/${member.id}`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors"
                            >
                                View Profile <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MeetOurPanel;
