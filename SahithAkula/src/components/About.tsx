import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data';
import AboutVisual from './AboutVisual';

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-brand-bg w-full z-10">
      <div className="flex flex-col md:flex-row w-full relative">
        {/* Animated Visual Wrapper (Background on mobile, Right side on desktop) */}
        <div className="absolute top-0 right-0 w-full md:relative md:w-1/2 h-full md:h-auto pointer-events-none z-0">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <div className="absolute inset-0 z-0 opacity-20 md:opacity-100">
              <AboutVisual activeIndex={activeIndex} />
            </div>
            {/* Section Index Indicator */}
            <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-12 text-right z-10 hidden md:block">
              <div className="font-mono text-brand-accent text-4xl lg:text-5xl font-bold tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <div className="font-mono text-white/30 text-lg lg:text-xl tabular-nums tracking-widest">
                / {String(PORTFOLIO_DATA.apart.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Scrolling Content */}
        <div className="w-full md:w-1/2 relative z-20 pb-[20vh] lg:pb-[30vh]">
          {/* Title */}
          <div className="sticky top-0 z-30 pointer-events-none">
            <div className="bg-brand-bg pt-20 lg:pt-24 pb-8 px-6 lg:pl-12 lg:pr-12">
              <h2 className="text-2xl lg:text-3xl font-display text-brand-accent uppercase tracking-tight">
                WHAT SETS ME APART
              </h2>
            </div>
            <div className="h-16 lg:h-24 bg-gradient-to-b from-brand-bg to-transparent pointer-events-none" />
          </div>

          <div className="pt-4 lg:pt-8 pb-12 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
             {/* Connecting Line */}
             <div className="absolute left-[2.25rem] lg:left-[3.25rem] top-0 bottom-0 w-[1px] bg-white/10" />

            {PORTFOLIO_DATA.apart.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div 
                  key={item.id}
                  className="min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-center max-w-lg relative pl-8 lg:pl-12"
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ amount: 0.5, margin: "0px 0px -30% 0px" }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-2px] lg:left-0 top-1/2 -translate-y-1/2 flex items-center justify-center -ml-[3px]">
                    <div className={`transition-all duration-500 rounded-full ${isActive ? 'w-2 h-2 lg:w-2 lg:h-2 bg-brand-accent' : 'w-1.5 h-1.5 bg-white/20'}`} />
                  </div>

                  <div className={`transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-2 lg:-translate-x-4'}`}>
                    <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                       <span className="text-brand-accent/50 text-[10px] lg:text-xs font-mono font-bold">{item.id}</span>
                       <div className="w-3 lg:w-4 h-[1px] bg-brand-accent/30" />
                      <p className="text-brand-accent px-2 py-1 rounded border border-brand-accent/20 bg-brand-accent/5 text-[10px] lg:text-xs font-mono tracking-widest uppercase inline-block">
                        {item.category}
                      </p>
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display text-white tracking-tighter mb-4 lg:mb-6 whitespace-pre-line leading-[1]">
                      {item.title}
                    </h3>
                    <p className="text-white/80 md:text-white/60 text-base lg:text-lg leading-relaxed max-w-sm lg:max-w-md drop-shadow-md md:drop-shadow-none font-medium md:font-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
