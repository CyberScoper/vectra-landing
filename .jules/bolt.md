# Bolt's Journal ⚡

## 2024-05-23 - Custom Cursor Performance
**Learning:** Checking `getComputedStyle` and traversing the DOM on every `mousemove` event is a major performance bottleneck, causing significant main-thread blocking.
**Action:** Use `framer-motion`'s `useMotionValue` for position updates to bypass React re-renders, and optimize hover detection to only run expensive checks when `event.target` actually changes.
