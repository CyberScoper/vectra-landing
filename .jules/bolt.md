## 2024-05-23 - High-Frequency Event Optimization
**Learning:** Using `useState` in `mousemove` listeners triggers excessive re-renders (60fps+), causing performance degradation. `window.getComputedStyle` in these listeners causes layout thrashing.
**Action:** Use `framer-motion`'s `useMotionValue` and `useSpring` to update visual state directly via the `style` prop, bypassing the React render cycle. Avoid DOM queries in hot paths.
