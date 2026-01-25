import { motion as Motion } from 'framer-motion'
import { Shield, Globe, Zap, ShieldOff, Eye, Smartphone } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { useLocale } from '../hooks/useLocale'

// Иконки вынесены отдельно, чтобы не зависеть от локализации
const featureIcons = [Shield, Globe, Zap, ShieldOff, Eye, Smartphone]

export default function Features() {
    const { t } = useLocale()

    return (
        <section id="features" className="py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionTitle title={t.features.title} subtitle={t.features.label} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.features.items.map((feature, i) => {
                        const Icon = featureIcons[i] || Shield
                        return (
                            <Motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-all duration-300 overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Glow effect */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-primary)]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon container */}
                                <Motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] p-[2px] mb-6"
                                >
                                    <div className="w-full h-full rounded-2xl bg-[var(--bg-card)] flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-[var(--accent-primary)]" strokeWidth={1.5} />
                                    </div>
                                </Motion.div>

                                {/* Content */}
                                <h3 className="relative text-xl font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="relative text-[var(--text-secondary)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
