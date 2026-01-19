import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    // Optimization: Use MotionValues instead of State to avoid re-renders on every mousemove
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the cursor dot
    const smoothOptions = { damping: 28, stiffness: 500, mass: 0.5 }
    const cursorX = useSpring(mouseX, smoothOptions)
    const cursorY = useSpring(mouseY, smoothOptions)

    // Smooth physics for the ring (slight lag)
    const ringOptions = { damping: 20, stiffness: 250, mass: 0.8 }
    const ringX = useSpring(mouseX, ringOptions)
    const ringY = useSpring(mouseY, ringOptions)

    // Transform values to center the elements
    // Dot is 12px (w-3) -> offset -6
    const cursorXDisplay = useTransform(cursorX, (x) => x - 6)
    const cursorYDisplay = useTransform(cursorY, (y) => y - 6)

    // Ring is 40px (w-10) -> offset -20
    const ringXDisplay = useTransform(ringX, (x) => x - 20)
    const ringYDisplay = useTransform(ringY, (y) => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly - NO React render triggered here
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
                    x: cursorXDisplay,
                    y: cursorYDisplay,
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
