import React, { useState } from 'react';

const SKILLS = [
  { id: 1, name: 'React Architecture', icon: '⚙️' },
  { id: 2, name: 'GSAP Animation', icon: '✨' },
  { id: 3, name: 'Tailwind CSS', icon: '🎨' },
  { id: 4, name: 'Performance', icon: '⚡' },
  { id: 5, name: 'UI/UX Design', icon: '🎯' },
  { id: 6, name: 'Node Backend', icon: '🔧' },
];

const SkillsSection = ({ onSelectSkill }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="h-full flex flex-col justify-start pt-8 px-4">
      <p className="text-xs tracking-[0.45em] text-red-400/85 mb-6">SKILLS</p>

      {/* Scrolling Track */}
      <div
        className={`marquee flex-1 flex items-center ${isPaused ? 'is-paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredSkill(null);
        }}
      >
        <div className="marquee-track gap-6 whitespace-nowrap">
          {[...SKILLS, ...SKILLS].map((skill, idx) => {
            const isHovered = hoveredSkill === skill.id;
            return (
              <button
                key={`${skill.id}-${idx}`}
                type="button"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onFocus={() => setHoveredSkill(skill.id)}
                onBlur={() => setHoveredSkill(null)}
                onClick={() => onSelectSkill(skill)}
                className={
                  `px-5 py-3 border rounded-lg cursor-pointer flex-shrink-0 ` +
                  `transition-all duration-200 origin-center ` +
                  (isHovered
                    ? 'bg-white/20 border-white/40 scale-[1.12]'
                    : 'bg-white/10 border-white/20 hover:bg-white/15')
                }
              >
                <span className={(isHovered ? 'text-base' : 'text-sm') + ' font-semibold text-white/90'}>
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
