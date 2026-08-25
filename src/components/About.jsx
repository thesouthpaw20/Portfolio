import { aboutHighlights, profile } from '../data/content.js';
import { useSpotlight } from '../hooks/useMagnetic.js';
import '../styles/About.css';

function Highlight({ item, index }) {
  const ref = useSpotlight();
  return (
    <article
      className="about-card"
      ref={ref}
      data-reveal
      data-reveal-delay={index * 110}
    >
      <span className="about-card__index">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="about-card__title">{item.title}</h3>
      <p className="about-card__body">{item.body}</p>
      <span className="about-card__spot" aria-hidden="true" />
    </article>
  );
}

export default function About() {
  return (
    <section className="section section--bordered about" id="about">
      <div className="shell">
        <header className="section-head">
          <div data-reveal="left">
            <span className="section-head__index">01 — About</span>
            <h2 className="section-title">
              The whole
              <br />
              <span className="serif-italic">pipeline</span>
            </h2>
          </div>
          <p className="section-desc" data-reveal data-reveal-delay="120">
            {profile.summary}
          </p>
        </header>

        <div className="about__grid">
          <div className="about__cards">
            {aboutHighlights.map((item, i) => (
              <Highlight key={item.title} item={item} index={i} />
            ))}
          </div>

          <aside className="about__aside" data-reveal="right" data-reveal-delay="200">
            <dl className="about__facts">
              <div className="about__fact">
                <dt>Currently</dt>
                <dd>Data Analyst at Ajalabs.ai</dd>
              </div>
              <div className="about__fact">
                <dt>Based in</dt>
                <dd>{profile.locationShort}</dd>
              </div>
              <div className="about__fact">
                <dt>Education</dt>
                <dd>MSc Computer Science (Data Analytics) · BSc Statistics</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
