import { skillGroups } from '../data/content.js';
import '../styles/Skills.css';

export default function Skills() {
  return (
    <section className="section section--bordered skills" id="expertise">
      <div className="shell">
        <header className="section-head">
          <div data-reveal="left">
            <span className="section-head__index">03 — Expertise</span>
            <h2 className="section-title">
              The
              <br />
              <span className="serif-italic">toolkit</span>
            </h2>
          </div>
          <p className="section-desc" data-reveal data-reveal-delay="120">
            Grouped by what they are actually for — finding the signal, writing the code, modelling
            the behaviour, and shipping the result.
          </p>
        </header>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <article
              className="skill-group"
              key={group.id}
              data-reveal
              data-reveal-delay={i * 100}
            >
              <div className="skill-group__head">
                <span className="skill-group__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="skill-group__title">{group.label}</h3>
                  <p className="skill-group__caption">{group.caption}</p>
                </div>
                <span className="skill-group__count">{group.items.length}</span>
              </div>

              <ul className="skill-group__items">
                {group.items.map((item, j) => (
                  <li className="skill" key={item} style={{ '--j': j }}>
                    <span className="skill__bullet" aria-hidden="true" />
                    <span className="skill__name">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
