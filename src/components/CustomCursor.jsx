import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring configuration for the dot (matches original transition)
    const dotSpringConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const dotXSpring = useSpring(mouseX, dotSpringConfig)
    const dotYSpring = useSpring(mouseY, dotSpringConfig)

    // Transform to center the dot (6px offset)
    const dotX = useTransform(dotXSpring, x => x - 6)
    const dotY = useTransform(dotYSpring, y => y - 6)

    // Spring configuration for the ring (matches original transition)
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }
    const ringXSpring = useSpring(mouseX, ringSpringConfig)
    const ringYSpring = useSpring(mouseY, ringSpringConfig)

    // Transform to center the ring (20px offset)
    const ringX = useTransform(ringXSpring, x => x - 20)
    const ringY = useTransform(ringYSpring, y => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - no re-render
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            const target = e.target
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
