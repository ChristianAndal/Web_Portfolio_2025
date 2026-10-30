(function (window) {
    'use strict';

    const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = () => Boolean(window.gsap);

    function reveal(targets, options = {}) {
        if (!hasGsap() || reduceMotion()) return null;
        return window.gsap.from(targets, {
            autoAlpha: 0,
            y: options.y ?? 26,
            duration: options.duration ?? 0.72,
            ease: options.ease ?? 'power3.out',
            stagger: options.stagger ?? 0,
            scrollTrigger: options.scrollTrigger
        });
    }

    function fadeUp(targets, options = {}) { return reveal(targets, options); }

    function fadeIn(targets, options = {}) {
        if (!hasGsap() || reduceMotion()) return null;
        return window.gsap.from(targets, {
            autoAlpha: 0,
            duration: options.duration ?? 0.68,
            ease: options.ease ?? 'power2.out',
            stagger: options.stagger ?? 0,
            scrollTrigger: options.scrollTrigger
        });
    }

    function staggerReveal(targets, options = {}) {
        return reveal(targets, { ...options, stagger: options.stagger ?? 0.08 });
    }

    function imageReveal(targets, options = {}) {
        if (!hasGsap() || reduceMotion()) return null;
        return window.gsap.from(targets, {
            autoAlpha: 0,
            scale: options.scale ?? 1.035,
            y: options.y ?? 18,
            duration: options.duration ?? 0.95,
            ease: options.ease ?? 'power3.out',
            scrollTrigger: options.scrollTrigger
        });
    }

    function sectionReveal(section, options = {}) {
        if (!section) return null;
        return reveal(section, {
            ...options,
            scrollTrigger: options.scrollTrigger ?? {
                trigger: section,
                start: 'top 84%',
                once: true
            }
        });
    }

    function slideIn(targets, options = {}) {
        if (!hasGsap() || reduceMotion()) return null;
        return window.gsap.from(targets, {
            autoAlpha: 0,
            x: options.x ?? 26,
            duration: options.duration ?? 0.72,
            ease: options.ease ?? 'power3.out',
            stagger: options.stagger ?? 0,
            scrollTrigger: options.scrollTrigger
        });
    }

    function init(scope) {
        if (!hasGsap()) return null;
        if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);

        const ctx = window.gsap.context(() => {
            if (reduceMotion()) {
                window.gsap.set('[data-motion], .hero-content, .hero-visual, .project-card, .experience-content, .award-card', {
                    clearProps: 'all'
                });
                return;
            }

            const heroTimeline = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
            heroTimeline
                .from('.hero-kicker', { autoAlpha: 0, y: 12, duration: 0.42 })
                .from('.availability-pill', { autoAlpha: 0, y: 10, duration: 0.35 }, '-=0.22')
                .from('.hero-name', { autoAlpha: 0, y: 16, duration: 0.45 }, '-=0.12')
                .from('.hero-statement', { autoAlpha: 0, y: 34, duration: 0.82 }, '-=0.22')
                .from('.hero-summary', { autoAlpha: 0, y: 20, duration: 0.58 }, '-=0.42')
                .from('.hero-buttons .btn', { autoAlpha: 0, y: 14, duration: 0.48, stagger: 0.07 }, '-=0.3')
                .from('.hero-capabilities > div', { autoAlpha: 0, y: 12, duration: 0.42, stagger: 0.07 }, '-=0.24')
                .from('.hero-visual', { autoAlpha: 0, x: 26, scale: 0.985, duration: 0.78 }, '-=0.82')
                .from('.floating-chip', { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.09 }, '-=0.36');

            // Section heading system.
            document.querySelectorAll('section[id]:not(#home)').forEach((section) => {
                const intro = section.querySelectorAll('.eyebrow, .section-title, .title-underline, .section-intro');
                if (!intro.length) return;
                reveal(intro, {
                    y: 20,
                    stagger: 0.075,
                    duration: 0.58,
                    scrollTrigger: { trigger: section, start: 'top 82%', once: true }
                });
            });

            // About image/content: small directional contrast gives the section structure.
            imageReveal('#about .about-image', {
                scrollTrigger: { trigger: '#about .about-image', start: 'top 82%', once: true }
            });
            reveal('#about .col-lg-6:last-child > *', {
                y: 18,
                stagger: 0.055,
                duration: 0.52,
                scrollTrigger: { trigger: '#about .col-lg-6:last-child', start: 'top 80%', once: true }
            });

            // Project cards enter as a system instead of each card running its own animation.
            reveal('#projects .project-card', {
                y: 30,
                stagger: 0.085,
                duration: 0.68,
                scrollTrigger: { trigger: '#projects .row.g-4', start: 'top 80%', once: true }
            });

            // Experience sequence keeps long content readable while giving progression.
            document.querySelectorAll('#experience .experience-content').forEach((card) => {
                reveal(card, {
                    y: 22,
                    duration: 0.62,
                    scrollTrigger: { trigger: card, start: 'top 86%', once: true }
                });
            });

            reveal('#education .timeline-item', {
                y: 22,
                stagger: 0.09,
                duration: 0.58,
                scrollTrigger: { trigger: '#education .timeline', start: 'top 84%', once: true }
            });

            reveal('#awards .award-card', {
                y: 22,
                stagger: 0.075,
                duration: 0.58,
                scrollTrigger: { trigger: '#awards .row.g-4', start: 'top 82%', once: true }
            });

            reveal('#contact .contact-info', {
                y: 18,
                stagger: 0.07,
                duration: 0.5,
                scrollTrigger: { trigger: '#contact .contact-info', start: 'top 88%', once: true }
            });
            reveal('#contact .contact-form', {
                y: 24,
                duration: 0.68,
                scrollTrigger: { trigger: '#contact .contact-form', start: 'top 85%', once: true }
            });

            // Restrained desktop-only depth. No scroll-linked movement on touch/small screens.
            if (window.matchMedia('(min-width: 992px)').matches && window.ScrollTrigger) {
                window.gsap.to('.hero-image img', {
                    yPercent: 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.6
                    }
                });
            }
        }, scope || document);

        return ctx;
    }

    function destroy(context) {
        if (context && typeof context.revert === 'function') context.revert();
    }

    window.PortfolioAnimations = {
        fadeUp,
        fadeIn,
        staggerReveal,
        imageReveal,
        sectionReveal,
        slideIn,
        init,
        destroy,
        prefersReducedMotion: reduceMotion
    };

    document.addEventListener('DOMContentLoaded', () => init(document));
})(window);
