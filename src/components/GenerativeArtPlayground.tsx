import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid3x3,
  Cpu,
  Image as ImageIcon,
} from 'lucide-react';

/* ─── Artwork data ──────────────────────────────────────────── */
type ArtCategory = 'All' | 'Paintings' | 'Sketches' | 'Tattoo Art' | 'Wall Art';

interface Artwork {
  id: string;
  src: string;
  title: string;
  category: Exclude<ArtCategory, 'All'>;
  medium: string;
  description: string;
}

const artworks: Artwork[] = [
  // ── Paintings ──────────────────────────────────────────
  {
    id: 'radha-krishna',
    src: '/images/artworks/radha-krishna.jpg',
    title: 'Radha & Krishna',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'Bold flat-art style capturing the divine union of Radha and Krishna with vivid orange, red, and blue pigments.',
  },
  {
    id: 'yaksha-deity',
    src: '/images/artworks/yaksha-deity.jpg',
    title: 'Yaksha Deity',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A richly ornamented folk deity rendered in traditional South Indian iconographic style on a deep green ground.',
  },
  {
    id: 'shiva-cosmic-blue',
    src: '/images/artworks/shiva-cosmic-blue.jpg',
    title: 'Shiva — Cosmic Meditation',
    category: 'Paintings',
    medium: 'Acrylic on Paper',
    description: 'Lord Shiva in deep cosmic meditation, painted with galaxy-blue tones, white splatter starfields, and a vivid saffron tilak.',
  },
  {
    id: 'ram-lalla',
    src: '/images/artworks/ram-lalla.jpg',
    title: 'Ram Lalla',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    description: 'A luminous portrayal of Ram Lalla — the child form of Lord Ram — adorned in gold ornaments against a warm saffron glow.',
  },
  {
    id: 'sadhu-saint',
    src: '/images/artworks/sadhu-saint.jpg',
    title: 'The Sadhu Saint',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    description: 'A photorealistic oil painting of a revered sadhu seated before an ornate temple shrine, holding a golden idol and a danda.',
  },
  {
    id: 'bharatanatyam',
    src: '/images/artworks/bharatanatyam.jpg',
    title: 'Bharatanatyam',
    category: 'Paintings',
    medium: 'Acrylic on Black Canvas',
    description: 'A Bharatanatyam dancer frozen mid-pose on a pure black canvas — vibrant costume, precise mudra, and graceful balance.',
  },

  // ── Tattoo Art ─────────────────────────────────────────
  {
    id: 'agni-shiva-tattoo',
    src: '/images/artworks/agni-shiva-tattoo.jpg',
    title: 'Agni Shiva — Tattoo Art',
    category: 'Tattoo Art',
    medium: 'Tattoo Ink on Synthetic Fake Skin',
    description: 'Lord Shiva wielding the trishul, surrounded by roaring fire — precision tattoo needlework and shading executed on practice fake skin.',
  },

  // ── Sketches ───────────────────────────────────────────
  {
    id: 'shiva-kali-sketch',
    src: '/images/artworks/shiva-kali-sketch.jpg',
    title: 'Shiva & Kali — Graphite',
    category: 'Sketches',
    medium: 'Graphite Pencil on Cartridge Paper',
    description: 'A monumental graphite study — serene Shiva above and fierce Kali below — showcasing fine tonal gradation and anatomical detail.',
  },
  {
    id: 'portrait-red-ink',
    src: '/images/artworks/portrait-red-ink.jpg',
    title: 'Portrait in Red Ink',
    category: 'Sketches',
    medium: 'Red Ballpoint Pen on Paper',
    description: 'A monochromatic portrait study executed entirely in red ballpoint, capturing subtle expression and hair texture through controlled hatching.',
  },
  {
    id: 'aghor-shiva-pen',
    src: '/images/artworks/aghor-shiva-pen.jpg',
    title: 'Aghor Shiva — Pen Sketch',
    category: 'Sketches',
    medium: 'Ink Pen on Notebook Paper',
    description: 'A dynamic pen sketch of Aghor Shiva dancing in the Tandava — wild hair, multiple arms, and fierce energy captured in fine linework.',
  },
  {
    id: 'krishna-watercolour',
    src: '/images/artworks/krishna-watercolour.jpg',
    title: 'Krishna — Watercolour',
    category: 'Sketches',
    medium: 'Watercolour & Ink on Sketchbook',
    description: 'Young Krishna adorned with peacock feathers and gold jewellery, rendered in delicate watercolour washes with clean ink outlines.',
  },

  // ── Wall Art ───────────────────────────────────────────
  {
    id: 'hanuman-wall-mural',
    src: '/images/artworks/hanuman-wall-mural.jpg',
    title: 'Hanuman Wall Mural',
    category: 'Wall Art',
    medium: 'Wall Painting / Acrylic',
    description: 'A bold monochrome Hanuman mural painted directly on a wall, paired with a hand-illustrated Bajrang Dal flag in Kannada script.',
  },
];

