# Nova Calculator — Base44 dev environment

## What this is
A static single-page PWA ("Nova Calculator V3"): `index.html` + `manifest.json` + `sw.js` + two icon PNGs. No build step, no backend, no dependencies, no external services.

## Running it
`docker compose -f docker-compose.base44.yml up -d` — serves the static files with `nginx:alpine` on host port 3000, bind-mounted read-only from the repo root.

## Editing
There is no live-reload dev server (static files via nginx). Edits to `index.html`/`sw.js`/`manifest.json` appear on a hard refresh — call `reload_preview` after changes so the preview reflects them. The service worker (`sw.js`) caches assets, so a stale cache can mask edits; a hard refresh / clearing the preview cache may be needed.

## Verification
`curl -sI http://localhost:3000/` → 200, and `curl -s http://localhost:3000/ | head` shows the Nova Calculator HTML.

## Secrets
None required — pure static frontend, no external services.
