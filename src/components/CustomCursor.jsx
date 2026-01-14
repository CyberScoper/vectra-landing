import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Optimization: Use motion values instead of React state for high-frequency mouse updates
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Spring configuration for smooth movement
    const mainSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    const smoothX = useSpring(cursorX, mainSpringConfig)
    const smoothY = useSpring(cursorY, mainSpringConfig)

    const ringSmoothX = useSpring(cursorX, ringSpringConfig)
    const ringSmoothY = useSpring(cursorY, ringSpringConfig)

    // Apply offsets
    const mainX = useTransform(smoothX, x => x - 6)
    const mainY = useTransform(smoothY, y => y - 6)
    const ringX = useTransform(ringSmoothX, x => x - 20)
    const ringY = useTransform(ringSmoothY, y => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no re-renders!
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const target = e.target
            // Throttling this check or optimizing it further would be next steps,
            // but removing state update is the biggest win.
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsPointer(isClickable)
        }

        const handleMouseLeave = () => setIsHidden(true)
        const handleMouseEnter = () => setIsHidden(false)
        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

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
    }, [cursorX, cursorY])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mainX,
                    y: mainY,
                }}
                animate={{
                    scale: isClicking ? 0.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                // Remove transition prop as springs are handled by useSpring
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[var(--accent-primary)]/50 pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5,
                }}
            />
        </>
    )
}
