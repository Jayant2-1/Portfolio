import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import TitleSection from '../components/TitleSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsGallery from '../components/ProjectsGallery';
import ContactSection from '../components/ContactSection';

// Legacy PROJECTS data (no longer used in main layout)
const PROJECTS = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', // Cover
      'https://images.unsplash.com/photo-1600607687931-cebf10221375?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', // Cover
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800', // Cover
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618221469555-7f3aad97a6e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1545628956-6143577d6ee3?auto=format&fit=crop&q=80&w=800', // Cover
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607687644-aac4c1566905?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

const STACK_CYCLE_MS = 2500; // 2.5 seconds between project auto-cycles

const Hero = ({ onIntroFinish, onSelectSkill, onSelectProject }) => {
  const containerRef = useRef(null);
  const [introFinished, setIntroFinished] = useState(false);

  const bgBlack = '#050505';
  const textSilver = '#e5e5e5';
  const accentRed = '#7a0000';

  // --- Core GSAP Orchestration ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const introLayer = el.querySelector('.intro-layer');
    const gridLayer = el.querySelector('.convergence-grid');
    gsap.set(gridLayer, { display: 'none', opacity: 0 }); // Prevent FOUC entirely

    const brushes = introLayer.querySelectorAll('.brush-stroke');
    const titleBlock = introLayer.querySelector('.phase-title');
    const swLetters = titleBlock.querySelectorAll('.sw-char');
    const lfLetters = titleBlock.querySelectorAll('.lf-char');
    const aText = titleBlock.querySelector('.a-text');
    const titleLine = titleBlock.querySelector('.sw-line');

    const galleryItems = introLayer.querySelectorAll('.phase-gallery-item');
    const skillsBlock = introLayer.querySelector('.phase-skills');
    const skillLines = skillsBlock.querySelectorAll('.skill-line');
    const contactBlock = introLayer.querySelector('.phase-contact');
    const contactText = contactBlock.querySelectorAll('.contact-char');

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        setIntroFinished(true);
        if (onIntroFinish) onIntroFinish();
      }
    });

    // --- PHASE 1: Remove the red wipe, just fade in softly ---
    gsap.set(brushes, { opacity: 0 });
    tl.fromTo(brushes, { opacity: 0 }, { opacity: 0, duration: 0 }); // Skip wipe entirely

    // Title 
    gsap.set(swLetters, { y: 100, opacity: 0 });
    gsap.set(titleLine, { scaleY: 0, opacity: 0 });
    gsap.set(aText, { opacity: 0, x: -40 });
    gsap.set(lfLetters, { opacity: 0, scale: 2, y: -60, rotationY: 90, transformOrigin: '50% 50% -100px' });

    tl.to(swLetters, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.04 });
    tl.to(titleLine, { scaleY: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.6");
    tl.to(aText, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6");
    tl.to(lfLetters, { opacity: 1, scale: 1, y: 0, rotationY: 0, duration: 1.5, ease: 'expo.out', stagger: { each: 0.08, from: 'start' } }, "-=0.8");

    tl.set({}, {}, "+=0.5");

    // Phase 2: Title Ebb (faster)
    tl.to(titleBlock, { scale: 0.95, opacity: 0, yPercent: -24, duration: 0.5, ease: 'power3.inOut' });

    // --- PHASE 3: Gallery animations (kept for intro visual interest, but hidden) ---
    galleryItems.forEach((item, i) => {
      const startX = (i - 1.5) * 260;
      const startY = 120 + i * 24;
      const startAngle = (i - 1.5) * 8;
      gsap.set(item, { x: startX, y: startY, rotation: startAngle, opacity: 0 });

      const endX = (i - 1.5) * 40;
      const endY = i * 20;
      const endAngle = (i - 1.5) * 4;
      tl.to(item, { x: endX, y: endY, rotation: endAngle, opacity: 0.8, duration: 0.5, ease: 'power4.out' }, "-=0.4");
    });

    tl.set({}, {}, "+=0.3");

    // Gallery Ebb: Send each to different corner, staggered exit
    const corners = [
      { x: -window.innerWidth - 200, y: -window.innerHeight - 200 },
      { x: window.innerWidth + 200, y: -window.innerHeight - 200 },
      { x: -window.innerWidth - 200, y: window.innerHeight + 200 },
      { x: window.innerWidth + 200, y: window.innerHeight + 200 }
    ];
    galleryItems.forEach((item, i) => {
      tl.to(item, {
        x: corners[i].x,
        y: corners[i].y,
        rotation: (i - 1.5) * 45,
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'power3.in'
      }, `-=${0.1 + i * 0.05}`);
    });
    tl.set({}, {}, "+=0.1");

    // --- PHASE 4: Skills ---
    gsap.set(skillLines, { x: 100, opacity: 0 });
    tl.to(skillLines, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' });
    tl.set({}, {}, "+=0.3");
    tl.to(skillsBlock, { scale: 1.05, opacity: 0, filter: 'blur(10px)', duration: 0.4, ease: 'power2.in' });

    // --- PHASE 5: Contact ---
    gsap.set(contactText, { scale: 4, opacity: 0, filter: 'blur(30px)' });
    tl.to(contactText, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: { each: 0.03, from: 'center' }, ease: 'expo.out' });
    tl.set({}, {}, "+=0.2");
    tl.to(contactBlock, { scale: 0.7, opacity: 0, duration: 0.4, ease: 'power3.in' });

    // --- PHASE 6: Show Pinterest Grid Layout ---
    tl.to(introLayer, { opacity: 0, duration: 0.1 });
    tl.set(introLayer, { display: 'none' });

    tl.set(gridLayer, { display: 'grid' });
    const gridItems = gridLayer.querySelectorAll('.grid-item');
    gsap.set(gridLayer, { opacity: 1 });
    gsap.set(gridItems, { opacity: 0, scale: 0.95, y: 40 });

    tl.to(gridItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: { each: 0.1, from: 'start' },
      ease: 'expo.out'
    });

    return () => tl.kill();
  }, []);

  const splitText = (text, className) => {
    return text.split('').map((char, i) => (
      <span key={i} className={className} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: bgBlack, fontFamily: "'Inter', sans-serif" }}
    >

      {/* LAYER 1: INTRO SEQUENCE */}
      <div className="intro-layer" style={{ position: 'fixed', inset: 0, zIndex: 20, pointerEvents: 'none' }}>

        {/* Massive Screen Wipes */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div className="brush-stroke" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
          <div className="brush-stroke" style={{ position: 'absolute', inset: 0, zIndex: 3 }} />
        </div>

        {/* Phase 1: Title */}
        <div className="phase-title" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', zIndex: 5 }}>
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, letterSpacing: 'clamp(8px, 2vw, 20px)', color: textSilver, margin: 0 }}>
              {splitText('SOFTWARE DEVELOPER', 'sw-char')}
            </h1>
          </div>
          <div className="sw-line" style={{ width: '1px', height: '80px', backgroundColor: accentRed, margin: '2rem auto' }} />
          <div>
            <span className="a-text" style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '12px', color: accentRed, marginBottom: '1rem', display: 'block' }}>A</span>
            <h2 style={{ fontSize: 'clamp(60px, 12vw, 150px)', fontWeight: 800, letterSpacing: 'clamp(2px, 1vw, 10px)', color: textSilver, margin: 0, lineHeight: 1 }}>
              {splitText('LIFESTYLE', 'lf-char')}
            </h2>
          </div>
        </div>

        {/* Phase 3: Gallery (Made significantly larger per user request) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6 }}>
          {PROJECTS.map((proj, i) => (
            <div key={proj.id} className="phase-gallery-item" style={{ position: 'absolute', width: '45vh', height: '60vh', background: '#111', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
              <img src={proj.images[0]} alt={`Exhibit ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
            </div>
          ))}
        </div>

        {/* Phase 4: Skills */}
        <div className="phase-skills" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', zIndex: 7 }}>
          <h3 className="skill-line" style={{ fontSize: '1.2rem', color: accentRed, letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '3rem' }}>Core Expertise</h3>
          <p style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: textSilver, fontWeight: 300, lineHeight: 1.3, margin: 0 }}>
            <span className="skill-line" style={{ display: 'block' }}>Modern React Architecture.</span>
            <span className="skill-line" style={{ display: 'block' }}>Premium GSAP Animation.</span>
            <span className="skill-line" style={{ display: 'block' }}>Systems Design.</span>
          </p>
        </div>

        {/* Phase 5: Contact */}
        <div className="phase-contact" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', zIndex: 8 }}>
          <h2 style={{ fontSize: 'clamp(60px, 10vw, 130px)', color: textSilver, fontWeight: 800, letterSpacing: '-4px', margin: 0 }}>
            {splitText("LET'S TALK", 'contact-char')}
          </h2>
        </div>
      </div>

      {/* 
        LAYER 2: Pinterest-Style Asymmetrical Grid (Seamless)
        Top Left: 60% - Title Section
        Top Right: 40% - Skills Section
        Bottom Left: 40% - Contact Section
        Bottom Right: 60% - Projects Gallery
      */}
      <div className="convergence-grid" style={{
        position: 'absolute', inset: 0, zIndex: 5, padding: '0',
        display: 'none',
        gridTemplateColumns: '1.2fr 1.8fr',
        gridTemplateRows: '1fr 1fr',
        gap: '0',
        alignItems: 'stretch'
      }}>
        {/* Top Left: Title */}
        <div className="grid-item p-8 md:p-12 overflow-hidden flex flex-col justify-start">
          <TitleSection />
        </div>

        {/* Top Right: Skills - Increased space */}
        <div className="grid-item p-8 md:p-12 overflow-hidden flex flex-col justify-start">
          <SkillsSection onSelectSkill={onSelectSkill} />
        </div>

        {/* Bottom Left: Contact */}
        <div className="grid-item p-8 md:p-12 overflow-hidden flex flex-col justify-between">
          <ContactSection />
        </div>

        {/* Bottom Right: Projects - Increased space */}
        <div className="grid-item p-8 md:p-12 overflow-hidden flex flex-col justify-start">
          <ProjectsGallery onSelectProject={onSelectProject} />
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 15vw rgba(0,0,0,0.85)', zIndex: 15 }} />
    </section>
  );
};

export default Hero;
