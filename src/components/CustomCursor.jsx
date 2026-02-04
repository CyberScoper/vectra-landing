import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfigDot = { stiffness: 500, damping: 28, mass: 0.5 }
    const springConfigRing = { stiffness: 250, damping: 20, mass: 0.8 }

    const cursorXSpringDot = useSpring(cursorX, springConfigDot)
    const cursorYSpringDot = useSpring(cursorY, springConfigDot)
    const cursorXSpringRing = useSpring(cursorX, springConfigRing)
    const cursorYSpringRing = useSpring(cursorY, springConfigRing)

    const dotX = useTransform(cursorXSpringDot, (x) => x - 6)
    const dotY = useTransform(cursorYSpringDot, (y) => y - 6)
    const ringX = useTransform(cursorXSpringRing, (x) => x - 20)
    const ringY = useTransform(cursorYSpringRing, (y) => y - 20)

    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const lastTargetRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const target = e.target
            if (target !== lastTargetRef.current) {
                lastTargetRef.current = target

                const isClickable =
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    window.getComputedStyle(target).cursor === 'pointer'

                setIsPointer(!!isClickable)
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
