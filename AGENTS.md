# Nova Calculator — Base44 Dev Environment

## Stack
Vite + React 18 + Tailwind CSS 3 + Framer Motion. Single-page calculator, no backend, no secrets.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
App is served on host port 3000 (Vite dev server on container port 5173). Live reload is active — edits to `src/` appear immediately in the preview.

## Structure
- `src/lib/useCalculator.js` — calculator state logic (useReducer)
- `src/components/Calculator.jsx` — main calculator layout
- `src/components/CalcButton.jsx` — animated button (Framer Motion)
- `src/components/Display.jsx` — display screen

## Notes
- The repo originally contained a static `index.html` PWA (vanilla JS). It has been replaced with a Vite React app.
- `manifest.json`, `sw.js`, and `icon-*.png` are leftover from the old PWA and are not used.
