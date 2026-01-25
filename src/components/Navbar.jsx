import { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Globe } from 'lucide-react'
import { navLinks, vpnInfo } from '../data/vpn'
import { useLocale } from '../hooks/useLocale'
import Button from './Button'

export default function Navbar({ theme, toggleTheme }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { t, toggleLocale, locale } = useLocale()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-6'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Motion.a
                    href="#hero"
                    className="flex items-center gap-2 text-xl font-bold"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">V</span>
                    </div>
                    <span className="gradient-text">{vpnInfo.name}</span>
                </Motion.a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Motion.a
                            key={link.name}
                            href={link.href}
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-sm font-medium"
                            whileHover={{ y: -2 }}
                        >
                            {t.nav[link.name]}
                        </Motion.a>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Toggle */}
                    <Motion.button
                        onClick={toggleLocale}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                        aria-label="Toggle language"
                    >
                        <Globe className="w-5 h-5" />
                        <span className="sr-only">{locale.toUpperCase()}</span>
                    </Motion.button>

                    {/* Theme Toggle */}
                    <Motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Motion.button>

                    <Button href="#pricing" size="sm">
                        {t.nav.getStarted}
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <Motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 text-[var(--text-secondary)]"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Motion.button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <Motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-2 mx-6 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-2"
                                    whileHover={{ x: 10 }}
                                >
                                    {t.nav[link.name]}
                                </Motion.a>
                            ))}
                            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
                                <button
                                    onClick={toggleLocale}
                                    className="p-2 rounded-full glass text-[var(--text-secondary)]"
                                >
                                    <Globe className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full glass text-[var(--text-secondary)]"
                                >
                                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                                <Button href="#pricing" size="sm" className="flex-1">
                                    {t.nav.getStarted}
                                </Button>
                            </div>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </Motion.header>
    )
}
