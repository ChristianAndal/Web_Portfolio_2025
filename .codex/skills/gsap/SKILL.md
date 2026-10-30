---
name: gsap
description: Implement maintainable GSAP and ScrollTrigger motion for this static portfolio with reduced-motion support and lifecycle-safe cleanup.
---

# GSAP workflow

Use `animations/gsap.js` as the shared entry point. It exposes `window.PortfolioAnimations` with reusable `fadeUp`, `fadeIn`, `staggerReveal`, `imageReveal`, `sectionReveal`, and `slideIn` helpers plus `init` and `destroy` lifecycle methods.

Register ScrollTrigger once. Prefer transform and opacity, keep typical durations between 0.4s and 1s, use `power2.out`/`power3.out`, and avoid animating every element. Guard initialization when GSAP is unavailable and honor `prefers-reduced-motion`; reduced-motion users should see content immediately. Clean up contexts and triggers when the page or component lifecycle ends.
