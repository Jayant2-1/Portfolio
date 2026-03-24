import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const modalRef = React.useRef(null);

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
    setSelectedImageIdx(0);
    setIsPlaying(false);
    setIsHoveringImage(false);
  }, [project]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setIsHoveringImage(false);
      return;
    }

    if (!project || !isPlaying || isHoveringImage) return;

    const interval = window.setInterval(() => {
      setSelectedImageIdx((prev) => (prev + 1) % project.images.length);
    }, 1600);

    return () => window.clearInterval(interval);
  }, [isOpen, project, isPlaying, isHoveringImage]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      style={{ top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
      onClick={onClose}
    >
      <div
        className="w-[90vw] h-[90vh] bg-[#050505] rounded-3xl flex flex-col lg:flex-row gap-0 overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Image Carousel - 55% */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4 p-8 overflow-hidden">
          {/* Main Image */}
          <div
            className="flex-1 rounded-2xl overflow-hidden bg-black"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <img
              src={project.images[selectedImageIdx]}
              alt={`${project.title} ${selectedImageIdx}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsPlaying((p) => !p)}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-24 h-24 rounded-xl object-cover cursor-pointer transition-all flex-shrink-0 ${
                  selectedImageIdx === idx ? 'border-2 border-red-500 scale-105' : 'border border-white/20 opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Image counter */}
          <p className="text-xs text-white/50 text-center">
            {selectedImageIdx + 1} / {project.images.length}
          </p>
        </div>

        {/* Right: Project Info - 45% */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <p className="text-xs tracking-[0.45em] text-red-400/85 mb-4">PROJECT</p>
            <h2 className="text-5xl font-bold text-white mb-4">{project.title}</h2>
            <div className="w-12 h-1 bg-red-500 rounded mb-6" />
            
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-white/90 font-semibold mb-2 text-lg">About</p>
                <p className="text-white/75 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div>
                <p className="text-white/90 font-semibold mb-2 text-lg">Details</p>
                <p className="text-white/60 text-base leading-relaxed">
                  This project showcases modern design principles combined with cutting-edge web technologies. Built with performance and user experience at the forefront. Demonstrates expertise in React, GSAP animations, Tailwind CSS, and responsive design patterns. Every detail has been carefully crafted.
                </p>
              </div>
              
              <div>
                <p className="text-white/90 font-semibold mb-2 text-lg">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'GSAP', 'Tailwind', 'Node.js'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-white/90 font-semibold mb-2 text-lg">Highlights</p>
                <ul className="space-y-1 text-white/60 text-base">
                  <li>✓ 99.9% performance score</li>
                  <li>✓ Mobile responsive & accessible</li>
                  <li>✓ Smooth animations with GSAP</li>
                  <li>✓ Production-ready code</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-600/80 hover:bg-red-600 rounded-lg text-white font-medium transition-all flex-1 text-base"
            >
              Close
            </button>
            <button className="px-6 py-3 border border-white/40 hover:border-white/80 rounded-lg text-white font-medium transition-all flex-1 text-base">
              View Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
