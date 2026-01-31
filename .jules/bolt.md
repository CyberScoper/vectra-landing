## 2026-01-31 - Custom Cursor Optimization
**Learning:** `mousemove` listeners triggered React re-renders and expensive `getComputedStyle` calls every frame, causing performance degradation.
**Action:** Use `framer-motion`'s `useMotionValue` and `useSpring` to update DOM directly via `style` prop, bypassing React renders. Cache `e.target` and only re-run expensive hover checks when the target element changes.
