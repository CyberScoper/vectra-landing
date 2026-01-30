## 2026-01-30 - Optimizing High-Frequency Mouse Events
**Learning:** High-frequency events like `mousemove` can cause significant performance bottlenecks if they trigger React state updates or expensive DOM queries (like `getComputedStyle`) on every frame.
**Action:** Use `framer-motion`'s `useMotionValue` and `useSpring` to bypass React re-renders for cursor tracking. Move expensive checks (like clickable target detection) to lower-frequency events like `mouseover` or check only when the target element changes.
