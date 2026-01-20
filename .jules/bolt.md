## 2025-05-21 - [Custom Cursor & Linting Quirk]
**Learning:**
1.  **Linting Quirk:** The ESLint configuration flags lowercase JSX components (e.g., `<motion.div>`) as unused variables. To fix this, imports must be capitalized (e.g., `import { motion as Motion }`) and used as `<Motion.div>`.
2.  **Performance Bottleneck:** The `CustomCursor` component was using `useState` to track mouse coordinates, causing a React re-render on every `mousemove` event. This is a significant performance drain.

**Action:**
1.  Always alias `motion` imports to `Motion` (or similar Capitalized name) in this codebase.
2.  Use `useMotionValue` and `useSpring` (or direct DOM manipulation) for high-frequency updates like cursor tracking or scroll progress, bypassing the React render cycle.
