# Portfolio 2026 Upgrade

This refresh keeps the existing static Bootstrap architecture and project data while improving the visual hierarchy, motion system, accessibility, and responsive presentation.

## Major changes

- Rebuilt the hero into an editorial full-stack engineering introduction with a framed portrait, clear CTAs, and capability summary.
- Reorganized selected projects into a responsive bento-style case-study grid.
- Refined About, Experience, Education, Awards, Contact, modal, navigation, and footer presentation.
- Unified the former blue accent system into a professional forest-green + lime brand palette across Awards, Projects, Experience, Education, forms, focus states, and modal UI.
- Reworked award cards with pale-green icon treatments, stronger hierarchy, softer shadows, and a restrained green date treatment.
- Replaced typing/manual parallax effects with a consistent GSAP + ScrollTrigger reveal system.
- Added reduced-motion support and keyboard activation for project cards.
- Hidden unavailable project/GitHub modal actions instead of showing dead `#` links.
- Added metadata/description polish and lazy/async project screenshot loading.
- Preserved EmailJS configuration placeholders and existing business logic.

## Main upgrade files

- `portfolio-upgrade.css` — the new visual layer loaded after the legacy stylesheet.
- `animations/gsap.js` — revised shared animation system.
- `index.html` — updated hero/section hierarchy and project interaction markup.
- `script.js` — interaction cleanup and keyboard/dead-link fixes.
- `AGENTS.md` — updated Codex direction for future frontend work.

## Before publishing

Configure the EmailJS keys in `script.js` if the contact form should send mail, and replace any project links currently set to `#` with real URLs when they become public.

## October 2026 — Vicinity Project Added
- Added Vicinity as the lead featured project.
- Positioned it as a multi-tenant SaaS POS developed by GoVenture.
- Added Django/Python, PostgreSQL, and Vue.js stack details.
- Added real-time and hybrid database architecture highlights.
- Connected the existing Vicinity screenshots to the project case-study modal.
- Rebalanced the project bento grid for seven portfolio projects.

