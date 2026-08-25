import { useEffect, useRef, useState } from 'react';

/**
 * Read-only scroll telemetry, sampled on rAF so we never touch layout inside
 * the scroll handler itself.
 *
 * @returns {{ progress: number, scrolled: boolean, direction: 'up'|'down' }}
 */
export function useScroll(threshold = 24) {
  const [state, setState] = useState({ progress: 0, scrolled: false, direction: 'up' });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const sample = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      const direction = y > lastY.current && y > threshold ? 'down' : 'up';

      setState((prev) => {
        const scrolled = y > threshold;
        if (
          prev.scrolled === scrolled &&
          prev.direction === direction &&
          Math.abs(prev.progress - progress) < 0.002
        ) {
          return prev;
        }
        return { progress, scrolled, direction };
      });

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  return state;
}

/**
 * Tracks which section id currently owns the viewport, for nav highlighting.
 */
export function useActiveSection(ids, offset = 0.35) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset - 0.15) * 100)}% 0px`,
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}

export default useScroll;
