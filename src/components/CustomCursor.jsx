import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    // Bolt Optimization: Use MotionValues for position to avoid re-renders on every mouse move
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the dot
    const smoothOptions = { damping: 28, stiffness: 500, mass: 0.5 }
    const smoothX = useSpring(mouseX, smoothOptions)
    const smoothY = useSpring(mouseY, smoothOptions)

    // Smooth physics for the ring (slightly laggy follow)
    const ringOptions = { damping: 20, stiffness: 250, mass: 0.8 }
    const ringX = useSpring(mouseX, ringOptions)
    const ringY = useSpring(mouseY, ringOptions)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const lastTargetRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update MotionValues directly - this bypasses React render cycle
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)

            // Bolt Optimization: Only check expensive DOM properties when target changes
            // This prevents expensive getComputedStyle calls on every pixel of movement
            if (e.target !== lastTargetRef.current) {
                lastTargetRef.current = e.target
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
                    x: smoothX,
                    y: smoothY,
                    marginLeft: -6, // Center the 12px dot
                    marginTop: -6,
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
                    marginLeft: -20, // Center the 40px ring
                    marginTop: -20,
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5,
                }}
            />
        </>
    )
}
