# bubu.dev

## Project

- This is the shared personal website of married developers Lee Yujoo (frontend) and Park Hyungjun (backend).
- Keep the landing page focused on the two developers. Do not invent projects, professional claims, or future product features.
- Design this as an expressive personal homepage: readable large type, character-led composition, and conspicuous direct interaction. Avoid corporate portfolio sections, numbered presentation panels, tiny monospaced labels, and generic artifact-style layouts.
- Keep copy factual: names, development roles, contacts, and direct action labels. Do not add sentimental slogans, cute welcome messages, invented first-person lines, or generic AI-style personal-brand copy.
- Present each person's name, role, and contact once. Keep the site descriptor with the title instead of as a detached label. Align typography and SVG icons; avoid handwriting fonts and decorative bent arrows. Keep contact text readable while graphics move.
- Preserve the rounded English display type. A complaint about handwriting, alignment, or repeated copy does not authorize removing playful typography, visual richness, or expressive composition. Use large overlapping forms and deliberate asymmetry instead of parking small objects in a rectangular grid.
- Interactions should connect the two people, lettering, and contact actions into one responsive composition. Do not present arbitrary dragging or a shake button as the main experience. Keep the site lively and cute without explanatory interaction slogans.
- Current copy: `우리는 부부개발자!` with roles `Frontend` and `Backend`. Keep the cream page background; use white for portrait outlines and mail-icon surfaces. Keep the first `b` legible around Yujoo's portrait and the rounded lettering dimensional with highlights, without strokes that expose overlapping glyph contours. Keep `bubu` tightly spaced and visually prominent on mobile. The 3D ribbon must remain smoothly curved and exit the viewport without exposed cut ends.
- In portrait mobile layouts, center the large wordmark in the first viewport and place the people after a generous gap, around the fold. Use a rounded dimensional down-arrow near the viewport bottom with comfortable bottom space to indicate more content; it links to the people and scrolls with the page rather than remaining fixed. Preserve the landscape composition and prevent contact text from colliding with the next portrait or the ribbon.
- Keep the 3D heart tip short and rounded, with a continuous outline and bevel. Avoid a mathematical cusp that creates a long protruding point or a visibly cut edge when extruded.
- The original wedding invitation is preserved on `archive/wedding-invitation` at `9cb123bb20667dd76197b0feeda2159dfb544cff`.

## Git identity

- For every future commit in this repository, use `lee yujoo <mail@leeyujoo.com>` as the author and committer identity.
- Verify the repository-local `user.name` and `user.email` before an authorized commit. Do not change global Git identity.
- Commit or push only when explicitly requested.

## Development

- Use React, TypeScript, Vite, and the existing Yarn lockfile.
- Run `yarn build` for production and type validation.
- Verify visual changes in a rendered browser at desktop and mobile widths.
- Keep the 3D experience optional: preserve a useful static fallback and honor reduced motion and the page's motion toggle.
- Public contact addresses are `mail@leeyujoo.com` and `kong8715@gmail.com`.
