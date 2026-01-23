import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Optimization: Use motion values for position to avoid React re-renders on every mouse move
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Smooth physics-based movement using Framer Motion springs
    const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
    const ringSpringConfig = { stiffness: 250, damping: 20, mass: 0.8 }

    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    const ringXSpring = useSpring(cursorX, ringSpringConfig)
    const ringYSpring = useSpring(cursorY, ringSpringConfig)

    // Transformations for centering the cursor elements
    // Main dot is 12px (w-3), center is -6
    const dotX = useTransform(cursorXSpring, x => x - 6)
    const dotY = useTransform(cursorYSpring, y => y - 6)

    // Ring is 40px (w-10), center is -20
    const ringX = useTransform(ringXSpring, x => x - 20)
    const ringY = useTransform(ringYSpring, y => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        // Optimization: High frequency event only updates motion values, no React state updates
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        // Optimization: Expensive DOM checks moved to mouseover (fires only when entering elements)
        // This prevents getComputedStyle from causing layout thrashing on every pixel of movement
        const handleMouseOver = (e) => {
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
        window.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
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
