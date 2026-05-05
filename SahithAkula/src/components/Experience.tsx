import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const EXPERIENCES = [
  {
    id: '01',
    role: 'Full Stack Developer Intern',
    company: 'Univybe (Remote / Hybrid)',
    duration: 'Jan 2026 – Present',
    desc: [
      'Developed full-stack web applications using React.js for frontend and Spring Boot for backend REST APIs.',
      'Developed a Flutter mobile application for a client to manage service bookings and receive real-time notifications using Firebase Cloud Messaging (FCM).',
      'Collaborated in an Agile environment, participating in sprint planning and code reviews to ensure code quality.',
    ]
  }
];

export default function Experience() {
  return (
    <section className="bg-brand-bg w-full py-32 px-6 lg:px-12 border-t border-brand-border relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 justify-center">
          <Briefcase className="text-brand-accent" size={32} />
          <h2 className="text-3xl font-display text-brand-accent uppercase tracking-tight text-center">
            Experience
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-8">
          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(205,255,100,0.5)]" />
              <div className="absolute -left-[15px] top-0.5 w-7 h-7 rounded-full border border-brand-accent/30 bg-brand-bg md:-left-[15px]" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-2xl font-display text-white tracking-wide">{exp.role}</h3>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-accent px-3 py-1 rounded bg-brand-accent/5 border border-brand-accent/20 w-max">
                  {exp.duration}
                </span>
              </div>
              
              <h4 className="text-white/60 font-mono text-sm tracking-widest uppercase mb-6">{exp.company}</h4>
              
              <ul className="space-y-3">
                {exp.desc.map((item, idx) => (
                  <li key={idx} className="text-white/70 text-base leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
