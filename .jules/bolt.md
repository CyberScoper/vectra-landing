## 2024-05-23 - High-frequency event listeners causing layout thrashing
**Learning:** The `CustomCursor` component was combining React state updates on `mousemove` with `window.getComputedStyle`. This caused forced reflows (layout thrashing) on every frame, significantly impacting main thread performance during interaction.
**Action:** Move high-frequency updates (cursor, scroll) to `useMotionValue` or direct DOM manipulation. Avoid `getComputedStyle` in `mousemove`; use delegated `mouseover` or CSS classes instead.
