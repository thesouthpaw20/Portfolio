import { certifications, education } from '../data/content.js';
import '../styles/Education.css';

export default function Education() {
  return (
    <section className="section section--bordered education" id="education">
      <div className="shell">
        <header className="section-head">
          <div data-reveal="left">
            <span className="section-head__index">04 — Education</span>
            <h2 className="section-title">
              Grounded in
              <br />
              <span className="serif-italic">statistics</span>
            </h2>
          </div>
          <p className="section-desc" data-reveal data-reveal-delay="120">
            A statistics degree first, then data analytics on top of it — which is why the models
            get benchmarked before they get recommended.
          </p>
        </header>

        <div className="education__grid">
          <ol className="education__list">
            {education.map((item, i) => (
              <li className="degree" key={item.id} data-reveal data-reveal-delay={i * 110}>
                <span className="degree__period">{item.period}</span>

                <div className="degree__body">
                  <h3 className="degree__title">
                    {item.degree}
                    {item.focus ? <span className="degree__focus"> · {item.focus}</span> : null}
                  </h3>
                  <p className="degree__institution">{item.institution}</p>
                </div>

                <span className="degree__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ol>

          <aside className="certs" data-reveal="right" data-reveal-delay="200">
            <h3 className="certs__title">
              <span className="eyebrow">Certifications</span>
            </h3>

            <ul className="certs__list">
              {certifications.map((cert) => (
                <li className="cert" key={cert.name}>
                  <span className="cert__mark" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="m3.5 8.4 3 3 6-6.8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="cert__text">
                    <span className="cert__name">{cert.name}</span>
                    <span className="cert__issuer">{cert.issuer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
