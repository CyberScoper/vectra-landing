import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { useLocale } from '../hooks/useLocale'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0)
    const { t } = useLocale()

    return (
        <section id="faq" className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />

            <div className="max-w-3xl mx-auto px-6">
                <SectionTitle title={t.faq.title} subtitle={t.faq.label} />

                <div className="space-y-4">
                    {t.faq.items.map((item, i) => (
                        <Motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i
                                    ? 'bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--bg-card)] border-[var(--accent-primary)]/30 shadow-lg shadow-[var(--accent-primary)]/10'
                                    : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/20'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full p-6 flex items-center gap-4 text-left"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${openIndex === i
                                        ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]'
                                        : 'bg-[var(--bg-tertiary)]'
                                    }`}>
                                    <HelpCircle className={`w-5 h-5 ${openIndex === i ? 'text-white' : 'text-[var(--accent-primary)]'}`} />
                                </div>
                                <span className={`flex-1 font-semibold transition-colors ${openIndex === i ? 'text-[var(--accent-primary)]' : ''}`}>
                                    {item.question}
                                </span>
                                <Motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${openIndex === i ? 'bg-[var(--accent-primary)]/20' : 'bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    <ChevronDown className={`w-5 h-5 ${openIndex === i ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`} />
                                </Motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <Motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pl-20 text-[var(--text-secondary)] leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </Motion.div>
                                )}
                            </AnimatePresence>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
