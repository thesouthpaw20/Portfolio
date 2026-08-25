import { useCallback, useEffect, useState } from 'react';

import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Atmosphere from './components/Atmosphere.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
// Projects is intentionally not mounted — the work section is unpublished.
// Re-add the import and the <Projects /> line below to bring it back.
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

import { useReveal } from './hooks/useReveal.js';

export default function App() {
  const [booted, setBooted] = useState(false);

  // Stable identity — Preloader keeps this in a ref, and an unstable callback
  // would restart its countdown on every re-render.
  const handleBooted = useCallback(() => setBooted(true), []);

  // Reveal observers are wired only after the preloader clears, so nothing
  // animates behind the curtain and gets marked as "already seen".
  useReveal(booted);

  useEffect(() => {
    document.body.classList.toggle('is-locked', !booted);
    return () => document.body.classList.remove('is-locked');
  }, [booted]);

  return (
    <>
      <Preloader onDone={handleBooted} />
      <Cursor />
      <Atmosphere />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <div className="page" data-booted={booted}>
        <main id="main">
          <Hero booted={booted} />
          <Marquee />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
