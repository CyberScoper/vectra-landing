import { motion as Motion } from 'framer-motion'
import { Monitor, Apple, Terminal, Smartphone, Globe, Download } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { useLocale } from '../hooks/useLocale'

const platforms = [
    { id: 'windows', name: 'Windows', Icon: Monitor, available: true },
    { id: 'macos', name: 'macOS', Icon: Apple, available: true },
    { id: 'linux', name: 'Linux', Icon: Terminal, available: true },
    { id: 'ios', name: 'iOS', Icon: Smartphone, available: true },
    { id: 'android', name: 'Android', Icon: Smartphone, available: true },
    { id: 'browser', name: 'Browser', Icon: Globe, available: false },
]

export default function DownloadSection() {
    const { t } = useLocale()

    return (
        <section id="download" className="py-32 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <SectionTitle title={t.download.title} subtitle={t.download.label} />

                <p className="text-center text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto">
                    {t.download.subtitle}
                </p>

                {/* Platform grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {platforms.map((platform, i) => {
                        const { Icon } = platform
                        return (
                            <Motion.div
                                key={platform.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={platform.available ? { y: -8, scale: 1.05 } : {}}
                                className={`relative group p-6 rounded-2xl text-center border transition-all duration-300 ${platform.available
                                        ? 'bg-[var(--bg-card)] border-[var(--border-color)] cursor-pointer hover:border-[var(--accent-primary)]/50 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10'
                                        : 'bg-[var(--bg-tertiary)] border-[var(--border-color)] opacity-60'
                                    }`}
                            >
                                {/* Glow on hover */}
                                {platform.available && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}

                                {/* Icon */}
                                <div className="relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 flex items-center justify-center group-hover:from-[var(--accent-primary)]/20 group-hover:to-[var(--accent-secondary)]/20 transition-colors">
                                    <Icon className="w-7 h-7 text-[var(--accent-primary)]" strokeWidth={1.5} />
                                </div>

                                {/* Platform name */}
                                <h3 className="relative font-semibold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {platform.name}
                                </h3>

                                {/* Download button or coming soon */}
                                {platform.available ? (
                                    <Motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t.download.downloadBtn}
                                    </Motion.button>
                                ) : (
                                    <span className="relative text-xs text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-tertiary)]">
                                        {t.download.comingSoon}
                                    </span>
                                )}
                            </Motion.div>
                        )
                    })}
                </div>

                {/* Version info */}
                <Motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-[var(--text-muted)] mt-12"
                >
                    Version 2.5.1 • Last updated December 2024
                </Motion.p>
            </div>
        </section>
    )
}
