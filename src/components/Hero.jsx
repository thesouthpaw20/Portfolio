import { useEffect, useRef } from 'react';
import { profile, stats } from '../data/content.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useCountUp } from '../hooks/useCountUp.js';
import portrait from '../assets/profile.jpg';
import '../styles/Hero.css';

const ARROW = (
  <svg className="btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Stat({ item, index }) {
  const { ref, value } = useCountUp(item.value, { duration: 1800 + index * 160 });
  return (
    <li className="hero-stat" ref={ref} data-reveal data-reveal-delay={220 + index * 90}>
      <span className="hero-stat__value">
        {Math.round(value).toLocaleString('en-IN')}
        <em>{item.suffix}</em>
      </span>
      <span className="hero-stat__label">{item.label}</span>
      <span className="hero-stat__detail">{item.detail}</span>
    </li>
  );
}

export default function Hero({ booted }) {
  const ctaRef = useMagnetic(0.28);
  const portraitRef = useRef(null);

  // Gentle parallax + tilt on the portrait, driven by pointer position across
  // the whole hero rather than the image itself, so the motion feels ambient.
  useEffect(() => {
    const frame = portraitRef.current;
    if (!frame) return undefined;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let raf = 0;
    const onMove = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        frame.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`);
        frame.style.setProperty('--tilt-y', `${(x * 9).toFixed(2)}deg`);
        frame.style.setProperty('--shift-x', `${(x * -16).toFixed(1)}px`);
        frame.style.setProperty('--shift-y', `${(y * -14).toFixed(1)}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="hero" id="top" data-booted={booted}>
      <div className="hero__inner shell">
        <div className="hero__lede">
          <p className="hero__eyebrow eyebrow">
            {profile.role} · {profile.locationShort}
          </p>

          <h1 className="hero__title display">
            <span className="mask-line">
              <span style={{ '--reveal-delay': '80ms' }}>{profile.firstName}</span>
            </span>
            <span className="mask-line">
              <span style={{ '--reveal-delay': '180ms' }}>{profile.middleName}</span>
            </span>
            <span className="mask-line hero__title-last">
              <span className="serif-italic" style={{ '--reveal-delay': '280ms' }}>
                {profile.lastName}
              </span>
            </span>
          </h1>

          <div className="hero__meta">
            <p className="hero__tagline lead" data-reveal data-reveal-delay="520">
              I take operational data end to end — extraction and cleaning through modelling,
              forecasting and deployment — and hand back{' '}
              <span className="hero__underline">dashboards, forecasts and production tools</span>{' '}
              teams actually open every morning.
            </p>

            <div className="hero__actions" data-reveal data-reveal-delay="640">
              <a className="btn btn--primary" href="#experience" ref={ctaRef} data-cursor="link">
                View my experience {ARROW}
              </a>
              <a className="btn" href="#contact" data-cursor="link">
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <div className="hero__portrait" data-reveal="scale" data-reveal-delay="360">
          <div className="hero__frame" ref={portraitRef}>
            <div className="hero__frame-glow" aria-hidden="true" />
            <img
              className="hero__photo"
              src={portrait}
              alt={`${profile.fullName}, ${profile.role}`}
              width="400"
              height="400"
              loading="eager"
              decoding="async"
            />
            <div className="hero__frame-scan" aria-hidden="true" />
          </div>

          <div className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="hero__badge-ring">
              <defs>
                <path
                  id="badge-path"
                  d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                  fill="none"
                />
              </defs>
              <text>
                {/* One pass only — the ring is ~264px and this string fills it
                    with a deliberate gap rather than overrunning itself. */}
                <textPath href="#badge-path" startOffset="0%">
                  {`${profile.availability} · `}
                </textPath>
              </text>
            </svg>
            <span className="hero__badge-dot" />
          </div>

          <p className="hero__caption">
            <span className="hero__caption-rule" />
            MSc Data Analytics · BSc Statistics
          </p>
        </div>
      </div>

      <ul className="hero__stats shell">
        {stats.map((item, i) => (
          <Stat key={item.label} item={item} index={i} />
        ))}
      </ul>

      <a className="hero__scroll" href="#about" aria-label="Scroll to About">
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-thumb" />
        </span>
      </a>
    </section>
  );
}
