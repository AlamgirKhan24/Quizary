/* ==============================================
   QUIZARY — HOME PAGE ANIMATION
   GSAP entrance sequence, floating chips, animated
   stat counters, and scroll-reveal for card grids.
   Loaded after gsap.min.js + ScrollTrigger.min.js.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') return; // fail quietly if CDN is blocked
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // respect user preference, skip all animation

  /* ---------- Entrance timeline ---------- */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.sb-logo', { opacity: 0, scale: 0.6, duration: 0.5 })
    .from('.sb-icon', { opacity: 0, y: 10, stagger: 0.05, duration: 0.4 }, '-=0.25')
    .from('.top-bar', { opacity: 0, y: -14, duration: 0.5 }, '-=0.5')
    .from('.hero-title, .hero-role, .hero-desc', { opacity: 0, y: 18, stagger: 0.08, duration: 0.55 }, '-=0.25')
    .from('.hero-actions .btn', { opacity: 0, y: 14, stagger: 0.08, duration: 0.45 }, '-=0.3')
    .from('.social-row .icon-circle', { opacity: 0, y: 10, stagger: 0.05, duration: 0.35 }, '-=0.25')
    .from('.hero-illustration', { opacity: 0, scale: 0.9, duration: 0.6 }, '-=0.5')
    .from('.hero-badge', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
    .from(['.chip-code', '.chip-brain', '.chip-ai'], { opacity: 0, scale: 0.5, stagger: 0.08, duration: 0.4, ease: 'back.out(2)' }, '-=0.5')
    .from('.hero-side > *', { opacity: 0, x: 20, stagger: 0.1, duration: 0.5 }, '-=0.6');

  /* ---------- Ambient float loop on hero chips ---------- */
  gsap.to('.chip-code', { y: -8, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.chip-brain', { y: 9, duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
  gsap.to('.chip-ai', { y: -6, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 });

  /* ---------- Stat counters (25+, 3+, 15+, 98%) ---------- */
  document.querySelectorAll('.stat-row-num').forEach((el) => {
    const raw = el.textContent.trim();
    const value = parseInt(raw, 10);
    const suffix = raw.replace(/^[0-9]+/, ''); // "+" or "%"
    if (isNaN(value)) return;

    const counter = { n: 0 };
    el.textContent = '0' + suffix;
    gsap.to(counter, {
      n: value,
      duration: 1.4,
      delay: 0.6,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(counter.n) + suffix; }
    });
  });

  /* ---------- Scroll reveal: feature grid + bottom row ---------- */
  gsap.from('.feature-card', {
    scrollTrigger: hasScrollTrigger ? { trigger: '.feature-grid', start: 'top 85%' } : undefined,
    opacity: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.55,
    ease: 'power3.out'
  });

  gsap.from('.bottom-card', {
    scrollTrigger: hasScrollTrigger ? { trigger: '.bottom-grid', start: 'top 88%' } : undefined,
    opacity: 0,
    y: 24,
    stagger: 0.12,
    duration: 0.55,
    ease: 'power3.out'
  });

  gsap.from('.section-header', {
    scrollTrigger: hasScrollTrigger ? { trigger: '.section-header', start: 'top 90%' } : undefined,
    opacity: 0,
    x: -14,
    duration: 0.5
  });

});