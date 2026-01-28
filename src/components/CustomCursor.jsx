import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Use motion values to bypass React render cycle for position updates
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Main cursor dot spring physics
    const springConfig = { damping: 28, stiffness: 500, mass: 0.5 }
    const dotX = useSpring(mouseX, springConfig)
    const dotY = useSpring(mouseY, springConfig)

    // Offset for dot (centered, width 12px -> -6)
    const dotXDisplay = useTransform(dotX, x => x - 6)
    const dotYDisplay = useTransform(dotY, y => y - 6)

    // Outer ring spring physics (slower follow)
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }
    const ringX = useSpring(mouseX, ringSpringConfig)
    const ringY = useSpring(mouseY, ringSpringConfig)

    // Offset for ring (width 40px -> -20)
    const ringXDisplay = useTransform(ringX, x => x - 20)
    const ringYDisplay = useTransform(ringY, y => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const prevTarget = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - NO RE-RENDER
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            // Optimize: Only check computed styles if target changes
            if (e.target !== prevTarget.current) {
                prevTarget.current = e.target
                const target = e.target

                const isClickable =
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    window.getComputedStyle(target).cursor === 'pointer'

                setIsPointer(isClickable)
            }
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
    }, [mouseX, mouseY])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <Motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: dotXDisplay,
                    y: dotYDisplay,
                }}
                animate={{
                    scale: isClicking ? 0.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                    opacity: { duration: 0.2 }
                }}
            />

            {/* Outer ring */}
            <Motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[var(--accent-primary)]/50 pointer-events-none z-[9998]"
                style={{
                    x: ringXDisplay,
                    y: ringYDisplay,
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5,
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 250, damping: 20, mass: 0.8 },
                    opacity: { duration: 0.2 }
                }}
            />
        </>
    )
}
