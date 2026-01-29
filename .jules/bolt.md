## 2024-05-23 - [High-Frequency Event Optimization]
**Learning:** Using `useState` inside high-frequency event listeners (like `mousemove` or `scroll`) causes a React re-render on every frame, leading to significant performance degradation.
**Action:** Use `framer-motion`'s `useMotionValue` or `useSpring` to bypass the React render loop. Bind these values directly to the component's `style` prop. Also, cache expensive DOM queries (like `getComputedStyle`) and only re-calculate when necessary (e.g., when `e.target` changes).
