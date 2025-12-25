import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
    const progress = useScrollProgress()

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] origin-left z-[9999]"
            style={{ scaleX: progress / 100 }}
        />
    )
}
