import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content.js';
import '../styles/Preloader.css';

const HOLD_MS = 420;

/**
 * A short, deliberate curtain: the name sets, a counter runs to 100, then the
 * panel splits and hands the page over. Calls onDone() once, on exit.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  // The countdown must run exactly once. Reading onDone through a ref keeps the
  // effect's dep list empty so a parent re-render can never restart it.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setCount(100);
      setLeaving(true);
      setGone(true);
      onDoneRef.current?.();
      return undefined;
    }

    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
      onDoneRef.current?.();
    }, duration + HOLD_MS);

    const goneTimer = setTimeout(() => setGone(true), duration + HOLD_MS + 1100);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(leaveTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" data-leaving={leaving} aria-hidden="true">
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />

      <div className="preloader__inner">
        <div className="preloader__name">
          <span className="preloader__name-line">
            <span>{profile.firstName}</span>
          </span>
          <span className="preloader__name-line">
            <span className="serif-italic">{profile.lastName}</span>
          </span>
        </div>

        <div className="preloader__meta">
          <span className="preloader__role">{profile.role}</span>
          <span className="preloader__count">{String(count).padStart(3, '0')}</span>
        </div>

        <div className="preloader__track">
          <span className="preloader__bar" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
