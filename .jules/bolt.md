# Bolt's Journal ⚡

## 2024-05-22 - High-Frequency Event Listeners
**Learning:** High-frequency events like `mousemove` or `scroll` should NEVER trigger React state updates directly. This causes a re-render on every frame (or more), which is a massive performance bottleneck.
**Action:** Use `framer-motion`'s `useMotionValue` and `useSpring` to animate values outside the React render cycle. Bind event listeners to update these values directly.
