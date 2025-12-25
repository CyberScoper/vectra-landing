import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function LoadingScreen({ progress }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
        >
            {/* Animated Shield */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-8"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 rounded-full border-2 border-[var(--accent-primary)]/20"
                    style={{
                        borderTopColor: 'var(--accent-primary)',
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[var(--accent-primary)]" />
                </div>
            </motion.div>

            {/* Brand */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold gradient-text mb-4"
            >
                VectraVPN
            </motion.h1>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Percentage */}
            <motion.p
                className="mt-4 text-sm text-[var(--text-muted)] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {Math.round(Math.min(progress, 100))}%
            </motion.p>
        </motion.div>
    )
}
