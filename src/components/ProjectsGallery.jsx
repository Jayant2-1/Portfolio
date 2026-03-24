import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Monochrome Villa',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687931-cebf10221375?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'A modern minimalist design project focusing on clean aesthetics and functionality. Built with React and GSAP for smooth animations.'
  },
  {
    id: 2,
    title: 'Warm Studio',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'An elegant studio interface with warm color palettes. Emphasizes user experience and intuitive navigation.'
  },
  {
    id: 3,
    title: 'Editorial House',
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618221469555-7f3aad97a6e1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Content-driven design with a focus on typography and visual hierarchy. Perfect for media and publishing platforms.'
  },
  {
    id: 4,
    title: 'Nordic Loft',
    images: [
      'https://images.unsplash.com/photo-1545628956-6143577d6ee3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687644-aac4c1566905?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Scandinavian-inspired minimalism meets modern web design. Focuses on performance and accessibility.'
  }
];

const ProjectsGallery = ({ onSelectProject }) => {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Handle wheel scroll for infinite cycling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (!isHovering) return;
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        setActiveProject((prev) => (prev + 1) % PROJECTS_DATA.length);
      } else {
        setActiveProject((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isHovering]);

  // Auto-cycle projects
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Animate project cards on active change
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card, idx) => {
      const distance = (idx - activeProject + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      gsap.to(card, {
        x: distance * 20,
        y: distance * 14,
        rotation: distance * 2.5 - 3,
        scale: distance === 0 ? 1 : Math.max(0.82, 1 - distance * 0.06),
        opacity: distance <= 3 ? 1 : 0,
        zIndex: 30 - distance,
        duration: 0.4,
        ease: 'power3.out',
      });
    });
  }, [activeProject]);

  return (
    <div className="h-full flex flex-col justify-start pt-8 px-4">
      <p className="text-xs tracking-[0.45em] text-red-400/85 mb-6">PROJECTS</p>

      {/* Stack Gallery */}
      <div
        ref={containerRef}
        className="relative flex-1 perspective"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ perspective: '1000px' }}
      >
        {PROJECTS_DATA.map((project, idx) => {
          const distance = (idx - activeProject + PROJECTS_DATA.length) % PROJECTS_DATA.length;
          const isActive = distance === 0;

          return (
            <div
              key={project.id}
              className="project-card absolute bottom-0 left-0 w-full h-56 rounded-2xl overflow-hidden bg-black cursor-pointer shadow-2xl"
              onClick={() => onSelectProject(project)}
              style={{
                transformOrigin: '50% 100%',
                transition: isActive ? 'transform 0.25s ease, box-shadow 0.25s ease' : 'none',
                transform: isActive && isHovering ? 'scale(1.12)' : 'scale(1)',
                boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,0,0,0.1)' : '0 20px 40px rgba(0,0,0,0.4)'
              }}
            >
              {/* Stack of images (top 3) */}
              {project.images.slice(0, 3).reverse().map((img, sIdx) => (
                <img
                  key={sIdx}
                  src={img}
                  alt={`${project.title} ${sIdx}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: `translate(${sIdx * 10}px, ${sIdx * 10}px) rotate(${sIdx * 2.5 - 3}deg)`,
                    zIndex: sIdx + 1,
                    opacity: isActive ? (sIdx === 2 ? 1 : 0.72) : 0.3,
                    filter: isActive ? 'grayscale(25%) contrast(1.15)' : 'grayscale(90%) contrast(0.95)',
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              ))}

              {/* Project label */}
              <div className="absolute bottom-3 right-3 text-xs text-white/70 font-medium z-20">
                {String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsGallery;
