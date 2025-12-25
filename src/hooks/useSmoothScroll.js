import { useEffect } from 'react'

export function useSmoothScroll() {
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('a[href^="#"]')
            if (!target) return

            e.preventDefault()
            const id = target.getAttribute('href').slice(1)
            const element = document.getElementById(id)

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])
}
