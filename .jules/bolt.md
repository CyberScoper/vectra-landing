## 2024-05-22 - ESLint False Positives with Framer Motion
**Learning:** The project's ESLint configuration incorrectly flags lowercase JSX components (like `motion` from `framer-motion`) as unused variables.
**Action:** Always import as `import { motion as Motion } from 'framer-motion'` and use `<Motion.div>` to satisfy the linter.

## 2024-05-22 - High Frequency Event Performance
**Learning:** DOM queries like `getComputedStyle` inside `mousemove` handlers cause severe layout thrashing.
**Action:** Move expensive interaction checks to `mouseover` or `mouseenter` events and cache the result, or use `useMotionValue` to bypass React renders entirely.
