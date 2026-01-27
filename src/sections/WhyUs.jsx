import { motion as Motion } from 'framer-motion'
import { Server, FileCheck, Headphones, RefreshCw } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { useLocale } from '../hooks/useLocale'

// Иконки вынесены отдельно
const whyUsIcons = [Server, FileCheck, Headphones, RefreshCw]

export default function WhyUs() {
    const { t } = useLocale()

    return (
        <section id="why-us" className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6">
                <SectionTitle title={t.whyUs.title} subtitle={t.whyUs.label} />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.whyUs.items.map((item, i) => {
                        const Icon = whyUsIcons[i] || Server
                        return (
                            <Motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                {/* Icon with glow */}
                                <Motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative w-20 h-20 mx-auto mb-6"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-primary)]/50 transition-colors">
                                        <Icon className="w-10 h-10 text-[var(--accent-primary)]" strokeWidth={1.5} />
                                    </div>
                                </Motion.div>

                                <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
                                    {item.description}
                                </p>
                            </Motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
