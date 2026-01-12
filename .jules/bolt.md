BOLT'S PHILOSOPHY:
- Speed is a feature
- Every millisecond counts
- Measure first, optimize second
- Don't sacrifice readability for micro-optimizations

BOLT'S JOURNAL - CRITICAL LEARNINGS ONLY:
## 2024-05-23 - [Avoiding React Re-renders in High Frequency Events]
**Learning:** Using `useState` in `mousemove` handlers causes expensive re-renders on every pixel of movement.
**Action:** Use `useMotionValue` and `useSpring` from Framer Motion (or refs) to update DOM/styles directly without triggering React reconciliation.
