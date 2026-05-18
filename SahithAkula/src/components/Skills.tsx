import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code2, Database, Layout, BrainCircuit, Cloud, Cpu, ChevronDown, Server } from 'lucide-react';

const TECH_LOGO_MAP: Record<string, string> = {
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
  'spring boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'react.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  opencv: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'github actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
};

function getTechLogo(tech: string): string | null {
  const key = tech.toLowerCase().trim();
  return TECH_LOGO_MAP[key] ?? null;
}

const SKILLS = [
  {
    id: 'backend',
    category: 'Backend Engineering',
    icon: <Database size={20} />,
    items: [
      'Java',
      'Spring Boot',
      'Express.js',
      'REST APIs',
      'Microservices',
      'Node.js',
      'Firebase'
    ]
  },

  {
    id: 'aiml',
    category: 'AI / ML',
    icon: <BrainCircuit size={20} />,
    items: [
      'Machine Learning',
      'Deep Learning',
      'Scikit-learn',
      'TensorFlow',
      'LLMs',
      'RAG',
      'LangChain',
      'Ollama',
      'OpenCV',
      'Agentic AI Workflows',
      'Prompt Engineering'
    ]
  },

  {
    id: 'frontend',
    category: 'Frontend & Mobile',
    icon: <Layout size={20} />,
    items: [
      'React.js',
      'Flutter',
      'HTML',
      'CSS',
      'TailwindCSS'
    ]
  },

  {
    id: 'databases',
    category: 'Databases & Cloud',
    icon: <Server size={20} />,
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'ChromaDB',
      'Qdrant',
      'AWS'
    ]
  },

  {
    id: 'devops',
    category: 'DevOps & Tools',
    icon: <Cloud size={20} />,
    items: [
      'Docker',
      'Git',
      'GitHub Actions',
      'Linux',
      'CI/CD'
    ]
  },

  {
    id: 'swe',
    category: 'Software Engineering',
    icon: <Cpu size={20} />,
    items: [
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
      'Agile Methodologies',
      'SDLC',
      'Problem Solving'
    ]
  },
];


export default function Skills() {
  const [activeSection, setActiveSection] = useState<string | null>(SKILLS[0].id);

  return (
    <section id="skills" className="bg-brand-bg w-full py-32 px-6 lg:px-12 border-t border-brand-border relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 justify-center">
          <Terminal className="text-brand-accent" size={32} />
          <h2 className="text-3xl font-display text-brand-accent uppercase tracking-tight text-center">
            Technical Skills
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {SKILLS.map((skillGroup, idx) => {
            const isActive = activeSection === skillGroup.id;
            return (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isActive ? 'border-brand-accent/50 bg-white/5' : 'border-white/10 bg-black/20 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setActiveSection(isActive ? null : skillGroup.id)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-accent text-black' : 'bg-white/10 text-white'}`}>
                      {skillGroup.icon}
                    </div>
                    <h3 className={`text-xl font-display uppercase tracking-wider ${isActive ? 'text-brand-accent' : 'text-white'}`}>
                      {skillGroup.category}
                    </h3>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-white/50 transition-transform duration-300 ${isActive ? 'rotate-180 text-brand-accent' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <div className="flex flex-wrap gap-3">
                          {skillGroup.items.map(item => {
                            const logo = getTechLogo(item);
                            return (
                              <span
                                key={item}
                                className="px-4 py-2 bg-black flex items-center gap-2 border border-white/10 rounded-full text-sm text-white/80 font-mono hover:text-brand-accent hover:border-brand-accent/50 transition-colors shadow-sm"
                              >
                                {logo && <img src={logo} alt="" className="w-4 h-4 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                                {item}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
