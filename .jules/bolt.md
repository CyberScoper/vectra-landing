## 2025-02-18 - [CustomCursor Performance]
**Learning:** `getComputedStyle` inside high-frequency event listeners (like `mousemove`) causes layout thrashing (forced reflows) on every frame.
**Action:** Move style checks to lower-frequency events like `mouseover`, or cache the result.

## 2025-02-18 - [ESLint & Framer Motion]
**Learning:** The project's ESLint configuration flags lowercase JSX components (e.g., `<motion.div>`) as unused variables.
**Action:** Use capitalized imports (`import { motion as Motion }`) and usage (`<Motion.div>`) to satisfy the linter.
