import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { artworksData } from '../data/artworksData';
import { 
  Palette, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles,
  Layers,
  Eye,
  Info
} from 'lucide-react';

export const ArtStudio: React.FC = () => {
  const [selectedMedium, setSelectedMedium] = useState<'all' | 'paint' | 'sketch' | 'wall' | 'fabric'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const mediumFilters = [
    { id: 'all', label: 'All Works (8)' },
    { id: 'paint', label: 'Paintings' },
    { id: 'sketch', label: 'Pencil & Graphite Sketches' },
    { id: 'wall', label: 'Wall Murals' },
    { id: 'fabric', label: 'Pigment on Fabric' },
  ];

  const filteredArtworks = artworksData.filter((art) => {
    if (selectedMedium === 'all') return true;
    return art.category === selectedMedium;
  });

  const openLightbox = (id: string) => {
    const idx = artworksData.findIndex((a) => a.id === id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevArtwork = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : artworksData.length - 1));
    }
  };

  const nextArtwork = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! < artworksData.length - 1 ? prev! + 1 : 0));
    }
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevArtwork();
      if (e.key === 'ArrowRight') nextArtwork();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex]);

  const activeArt = activeLightboxIndex !== null ? artworksData[activeLightboxIndex] : null;

  return (
    <section id="art-studio" className="py-24 relative overflow-hidden">
      {/* Subtle warm amber/purple atmospheric radial background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-slate-800/80 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-400 font-mono text-xs mb-3 shadow-inner">
              <Palette className="w-3.5 h-3.5" />
              <span>CREATIVE PRACTICE &amp; VISUAL CRAFTSMANSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Four Mediums. One Hand.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Alongside code, I maintain a rigorous studio practice creating original oil paintings, graphite studies, site-specific lime plaster wall murals, and natural dyes on fabric. Tactile craftsmanship deeply informs how I structure user interfaces, component hierarchies, and digital experiences.
            </p>
          </div>

          {/* Statement quote callout */}
          <div className="p-4 rounded-xl bg-dark-900/90 border border-slate-800 text-xs text-slate-300 font-serif italic max-w-sm">
            "I am less interested in what a work looks like, and more interested in what it feels like to stand in front of it — that specific quality of presence that a hand-made surface holds."
            <span className="block not-italic font-mono text-[10px] text-slate-400 mt-2 font-normal">
              — Nandeesh N K (Studio, Bengaluru)
            </span>
          </div>
        </div>

        {/* Medium Filters Toolbar */}
        <div className="flex items-center gap-2 my-8 overflow-x-auto pb-2 scrollbar-none" role="toolbar" aria-label="Filter artworks by medium">
          {mediumFilters.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMedium(m.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                selectedMedium === m.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-dark-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Artworks Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              onClick={() => openLightbox(art.id)}
              className="group cursor-pointer rounded-2xl bg-dark-900/90 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-[0_12px_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(art.id);
                }
              }}
              aria-label={`View ${art.title}, ${art.medium}`}
            >
              {/* Artwork Photo Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-dark-950">
                <img
                  src={art.image}
                  alt={`${art.title} — ${art.medium}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Inspect Details
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950/80 text-amber-300 border border-slate-800 backdrop-blur-sm">
                  {art.year}
                </div>
              </div>

              {/* Artwork Meta Caption */}
              <div className="p-4 border-t border-slate-800/80 bg-dark-900 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {art.medium}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{art.dimensions}</span>
                  <span className="uppercase text-amber-400/80">{art.category}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Tactile Craftsmanship Bridge Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-950 to-dark-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-amber-500/30 flex-shrink-0 shadow-lg">
            <img 
              src="/images/portrait.jpg" 
              alt="Nandeesh N K Studio Portrait" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h4 className="text-base font-bold text-white font-serif">
              Bridging Tactile Art &amp; Modern Software Architecture
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether preparing lime plaster for a fresco, choosing thread densities for fabric dye, or designing offline sync state machines in React &amp; Flutter — the underlying discipline is identical: understanding material constraints, honoring proportion, and crafting systems meant to endure.
            </p>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL DIALOG */}
      {/* ============================================================== */}
      {activeArt && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeArt.title}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[94vh] rounded-2xl bg-dark-900 border border-slate-800 shadow-2xl flex flex-col lg:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-dark-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Artwork Viewport with zoom/framing (7 cols) */}
            <div className="relative lg:w-7/12 bg-black flex items-center justify-center p-4 sm:p-6 min-h-[340px] sm:min-h-[460px]">
              <img
                src={activeArt.image}
                alt={`${activeArt.title} — ${activeArt.medium}`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prevArtwork(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-transform active:scale-95"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextArtwork(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-transform active:scale-95"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Curatorial Detail Panel (5 cols) */}
            <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between bg-dark-900 border-t lg:border-t-0 lg:border-l border-slate-800 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 uppercase tracking-widest text-[10px]">
                    {activeArt.category}
                  </span>
                  <span className="text-slate-500">
                    Artwork {activeLightboxIndex! + 1} of {artworksData.length}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {activeArt.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-mono mt-1">
                    {activeArt.medium} • {activeArt.year}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono text-xs text-slate-300">
                  <span className="text-slate-500">Physical Dimensions:</span> {activeArt.dimensions}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Artist Notes &amp; Material Analysis:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {activeArt.description}
                  </p>
                </div>
              </div>

              {/* Lightbox Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-500">Press Esc to exit</span>
                <button
                  onClick={closeLightbox}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
