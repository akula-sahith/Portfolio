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
import { ArrowLeft, ExternalLink, Github, ArrowUpRight, FileText, Filter, X } from 'lucide-react';
import { PORTFOLIO_DATA } from './data';

// ─── Tech Logo Mapping (subset for All Projects page) ───────────────────────
const TECH_LOGO_MAP: Record<string, string> = {
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  tailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'spring boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
};
function getTechLogo(tech: string): string | null {
  return TECH_LOGO_MAP[tech.toLowerCase().trim()] ?? null;
}

const PROJECT_CATEGORIES = ['All', 'Full Stack', 'AI/ML', 'Computer Vision', 'Smart City', 'Travel'];
const PROJECT_CATEGORY_MAP: Record<string, string> = {
  '1': 'Computer Vision',
  '2': 'Full Stack',
  '3': 'AI/ML',
  '4': 'Smart City',
  '5': 'Travel',
};

// ─── MiniTechBadge ───────────────────────────────────────────────────────────
function MiniTechBadge({ tech }: { tech: string }) {
  const logoUrl = getTechLogo(tech);
  const [err, setErr] = React.useState(false);
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 mr-1 mb-1">
      {logoUrl && !err && (
        <img src={logoUrl} alt="" className="w-3 h-3 object-contain" onError={() => setErr(true)} />
      )}
      {tech}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpen }: { project: any; index: number; onOpen: (p: any) => void }) {
  const [hovered, setHovered] = React.useState(false);
  const category = PROJECT_CATEGORY_MAP[project.id] ?? 'Full Stack';

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-accent/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.03)] flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] relative overflow-hidden bg-[#0a0a0a]">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-brand-accent uppercase tracking-widest">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-display text-white leading-tight mb-2 group-hover:text-brand-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          {/* Tech badges preview (first 3) */}
          <div className="flex flex-wrap mb-4">
            {(project.detailed?.techStack ?? []).slice(0, 3).map((tech: string) => (
              <MiniTechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/8">
          <button
            onClick={() => onOpen(project)}
            className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 flex items-center justify-center gap-2"
          >
            Case Study <ArrowUpRight size={11} />
          </button>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 flex items-center justify-center"
              title="Live Demo"
            >
              <ExternalLink size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 flex items-center justify-center"
              title="GitHub"
            >
              <Github size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const detail = project?.detailed;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[88vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-white/8 shrink-0">
          <div>
            <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">Case Study</span>
            <h3 className="text-2xl font-display text-white uppercase tracking-tighter leading-none mt-1">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-accent hover:text-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-white/8 bg-black/40">
            <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-contain block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>

          {detail?.problemStatement && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-brand-accent" />
                <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">Problem</span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">{detail.problemStatement}</p>
            </div>
          )}

          {detail?.solution && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-brand-accent" />
                <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">Solution</span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">{detail.solution}</p>
            </div>
          )}

          {detail?.features?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-brand-accent" />
                <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">Key Features</span>
              </div>
              <ul className="space-y-2">
                {detail.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-white/65 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detail?.techStack?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-[1px] bg-brand-accent" />
                <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {detail.techStack.map((tech: string, i: number) => (
                  <MiniTechBadge key={i} tech={tech} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="shrink-0 px-8 py-5 border-t border-white/8 flex gap-3 bg-[#060606]">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150">
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          {project.paperUrl && (
            <a href={project.paperUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150">
              <FileText size={13} /> Paper
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/15 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/8 active:scale-95 transition-all duration-150">
              <Github size={13} /> Source
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── All Projects Page ────────────────────────────────────────────────────────
function AllProjectsPage({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedProject, setSelectedProject] = React.useState<any>(null);

  const allProjects = PORTFOLIO_DATA.artworks;

  const filtered = React.useMemo(() => {
    if (selectedCategory === 'All') return allProjects;
    return allProjects.filter(p => PROJECT_CATEGORY_MAP[p.id] === selectedCategory);
  }, [selectedCategory, allProjects]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050505] relative z-50 text-white px-6 md:px-12 py-16"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-3 w-max text-brand-accent hover:text-white transition-colors duration-200 mb-16 font-mono uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-brand-accent" />
              <span className="text-brand-accent text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Archive</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-white uppercase tracking-tighter leading-none mb-6">
              All <span className="text-brand-accent">Projects</span>
            </h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.15em] leading-relaxed">
              Full archive of built products, platforms, and experiments.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-4 text-white/30">
            <Filter size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Filter by:</span>
          </div>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-black border-brand-accent font-bold'
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/20 font-mono text-sm uppercase tracking-widest">No projects in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
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

              <Skills />
              <Experience />

              {/* Certifications — expands inline, no separate route needed */}
              <Certifications />
              <CodingProfiles />
              <Achievements />
              <Extracurriculars />

              <Contact />
            </motion.div>
          ) : (
            <AllProjectsPage key="projects" onBack={() => setView('home')} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
