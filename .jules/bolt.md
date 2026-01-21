## 2026-01-21 - Scroll Performance & Re-renders
**Learning:** Native `window.addEventListener('scroll')` combined with React state causes massive re-render overhead on every scroll event.
**Action:** Use `framer-motion`'s `useScroll` and `useSpring` hooks for scroll-linked animations. This binds directly to the DOM via MotionValues, bypassing the React render loop entirely.
