# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

# Design decisions

- Provisional name: Estudio Corrales Perez. No ampersand.
- Use the client's original PNG lettering, preserving its shapes and colors.
- Animate only the two name layers. Background and building remain fixed.
- Mobile uses a dedicated portrait photo and aligned transparent building cutout. Keep the full name readable at 320 px and above.
- Desktop integrates header, name, provisional presentation and Contactar over the photo. Avoid a detached action strip below the hero.
- Fade the photograph into the page navy (#061B34). Use that same navy for Contactar.
- Mobile navigation is a compact translucent panel with serif links; close on selection, outside click or Escape.
- Fixed WhatsApp brand icon uses Font Awesome at 27 px inside a discreet 46 px button. Until the public number is confirmed, link to the internal Contacto section.
- Logo and unconfirmed content remain provisional. Do not invent credentials, contact details, testimonials or specialties.
