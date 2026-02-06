## 2025-02-18 - [Optimizing High-Frequency Mouse Events]
**Learning:** High-frequency events like `mousemove` can cause significant performance degradation if they trigger React re-renders or perform expensive DOM queries (like `getComputedStyle`).
**Action:** Use `framer-motion`'s `useMotionValue` to update positions directly via the `style` prop, bypassing the React render cycle. For necessary DOM checks (like checking if an element is clickable), only run them when `e.target` changes, not on every event.
