## 2024-05-23 - ESLint False Positives on Framer Motion
**Learning:** The project's ESLint configuration incorrectly flags lowercase component imports (like `motion` from `framer-motion`) as unused variables.
**Action:** Always alias lowercase imports to PascalCase (e.g., `import { motion as Motion }`) when working in this codebase to pass lint checks.

## 2024-05-23 - Custom Cursor Performance Bottleneck
**Learning:** The `CustomCursor` component was using `useState` to track mouse coordinates, causing a full React tree re-render on every pixel of mouse movement.
**Action:** Refactor high-frequency UI trackers to use `useMotionValue` and direct DOM manipulation (via `style` prop or Framer Motion) to bypass the render cycle.
