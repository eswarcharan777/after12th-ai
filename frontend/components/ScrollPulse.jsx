import { useEffect } from 'react';

/**
 * Global scroll-driven pulse animator.
 *
 * On every scroll, pulses every visible card / glass / interactive element
 * with a bright violet/pink glow you can't miss. Throttled so animations
 * complete cleanly between scroll events.
 *
 * Mount once at the app root.
 */
const SELECTOR = [
  '.glass',
  '.glass-strong',
  '.card',
  '[data-scroll-pulse]',
  '.btn-primary',
  '.badge',
].join(', ');

export default function ScrollPulse() {
  useEffect(() => {
    let lastFire = 0;
    let endTimer = 0;
    let initialFired = false;

    const pulseVisible = () => {
      const vh = window.innerHeight;
      const els = document.querySelectorAll(SELECTOR);
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        // Within viewport (with margin so partial-visible still triggers)
        if (r.top < vh - 20 && r.bottom > 20 && r.height > 0) {
          el.classList.remove('a12-scroll-pulse');
          // Force reflow so re-adding the class restarts the animation
          void el.offsetWidth;
          el.classList.add('a12-scroll-pulse');
        }
      });
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastFire > 600) {
        lastFire = now;
        pulseVisible();
      }
      // Also fire once shortly after scrolling stops
      clearTimeout(endTimer);
      endTimer = setTimeout(pulseVisible, 250);
    };

    // Fire once shortly after mount so the user sees a pulse right away
    const initialTimer = setTimeout(() => {
      if (!initialFired) {
        initialFired = true;
        pulseVisible();
      }
    }, 1200);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(endTimer);
      clearTimeout(initialTimer);
    };
  }, []);

  return null;
}
