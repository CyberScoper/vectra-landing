import { motion as Motion } from 'framer-motion'
import { Shield, Twitter, MessageCircle, Github, Mail } from 'lucide-react'
import { vpnInfo, socialLinks } from '../data/vpn'
import { useLocale } from '../hooks/useLocale'

const iconMap = {
    Twitter,
    MessageCircle,
    Github,
    Mail,
}

export default function Footer() {
    const { t } = useLocale()
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        company: [
            { name: t.footer.about, href: '#' },
            { name: t.footer.careers, href: '#' },
            { name: t.footer.press, href: '#' },
            { name: t.footer.blog, href: '#' },
        ],
        product: [
            { name: t.footer.features, href: '#features' },
            { name: t.footer.pricing, href: '#pricing' },
            { name: t.footer.download, href: '#download' },
            { name: t.footer.servers, href: '#' },
        ],
        support: [
            { name: t.footer.help, href: '#' },
            { name: t.footer.contact, href: '#' },
            { name: t.footer.status, href: '#' },
        ],
        legal: [
            { name: t.footer.privacy, href: '#' },
            { name: t.footer.terms, href: '#' },
        ],
    }

    return (
        <footer className="relative pt-20 pb-10 border-t border-[var(--border-color)]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-50" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Main footer content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Motion.a
                            href="#hero"
                            className="flex items-center gap-2 text-xl font-bold mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="gradient-text">{vpnInfo.name}</span>
                        </Motion.a>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-xs">
                            {t.footer.tagline}
                        </p>
                        {/* Social links */}
                        <div className="flex gap-4">
                            {socialLinks.map((link) => {
                                const Icon = iconMap[link.icon] || Mail
                                return (
                                    <Motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-lg glass text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                                        aria-label={link.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Motion.a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t.footer.company}</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t.footer.product}</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t.footer.support}</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[var(--text-muted)]">
                        © {currentYear} {vpnInfo.name}. {t.footer.allRightsReserved}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    )
}