const CATEGORIES: ArtCategory[] = ['All', 'Paintings', 'Sketches', 'Tattoo Art', 'Wall Art'];

/* ─── Generative canvas types ──────────────────────────────── */
type PaletteKey = 'cyberpunk' | 'matrix' | 'aurora' | 'solar';

const palettes: Record<PaletteKey, { name: string; colors: string[] }> = {
  cyberpunk: { name: 'Cyberpunk Neon',   colors: ['#00F5FF', '#FF4FD8', '#A970FF', '#39FF88'] },
  matrix:   { name: 'Terminal Green',    colors: ['#39FF88', '#10B981', '#00F5FF', '#059669'] },
  aurora:   { name: 'Electric Aurora',   colors: ['#A970FF', '#8B5CF6', '#00F5FF', '#EC4899'] },
  solar:    { name: 'Solar Flare',       colors: ['#FFB84D', '#FF5C5C', '#FF4FD8', '#F59E0B'] },
};

/* ─── Lightbox component ────────────────────────────────────── */
interface LightboxProps {
  artwork: Artwork;
  all: Artwork[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Lightbox: React.FC<LightboxProps> = ({ artwork, all, onClose, onNavigate }) => {
  const idx = all.findIndex((a) => a.id === artwork.id);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork: ${artwork.title}`}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 p-2 rounded-full bg-bg-secondary border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {idx > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-secondary/80 border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next */}
      {idx < all.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-secondary/80 border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          aria-label="Next artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div
        className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Info panel */}
        <div className="lg:w-64 shrink-0 hypr-window rounded-xl p-5 font-mono text-sm flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-terminal-purple text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{artwork.category}</span>
            </div>
            <h3 className="text-white font-bold text-lg font-sans leading-snug">{artwork.title}</h3>
            <p className="text-muted text-xs leading-relaxed">{artwork.description}</p>
            <div className="pt-2 border-t border-bg-tertiary space-y-1 text-xs text-muted">
              <div><span className="text-terminal-cyan">medium:</span> {artwork.medium}</div>
              <div><span className="text-terminal-cyan">index:</span>  {String(idx + 1).padStart(2, '0')} / {String(all.length).padStart(2, '0')}</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-600 font-mono">
            ← → arrow keys to navigate · Esc to close
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ────────────────────────────────────────── */
export const GenerativeArtPlayground: React.FC = () => {
  // Gallery state
  const [activeCategory, setActiveCategory] = useState<ArtCategory>('All');
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'generative'>('gallery');

  // Generative canvas state
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying]             = useState<boolean>(true);
  const [palette, setPalette]                 = useState<PaletteKey>('cyberpunk');
  const [particleDensity, setParticleDensity] = useState<number>(140);
  const [speed, setSpeed]                     = useState<number>(1);
  const [seed, setSeed]                       = useState<number>(0);

  /* ── Filtered artworks ── */
  const filtered = activeCategory === 'All'
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

  /* ── Lightbox navigation ── */
  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!lightboxArtwork) return;
    const idx = filtered.findIndex((a) => a.id === lightboxArtwork.id);
    const next = direction === 'prev' ? idx - 1 : idx + 1;
    if (next >= 0 && next < filtered.length) setLightboxArtwork(filtered[next]);
  }, [lightboxArtwork, filtered]);

  /* ── Generative canvas ── */
  useEffect(() => {
    if (activeTab !== 'generative') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width  = (canvas.width  = canvas.parentElement?.clientWidth  || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; angle: number;
    }

    const currentColors = palettes[palette].colors;
    const particles: Particle[] = Array.from({ length: particleDensity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5 * speed,
      vy: (Math.random() - 0.5) * 1.5 * speed,
      size: Math.random() * 2.5 + 1,
      color: currentColors[Math.floor(Math.random() * currentColors.length)],
      angle: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: width / 2, y: height / 2, active: false };

    const onMouseMove  = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; };
    const onMouseLeave = () => { mouse.active = false; };
    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      if (!isPlaying) { animationId = requestAnimationFrame(render); return; }
      ctx.fillStyle = 'rgba(8, 11, 16, 0.12)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += 0.015 * speed;
        p.x += Math.cos(p.angle) * 1.2 * speed + p.vx;
        p.y += Math.sin(p.angle) * 1.2 * speed + p.vy;
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) { const f = (140 - dist) / 140; p.x -= (dx / dist) * f * 3 * speed; p.y -= (dy / dist) * f * 3 * speed; }
        }
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.shadowBlur = 10; ctx.shadowColor = p.color; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j], d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 70) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color; ctx.globalAlpha = (1 - d / 70) * 0.45;
            ctx.lineWidth = 0.6; ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }
      animationId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      if (canvas.parentElement) { width = canvas.width = canvas.parentElement.clientWidth; height = canvas.height = canvas.parentElement.clientHeight; }
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animationId); canvas.removeEventListener('mousemove', onMouseMove); canvas.removeEventListener('mouseleave', onMouseLeave); window.removeEventListener('resize', onResize); };
  }, [activeTab, isPlaying, palette, particleDensity, speed, seed]);

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `nandeeshos-generative-art-${palette}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  /* ── Render ── */
  return (
    <section id="art" className="py-24 relative border-t border-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-purple">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // DIGITAL_STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Art Studio
            </h2>
            <p className="text-muted text-sm sm:text-base font-mono">
              Original artwork — paintings, sketches, tattoo art on synthetic skin, and murals — alongside an interactive generative canvas.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1 bg-bg-secondary border border-bg-tertiary rounded-xl font-mono text-xs shrink-0">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-terminal-purple/20 text-terminal-purple border border-terminal-purple/40'
                  : 'text-muted hover:text-slate-200'
              }`}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              My Artworks
            </button>
            <button
              onClick={() => setActiveTab('generative')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'generative'
                  ? 'bg-terminal-cyan/20 text-terminal-cyan border border-terminal-cyan/40'
                  : 'text-muted hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Generative Canvas
            </button>
          </div>
        </div>

        {/* ── GALLERY TAB ── */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">

            {/* Category filter bar */}
            <div className="hypr-window rounded-xl px-4 py-3 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-muted mr-1">filter:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-terminal-purple/20 text-terminal-purple border border-terminal-purple/40 font-semibold'
                      : 'text-muted hover:text-slate-200 border border-transparent hover:border-bg-tertiary'
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({cat === 'All' ? artworks.length : artworks.filter(a => a.category === cat).length})
                  </span>
                </button>
              ))}
              <span className="ml-auto text-slate-600 text-[11px]">
                {filtered.length} work{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((artwork) => (
                <div
                  key={artwork.id}
                  className="break-inside-avoid group relative hypr-window rounded-xl overflow-hidden cursor-pointer hover:border-terminal-purple/60 transition-all duration-300"
                  onClick={() => setLightboxArtwork(artwork)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${artwork.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxArtwork(artwork)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={artwork.src}
                      alt={artwork.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-terminal-cyan" />
                        <span className="text-white text-xs font-mono">View full size</span>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-3 py-3 bg-bg-secondary space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-white text-sm font-semibold font-sans leading-tight">{artwork.title}</span>
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-terminal-purple/15 text-terminal-purple border border-terminal-purple/30">
                        {artwork.category}
                      </span>
                    </div>
                    <p className="text-muted text-[11px] font-mono">{artwork.medium}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted font-mono text-sm">
                <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No artworks in this category yet.
              </div>
            )}
          </div>
        )}

        {/* ── GENERATIVE CANVAS TAB ── */}
        {activeTab === 'generative' && (
          <div className="hypr-window rounded-2xl overflow-hidden flex flex-col shadow-window">

            {/* Controls bar */}
            <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
                <span className="font-bold">GEN_FLOW_FIELD.canvas</span>
                <span className="text-muted text-[11px] hidden sm:inline">[60 FPS // Vector Particles]</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Palette */}
                <div className="flex items-center gap-1 bg-bg-tertiary p-1 rounded-lg">
                  {(Object.keys(palettes) as PaletteKey[]).map((pKey) => (
                    <button
                      key={pKey}
                      onClick={() => setPalette(pKey)}
                      className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                        palette === pKey
                          ? 'bg-terminal-cyan/20 text-terminal-cyan border border-terminal-cyan/40 font-semibold'
                          : 'text-muted hover:text-slate-200'
                      }`}
                    >
                      {pKey}
                    </button>
                  ))}
                </div>

                {/* Sliders */}
                <div className="hidden lg:flex items-center gap-4 text-muted text-[11px]">
                  <label className="flex items-center gap-1.5">
                    <span>Density:</span>
                    <input type="range" min="50" max="220" value={particleDensity} onChange={(e) => setParticleDensity(Number(e.target.value))} className="w-20 accent-terminal-cyan" />
                    <span className="text-slate-300 w-6">{particleDensity}</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>Speed:</span>
                    <input type="range" min="0.5" max="2.5" step="0.5" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-16 accent-terminal-green" />
                    <span className="text-slate-300 w-6">{speed}x</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setIsPlaying((v) => !v)} className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-slate-200 transition-colors" title={isPlaying ? 'Pause' : 'Resume'}>
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-terminal-amber" /> : <Play className="w-3.5 h-3.5 text-terminal-green" />}
                  </button>
                  <button onClick={() => setSeed((s) => s + 1)} className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-slate-200 transition-colors" title="Regenerate">
                    <RotateCcw className="w-3.5 h-3.5 text-terminal-cyan" />
                  </button>
                  <button onClick={handleExportPNG} className="px-2.5 py-1 rounded-lg bg-terminal-cyan/10 hover:bg-terminal-cyan/20 border border-terminal-cyan/30 text-terminal-cyan transition-colors flex items-center gap-1 text-[11px]">
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Export PNG</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative w-full h-[450px] sm:h-[540px] bg-[#080B10] cursor-crosshair">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute bottom-4 left-4 pointer-events-none p-3 rounded-xl bg-bg-secondary/80 border border-bg-tertiary backdrop-blur-md font-mono text-[11px] text-muted">
                <span className="text-terminal-green font-bold">Pointer Interaction Active</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Drag cursor to bend harmonic vector field lines.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-bg-secondary border-t border-bg-tertiary flex items-center justify-between font-mono text-[11px] text-muted">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-terminal-purple" />
                <span>Palette: {palettes[palette].name}</span>
              </div>
              <span>Engine: HTML5 Canvas 2D</span>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox */}
      {lightboxArtwork && (
        <Lightbox
          artwork={lightboxArtwork}
          all={filtered}
          onClose={() => setLightboxArtwork(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
};
