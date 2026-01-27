import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Use motion values for position to avoid re-renders
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Spring configurations matching original transition settings
    const springConfigDot = { stiffness: 500, damping: 28, mass: 0.5 }
    const springConfigRing = { stiffness: 250, damping: 20, mass: 0.8 }

    // Create springs for smooth movement
    const dotX = useSpring(mouseX, springConfigDot)
    const dotY = useSpring(mouseY, springConfigDot)
    const ringX = useSpring(mouseX, springConfigRing)
    const ringY = useSpring(mouseY, springConfigRing)

    // Apply offsets for centering (dot: -6px, ring: -20px)
    const dotXDisplay = useTransform(dotX, (x) => x - 6)
    const dotYDisplay = useTransform(dotY, (y) => y - 6)
    const ringXDisplay = useTransform(ringX, (x) => x - 20)
    const ringYDisplay = useTransform(ringY, (y) => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Track last target to optimize expensive checks
    const lastTargetRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no re-render
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            // Optimization: Only check computed style if target changes
            if (e.target !== lastTargetRef.current) {
                lastTargetRef.current = e.target
                const target = e.target

                const isClickable =
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    window.getComputedStyle(target).cursor === 'pointer'

                setIsPointer(Boolean(isClickable))
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
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
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
                    type: 'spring',
                    stiffness: 250,
                    damping: 20,
                    mass: 0.8,
                }}
            />
        </>
    )
}
