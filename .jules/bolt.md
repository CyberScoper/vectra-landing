## 2024-05-23 - High Frequency Updates in React
**Learning:** Using `useState` for high-frequency events like `mousemove` causes unnecessary re-renders and performance degradation.
**Action:** Use `useMotionValue` and `useTransform` from `framer-motion` (or Refs) to bypass the React render cycle for position updates.

## 2024-05-23 - DOM Layout Thrashing
**Learning:** calling `window.getComputedStyle(target)` inside a `mousemove` handler forces the browser to recalculate styles/layout on every frame, which is extremely expensive.
**Action:** Cache values or use lighter checks (like `tagName`). If necessary, move checks to less frequent events like `mouseover`.
