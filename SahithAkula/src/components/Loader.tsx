import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // The line animation takes 4.5s. We trigger the next phase shortly after it finishes.
    const timer = setTimeout(() => {
      setPhase(1);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
       className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
       exit={{ opacity: 0 }}
       transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Horizontal Line Progress */}
      <motion.div 
         className="absolute top-1/2 left-0 h-[4px] bg-black -translate-y-1/2 z-0" 
         initial={{ width: "0%" }}
         animate={{ width: phase === 0 ? "100%" : "100%", opacity: phase === 1 ? 0 : 1 }}
         transition={{ 
            width: { duration: 3.5, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.5 }
         }}
      />
      
      {/* Logo */}
      <motion.div 
         className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
         animate={{ opacity: phase === 1 ? 0 : 1 }}
         transition={{ duration: 0.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M4 22V5l8 5 8-5v17" />
           <path d="M4 14h16" />
        </svg>
      </motion.div>

      {/* The Black Box */}
      <motion.div
        className="relative z-10 bg-brand-bg flex items-center justify-center origin-center"
        initial={{ 
           width: "70vw", 
           height: "40vh", 
           borderRadius: "20px" 
        }}
        animate={
           phase === 0 
             ? { width: "70vw", height: "40vh", borderRadius: "20px" }
             : { width: "150vw", height: "150vh", borderRadius: "0px" }
        }
        transition={{ 
           duration: 2.5, 
           ease: [0.76, 0, 0.24, 1]
        }}
        onAnimationComplete={() => {
           if (phase === 1) {
             onComplete();
           }
        }}
      >
         <motion.span 
           className="text-white text-3xl md:text-5xl lg:text-[4vw] font-display uppercase tracking-[-0.05em] font-bold"
           animate={{ 
              opacity: phase === 0 ? 1 : 0,
              scale: phase === 0 ? 1 : 0.95  
           }}
           transition={{ duration: 0.6 }}
         >
           LOADING PORTFOLIO
         </motion.span>
      </motion.div>
    </motion.div>
  );
}
