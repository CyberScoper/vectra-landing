import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Check, Sparkles, Star } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { useLocale } from '../hooks/useLocale'

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(true)
    const { t } = useLocale()

    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-primary)]/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                <SectionTitle title={t.pricing.title} subtitle={t.pricing.label} />

                <p className="text-center text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
                    {t.pricing.subtitle}
                </p>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                        {t.pricing.monthly}
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative w-16 h-8 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] p-1 transition-colors"
                    >
                        <Motion.div
                            animate={{ x: isYearly ? 32 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="w-6 h-6 rounded-full bg-white shadow-lg"
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                        {t.pricing.yearly}
                    </span>
                    {isYearly && (
                        <Motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-full"
                        >
                            {t.pricing.save}
                        </Motion.span>
                    )}
                </div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {t.pricing.plans.map((plan, i) => (
                        <Motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.01 }}
                            className={`relative p-8 rounded-3xl transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-b from-[var(--accent-primary)]/20 via-[var(--bg-card)] to-[var(--bg-card)] border-2 border-[var(--accent-primary)] shadow-2xl shadow-[var(--accent-primary)]/20'
                                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/30'
                                }`}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                                    <Sparkles className="w-4 h-4" />
                                    {t.pricing.popular}
                                </div>
                            )}

                            {/* Plan header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-[var(--text-muted)]">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-8">
                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="text-[var(--text-muted)] mb-2">{t.pricing.perMonth}</span>
                                </div>
                                {isYearly && (
                                    <p className="text-xs text-[var(--text-muted)] mt-2">{t.pricing.billedYearly}</p>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                        <span className="text-[var(--text-secondary)]">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                href="#"
                                variant={plan.popular ? 'primary' : 'secondary'}
                                className="w-full justify-center"
                            >
                                {t.pricing.getStarted}
                            </Button>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
