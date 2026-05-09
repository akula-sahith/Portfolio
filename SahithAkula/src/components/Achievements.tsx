import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: '01', title: 'Game of Algorithms', event: 'IEEE', desc: 'Secured 1st Prize.' },
  { id: '02', title: 'StartUp Competition', event: 'College Level', desc: 'Secured 1st Prize.' },
  { id: '03', title: '24 Hour Hackathon', event: 'Potti Sree Ramulu College of Engineering', desc: 'Secured 2nd Prize.' },
  { id: '04', title: 'CodeVoyage', event: 'Coding Competition', desc: 'Secured 3rd Prize.' },
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="bg-[#050505] w-full py-32 px-6 lg:px-12 border-t border-white/5 relative z-10 overflow-clip">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-start">
        {/* Left fixed-like header */}
        <div className="md:w-1/3 md:sticky md:top-32">
          <Trophy className="text-brand-accent mb-6" size={40} />
          <h2 className="text-4xl md:text-5xl font-display text-white uppercase tracking-tight mb-6 mt-0">
            Achievements <br />& Honors
          </h2>
          <p className="text-white/50 font-mono text-sm leading-relaxed">
            Hackathons, coding contests, and recognitions.
          </p>
        </div>

        {/* Right scrolling cards */}
        <div className="md:w-2/3 flex flex-col gap-8 w-full">
          {ACHIEVEMENTS.map((ach) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-brand-accent font-mono text-xl font-bold">{ach.id}</span>
                <span className="w-8 h-[1px] bg-brand-accent/30" />
                <span className="text-white/60 font-mono text-sm tracking-widest uppercase">{ach.event}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display text-white mb-4">{ach.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed">{ach.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
