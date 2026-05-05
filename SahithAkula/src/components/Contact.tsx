import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, X } from 'lucide-react';

export default function Contact() {
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 5000);
  };

  return (
    <footer id="contact" className="bg-brand-bg w-full pt-32 pb-8 px-6 md:px-12 border-t border-brand-border relative z-10 overflow-hidden">
      
      {/* Top Tag */}
      <div className="flex items-center gap-3 mb-16 relative z-10">
        <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse" />
        <span className="text-brand-accent text-sm font-mono tracking-widest uppercase font-bold">AVAILABLE FOR OPPORTUNITIES</span>
      </div>

      <div className="flex flex-col lg:flex-row relative z-10 my-24 gap-16 lg:gap-8 items-start justify-between">
        {/* Huge Text */}
        <div className="flex flex-col select-none lg:w-1/2">
          <motion.h2 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-[18vw] lg:text-[12vw] font-display text-white tracking-tighter leading-[0.8]"
          >
            LET'S
          </motion.h2>
          <motion.h2 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-[18vw] lg:text-[12vw] font-display text-brand-accent tracking-tighter leading-[0.8] ml-[10vw] lg:ml-[5vw]"
          >
            TALK
          </motion.h2>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 max-w-lg lg:ml-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-white/50 uppercase tracking-widest">Name</label>
              <input type="text" id="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors" placeholder="Your name" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs text-white/50 uppercase tracking-widest">Email</label>
              <input type="email" id="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors" placeholder="your@email.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs text-white/50 uppercase tracking-widest">Message</label>
              <textarea id="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors resize-none" placeholder="What's on your mind?" />
            </div>

            <button type="submit" className="mt-4 px-8 py-4 bg-brand-accent text-black font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-3">
              Send Message <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-1/4 w-[50vw] h-[50vw] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-24 md:mt-32 relative z-10 text-brand-muted text-[10px] md:text-xs font-mono uppercase tracking-widest gap-8 md:gap-0">
         <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <span className="opacity-60">SAHITH AKULA © 2026</span>
            <div className="flex gap-4 md:gap-8">
              <a href="https://www.linkedin.com/in/akula-lakshmi-venkata-sahith-7a577b384/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">LINKEDIN</a>
              <a href="https://github.com/akula-sahith" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">GITHUB</a>
            </div>
         </div>
         <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors flex items-center gap-2 group">
            <span className="text-[10px] bg-brand-surface border border-brand-border w-6 h-6 rounded flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black transition-colors">↑</span>
            BACK TO TOP
         </button>
      </div>

      {/* Success Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 bg-[#0a0a0a] border border-brand-accent/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(205,255,100,0.1)] flex items-start gap-4 max-w-sm"
          >
            <CheckCircle2 className="text-brand-accent shrink-0" size={24} />
            <div>
              <h4 className="text-white font-display text-lg mb-1">Message Sent</h4>
              <p className="text-white/60 text-sm leading-relaxed">Thank you for reaching out! I'll get back to you as soon as possible.</p>
            </div>
            <button onClick={() => setShowDialog(false)} className="text-white/40 hover:text-white absolute top-4 right-4 focus:outline-none">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
