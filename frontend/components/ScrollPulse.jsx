import { useEffect } from 'react';

/**
 * Global scroll-driven pulse animator.
 *
 * Listens to window scroll. Every time the user scrolls (up or down),
 * it adds a brief CSS pulse animation to every [data-scroll-pulse] element
 * currently visible in the viewport.
 *
 * Throttled to every ~450ms so the animation has time to complete before
 * being re-triggered. Uses only `filter` so it doesn't fight inline transforms.
 *
 * Mount once at the app root.
 */
export default function ScrollPulse() {
  useEffect(() => {
    let lastFire = 0;
    let endTimer = 0;

    const pulseVisible = () => {
      const vh = window.innerHeight;
      const els = document.querySelectorAll('[data-scroll-pulse]');
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        // Within viewport (with small margin)
        if (r.top < vh - 30 && r.bottom > 30) {
          el.classList.remove('a12-scroll-pulse');
          // Force reflow so re-adding the class restarts the animation
          void el.offsetWidth;
          el.classList.add('a12-scroll-pulse');
        }
      });
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastFire > 450) {
        lastFire = now;
        pulseVisible();
      }
      // Also fire one more time shortly after scrolling stops, so the
      // last element in view still pulses cleanly.
      clearTimeout(endTimer);
      endTimer = setTimeout(pulseVisible, 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(endTimer);
    };
  }, []);

  return null;
}
