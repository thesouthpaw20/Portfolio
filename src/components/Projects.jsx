import { useState } from 'react';
import { projects } from '../data/content.js';
import { useSpotlight } from '../hooks/useMagnetic.js';
import '../styles/Projects.css';

function Project({ project, index, isOpen, onToggle }) {
  const spotRef = useSpotlight();
  const panelId = `project-panel-${project.id}`;
  const headerId = `project-header-${project.id}`;

  return (
    <article
      className="project"
      data-open={isOpen}
      ref={spotRef}
      data-reveal
      data-reveal-delay={index * 110}
    >
      <span className="project__spot" aria-hidden="true" />

      <h3 className="project__heading">
        <button
          type="button"
          className="project__trigger"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor="link"
        >
          <span className="project__index">{project.index}</span>

          <span className="project__titles">
            <span className="project__title">{project.title}</span>
            <span className="project__category">{project.category}</span>
          </span>

          <span className="project__metric" aria-hidden="true">
            <span className="project__metric-value">{project.metric.value}</span>
            <span className="project__metric-label">{project.metric.label}</span>
          </span>

          <span className="project__toggle" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </h3>

      <div className="project__panel" id={panelId} role="region" aria-labelledby={headerId}>
        <div className="project__panel-inner">
          <p className="project__blurb">{project.blurb}</p>

          <ul className="project__points">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <ul className="project__stack">
            {project.stack.map((tech) => (
              <li className="chip" key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(projects[0].id);

  return (
    <section className="section section--bordered projects" id="work">
      <div className="shell">
        <header className="section-head">
          <div data-reveal="left">
            <span className="section-head__index">03 — Selected work</span>
            <h2 className="section-title">
              Things
              <br />
              <span className="serif-italic">built</span>
            </h2>
          </div>
          <p className="section-desc" data-reveal data-reveal-delay="120">
            Three projects that each ran the full distance — raw data in, a working, deployed thing
            out. Open one to see how it was put together.
          </p>
        </header>

        <div className="projects__list">
          {projects.map((project, i) => (
            <Project
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={() => setOpenId((prev) => (prev === project.id ? null : project.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
