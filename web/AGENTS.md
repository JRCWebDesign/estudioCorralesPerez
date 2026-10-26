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
- Fixed WhatsApp brand icon uses Font Awesome at 33 px inside a discreet 54 px button. Until the public number is confirmed, link to the internal Contacto section.
- Logo and unconfirmed content remain provisional. Do not invent credentials, contact details, testimonials or specialties.

- Initial presentation and Contactar fade in from the left after the letters; respect reduced motion.

- The fixed WhatsApp shortcut uses the familiar green background (#25D366), white brand icon and a subtle green halo, matching the supplied reference. Keep the 54 px button and 33 px icon.

- WhatsApp has a soft expanding and fading green halo (two staggered pulses). The icon and button stay still; disable the pulse for reduced motion.

- Public contact details and social URLs must come from src/config/contacto.js. Never hardcode them in components or reuse the private phone from chat. Blank fields mean pending data. The floating WhatsApp shortcut falls back to #contacto until its number is configured.

- Client content (October 2026): organize services into Áreas jurídicas, Servicios notariales and Gestiones. Expose each legal specialty separately; property administration belongs within notarial services. Public professional phone contacts are supplied in src/config/contacto.js; no WhatsApp number has been explicitly designated.

- Contact cards include a WhatsApp action for each professional using their supplied public number, and share the service cards hover lift, background and shadow.

- Contact cards show the professional name and WhatsApp button only; do not display phone numbers.

- Reduce the continuous navy background with warm cream and paper sections for the study, legal specialties, procedures and contact; retain navy in the hero, overview cards, notarial section and footer. Footer includes the JRC Web design/development credit linking to https://www.jrcweb.tech/.

- User rejected white backgrounds and found Bodoni headings hard to read on light surfaces. Use distinctly warm sand/taupe surfaces instead of white or near-white, and Georgia headings with stronger strokes. Preserve the original hero PNG lettering.

- Latest feedback supersedes light/cream/sand backgrounds: use navy throughout, with one gold contact block and navy text. Reduce copy to short summaries; legal specialties display in a compact grid with no dropdowns and no duplicated specialty navigation. Notarial and procedures lists are grouped and shortened.

- Latest correction: user rejected the yellow/gold contact background. Keep the original navy/gold design, compact copy and subtle existing motion; only Contacto uses a white background, navy text and restrained white cards. Avoid further broad redesigns or palette experiments.

- Footer follows the existing Elodie Bentancor / Valentín Adán sites: compact study information, inline © year · Diseño y desarrollo · JRC credit, and Volver al inicio link. Keep the navy theme and stack cleanly on mobile.


- User deferred the Tribunales photo experiment: keep original desktop 5.png/4.png and original mobile photo/cutout. Publish content/contact/footer updates only; do not publish generated trial assets.
