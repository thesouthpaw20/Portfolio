import { useEffect } from 'react';

/**
 * Observes every [data-reveal] element in the document and flips
 * data-revealed="true" the first time it crosses into view. Elements can carry
 * data-reveal-delay="120" to stagger within a group.
 *
 * `enabled` gates the whole thing — the app holds it false until the preloader
 * clears, so nothing gets marked "already seen" while it is behind the curtain.
 * Re-scans whenever `deps` change, picking up late-mounted sections.
 */
export function useReveal(enabled = true, deps = []) {
  useEffect(() => {
    if (!enabled) return undefined;

    const nodes = Array.from(document.querySelectorAll('[data-reveal]:not([data-revealed])'));
    if (!nodes.length) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.setAttribute('data-revealed', 'true'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.setAttribute('data-revealed', 'true');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}

export default useReveal;
