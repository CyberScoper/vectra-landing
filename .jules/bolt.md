## 2024-03-24 - Cursor Performance Bottleneck
**Learning:** React state updates (`useState`) inside high-frequency event listeners like `mousemove` cause massive re-render overhead. Each mouse movement triggers a full React reconciliation cycle for the component.
**Action:** Use `framer-motion`'s `useMotionValue` and `useTransform` for continuous values (like cursor position or scroll progress). This bypasses the React render loop and updates the DOM directly via the animation library, resulting in 60fps performance without main thread blocking.
