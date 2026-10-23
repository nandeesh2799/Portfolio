import React, { useEffect, useState, useCallback } from 'react';
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

/* ─── Artwork data ──────────────────────────────────────────── */
interface Artwork {
  id: string;
  src: string;
  title: string;
  category: string;
  medium: string;
  description: string;
}

const artworks: Artwork[] = [
  // ── Paintings ──────────────────────────────────────────
  {
    id: 'shiva-parvati',
    src: '/images/artworks/shiva-parvati.jpg',
    title: 'Shiva Parvati',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'Stylized contemporary acrylic composition depicting Lord Shiva and Goddess Parvati in divine harmony.',
  },
  {
    id: 'yellamma-devi',
    src: '/images/artworks/yellamma-devi.jpg',
    title: 'Yellamma Diety',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A richly detailed devotional painting of Goddess Renuka Yellamma, adorned with traditional ornaments and radiant crown halo.',
  },
  {
    id: 'raghavendra-swamy',
    src: '/images/artworks/raghavendra-swamy.jpg',
    title: 'Raghvendra Swamy',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A serene portrait of Saint Sri Raghavendra Swamy of Mantralayam seated in contemplation, holding sacred idol and staff.',
  },
  {
    id: 'ram-lalla',
    src: '/images/artworks/ram-lalla.jpg',
    title: 'Ram Lalla',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    description: 'A luminous portrayal of Ram Lalla — the child form of Lord Ram — adorned in gold ornaments against a warm saffron glow.',
  },
  {
    id: 'nagavalli',
    src: '/images/artworks/nagavalli.jpg',
    title: 'Nagavalli',
    category: 'Paintings',
    medium: 'Acrylic on Black Canvas',
    description: 'Expressive classical dancer in striking costume and mudra pose against an intense black backdrop.',
  },
  {
    id: 'shiva-cosmic-blue',
    src: '/images/artworks/shiva-cosmic-blue.jpg',
    title: 'Shiva Cosmic Meditation',
    category: 'Paintings',
    medium: 'WaterColor on Paper',
    description: 'Lord Shiva in deep cosmic meditation, painted with galaxy-blue watercolour washes, celestial starfields, and crescent moon.',
  },

  // ── Fabric Art ─────────────────────────────────────────
  {
    id: 'agni-shiva-fabric',
    src: '/images/artworks/agni-shiva-fabric.jpg',
    title: 'Agni Shiva Fabric Painting',
    category: 'Fabric Art',
    medium: 'Fabric Painting on T-Shirt',
    description: 'Lord Shiva wielding the trishul, surrounded by roaring fire — hand-painted with fabric pigments directly onto a white t-shirt.',
  },

  // ── Tattoo Art ─────────────────────────────────────────
  {
    id: 'shiva-kali-tattoo',
    src: '/images/artworks/shiva-kali-tattoo.jpg',
    title: 'Shiva and Kali Tattoo',
    category: 'Tattoo Art',
    medium: 'Tattoo Ink on Fake Skin',
    description: 'Detailed tattoo needlework depicting serene Shiva and fierce Kali, practiced with precision needle shading on fake skin.',
  },

  // ── Sketches ───────────────────────────────────────────
  {
    id: 'krishna-watercolour',
    src: '/images/artworks/krishna-watercolour.jpg',
    title: 'Krishna Watercolour Painting',
    category: 'Sketches',
    medium: 'Watercolour & Ink on Sketchbook',
    description: 'Young Krishna adorned with peacock feathers and gold jewellery, rendered in delicate watercolour washes with clean ink outlines.',
  },
  {
    id: 'portrait-watercolour',
    src: '/images/artworks/portrait-watercolour.jpg',
    title: 'Portrait Watercolour Painting',
    category: 'Sketches',
    medium: 'Watercolour on Paper',
    description: 'Expressive portrait capturing a joyful smile with subtle shading and fine hair detailing.',
  },
  {
    id: 'aghor-shiva-pen',
    src: '/images/artworks/aghor-shiva-pen.jpg',
    title: 'Aghor Shiva — Pen Sketch',
    category: 'Sketches',
    medium: 'Ink Pen on Notebook Paper',
    description: 'A dynamic pen sketch of Aghor Shiva dancing in the Tandava — wild hair, multiple arms, and fierce energy captured in fine linework.',
  },

  // ── Wall Art ───────────────────────────────────────────
  {
    id: 'hanuman-wall-mural',
    src: '/images/artworks/hanuman-wall-mural.jpg',
    title: 'Hanuman Wall Painting with Rama/Hanuman Flag',
    category: 'Wall Art',
    medium: 'Wall Painting & Flag Painting',
    description: 'A bold monochrome Hanuman mural painted directly on a wall, accompanied by a hand-painted Rama-Hanuman flag with Kannada script.',
  },
];

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
      if (e.key === 'ArrowLeft') onNavigate('prev');
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
      {/* Close button */}
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
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next */}
      {idx < all.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-secondary/80 border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          aria-label="Next artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content modal */}
      <div
        className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Info panel */}
        <div className="lg:w-72 shrink-0 hypr-window rounded-xl p-5 font-mono text-sm flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-terminal-purple text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{artwork.category}</span>
            </div>
            <h3 className="text-white font-bold text-lg font-sans leading-snug">{artwork.title}</h3>
            <p className="text-muted text-xs leading-relaxed">{artwork.description}</p>
            <div className="pt-3 border-t border-bg-tertiary space-y-1.5 text-xs text-muted">
              <div>
                <span className="text-terminal-cyan">medium:</span> {artwork.medium}
              </div>
              <div>
                <span className="text-terminal-cyan">index:</span> {String(idx + 1).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            ← → arrow keys to navigate · Esc to close
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ────────────────────────────────────────── */
export const GenerativeArtPlayground: React.FC = () => {
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (!lightboxArtwork) return;
      const idx = artworks.findIndex((a) => a.id === lightboxArtwork.id);
      const next = direction === 'prev' ? idx - 1 : idx + 1;
      if (next >= 0 && next < artworks.length) setLightboxArtwork(artworks[next]);
    },
    [lightboxArtwork]
  );

  return (
    <section id="art" className="py-24 relative border-t border-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // DIGITAL_STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Art Studio
          </h2>
          <p className="text-muted text-sm sm:text-base font-mono">
            A showcase of original traditional and physical artworks created by Nandeesh.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {artworks.map((artwork) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-terminal-cyan" />
                    <span className="text-white text-xs font-mono">View full size</span>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-3.5 py-3 bg-bg-secondary space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-white text-sm font-semibold font-sans leading-tight">
                    {artwork.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-terminal-purple/15 text-terminal-purple border border-terminal-purple/30">
                    {artwork.category}
                  </span>
                </div>
                <p className="text-muted text-[11px] font-mono">{artwork.medium}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxArtwork && (
        <Lightbox
          artwork={lightboxArtwork}
          all={artworks}
          onClose={() => setLightboxArtwork(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
};
