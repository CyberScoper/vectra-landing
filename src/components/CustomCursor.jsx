import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Optimization: Use MotionValues for high-frequency position updates
    // to bypass React re-renders on every mousemove.
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the cursor
    const cursorXSpring = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 })
    const cursorYSpring = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 })

    const ringXSpring = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.8 })
    const ringYSpring = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.8 })

    // Adjust for cursor dimensions to center it
    const cursorX = useTransform(cursorXSpring, (latest) => latest - 6)
    const cursorY = useTransform(cursorYSpring, (latest) => latest - 6)
    const ringX = useTransform(ringXSpring, (latest) => latest - 20)
    const ringY = useTransform(ringYSpring, (latest) => latest - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Optimization: Update MotionValues directly
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        // Optimization: Move expensive DOM checks to mouseover (fires less frequently than mousemove)
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
        // Delegate mouseover for interactive element detection
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
                    x: cursorX,
                    y: cursorY,
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
