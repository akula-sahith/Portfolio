import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { X, ChevronRight, ChevronLeft, ExternalLink, Github, ArrowUpRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

// ─── Tech Logo Mapping ──────────────────────────────────────────────────────
// Uses devicons CDN for real logos
const TECH_LOGO_MAP: Record<string, string> = {
  // Languages
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  rust: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
  // Frameworks & Libraries
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  svelte: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  nuxt: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  'nuxt.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  nestjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
  django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  rails: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
  flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  electron: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
  three: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  graphql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  // Styling
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  tailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'tailwind css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'html5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  // Databases
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  sqlite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  prisma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  // Runtimes & Tools
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  deno: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg',
  bun: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  webpack: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
  vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  // Cloud
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  gcp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'google cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  vercel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  netlify: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
  // Testing
  jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  vitest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-original.svg',
  cypress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg',
  // Other
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  nginx: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  openai: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
};

function getTechLogo(tech: string): string | null {
  const key = tech.toLowerCase().trim();
  return TECH_LOGO_MAP[key] ?? null;
}

// ─── TechBadge ───────────────────────────────────────────────────────────────
function TechBadge({ tech }: { tech: string }) {
  const logoUrl = getTechLogo(tech);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-accent/40 hover:bg-white/8 transition-all duration-200 group">
      {logoUrl && !imgError ? (
        <img
          src={logoUrl}
          alt={tech}
          onError={() => setImgError(true)}
          className="w-4 h-4 object-contain group-hover:scale-110 transition-transform duration-200"
        />
      ) : (
        <span className="w-4 h-4 flex items-center justify-center text-brand-accent text-[10px] font-bold">
          {tech.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-[11px] font-mono text-white/75 group-hover:text-white/95 transition-colors whitespace-nowrap">
        {tech}
      </span>
    </div>
  );
}

// ─── 3D Carousel ─────────────────────────────────────────────────────────────
function CarouselItem({
  url,
  index,
  total,
  progressMV,
  aspectRatio,
}: {
  url: string;
  index: number;
  total: number;
  progressMV: any;
  aspectRatio: number;
}) {
  const ref = useRef<any>(null);
  const texture = useTexture(url);
  const [aspect, setAspect] = useState(aspectRatio);

  useEffect(() => {
    if (texture.image) {
      const img = texture.image as HTMLImageElement;
      setAspect(img.width / img.height);
    }
  }, [texture]);

  const myProgress = index / Math.max(total - 1, 1);
  const step = 1 / Math.max(total - 1, 1);

  useFrame(() => {
    if (!ref.current) return;
    const currentScroll = progressMV.get();
    const dist = currentScroll - myProgress;
    const relativeDist = step === 0 ? 0 : dist / step;

    const x = -relativeDist * 7.5;
    const z = -Math.abs(relativeDist) * 2.5;
    const rotY = relativeDist * 0.12;
    const rotZ = -relativeDist * 0.04;
    const scale = Math.max(0.55, 1 - Math.abs(relativeDist) * 0.18);
    const opacity = Math.max(0, 1 - Math.abs(relativeDist) * 0.9);
    const grayscale = Math.min(1, Math.abs(relativeDist) * 0.6);

    ref.current.position.x = x;
    ref.current.position.z = z;
    ref.current.rotation.y = rotY;
    ref.current.rotation.z = rotZ;

    // Scale dynamically using the true aspect ratio of the image
    // Ensure it fits within a reasonable screen area (conservative bounds)
    const maxWidth = 7.0;
    const maxHeight = 3.5;

    let width = maxWidth;
    let height = width / aspect;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }

    // Scale further based on distance for carousel effect
    ref.current.scale.set(scale * width, scale * height, 1);
    ref.current.renderOrder = Math.round(100 - Math.abs(relativeDist) * 10);

    if (ref.current.material) {
      ref.current.material.opacity = opacity;
      // Simple grayscale approximation by dimming the color
      const gray = 1 - grayscale * 0.7;
      ref.current.material.color.setRGB(gray, gray, gray);
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
      />
    </mesh>
  );
}

function CarouselScene({ progressMV }: { progressMV: any }) {
  const total = PORTFOLIO_DATA.artworks.length;

  useFrame((state) => {
    const mx = (state.mouse.x * Math.PI) / 24;
    const my = (state.mouse.y * Math.PI) / 24;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mx, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, my, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {PORTFOLIO_DATA.artworks.map((item, i) => (
        <CarouselItem
          key={item.id}
          index={i}
          total={total}
          progressMV={progressMV}
          url={item.imageUrl}
          aspectRatio={(item as any).aspectRatio || 1.77}
        />
      ))}
    </group>
  );
}

// ─── Case Study Panel ─────────────────────────────────────────────────────────
function CaseStudyPanel({
  artwork,
  onClose,
}: {
  artwork: (typeof PORTFOLIO_DATA.artworks)[0] | null;
  onClose: () => void;
}) {
  if (!artwork) return null;
  const detail = (artwork as any)?.detailed;

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
        onClick={onClose}
      />
      <motion.aside
        key="panel"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 32, stiffness: 260, mass: 0.8 }}
        className="fixed top-0 right-0 z-50 h-screen w-full md:w-[520px] lg:w-[560px] bg-[#080808] border-l border-white/8 flex flex-col shadow-[-30px_0_80px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/6 shrink-0">
          <div>
            <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">
              Case Study
            </span>
            <h3 className="text-xl font-display text-white uppercase tracking-tighter leading-none mt-1">
              {artwork.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/6 hover:bg-brand-accent hover:text-black transition-all duration-200 shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero media */}
          <div className="px-7 pt-6 pb-0 flex justify-center">
            {(artwork as any).videoUrl ? (
              <video
                src={(artwork as any).videoUrl}
                autoPlay loop muted playsInline
                className="w-full h-auto object-contain rounded-xl border border-white/8 bg-black/50"
              />
            ) : (
              <div className="w-full flex justify-center rounded-xl border border-white/8 overflow-hidden bg-black/40 shadow-inner">
                <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-auto object-contain block" />
              </div>
            )}
          </div>

          <div className="px-7 py-6 space-y-7">
            {/* Problem & Solution side by side on wide panel */}
            <div className="grid grid-cols-1 gap-5">
              {detail?.problemStatement && (
                <div>
                  <SectionLabel>Problem</SectionLabel>
                  <p className="text-white/65 text-sm leading-relaxed">{detail.problemStatement}</p>
                </div>
              )}
              {detail?.solution && (
                <div>
                  <SectionLabel>Solution</SectionLabel>
                  <p className="text-white/65 text-sm leading-relaxed">{detail.solution}</p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {detail?.features?.length > 0 && (
              <div>
                <SectionLabel>Key Features</SectionLabel>
                <ul className="space-y-2.5">
                  {detail.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-white/65 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack with real logos */}
            {detail?.techStack?.length > 0 && (
              <div>
                <SectionLabel>Tech Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {detail.techStack.map((tech: string, i: number) => (
                    <TechBadge key={i} tech={tech} />
                  ))}
                </div>
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-4" />
          </div>
        </div>

        {/* CTA Footer */}
        <div className="shrink-0 px-7 py-5 border-t border-white/8 flex gap-3 bg-[#060606]">
          {artwork.demoUrl && (
            <a
              href={artwork.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {(artwork as any).paperUrl && (
            <a
              href={(artwork as any).paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150"
            >
              <FileText size={13} />
              Paper
            </a>
          )}
          {artwork.githubUrl && (
            <a
              href={artwork.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/15 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/8 active:scale-95 transition-all duration-150"
            >
              <Github size={13} />
              Source
            </a>
          )}
        </div>
      </motion.aside>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-4 h-[1px] bg-brand-accent" />
      <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase font-bold">
        {children}
      </span>
    </div>
  );
}

// ─── Progress Dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, active, onSelect }: { total: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative flex items-center justify-center w-5 h-5 group"
          aria-label={`Go to project ${i + 1}`}
        >
          <span
            className={`rounded-full transition-all duration-300 ${i === active
                ? 'w-4 h-1.5 bg-brand-accent'
                : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
              }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Artworks() {
  const containerRef = useRef<HTMLElement>(null);
  const numItems = PORTFOLIO_DATA.artworks.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPanelWidth = () => {
    if (windowWidth >= 1024) return 560; // lg
    if (windowWidth >= 768) return 520; // md
    return 0;
  };

  const currentPanelWidth = isPanelOpen ? getPanelWidth() : 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 28, stiffness: 150, mass: 0.6 });

  // Sync active index based on scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let index = Math.round(latest * (numItems - 1));
    index = Math.max(0, Math.min(numItems - 1, index));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Navigate to a specific index via window scroll
  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(numItems - 1, nextIndex));
      if (!containerRef.current || clamped === activeIndex) return;

      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      const targetFraction = numItems <= 1 ? 0 : clamped / (numItems - 1);
      const targetY = containerRef.current.offsetTop + targetFraction * scrollableDistance;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    },
    [activeIndex, numItems]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isPanelOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(activeIndex - 1);
      if (e.key === 'Escape') setIsPanelOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo, isPanelOpen]);

  const activeArtwork = PORTFOLIO_DATA.artworks[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] z-10" style={{ height: `${numItems * 100}vh` }}>
      <motion.div
        className="sticky top-0 h-screen overflow-hidden bg-[#050505]"
        animate={{ width: `calc(100% - ${currentPanelWidth}px)` }}
        transition={{ type: 'spring', damping: 32, stiffness: 260, mass: 0.8 }}
      >
        {/* ── WebGL Canvas ── */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
          <Canvas camera={{ position: [0, 0, 8.5], fov: 44 }}>
            <fog attach="fog" args={['#050505', 12, 30]} />
            <CarouselScene progressMV={smoothProgress} />
            <Environment preset="city" />
          </Canvas>
          {/* Vignette - softened */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_20px_rgba(5,5,5,0.9)]" />
        </div>

        {/* ── Header ── */}
        <div className="absolute top-8 left-6 md:left-12 z-20 pointer-events-none select-none">
          <h2 className="text-2xl md:text-3xl font-display text-brand-accent uppercase tracking-tight drop-shadow-lg">
            Featured Projects
          </h2>
          <p className="text-white/35 text-[10px] font-mono mt-1 uppercase tracking-widest">
            Scroll or use arrows to explore
          </p>
        </div>

        {/* ── Project Counter ── */}
        <div className="absolute top-8 right-6 md:right-12 z-20 pointer-events-none select-none text-right">
          <span className="text-brand-accent font-mono text-lg font-bold tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/25 font-mono text-lg">
            /{String(numItems).padStart(2, '0')}
          </span>
        </div>

        {/* ── Bottom Info Overlay ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Project text — animated per project */}
            <div className="relative h-[280px] sm:h-[240px] md:h-[200px] max-w-xl w-full flex items-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArtwork?.id ?? activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 w-full"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-5 h-[1px] bg-brand-accent block" />
                    <span className="text-brand-accent text-[9px] md:text-[10px] font-mono tracking-widest uppercase font-bold">
                      Project {String(activeIndex + 1).padStart(2, '0')} / {String(numItems).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-display text-white uppercase tracking-tighter leading-[0.88] mb-3">
                    {activeArtwork?.title}
                  </h3>

                  <p className="text-white/55 text-xs md:text-sm leading-relaxed max-w-sm line-clamp-2">
                    {activeArtwork?.description}
                  </p>

                  {/* Tags preview (first 3 from tech stack) */}
                  {((activeArtwork as any)?.detailed?.techStack ?? []).slice(0, 3).map((tech: string) => {
                    const logo = getTechLogo(tech);
                    return (
                      <span key={tech} className="inline-flex items-center gap-1.5 mr-1.5 mt-3 px-2 py-1 rounded-md bg-white/6 border border-white/10 text-[10px] font-mono text-white/50">
                        {logo && <img src={logo} alt="" className="w-3 h-3 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                        {tech}
                      </span>
                    );
                  })}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <button
                      onClick={() => setIsPanelOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-full hover:brightness-110 active:scale-95 transition-all duration-150"
                    >
                      Case Study
                      <ArrowUpRight size={12} />
                    </button>
                    {activeArtwork?.demoUrl && (
                      <a
                        href={activeArtwork.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-white/10 active:scale-95 transition-all duration-150"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    {(activeArtwork as any)?.paperUrl && (
                      <a
                        href={(activeArtwork as any).paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-white/10 active:scale-95 transition-all duration-150"
                      >
                        <FileText size={12} />
                        Paper
                      </a>
                    )}
                    {activeArtwork?.githubUrl && (
                      <a
                        href={activeArtwork.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-white/10 active:scale-95 transition-all duration-150"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-end gap-4 shrink-0">
              <ProgressDots total={numItems} active={activeIndex} onSelect={goTo} />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-brand-accent hover:text-black hover:border-brand-accent disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === numItems - 1}
                  className="w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-brand-accent hover:text-black hover:border-brand-accent disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Case Study Panel ── */}
      <AnimatePresence>
        {isPanelOpen && (
          <CaseStudyPanel artwork={activeArtwork} onClose={() => setIsPanelOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}