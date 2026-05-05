import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-bg z-0">
      {/* Background Giant Text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[25vw] font-display text-stroke-bg select-none leading-none tracking-tighter"
        >
          DEVELOP
        </motion.h1>
      </div>

      {/* Top Left Profile DP */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-6 md:top-12 md:left-12 z-20 flex items-center gap-4"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-brand-accent/50 shadow-[0_0_20px_rgba(205,255,100,0.15)] shrink-0">
          <img 
            src="/profile.png" 
            alt="Sahith Akula" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
          />
        </div>
        <div className="hidden sm:flex flex-col">
          <p className="text-brand-muted text-[10px] uppercase tracking-widest font-mono">Hello, my name is</p>
          <h3 className="text-lg font-display text-white tracking-widest">SAHITH AKULA</h3>
        </div>
      </motion.div>

      {/* Top Right Top Navbar Items (Optional if needed, otherwise leave empty or small text) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-6 md:top-16 md:right-12 z-20 sm:hidden"
      >
         <h3 className="text-lg font-display text-white tracking-widest">SAHITH</h3>
      </motion.div>

      {/* Center Typography */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="z-20 flex flex-col items-center pointer-events-none w-full px-6 text-center mt-12 md:mt-0"
      >
        <span className="text-brand-accent text-xs md:text-sm font-bold tracking-widest font-mono mb-6 border border-brand-accent/30 px-4 py-2 rounded-full bg-brand-accent/5">SOFTWARE ENGINEER</span>
        <h2 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display text-white tracking-tighter leading-[0.9] mb-2">FULL STACK</h2>
        <h2 className="text-4xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-display text-stroke-accent tracking-tighter leading-[0.9]">& AI DEV</h2>
      </motion.div>

      {/* Bottom Left Info */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20 flex flex-col gap-6 md:gap-12"
      >
        <div>
          <p className="text-brand-muted text-xs uppercase tracking-widest border-l-2 border-brand-accent pl-3 py-1 font-mono">Current Status</p>
          <p className="text-brand-accent text-sm font-bold pl-3 mt-2 leading-relaxed">Available for<br/>Opportunities</p>
        </div>
        <div className="flex gap-6 text-xs font-mono uppercase tracking-widest text-brand-muted">
          <a href="https://www.linkedin.com/in/akula-lakshmi-venkata-sahith-7a577b384/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/akula-sahith" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
          <a href="mailto:akulasahith268@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </motion.div>

      {/* Bottom Right CTA */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end"
      >
        <p className="text-brand-muted text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 font-mono pr-2">Get in touch</p>
        <a href="#contact" className="flex items-center gap-3 md:gap-6 group">
          <span className="text-xl md:text-3xl font-display uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors">LET'S TALK</span>
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent transition-all shrink-0">
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform md:w-6 md:h-6" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
