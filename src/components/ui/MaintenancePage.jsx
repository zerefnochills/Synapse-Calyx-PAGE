import { motion } from 'framer-motion';

const MaintenancePage = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
            >
                <div className="w-24 h-24 mx-auto border-2 border-white/20 rounded-full flex items-center justify-center relative">
                    <div className="w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 border-t-2 border-white animate-spin"></div>
                </div>

                <div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
                        SYSTEM OFFLINE
                    </h1>
                    <p className="text-lg font-mono text-white/50 tracking-widest uppercase">
                        Upgrades in Progress
                    </p>
                </div>

                <div className="inline-block px-4 py-2 border border-white/10 rounded-full text-xs font-mono text-white/30">
                    ERR_CONNECTION_REFUSED_BY_ADMIN
                </div>
            </motion.div>
        </div>
    );
};

export default MaintenancePage;
