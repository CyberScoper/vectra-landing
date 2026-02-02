import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    // Use MotionValues for position to avoid re-renders on mousemove
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Spring configs
    const dotSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    const dotX = useSpring(mouseX, dotSpringConfig)
    const dotY = useSpring(mouseY, dotSpringConfig)
    const ringX = useSpring(mouseX, ringSpringConfig)
    const ringY = useSpring(mouseY, ringSpringConfig)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Ref to store last target to avoid expensive DOM checks
    const lastTargetRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no re-render
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            const target = e.target
            // Only re-calculate if target changes to avoid expensive operations
            if (target !== lastTargetRef.current) {
                lastTargetRef.current = target

                const isClickable =
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    (target instanceof Element && window.getComputedStyle(target).cursor === 'pointer')

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
                    x: dotX,
                    y: dotY,
                    marginLeft: -6,
                    marginTop: -6,
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
                    x: ringX,
                    y: ringY,
                    marginLeft: -20,
                    marginTop: -20,
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
