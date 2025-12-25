import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Shield, Lock, Wifi } from 'lucide-react'
import Button from '../components/Button'
import { useLocale } from '../hooks/useLocale'
import { stats } from '../data/vpn'

export default function Hero() {
    const { t } = useLocale()

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--accent-primary)]/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[var(--accent-secondary)]/30 rounded-full blur-[100px]"
                />
                {/* Extra center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)]/10 rounded-full blur-[150px]" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] mb-8 shadow-lg shadow-[var(--accent-primary)]/10"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-primary)]"></span>
                    </span>
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {t.hero.badge}
                    </span>
                </motion.div>

                {/* Floating Shield - Above heading*/}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative inline-block mb-8"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative"
                    >
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-2xl opacity-50 scale-110" />

                        {/* Main shield container */}
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] p-[3px] shadow-2xl shadow-[var(--accent-primary)]/30">
                            <div className="w-full h-full rounded-3xl bg-[var(--bg-primary)] flex items-center justify-center">
                                <Shield className="w-14 h-14 md:w-18 md:h-18 text-[var(--accent-primary)]" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Floating mini icons */}
                        <motion.div
                            animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-2 -right-4 w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shadow-lg"
                        >
                            <Lock className="w-5 h-5 text-[var(--accent-secondary)]" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                            className="absolute -bottom-2 -left-4 w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center shadow-lg"
                        >
                            <Wifi className="w-5 h-5 text-[var(--accent-primary)]" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                >
                    <span className="block text-[var(--text-primary)]">{t.hero.title}</span>
                    <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[#c084fc] to-[var(--accent-secondary)] bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
                        {t.hero.titleHighlight}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Button href="#pricing" icon={ArrowRight}>
                        {t.hero.cta}
                    </Button>
                    <Button href="#features" variant="secondary">
                        {t.hero.secondary}
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                            className="relative text-center p-4 rounded-2xl bg-[var(--bg-card)]/50 border border-[var(--border-color)]"
                        >
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[var(--text-muted)]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.a
                href="#features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
            >
                <span className="text-xs font-mono">{t.hero.scroll}</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.a>
        </section>
    )
}
