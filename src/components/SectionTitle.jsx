import { motion as Motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle, center = true }) {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-16 ${center ? 'text-center' : ''}`}
        >
            {subtitle && (
                <Motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1 mb-4 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 rounded-full"
                >
                    {subtitle}
                </Motion.span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {title}
            </h2>
        </Motion.div>
    )
}
