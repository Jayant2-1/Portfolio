import React from 'react';

const ContactSection = () => {
  return (
    <div className="h-full flex flex-col justify-end pb-8 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
      <div className="w-20 h-1 bg-red-500 rounded mb-6" />
      <div className="space-y-4">
        <p className="text-white/80">
          <span className="text-xs tracking-[0.2em] text-red-400/80 block mb-2">EMAIL</span>
          hello@jay.com
        </p>
        <p className="text-white/80">
          <span className="text-xs tracking-[0.2em] text-red-400/80 block mb-2">SOCIAL</span>
          Twitter • LinkedIn • GitHub
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
