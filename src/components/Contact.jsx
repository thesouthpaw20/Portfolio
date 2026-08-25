import { profile, socials } from '../data/content.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import '../styles/Contact.css';

export default function Contact() {
  const mailRef = useMagnetic(0.22);

  return (
    <section className="section section--bordered contact" id="contact">
      <div className="shell contact__inner">
        <div className="contact__lede">
          <span className="section-head__index" data-reveal>
            05 — Contact
          </span>

          <h2 className="contact__title display" data-reveal data-reveal-delay="80">
            Let&apos;s put your data
            <br />
            <span className="serif-italic">to work.</span>
          </h2>

          <p className="contact__desc lead" data-reveal data-reveal-delay="180">
            {profile.availability}. If you have operational data that should be answering questions
            and currently isn&apos;t, that is exactly the problem I like.
          </p>

          <a
            className="contact__mail"
            href={`mailto:${profile.email}`}
            ref={mailRef}
            data-cursor="view"
            data-cursor-label="Email"
            data-reveal
            data-reveal-delay="280"
          >
            <span className="contact__mail-text">{profile.email}</span>
            <span className="contact__mail-rule" aria-hidden="true" />
          </a>
        </div>

        <ul className="contact__channels" data-reveal="right" data-reveal-delay="240">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                className="channel"
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                data-cursor="link"
              >
                <span className="channel__label">{item.label}</span>
                <span className="channel__handle">{item.handle}</span>
                <span className="channel__icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}
