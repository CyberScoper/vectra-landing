## 2024-05-23 - CustomCursor Performance and Linting
**Learning:** High-frequency event listeners like `mousemove` combined with expensive DOM queries (`getComputedStyle`) cause significant layout thrashing and frame drops. Optimizing these by moving checks to `mouseover` and using `framer-motion`'s `useMotionValue` bypasses React's render cycle for smooth 60fps animations.
**Action:** Always avoid `getComputedStyle` in `mousemove` or `scroll` handlers. Use `useMotionValue` for direct DOM updates.
