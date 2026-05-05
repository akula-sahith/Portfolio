import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Hero from './components/Hero';
import About from './components/About';
import Artworks from './components/Artworks';
import Certifications from './components/Certifications';
import CodingProfiles from './components/CodingProfiles';
import Achievements from './components/Achievements';
import Extracurriculars from './components/Extracurriculars';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Loader from './components/Loader';
import { ArrowLeft } from 'lucide-react';

// ─── All Projects placeholder — kept as stub until projects archive is built ──
function AllProjectsPlaceholder({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-bg relative z-50 text-white flex flex-col px-6 md:px-12 py-16"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-3 w-max text-brand-accent hover:text-white transition-colors duration-200 mb-24 font-mono uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter mb-8">
        All Projects
      </h1>
      <p className="text-brand-muted font-mono tracking-widest text-sm uppercase max-w-lg mb-12">
        Full archive coming soon. This section will be designed later.
      </p>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'projects'>('home');

  // Prevent background scroll during loader
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'unset';
  }, [loading]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text selection:bg-brand-accent selection:text-black">
      <AnimatePresence mode="sync">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div key="home" className="relative z-0" exit={{ opacity: 0 }}>
              <Hero />
              <About />
              <Artworks />

              <Skills />
              <Experience />

              {/* View All Projects */}
              <section className="bg-[#050505] w-full py-24 flex items-center justify-center relative z-10 border-t border-white/5">
                <button
                  onClick={() => setView('projects')}
                  className="px-8 py-4 border border-white/20 rounded-full text-white font-mono uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 group flex items-center gap-3"
                >
                  View All Projects
                  <span className="w-2 h-2 rounded-full bg-brand-accent group-hover:bg-black transition-colors" />
                </button>
              </section>

              {/* Certifications — expands inline, no separate route needed */}
              <Certifications />
              <CodingProfiles />
              <Achievements />
              <Extracurriculars />

              <Contact />
            </motion.div>
          ) : (
            <AllProjectsPlaceholder key="projects" onBack={() => setView('home')} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
