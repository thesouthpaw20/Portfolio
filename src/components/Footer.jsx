import { navLinks, profile } from '../data/content.js';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__wordmark" aria-hidden="true">
        <span>{profile.firstName}</span>
        <span className="serif-italic">{profile.lastName}</span>
      </div>

      <div className="shell footer__inner">
        <div className="footer__col">
          <p className="footer__note">
            {profile.roleLong}
            <br />
            {profile.locationShort}
          </p>
        </div>

        <nav className="footer__col footer__nav" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} data-cursor="link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__col footer__meta">
          <a href={`mailto:${profile.email}`} data-cursor="link">
            {profile.email}
          </a>
          <a href={`tel:${profile.phoneHref}`} data-cursor="link">
            {profile.phone}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" data-cursor="link">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="shell footer__base">
        <p>
          © {year} {profile.fullName}
        </p>
        <button
          type="button"
          className="footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="link"
        >
          Back to top
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 13V3m0 0L4.5 6.5M8 3l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
