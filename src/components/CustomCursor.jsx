import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Motion values for raw cursor position
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Spring configurations matching original physics
    const dotSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    // Smooth values derived from cursor position
    const dotX = useSpring(cursorX, dotSpringConfig)
    const dotY = useSpring(cursorY, dotSpringConfig)
    const ringX = useSpring(cursorX, ringSpringConfig)
    const ringY = useSpring(cursorY, ringSpringConfig)

    // Apply offsets for centering (dot: -6px, ring: -20px)
    const dotXDisplay = useTransform(dotX, x => x - 6)
    const dotYDisplay = useTransform(dotY, y => y - 6)
    const ringXDisplay = useTransform(ringX, x => x - 20)
    const ringYDisplay = useTransform(ringY, y => y - 20)

    const lastTarget = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly (no re-render)
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            // Optimize: Only check target if it changed
            // This prevents expensive getComputedStyle calls on every mouse movement frame
            if (e.target !== lastTarget.current) {
                lastTarget.current = e.target
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
    }, [cursorX, cursorY])

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
            />
        </>
    )
}
