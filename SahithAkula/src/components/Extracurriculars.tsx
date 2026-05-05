import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const EXTRAS = [
  { id: '01', title: 'Institute Innovation Council', event: 'College Level', role: 'Vice Convener', desc: 'Led student initiatives in innovation, entrepreneurship and tech development.' },
  { id: '02', title: 'Hackathon Organizer', event: 'Tech Fest', role: 'Tech Lead', desc: 'Organized and managed technical logistics for college-level hackathons.' },
];

export default function Extracurriculars() {
  const [openId, setOpenId] = useState<string | null>(EXTRAS[0].id);

  return (
    <section className="bg-brand-bg w-full py-32 px-6 lg:px-12 border-t border-brand-border relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display text-brand-accent uppercase tracking-tight mb-16 text-center">
          Leadership
        </h2>

        <div className="flex flex-col gap-4">
          {EXTRAS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className={`border transition-colors duration-300 rounded-2xl overflow-hidden ${isOpen ? 'border-brand-accent/50 bg-white/5' : 'border-white/10 hover:border-white/20'}`}
              >
                <button 
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-brand-accent/50 text-sm hidden md:inline-block">{item.id}</span>
                    <h3 className={`text-2xl md:text-3xl font-display transition-colors ${isOpen ? 'text-brand-accent' : 'text-white'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-white/50 h-8 w-8 flex items-center justify-center rounded-full border border-white/10 shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-6 md:px-8 pb-8 pt-0 flex flex-col md:flex-row md:items-start gap-8"
                      >
                        <div className="md:w-1/3 flex flex-col gap-2">
                          <span className="font-mono text-xs text-white/40 uppercase tracking-widest text-left">Event / Group</span>
                          <span className="text-white font-mono text-sm">{item.event}</span>
                          
                          <div className="h-4" />
                          
                          <span className="font-mono text-xs text-white/40 uppercase tracking-widest text-left">Role</span>
                          <span className="text-white font-mono text-sm">{item.role}</span>
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-white/70 leading-relaxed text-lg">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
