import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const PROFILES = [
  { platform: 'LeetCode', desc: 'Active Problem Solver', link: 'https://leetcode.com/u/sahith_akula_08/' },
  { platform: 'HackerRank', desc: '5 Star Problem Solving', link: 'https://www.hackerrank.com/profile/akulasahith268' },
  { platform: 'GitHub', desc: 'Open Source & Projects', link: 'https://github.com/akula-sahith' },
];

export default function CodingProfiles() {
  return (
    <section className="bg-brand-bg w-full py-32 px-6 lg:px-12 border-t border-brand-border relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-display text-brand-accent uppercase tracking-tight mb-16">
          Coding Profiles
        </h2>

        <div className="flex flex-col">
          {PROFILES.map((profile, i) => (
            <motion.a
              key={i}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true, margin: "-10%" }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 hover:px-6 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-colors duration-500 -z-10" />
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display text-white mb-4 md:mb-0 relative overflow-hidden flex flex-wrap">
                {profile.platform.split('').map((char, charIndex) => (
                  <span key={charIndex} className="relative inline-flex flex-col overflow-hidden whitespace-pre-wrap">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full" style={{ transitionDelay: `${charIndex * 0.02}s` }}>
                      {char}
                    </span>
                    <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-brand-accent" style={{ transitionDelay: `${charIndex * 0.02}s` }}>
                      {char}
                    </span>
                  </span>
                ))}
              </h3>
              
              <div className="flex items-center gap-6">
                <span className="font-mono text-sm text-white/50 uppercase tracking-widest">{profile.desc}</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-black transition-all shrink-0">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
