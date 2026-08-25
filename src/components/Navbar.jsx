import { useCallback, useEffect, useMemo, useState } from 'react';
import { navLinks, profile } from '../data/content.js';
import { useScroll, useActiveSection } from '../hooks/useScroll.js';
import '../styles/Navbar.css';

export default function Navbar() {
  const { progress, scrolled, direction } = useScroll(40);
  const ids = useMemo(() => navLinks.map((link) => link.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  // Close the overlay on Escape, and whenever the viewport grows past the
  // breakpoint where the inline nav takes over again.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    document.body.classList.add('is-locked');

    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
      document.body.classList.remove('is-locked');
    };
  }, [open]);

  const go = useCallback((event, id) => {
    event.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    // Move focus for keyboard and screen-reader users without stealing the scroll.
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <header
        className="nav"
        data-scrolled={scrolled}
        data-hidden={scrolled && direction === 'down' && !open}
        data-open={open}
      >
        <div className="nav__inner shell">
          <a
            className="nav__brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="link"
          >
            <span className="nav__monogram">JKG</span>
            <span className="nav__brand-text">
              <span className="nav__brand-name">{profile.fullName}</span>
              <span className="nav__brand-role">{profile.role}</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Section navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav__link"
                data-active={active === link.id}
                onClick={(event) => go(event, link.id)}
                data-cursor="link"
              >
                <span className="nav__link-index">{link.index}</span>
                <span className="nav__link-label">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-overlay"
              aria-label={open ? 'Close menu' : 'Open menu'}
              data-cursor="link"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <span className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div className="nav-overlay" id="nav-overlay" data-open={open} aria-hidden={!open}>
        <nav className="nav-overlay__links" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-overlay__link"
              style={{ '--i': i }}
              onClick={(event) => go(event, link.id)}
              tabIndex={open ? 0 : -1}
            >
              <span className="nav-overlay__index">{link.index}</span>
              <span className="nav-overlay__label">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-overlay__foot">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" tabIndex={open ? 0 : -1}>
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
