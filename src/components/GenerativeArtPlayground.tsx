import React, { useEffect, useState, useCallback, forwardRef, useRef } from 'react';
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check,
  Palette,
  Layers
} from 'lucide-react';
import { artworksData, artworkCategories } from '../data/artworksData';
import { Artwork } from '../types';

interface SectionProps {
  className?: string;
}

/* ─── 3D Perspective Tilt Artwork Card (Pure CSS/JS) ──────────── */
interface ArtworkCardProps {
  artwork: Artwork;
  onOpen: (artwork: Artwork) => void;
  onCopyColor: (color: string) => void;
  copiedColor: string | null;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onOpen,
  onCopyColor,
  copiedColor
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    shineX: 50,
    shineY: 50,
    isHovered: false
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt: max 10 degrees for smooth physical feel
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      shineX,
      shineY,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      shineX: 50,
      shineY: 50,
      isHovered: false
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(artwork)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(artwork)}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title} (${artwork.medium})`}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: tilt.isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d'
      }}
      className="break-inside-avoid group relative hypr-window rounded-xl overflow-hidden cursor-pointer hover:border-terminal-purple/70 transition-all duration-300 shadow-lg hover:shadow-terminal-purple/10"
    >
      {/* Dynamic Specular Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-xl transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 0.35 : 0,
          background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 35%, transparent 70%)`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Image Container with subtle zoom */}
      <div className="relative overflow-hidden bg-bg-secondary/60">
        <img
          src={artwork.src}
          alt={artwork.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Inspect Banner */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-white font-semibold">
              <Maximize2 className="w-3.5 h-3.5 text-terminal-cyan" />
              <span>Inspect Artwork</span>
            </span>
            <span className="text-[10px] text-terminal-purple bg-terminal-purple/20 px-2 py-0.5 rounded border border-terminal-purple/30">
              {artwork.category}
            </span>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="px-3.5 py-3 bg-bg-secondary space-y-2 border-t border-bg-tertiary">
        <div className="flex items-start justify-between gap-2">
          <span className="text-white text-sm font-semibold font-sans leading-tight group-hover:text-terminal-cyan transition-colors">
            {artwork.title}
          </span>
          <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-terminal-purple/15 text-terminal-purple border border-terminal-purple/30">
            {artwork.category}
          </span>
        </div>

        <p className="text-muted text-[11px] font-mono line-clamp-1">{artwork.medium}</p>

        {/* Interactive Color Palette Swatches */}
        {artwork.palette && artwork.palette.length > 0 && (
          <div className="flex items-center justify-between pt-1 border-t border-bg-tertiary/60">
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <span className="text-[9px] font-mono text-muted flex items-center gap-1">
                <Palette className="w-2.5 h-2.5 text-terminal-cyan" />
              </span>
              <div className="flex items-center gap-1">
                {artwork.palette.map((color, i) => {
                  const isCopied = copiedColor === color;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyColor(color);
                      }}
                      title={`Click to copy ${color}`}
                      className="w-3.5 h-3.5 rounded-full border border-black/40 hover:scale-125 transition-transform relative focus:outline-none focus:ring-1 focus:ring-terminal-cyan"
                      style={{ backgroundColor: color }}
                    >
                      {isCopied && (
                        <Check className="w-2 h-2 text-white absolute inset-0 m-auto stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="text-[10px] font-mono text-muted/80">
              {copiedColor && artwork.palette.includes(copiedColor) ? (
                <span className="text-terminal-green font-semibold">Copied!</span>
              ) : (
                'palette'
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Lightbox Modal ────────────────────────────────────────── */
interface LightboxProps {
  artwork: Artwork;
  all: Artwork[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onCopyColor: (color: string) => void;
  copiedColor: string | null;
}

const Lightbox: React.FC<LightboxProps> = ({
  artwork,
  all,
  onClose,
  onNavigate,
  onCopyColor,
  copiedColor
}) => {
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
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
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

      {/* Prev Navigation */}
      {idx > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg-secondary/80 border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation */}
      {idx < all.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg-secondary/80 border border-bg-tertiary text-slate-300 hover:text-white hover:border-terminal-cyan transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          aria-label="Next artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content Modal */}
      <div
        className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full max-h-[90vh] bg-bg-primary/95 border border-bg-tertiary rounded-2xl p-4 sm:p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Artwork Image */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-2 bg-black/40 rounded-xl border border-white/5">
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Info & Spec Panel */}
        <div className="lg:w-80 shrink-0 hypr-window rounded-xl p-5 font-mono text-sm flex flex-col justify-between gap-5 bg-bg-secondary/90">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-terminal-purple text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{artwork.category}</span>
              </span>
              <span className="text-[11px] text-muted">
                {String(idx + 1).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-white font-bold text-xl font-sans leading-snug">{artwork.title}</h3>
            
            <p className="text-slate-300 text-xs leading-relaxed font-sans">{artwork.description}</p>

            <div className="pt-3 border-t border-bg-tertiary space-y-2 text-xs text-muted">
              <div>
                <span className="text-terminal-cyan font-semibold">Medium:</span>{' '}
                <span className="text-slate-200">{artwork.medium}</span>
              </div>
              <div>
                <span className="text-terminal-cyan font-semibold">Artist:</span>{' '}
                <span className="text-slate-200">Nandeesh Narayan Kurubar</span>
              </div>
            </div>

            {/* Color Palette Inspector in Lightbox */}
            {artwork.palette && (
              <div className="pt-3 border-t border-bg-tertiary space-y-2">
                <span className="text-[11px] font-semibold text-terminal-purple flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-terminal-cyan" />
                  <span>Dominant Color Palette</span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {artwork.palette.map((color, cIdx) => {
                    const isCopied = copiedColor === color;
                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => onCopyColor(color)}
                        className="flex items-center gap-2 p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-tertiary/80 border border-white/5 transition-all text-left group"
                      >
                        <span
                          className="w-4 h-4 rounded-md shrink-0 border border-black/40 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[11px] font-mono text-slate-200 group-hover:text-terminal-cyan">
                          {color}
                        </span>
                        {isCopied ? (
                          <Check className="w-3 h-3 text-terminal-green ml-auto" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted ml-auto opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-bg-tertiary text-[11px] text-muted flex items-center justify-between">
            <span>← → arrow keys</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────── */
export const GenerativeArtPlayground = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Filter artworks
    const filteredArtworks = selectedCategory === 'All'
      ? artworksData
      : artworksData.filter((a) => a.category === selectedCategory);

    // Copy color to clipboard with feedback
    const handleCopyColor = (color: string) => {
      navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    };

    // Navigation inside lightbox
    const handleNavigate = useCallback(
      (direction: 'prev' | 'next') => {
        if (!lightboxArtwork) return;
        const currentList = filteredArtworks;
        const idx = currentList.findIndex((a) => a.id === lightboxArtwork.id);
        const next = direction === 'prev' ? idx - 1 : idx + 1;
        if (next >= 0 && next < currentList.length) {
          setLightboxArtwork(currentList[next]);
        }
      },
      [lightboxArtwork, filteredArtworks]
    );

    // Custom Event Listener for Terminal (`feh <id>` or `open-artwork`)
    useEffect(() => {
      const handleRemoteOpen = (e: Event) => {
        const customEvent = e as CustomEvent<{ artworkId: string }>;
        const targetId = customEvent.detail?.artworkId;
        if (!targetId) return;

        const found = artworksData.find(
          (a) => a.id.toLowerCase() === targetId.toLowerCase() || a.title.toLowerCase().includes(targetId.toLowerCase())
        );
        if (found) {
          setLightboxArtwork(found);
          const el = document.getElementById('art');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      window.addEventListener('open-artwork', handleRemoteOpen);
      return () => window.removeEventListener('open-artwork', handleRemoteOpen);
    }, []);

    return (
      <section
        ref={ref}
        id="art"
        className={`py-12 sm:py-16 relative border-t border-bg-tertiary ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-purple">
                <Sparkles className="w-3.5 h-3.5" />
                <span>05 // DIGITAL_&amp;_PHYSICAL_STUDIO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                Creative Art Studio
              </h2>
              <p className="text-muted text-sm sm:text-base font-mono">
                Original acrylic paintings, fabric art, tattoo needlework, and murals — combining physical craftsmanship with digital precision.
              </p>
            </div>

            {/* Studio Count Badge */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted bg-bg-secondary px-3.5 py-2 rounded-xl border border-bg-tertiary w-fit">
              <Layers className="w-4 h-4 text-terminal-purple" />
              <span>Catalogued:</span>
              <span className="text-white font-bold">{artworksData.length} Works</span>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {artworkCategories.map((category) => {
              const count = category === 'All'
                ? artworksData.length
                : artworksData.filter((a) => a.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-terminal-purple/20 text-white border-terminal-purple/60 shadow-[0_0_12px_rgba(169,112,255,0.25)]'
                      : 'bg-bg-secondary text-slate-300 border-bg-tertiary hover:border-terminal-purple/40 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-terminal-purple text-black font-bold'
                        : 'bg-bg-tertiary text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry Grid with 3D Tilt Cards */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onOpen={(art) => setLightboxArtwork(art)}
                onCopyColor={handleCopyColor}
                copiedColor={copiedColor}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxArtwork && (
          <Lightbox
            artwork={lightboxArtwork}
            all={filteredArtworks}
            onClose={() => setLightboxArtwork(null)}
            onNavigate={handleNavigate}
            onCopyColor={handleCopyColor}
            copiedColor={copiedColor}
          />
        )}
      </section>
    );
  }
);

GenerativeArtPlayground.displayName = 'GenerativeArtPlayground';

export default GenerativeArtPlayground;
