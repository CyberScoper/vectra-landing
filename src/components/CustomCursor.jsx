import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Spring configs
    const dotSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    const dotX = useSpring(cursorX, dotSpringConfig)
    const dotY = useSpring(cursorY, dotSpringConfig)
    const ringX = useSpring(cursorX, ringSpringConfig)
    const ringY = useSpring(cursorY, ringSpringConfig)

    const dotScale = useMotionValue(1)
    const ringScale = useMotionValue(1)
    const opacity = useMotionValue(0) // Start hidden

    const ringOpacity = useTransform(opacity, [0, 1], [0, 0.5])

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const target = e.target
            // Optimized check: cheap properties first
            let isClickable = target.tagName === 'A' || target.tagName === 'BUTTON'

            if (!isClickable) {
                const parent = target.closest('a, button')
                if (parent) isClickable = true
            }

            // Only check computed style if strictly necessary and not already found
            if (!isClickable) {
                const style = window.getComputedStyle(target)
                if (style && style.cursor === 'pointer') isClickable = true
            }

            ringScale.set(isClickable ? 1.5 : 1)

            // Ensure visible on move
            if (opacity.get() === 0) opacity.set(1)
        }

        const handleMouseLeave = () => opacity.set(0)
        const handleMouseEnter = () => opacity.set(1)
        const handleMouseDown = () => dotScale.set(0.8)
        const handleMouseUp = () => dotScale.set(1)

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [cursorX, cursorY, ringScale, opacity, dotScale])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[9999] mix-blend-difference -ml-[6px] -mt-[6px]"
                style={{
                    x: dotX,
                    y: dotY,
                    scale: dotScale,
                    opacity: opacity,
                }}
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[var(--accent-primary)]/50 pointer-events-none z-[9998] -ml-[20px] -mt-[20px]"
                style={{
                    x: ringX,
                    y: ringY,
                    scale: ringScale,
                    opacity: ringOpacity,
                }}
            />
        </>
    )
}
