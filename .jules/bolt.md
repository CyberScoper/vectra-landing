# Bolt's Journal

## 2024-05-24 - Initial Setup
**Learning:** Initializing the journal for tracking critical performance insights.
**Action:** Use this file to document only critical learnings as per instructions.

## 2024-05-24 - Framer Motion Transform Conflicts
**Learning:** When using `useMotionValue` mapped to `x` and `y` props in Framer Motion, applying `transform: translate(-50%, -50%)` via CSS or style prop causes a conflict, leading to incorrect positioning (the `transform` string is overwritten by the library).
**Action:** Use negative margins (e.g., `marginLeft: -width/2`) for centering elements controlled by Framer Motion's `x`/`y` values instead of CSS transforms.
