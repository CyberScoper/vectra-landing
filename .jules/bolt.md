# Bolt's Journal

## 2024-05-22 - Performance & Linting Insights
**Learning:** `window.getComputedStyle` inside `mousemove` events causes layout thrashing and significant CPU usage. Also, the project's ESLint config flags lowercase `motion` components as unused.
**Action:** Gate expensive DOM checks by checking if `e.target` has changed. Capitalize Framer Motion imports (e.g., `import { motion as Motion }`) to satisfy linter.

**Learning:** `useMotionValue` coupled with `style` props avoids React re-renders for high-frequency updates, but conflicts with CSS `transform: translate(-50%, -50%)`.
**Action:** Use negative margins (e.g., `marginLeft: -6`) to center elements positioned via `useMotionValue`.
