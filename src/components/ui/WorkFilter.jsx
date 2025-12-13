
import { motion } from 'framer-motion';

const WorkFilter = ({ currentFilter, setFilter }) => {
    const categories = ['All', 'Web', 'Identity', 'Motion', 'Automation'];

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${currentFilter === category ? 'text-black' : 'text-white/40 hover:text-white'
                        }`}
                >
                    {currentFilter === category && (
                        <motion.div
                            layoutId="filter-pill"
                            className="absolute inset-0 bg-white rounded-full z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
};

export default WorkFilter;
