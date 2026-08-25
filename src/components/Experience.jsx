import { experience } from '../data/content.js';
import '../styles/Experience.css';

export default function Experience() {
  return (
    <section className="section section--bordered experience" id="experience">
      <div className="shell">
        <header className="section-head">
          <div data-reveal="left">
            <span className="section-head__index">02 — Experience</span>
            <h2 className="section-title">
              Where it
              <br />
              <span className="serif-italic">shipped</span>
            </h2>
          </div>
          <p className="section-desc" data-reveal data-reveal-delay="120">
            A year-plus of enterprise analytics and AI automation, plus the forecasting and applied
            ML work that led into it.
          </p>
        </header>

        <ol className="timeline">
          {experience.map((role, i) => (
            <li
              className="timeline__item"
              key={role.id}
              data-status={role.status}
              data-reveal
              data-reveal-delay={i * 120}
            >
              <div className="timeline__marker" aria-hidden="true">
                <span className="timeline__dot" />
                <span className="timeline__line" />
              </div>

              <div className="timeline__aside">
                <span className="timeline__period">{role.period}</span>
                {role.status === 'current' ? (
                  <span className="timeline__badge">
                    <span className="timeline__badge-dot" />
                    Current
                  </span>
                ) : null}
              </div>

              <div className="timeline__body">
                <div className="timeline__head">
                  <h3 className="timeline__role">{role.role}</h3>
                  <p className="timeline__company">{role.company}</p>
                </div>

                <p className="timeline__summary">{role.summary}</p>

                <ul className="timeline__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <ul className="timeline__stack">
                  {role.stack.map((tech) => (
                    <li className="chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="timeline__year" aria-hidden="true">
                {role.year}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
