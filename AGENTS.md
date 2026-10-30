# Frontend Design Rules

This repository is a static HTML/CSS/JavaScript portfolio using Bootstrap 5 and Bootstrap Icons. Preserve that architecture unless a task explicitly requires a change.

For every frontend or UI task:

1. Inspect the existing design system, brand assets, components, breakpoints, and global styles first.
2. Apply the guidance in `.codex/skills/frontend-design/SKILL.md`, `.codex/skills/ui-ux-pro-max/SKILL.md`, and `.codex/skills/impeccable/SKILL.md` when relevant.
3. Reuse existing markup patterns and Bootstrap utilities before creating new abstractions.
4. Maintain the existing brand identity and avoid redesigning unrelated sections.
5. Do not introduce unnecessary dependencies or replace Bootstrap.
6. Prefer semantic HTML, accessible names, visible focus, and good contrast.
7. Design responsively from 320px through 1440px+; check wrapping, overflow, and touch targets.
8. Avoid layout shifts and keep visual hierarchy consistent.
9. Use GSAP through `animations/gsap.js`; keep animation code reusable and clean up ScrollTrigger instances.
10. Respect `prefers-reduced-motion`; animation must never block access to content.
11. Prefer transform and opacity over layout or paint-heavy properties.
12. Test hover, focus, keyboard, mobile, tablet, and desktop states when changing UI.
13. Review the final implementation visually before considering the task complete.

## Existing frontend stack

- HTML5, CSS3, and browser JavaScript (no build step)
- Bootstrap 5.3 and Bootstrap Icons via CDN
- EmailJS via CDN for the contact form
- GSAP 3.12 and ScrollTrigger via CDN, exposed through `animations/gsap.js`

## Design workflow

Read the relevant local skill before implementing a frontend change. Keep content and business logic in `index.html`/`script.js`, keep visual tokens and responsive rules in `styles.css`, and use the animation module for shared motion behavior.

## Portfolio visual direction (2026 refresh)

The portfolio now uses an editorial software-engineering aesthetic: deep navy hero/contact areas, warm off-white content surfaces, a restrained forest-green secondary accent, and a lime highlight used sparingly for primary emphasis. Preserve this direction rather than introducing unrelated purple gradients, glass-heavy cards, or generic SaaS landing-page patterns.

When extending the portfolio:

- Use the green/lime brand system consistently. Do not reintroduce blue, cyan, purple, or unrelated accent colors unless a task explicitly requires them.
- Use forest green for secondary labels, icons, metadata, focus states, and subtle interaction feedback. Use lime for primary CTAs and high-value emphasis.
- Treat project work as case studies, not a uniform card gallery.
- Prefer strong typography, deliberate whitespace, screenshots, and information hierarchy over decoration.
- Keep motion restrained: entrance sequencing, grouped reveal, subtle screenshot depth, and meaningful hover feedback.
- Avoid typing animations, exaggerated cursor effects, dramatic 3D tilts, and continuous background motion.
- Keep the hero message outcome-oriented and engineering-specific.
- Maintain the bento-style selected-work hierarchy and the linear experience story.
- Add new visual rules in `portfolio-upgrade.css` unless refactoring the legacy stylesheet intentionally.
