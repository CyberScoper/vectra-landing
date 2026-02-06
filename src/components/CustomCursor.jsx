import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Track the last target to avoid expensive DOM checks on every frame
    const lastTargetRef = useRef(null)

    // Springs for smooth movement
    const dotSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    const dotX = useSpring(mouseX, dotSpringConfig)
    const dotY = useSpring(mouseY, dotSpringConfig)
    const ringX = useSpring(mouseX, ringSpringConfig)
    const ringY = useSpring(mouseY, ringSpringConfig)

    // Transformers for centering
    const dotXPos = useTransform(dotX, (x) => x - 6)
    const dotYPos = useTransform(dotY, (y) => y - 6)
    const ringXPos = useTransform(ringX, (x) => x - 20)
    const ringYPos = useTransform(ringY, (y) => y - 20)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no React render
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            const target = e.target

            // Optimization: Only check DOM when target changes
            if (target !== lastTargetRef.current) {
                lastTargetRef.current = target

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

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
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
                    x: dotXPos,
                    y: dotYPos,
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
                    x: ringXPos,
                    y: ringYPos,
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5,
                }}
            />
        </>
    )
}
