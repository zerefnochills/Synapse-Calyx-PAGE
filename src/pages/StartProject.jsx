import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

import { submitProject } from '../services/api';

const StartProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        position: '',
        roleType: '',
        projectType: '',
        details: '',
        budget: ''
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        const res = await submitProject(formData);

        if (res.success) {
            setStatus({ loading: false, success: true, error: null });
            alert('Transmission Successful. Sequence Initiated.');
            // Optional: Reset form
        } else {
            setStatus({ loading: false, success: false, error: res.message || 'Transmission Failed' });
            alert(`Error: ${res.message || 'Connection Interrupted'}`);
        }
    };

    const inputClasses = "w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors font-light bg-transparent";
    const labelClasses = "block text-xs font-mono uppercase tracking-widest text-white/50 mb-2";

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-[90vw] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest">Abort Sequence</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
                {/* Header */}
                <div className="lg:col-span-4">
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                        Initiate<br />Protocol
                    </h1>
                    <p className="text-white/60 font-light leading-relaxed max-w-sm">
                        Provide the parameters for your objective. Our panel will analyze the data and calculate the optimal trajectory for your vision.
                    </p>
                </div>

                {/* Form */}
                <div className="lg:col-span-8">
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* Section 01: Identification */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-normal border-b border-white/10 pb-4 mb-8">01 / Identification</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={labelClasses}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className={inputClasses}
                                        placeholder="John Doe"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className={inputClasses}
                                        placeholder="john@example.com"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={inputClasses}
                                        placeholder="+1 (555) 000-0000"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Location / Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={inputClasses}
                                        placeholder="City, Country"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 02: Professional Data */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-normal border-b border-white/10 pb-4 mb-8">02 / Professional Data</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={labelClasses}>Company / Field</label>
                                    <input
                                        type="text"
                                        name="company"
                                        className={inputClasses}
                                        placeholder="Tech, Fashion, Finance..."
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Position / Role</label>
                                    <input
                                        type="text"
                                        name="position"
                                        className={inputClasses}
                                        placeholder="CEO, Marketing Director..."
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>Role Type</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {['Business Owner', 'Freelancer', 'Content Creator', 'Agency', 'Other'].map((type) => (
                                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="roleType"
                                                    value={type}
                                                    onChange={handleChange}
                                                    className="appearance-none w-4 h-4 border border-white/30 rounded-full checked:bg-white checked:border-white transition-all"
                                                />
                                                <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 03: Objective */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-normal border-b border-white/10 pb-4 mb-8">03 / Objective Statement</h2>

                            <div>
                                <label className={labelClasses}>Project Type</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-8">
                                    {['Identity', 'Digital / Web', 'Motion', 'Automation / AI', 'Full Stack'].map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="projectType"
                                                value={cat}
                                                onChange={handleChange}
                                                className="appearance-none w-4 h-4 border border-white/30 rounded-full checked:bg-white checked:border-white transition-all"
                                            />
                                            <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>Project Details</label>
                                <textarea
                                    name="details"
                                    rows="6"
                                    className={`${inputClasses} resize-none bg-white/5 border border-white/10 rounded-sm`}
                                    placeholder="Describe your vision, goals, and any specific requirements..."
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div>
                                <label className={labelClasses}>Estimated Budget</label>
                                <select
                                    name="budget"
                                    onChange={handleChange}
                                    className={`${inputClasses} bg-black`}
                                >
                                    <option value="" className="bg-black">Select Range</option>
                                    <option value="5k-10k" className="bg-black">$5k - $10k</option>
                                    <option value="10k-25k" className="bg-black">$10k - $25k</option>
                                    <option value="25k-50k" className="bg-black">$25k - $50k</option>
                                    <option value="50k+" className="bg-black">$50k+</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-white/90 transition-all rounded-sm"
                            >
                                <span>Transmit Data</span>
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default StartProject;
