import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Use MotionValues for high-performance updates without React re-renders
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth springs for the main dot (faster)
    const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 })
    const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 })

    // Smooth springs for the ring (slower)
    const ringX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.8 })
    const ringY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.8 })

    // Transform raw coordinates to centered position
    const dotXPos = useTransform(dotX, (x) => x - 6)
    const dotYPos = useTransform(dotY, (y) => y - 6)
    const ringXPos = useTransform(ringX, (x) => x - 20)
    const ringYPos = useTransform(ringY, (y) => y - 20)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no React re-render
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleMouseOver = (e) => {
            // Check for interactive elements only when crossing element boundaries
            // This avoids expensive DOM checks on every pixel move
            const target = e.target
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsPointer(!!isClickable)
        }

        const handleMouseLeave = () => setIsHidden(true)
        const handleMouseEnter = () => setIsHidden(false)
        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
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
                    x: dotXPos,
                    y: dotYPos,
                }}
                animate={{
                    scale: isClicking ? 0.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{
                    // Only transition scale/opacity here, position is handled by springs
                    scale: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
                    opacity: { duration: 0.2 }
                }}
            />

            {/* Outer ring */}
            <Motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[var(--accent-primary)]/50 pointer-events-none z-[9998]"
                style={{
                    x: ringXPos,
                    y: ringYPos,
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
