# KarmChakra Homepage

A Bootstrap 5 implementation of the KarmChakra homepage, redesigned to match
the visual quality and layout of the KarmChakra Lovable reference
(https://karma-guru-ai.lovable.app), while keeping the existing static
HTML/CSS/JS project structure and all original navigation/anchors intact.

## Files

- `index.html` — homepage: navbar, hero with interactive chakra wheel,
  "Seven Karmas" grid, "Collective Impact" stats, placeholder journey
  sections, footer.
- `karma.html` — reusable karma-detail template. Reads `?domain=<id>` from
  the URL and renders the matching karma's content. Linked from every
  hero wheel badge and every karma card.
- `style.css` — all visual styling and responsive layout.
- `script.js` — shared `KARMA_DOMAINS` / `COLLECTIVE_IMPACT` data plus all
  interactions: navbar scrollspy, the hero wheel's clickable orbit badges,
  the Seven Karmas grid, the Collective Impact stats, scroll-reveal
  animations, and the karma.html detail renderer.
- `assets/chakra-core.png` — cropped mandala artwork used as the hero's
  rotating centerpiece.

## What changed from the original

- **Hero chakra wheel is now interactive.** The mandala artwork spins
  continuously (pure CSS animation, clipped to a circle), while seven
  real, clickable badges — one per karma domain — sit in fixed positions
  around it. Each badge links to `karma.html?domain=<id>`, so "Prakriti
  Karma" opens a dedicated page for that karma, and so on for all seven.
  The center readout (Karma Mudrā total + level) is real HTML layered on
  top, so it never rotates and stays legible.
- **New "Seven Karmas" section** with seven real cards (icon, name,
  subtitle, sample action + Mudrā value), replacing the old placeholder
  text. Cards are also clickable through to `karma.html`.
- **New "Collective Impact" section** with the six community stats.
- Navbar, buttons, cards, spacing and typography were refined for a more
  premium, production feel (gradient headline, blended/scroll-aware
  navbar, consistent card system, scroll-reveal animations on every
  section).
- The Dashboard / Profile / Leaderboard / Karma Guru / Join sections are
  kept as on-page placeholder anchors, unchanged in spirit, since the
  brief was to redesign the homepage first.

## Run

Open `index.html` in a browser, or use VS Code's Live Server extension.
Because `karma.html` reads `?domain=` from the query string, opening it
directly (rather than clicking a link from the homepage) will just show
the first domain (Prakriti Karma) by default — that's expected.

## Notes

Bootstrap 5.3.3 and Google Fonts are loaded from their CDNs, so an
internet connection is required for those external resources.
