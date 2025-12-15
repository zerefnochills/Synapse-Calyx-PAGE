
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team';
import { ArrowLeft, Mail, Briefcase, Linkedin, Instagram, Github, Dribbble, FileDown } from 'lucide-react';

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
            <Link to="/panel" className="inline-flex items-center gap-2 text-ink/60 hover:text-primary mb-12 transition-colors">
                <ArrowLeft size={20} /> Back to Panel
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-[32px] overflow-hidden border border-muted"
                >
                    <img src={member.image} alt={member.name} className="w-full h-auto object-cover" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-2">{member.name}</h1>
                    <p className="text-xl text-primary font-medium mb-8">{member.role}</p>

                    <div className="prose prose-invert prose-lg mb-10 text-ink/80">
                        <p className="text-xl leading-relaxed font-light text-white/90">{member.bio}</p>
                        {member.description && (
                            <p className="mt-4 text-ink/70 leading-relaxed">
                                {member.description}
                            </p>
                        )}
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Briefcase size={20} className="text-accent" /> Selected Works
                        </h3>
                        <ul className="space-y-3">
                            {member.works.map(work => (
                                <li key={work} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    {work}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Mail size={20} className="text-accent" /> Contact
                        </h3>
                        <a href={`mailto:${member.contact}`} className="text-xl hover:text-primary underline decoration-primary/30 underline-offset-4 transition-colors">
                            {member.contact}
                        </a>
                    </div>

                    {member.resume && (
                        <div className="mb-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FileDown size={20} className="text-accent" /> Resume
                            </h3>
                            <a
                                href={member.resume}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                            >
                                <FileDown size={20} />
                                Download Resume
                            </a>
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
                                        dribbble: Dribbble
                                    }[platform.toLowerCase()];

                                    if (!Icon) return null;

                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                            aria-label={platform}
                                        >
                                            <Icon size={20} />
                                        </a>
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
