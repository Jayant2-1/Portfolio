import React from 'react';
import { useEffect, useState } from 'react';
import Nav from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import SkillModal from "./components/SkillModal.jsx";
import ProjectModal from "./components/ProjectModal.jsx";

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (introFinished) return;

    setShowNav(false);
    window.scrollTo(0, 0);

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const preventScroll = (e) => {
      e.preventDefault();
    };

    const preventKeys = (e) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar'];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [introFinished]);

  useEffect(() => {
    if (!introFinished) return;

    const handleScroll = () => {
      // Show navbar after scrolling 50% of first viewport (half of 100vh)
      const threshold = window.innerHeight * 0.5;
      setShowNav(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introFinished]);

  return (
    <div className="bg-[#050505] text-[#e5e5e5] w-screen overflow-x-hidden">
      <Nav showNav={showNav} />
      <Hero 
        onIntroFinish={() => setIntroFinished(true)} 
        onSelectSkill={setSelectedSkill}
        onSelectProject={setSelectedProject}
      />

      {/* Second Section - Only 2 pages */}
      <section className={`relative h-screen w-full flex items-center justify-center bg-[#050505] z-0 transition-opacity duration-500 ${
        introFinished ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <h1 className="text-6xl md:text-8xl font-bold text-white">Second Section</h1>
      </section>

      {/* Global Modals */}
      <SkillModal skill={selectedSkill} isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} />
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default App;