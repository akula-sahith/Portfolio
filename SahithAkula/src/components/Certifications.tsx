import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Award, FileText, X, Filter } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

// ─── Constants & Utils ───────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Cloud', 'DevOps', 'Backend', 'Programming', 'AI/ML', 'Entrepreneurship'];

const getPreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
const getThumbnailUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

// ─── Certification Modal ─────────────────────────────────────────────────────
function CertModal({ cert, onClose }: { cert: any; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div>
            <h3 className="text-xl font-display text-white uppercase tracking-tight">{cert.title}</h3>
            <p className="text-brand-accent text-[10px] font-mono uppercase tracking-widest mt-1">
              {cert.issuer} • {cert.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-accent hover:text-black transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Iframe content */}
        <div className="w-full h-full pt-20 bg-black">
          <iframe
            src={getPreviewUrl(cert.fileId)}
            className="w-full h-full border-0"
            allow="autoplay"
            title={cert.title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Certification Card ──────────────────────────────────────────────────────
function CertCard({ cert, index, onOpen }: { cert: any; index: number; onOpen: (c: any) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-accent/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.03)] flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
        <motion.img
          src={getThumbnailUrl(cert.fileId)}
          alt={cert.title}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-brand-accent uppercase tracking-widest">
            {cert.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-display text-white leading-tight mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-white/40 text-[11px] font-mono uppercase tracking-widest mb-6">
            {cert.issuer} • {cert.date}
          </p>
        </div>

        <button
          onClick={() => onOpen(cert)}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
        >
          View Certificate
          <ExternalLink size={12} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Certifications({
  onViewAll,
  initialExpanded = false
}: {
  onViewAll?: () => void;
  initialExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const allCerts = PORTFOLIO_DATA.certifications;
  const featuredCerts = allCerts.slice(0, 3); // AWS, Docker, SpringBoot (based on data.ts order)

  const filteredCerts = useMemo(() => {
    if (selectedCategory === 'All') return allCerts;
    return allCerts.filter(c => c.category === selectedCategory);
  }, [selectedCategory, allCerts]);

  const displayCerts = isExpanded ? filteredCerts : featuredCerts;

  return (
    <section className="bg-[#050505] w-full py-24 md:py-32 px-6 lg:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-brand-accent" />
              <span className="text-brand-accent text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Credentials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-white uppercase tracking-tighter leading-none mb-6">
              Verified <span className="text-brand-accent">Certifications</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.15em] leading-relaxed">
              Technical credentials validated through official issuing bodies.
            </p>
          </div>

          {!isExpanded && (
            <button
              onClick={() => {
                if (onViewAll) onViewAll();
                else setIsExpanded(true);
              }}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest group"
            >
              View All Certificates
              <div className="w-2 h-2 rounded-full bg-brand-accent group-hover:bg-black transition-colors" />
            </button>
          )}
        </div>

        {/* Filter Buttons (only visible when expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <div className="flex items-center gap-2 mr-4 text-white/30">
                <Filter size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Filter by:</span>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                    ? 'bg-brand-accent text-black border-brand-accent font-bold'
                    : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                    }`}
                >
                  {cat}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsExpanded(false);
                  setSelectedCategory('All');
                }}
                className="ml-auto px-4 py-2 text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest flex items-center gap-2"
              >
                <X size={12} />
                Collapse
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayCerts.map((cert, index) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={index}
                onOpen={setSelectedCert}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {displayCerts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/20 font-mono text-sm uppercase tracking-widest">No certificates found in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
