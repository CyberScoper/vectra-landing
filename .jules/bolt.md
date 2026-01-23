## 2024-05-22 - Layout Thrashing in Event Listeners
**Learning:** `window.getComputedStyle` is extremely expensive inside `mousemove` handlers as it forces layout recalculation on every frame.
**Action:** Move element inspection logic to `mouseover` events which fire less frequently (only on element entry), or cache the computed style.
