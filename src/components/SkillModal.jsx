import React, { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';

const SkillModal = ({ skill, isOpen, onClose }) => {
  const modalRef = React.useRef(null);
  const [showcaseIdx, setShowcaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const showcaseImages = useMemo(
    () => [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1400',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1400'
    ],
    []
  );

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95, backdropFilter: 'blur(0px)' },
        { opacity: 1, scale: 1, backdropFilter: 'blur(24px)', duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setShowcaseIdx(0);
    setIsPlaying(false);
    setIsHoveringImage(false);
  }, [isOpen, skill]);

  useEffect(() => {
    if (!isOpen || !isPlaying || isHoveringImage) return;

    const interval = window.setInterval(() => {
      setShowcaseIdx((prev) => (prev + 1) % showcaseImages.length);
    }, 1600);

    return () => window.clearInterval(interval);
  }, [isOpen, isPlaying, isHoveringImage, showcaseImages.length]);

  if (!isOpen || !skill) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      style={{ top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
      onClick={onClose}
    >
      <div 
        className="w-[90vw] h-[90vh] bg-[#050505] rounded-3xl p-12 grid grid-cols-[1fr_1.3fr] gap-12 shadow-2xl overflow-hidden"
        style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Detailed Skill Information */}
        <div className="flex flex-col justify-between overflow-y-auto pr-6">
          <div>
            <p className="text-xs tracking-[0.45em] text-red-400/85 mb-4">EXPERTISE</p>
            <h2 className="text-6xl font-bold text-white mb-6">{skill.name}</h2>
            <div className="w-12 h-1 bg-red-500 rounded mb-8" />
            
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-white/90 mb-3 font-semibold text-lg">Proficiency Level</p>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-red-500 rounded-full" />
                </div>
                <p className="text-sm text-white/50 mt-2">Expert - 8+ years</p>
              </div>
              
              <div>
                <p className="text-white/90 mb-3 font-semibold text-lg">Overview</p>
                <p className="text-white/70 leading-relaxed text-base">
                  Extensive expertise in {skill.name}. Successfully delivered multiple high-performance production applications. Known for implementing scalable solutions and best practices. Continuously learning and adapting to latest industry standards.
                </p>
              </div>
              
              <div>
                <p className="text-white/90 mb-3 font-semibold text-lg">Technologies & Tools</p>
                <div className="flex flex-wrap gap-2">
                  {['Framework', 'Library', 'Tools', 'Best Practices'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-white/90 mb-3 font-semibold text-lg">Key Achievements</p>
                <ul className="space-y-3 text-white/70 text-base">
                  <li>✓ Built scalable systems used by thousands</li>
                  <li>✓ 99%+ uptime in production environments</li>
                  <li>✓ Mentored junior developers</li>
                  <li>✓ Open source contributions</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="px-8 py-3 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-all w-full font-medium mt-6 text-lg"
          >
            Close
          </button>
        </div>

        {/* Right: Showcase Image */}
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 h-full w-full">
          <img
            src={showcaseImages[showcaseIdx]}
            alt={skill.name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsPlaying((p) => !p)}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
