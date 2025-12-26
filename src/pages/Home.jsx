
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Lightbox from '../components/ui/Lightbox';
import SynapseAI from '../components/ui/SynapseAI';
import WorkFilter from '../components/ui/WorkFilter';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const works = [
    { title: '', cat: 'Identity + Web', img: '/Free Cardboard Gold Logo Mockup.jpg' },
    { title: '', cat: 'UI/UX + Motion', img: '/Branding Presentation-03.png' },
    { title: '', cat: 'Automation', img: '/Branding Presentation-01.png' }
];

const Home = () => {
    const [selectedWork, setSelectedWork] = useState(null);
    const [filter, setFilter] = useState('All');

    const filteredWorks = useMemo(() => {
        if (filter === 'All') return works;
        return works.filter(work => work.cat.includes(filter));
    }, [filter]);

    const handleWorkClick = useCallback((work, index) => {
        setSelectedWork({ ...work, index });
    }, []);

    const handleCloseLightbox = useCallback(() => {
        setSelectedWork(null);
    }, []);

    return (
        <div className="space-y-40 pb-20 text-white selection:bg-white selection:text-black">
            <Lightbox selectedWork={selectedWork} onClose={handleCloseLightbox} />
            <SynapseAI />

            {/* CTA Button */}
            <Link
                to="/start-project"
                className="fixed top-6 right-20 z-40 hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
            >
                Start a Project
            </Link>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center p-6 relative">

                <div className="max-w-[90vw] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-[clamp(3rem,12vw,8rem)] leading-[0.8] font-bold tracking-tighter mb-8 text-white mix-blend-exclusion">
                                SYNAPSE<br />CALYX
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col gap-6 md:flex-row md:items-center"
                        >
                            <p className="text-lg md:text-xl font-light text-white/60 max-w-md leading-relaxed">
                                Precision engineering for the digital age. We forge automated systems and monochrome aesthetics.
                            </p>
                            <div className="flex gap-4 items-center flex-wrap">
                                <a href="#work" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group flex-shrink-0">
                                    <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-500" />
                                </a>
                                <a
                                    href="https://forms.gle/dKLqcXTezEbQz6359"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] hover:from-white hover:to-accent hover:text-black border border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group min-h-[48px]"
                                >
                                    Join Our Team
                                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2 flex justify-end">
                        <div className="relative w-full aspect-square max-w-[500px]">
                            {/* Logo Static in Center */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute inset-0 rounded-full overflow-hidden"
                            >
                                <img
                                    src="/SC_pfp.jpg"
                                    alt="Synapse Logo"
                                    className="w-full h-full object-cover rounded-full mix-blend-screen brightness-90 contrast-125"
                                    loading="eager"
                                    decoding="async"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services - Swiss Grid */}
            <section id="services" className="px-6 max-w-[90vw] mx-auto border-t border-white/20 pt-12">
                <div className="flex justify-between items-baseline mb-20">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">(01)</span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight">Capabilities</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {[
                        { title: 'Web Development', desc: 'Full-stack engineering & React applications.', cat: 'Code' },
                        { title: 'UI/UX Design', desc: 'Interface systems & user experience strategy.', cat: 'Design' },
                        { title: 'AI Automation', desc: 'Workflow optimization & intelligent pipelines.', cat: 'Intelligence' },
                        { title: 'Graphic Design / GFX', desc: 'Visual identity, posters & aesthetic assets.', cat: 'Visual' },
                        { title: 'Video Editing', desc: 'Post-production & motion graphics.', cat: 'Motion' }
                    ].map((service, index) => (
                        <motion.article
                            key={index}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group relative border-t border-white/10 pt-8 hover:border-white transition-colors cursor-default"
                        >
                            <span className="absolute top-0 right-0 text-[10px] font-mono uppercase tracking-widest text-white/30 opacity-0 group-hover:opacity-100 transition-opacity mt-2">{service.cat}</span>
                            <h3 className="text-3xl font-light mb-4 text-white group-hover:text-white transition-colors">{service.title}</h3>
                            <p className="text-white/50 font-light leading-relaxed max-w-xs">{service.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Work */}
            <section id="work" className="px-6 max-w-[90vw] mx-auto">
                <div className="flex justify-between items-end mb-20 border-t border-white/20 pt-12">
                    <div className="flex gap-4 items-baseline">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/50">(02)</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight">Works</h2>
                    </div>
                    <WorkFilter currentFilter={filter} setFilter={setFilter} />
                </div>

                <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {filteredWorks.map((work, i) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={work.title}
                                onClick={() => handleWorkClick(work, i)}
                                className="group relative aspect-[16/10] overflow-hidden bg-white/5 cursor-pointer"
                            >
                                <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <h3 className="text-3xl font-light text-white mb-2">{work.title}</h3>
                                        <p className="text-xs uppercase tracking-widest text-white/70">{work.cat}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* About */}
            <section id="about" className="px-6 max-w-[90vw] mx-auto border-t border-white/20 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/50">(03) About</span>
                    </div>
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 rounded-lg overflow-hidden border border-white/10"
                        >
                            <img src="/linkdin banner bgv1.jpg" alt="Synapse Banner" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-light leading-snug mb-12">
                            We are a digital laboratory fusing <span className="text-white/40">creative intelligence</span> with <span className="text-white/40">code</span>.
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-white/60 font-light leading-relaxed">
                            <p>
                                Synapse Calyx isn't just a design agency. We are architects of the abstract, operating at the intersection of aesthetic purity and functional automation.
                            </p>
                            <div>
                                <p className="mb-8">
                                    Our philosophy is simple: Eliminate the noise. Amplify the signal.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <Link to="/panel" className="inline-block border-b border-white text-white pb-1 hover:text-white/50 hover:border-white/50 transition-colors">
                                        Meet The Panel
                                    </Link>
                                    <a
                                        href="https://forms.gle/dKLqcXTezEbQz6359"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] hover:from-white hover:to-accent hover:text-black border border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
                                    >
                                        Apply Now
                                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Socials */}
            <section id="social" className="px-6 max-w-[90vw] mx-auto pt-40 text-center">
                <h2 className="text-[clamp(3rem,10vw,10vw)] font-bold tracking-tighter opacity-10 select-none pointer-events-none mb-6 md:mb-0">CONTACT</h2>
                <div className="flex justify-center gap-6 md:gap-8 md:-mt-16 relative z-10">
                    {[
                        { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/synapse.cx?igsh=MXNvcmcxbXhsYmhkMw==' },
                        { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/synapse-calyx/' },
                        { name: 'Behance', icon: FaBehance, url: 'http://behance.net/teamsynapse' },
                        { name: 'X', icon: Twitter, url: 'https://x.com/synapse_calyx?s=21' }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
