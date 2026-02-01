# Bolt's Journal
Critical learnings and performance insights.

## 2026-02-01 - [High-Frequency Event Optimization]
**Learning:** Using React state for `mousemove` events causes massive re-render overhead (60fps+). Framer Motion's `useMotionValue` + `useSpring` completely bypasses this.
**Action:** Always prefer `useMotionValue` for cursor/scroll trackers. Move expensive DOM checks (like `getComputedStyle`) from `mousemove` to `mouseover` to reduce layout thrashing.
