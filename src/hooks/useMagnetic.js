import { useEffect, useRef } from 'react';

/**
 * Magnetic hover: the element eases toward the pointer while it is nearby and
 * springs home on leave. Pointer-fine devices only — on touch it is a no-op.
 *
 * The transform is written to CSS custom properties (--mx / --my) so the
 * stylesheet stays in charge of how the pull is composed with other transforms.
 */
export function useMagnetic(strength = 0.32) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let frame = 0;

    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        el.style.setProperty('--mx', `${dx * strength}px`);
        el.style.setProperty('--my', `${dy * strength}px`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Spotlight: tracks the pointer inside a card and exposes its position as
 * --px / --py percentages for a radial highlight to follow.
 */
export function useSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    el.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
    };
  }, []);

  return ref;
}

export default useMagnetic;
