## 2024-03-24 - Custom Cursor Optimization
**Learning:** React `useState` in `mousemove` event listeners causes excessive re-renders (one per frame), significantly impacting performance even if the component is small.
**Action:** Use `framer-motion`'s `useMotionValue` and `useSpring` to bypass React's render cycle for high-frequency updates like cursor position.
