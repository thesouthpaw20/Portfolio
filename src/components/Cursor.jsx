import { useEffect, useRef, useState } from 'react';
import '../styles/Cursor.css';

/**
 * Two-part cursor: a small solid dot that tracks the pointer exactly, and a
 * larger ring that lags behind on a spring. The ring swells over anything
 * marked data-cursor="link" | "view" | "text".
 *
 * Only mounts on hover-capable, fine-pointer devices with motion allowed —
 * touch users keep the native cursor behaviour untouched.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const seenPointer = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!seenPointer.current) {
        seenPointer.current = true;
        setVisible(true);
      }

      const hit = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const next = hit?.dataset.cursor ?? 'default';
      setVariant((prev) => (prev === next ? prev : next));
      setLabel(hit?.dataset.cursorLabel ?? '');
    };

    const onLeave = () => {
      seenPointer.current = false;
      setVisible(false);
    };
    const onDown = () => setVariant((v) => (v === 'press' ? v : 'press'));
    const onUp = () => setVariant('default');

    const render = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" data-visible={visible} aria-hidden="true">
      <span ref={ringRef} className="cursor__ring" data-variant={variant}>
        {label ? <span className="cursor__label">{label}</span> : null}
      </span>
      <span ref={dotRef} className="cursor__dot" data-variant={variant} />
    </div>
  );
}
