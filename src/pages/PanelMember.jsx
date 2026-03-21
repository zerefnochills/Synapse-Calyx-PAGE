
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team';
import { ArrowLeft, Mail, Briefcase, Linkedin, Instagram, Github, Dribbble, FileDown, Eye, ExternalLink } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';

const PanelMember = () => {
    const { id } = useParams();
    const member = teamMembers.find(m => m.id === id);

    if (!member) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl font-bold mb-4">Member Not Found</h2>
                <Link to="/panel" className="btn-primary px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20">
                    Back to Panel
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-10 px-6 max-w-6xl mx-auto pb-20">
            <motion.div whileHover={{ x: -4 }} className="inline-block mb-12">
                <Link to="/panel" className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white/70 hover:text-white hover:glow-purple transition-all group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span>Back to Panel</span>
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-3xl overflow-hidden glass-card border-2 border-purple-500/20 hover:border-purple-400/40 transition-all"
                >
                    <img src={member.image} alt={member.name} className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-2 gradient-text-rainbow">{member.name}</h1>
                    <p className="text-xl gradient-text-primary font-medium mb-8">{member.role}</p>

                    <div className="prose prose-invert prose-lg mb-10 text-ink/80">
                        <p className="text-xl leading-relaxed font-light text-white/90">{member.bio}</p>
                        {member.description && (
                            <p className="mt-4 text-ink/70 leading-relaxed">
                                {member.description}
                            </p>
                        )}
                    </div>


                    {/* Only show works section for certain members */}
                    {!['5', '6', '7'].includes(member.id) && (
                        <div className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Briefcase size={20} className="text-accent" /> Selected Works/Experienced in-
                            </h3>
                            <ul className="space-y-3">
                                {member.works.map(work => (
                                    <motion.li 
                                        key={work} 
                                        whileHover={{ x: 8, scale: 1.02 }}
                                        className="flex items-center gap-3 p-3 rounded-xl glass-card border border-purple-500/20 hover:border-purple-400/40 hover:glow-purple transition-all cursor-default"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></span>
                                        <span className="text-white/80">{work}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {member.contact && (
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Mail size={20} className="text-accent" /> Contact
                        </h3>
                        <motion.a 
                            href={`mailto:${member.contact}`} 
                            whileHover={{ scale: 1.05 }}
                            className="text-xl gradient-text-primary hover:gradient-text-rainbow underline decoration-purple-400/30 underline-offset-4 transition-all inline-block"
                        >
                            {member.contact}
                        </motion.a>
                    </div>
                    )}

                    {member.resume && (
                        <div className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FileDown size={20} className="text-accent" /> Resume
                            </h3>
                            <div className="flex gap-3 flex-wrap">
                                <motion.a
                                    href={member.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-2 border-purple-500/30 hover:border-purple-400/50 hover:glow-purple transition-all duration-300 font-medium text-white"
                                >
                                    <Eye size={20} />
                                    Preview Resume
                                </motion.a>
                                <motion.a
                                    href={member.resume}
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium text-white shadow-lg hover:shadow-purple-500/50"
                                >
                                    <FileDown size={20} />
                                    Download PDF
                                </motion.a>
                            </div>
                        </div>
                    )}

                    {member.socials && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                Socials
                            </h3>
                            <div className="flex gap-4">
                                {Object.entries(member.socials).map(([platform, url]) => {
                                    if (!url || url === '#' || url === '$') return null;

                                    const Icon = {
                                        linkedin: Linkedin,
                                        instagram: Instagram,
                                        github: Github,
                                        dribbble: Dribbble,
                                        behance: FaBehance,
                                        portfolio: ExternalLink
                                    }[platform.toLowerCase()];

                                    if (!Icon) return null;

                                    return (
                                        <motion.a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-3 rounded-full glass-card border border-purple-500/20 hover:border-purple-400/50 hover:glow-purple transition-all duration-300 text-white"
                                            aria-label={platform}
                                        >
                                            <Icon size={20} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PanelMember;
