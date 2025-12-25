import { motion } from 'framer-motion'

export default function Button({
    children,
    href,
    onClick,
    variant = 'primary',
    icon: Icon,
    size = 'md',
    className = ''
}) {
    const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-full 
    transition-all duration-300
    ${size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}
    ${size === 'lg' ? 'px-8 py-4 text-lg' : ''}
  `

    const variants = {
        primary: `
      bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
      text-white
      hover:shadow-lg hover:shadow-[var(--accent-primary)]/30
      hover:scale-105
    `,
        secondary: `
      glass
      text-[var(--text-primary)]
      hover:border-[var(--accent-primary)]/50
      hover:text-[var(--accent-primary)]
    `,
        ghost: `
      text-[var(--text-secondary)]
      hover:text-[var(--accent-primary)]
      hover:bg-[var(--bg-tertiary)]
    `
    }

    const classes = `${baseClasses} ${variants[variant]} ${className}`

    const content = (
        <>
            {children}
            {Icon && <Icon className="w-4 h-4" />}
        </>
    )

    if (href) {
        return (
            <motion.a
                href={href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={classes}
            >
                {content}
            </motion.a>
        )
    }

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={classes}
        >
            {content}
        </motion.button>
    )
}
