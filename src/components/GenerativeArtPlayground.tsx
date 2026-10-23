import React, { useRef, useEffect, useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Palette, 
  Download,
  Maximize2
} from 'lucide-react';

type PaletteKey = 'cyberpunk' | 'matrix' | 'aurora' | 'solar';

export const GenerativeArtPlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [palette, setPalette] = useState<PaletteKey>('cyberpunk');
  const [particleDensity, setParticleDensity] = useState<number>(140);
  const [speed, setSpeed] = useState<number>(1);
  const [seed, setSeed] = useState<number>(0);

  const palettes: Record<PaletteKey, { name: string; colors: string[] }> = {
    cyberpunk: {
      name: 'Cyberpunk Neon',
      colors: ['#00F5FF', '#FF4FD8', '#A970FF', '#39FF88']
    },
    matrix: {
      name: 'Terminal Green',
      colors: ['#39FF88', '#10B981', '#00F5FF', '#059669']
    },
    aurora: {
      name: 'Electric Aurora',
      colors: ['#A970FF', '#8B5CF6', '#00F5FF', '#EC4899']
    },
    solar: {
      name: 'Solar Flare',
      colors: ['#FFB84D', '#FF5C5C', '#FF4FD8', '#F59E0B']
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      angle: number;
    }

    const currentColors = palettes[palette].colors;
    const particles: Particle[] = [];

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5 * speed,
        vy: (Math.random() - 0.5) * 1.5 * speed,
        size: Math.random() * 2.5 + 1,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        angle: Math.random() * Math.PI * 2
      });
    }

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (!isPlaying) {
        animationId = requestAnimationFrame(render);
        return;
      }

      // Trail fade effect
      ctx.fillStyle = 'rgba(8, 11, 16, 0.12)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Flow field calculation based on trig angle
        p.angle += 0.015 * speed;
        p.x += Math.cos(p.angle) * 1.2 * speed + p.vx;
        p.y += Math.sin(p.angle) * 1.2 * speed + p.vy;

        // Interaction with mouse pointer
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 3 * speed;
            p.y -= (dy / dist) * force * 3 * speed;
          }
        }

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 70) * 0.45;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, palette, particleDensity, speed, seed]);

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `nandeeshos-generative-art-${palette}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="art" className="py-24 relative border-t border-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-purple">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // DIGITAL_STUDIO // GENERATIVE_ART_PLAYGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Interactive Generative Art Studio
            </h2>
            <p className="text-muted text-sm sm:text-base font-mono">
              Creative coding playground running native HTML5 Canvas flow-field mathematics. Move your cursor to sculpt the field.
            </p>
          </div>
        </div>

        {/* Art Workstation Canvas Window */}
        <div className="hypr-window rounded-2xl overflow-hidden flex flex-col shadow-window">
          
          {/* Top Window Bar with Interactive Controls */}
          <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            
            {/* Left Status */}
            <div className="flex items-center gap-2 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
              <span className="font-bold">GEN_FLOW_FIELD.canvas</span>
              <span className="text-muted text-[11px] hidden sm:inline">[60 FPS // Vector Particles]</span>
            </div>

            {/* Middle & Right Controls */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Palette Switcher */}
              <div className="flex items-center gap-1 bg-bg-tertiary p-1 rounded-lg">
                {(Object.keys(palettes) as PaletteKey[]).map((pKey) => (
                  <button
                    key={pKey}
                    onClick={() => setPalette(pKey)}
                    className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                      palette === pKey
                        ? 'bg-terminal-purple/20 text-terminal-purple border border-terminal-purple/40 font-semibold'
                        : 'text-muted hover:text-slate-200'
                    }`}
                  >
                    {pKey}
                  </button>
                ))}
              </div>

              {/* Density & Speed Sliders */}
              <div className="hidden lg:flex items-center gap-4 text-muted text-[11px]">
                <label className="flex items-center gap-1.5">
                  <span>Density:</span>
                  <input
                    type="range"
                    min="50"
                    max="220"
                    value={particleDensity}
                    onChange={(e) => setParticleDensity(Number(e.target.value))}
                    className="w-20 accent-terminal-cyan"
                  />
                  <span className="text-slate-300 w-6">{particleDensity}</span>
                </label>

                <label className="flex items-center gap-1.5">
                  <span>Speed:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-16 accent-terminal-green"
                  />
                  <span className="text-slate-300 w-6">{speed}x</span>
                </label>
              </div>

              {/* Action Buttons: Pause / Regenerate / Snapshot */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-slate-200 transition-colors"
                  title={isPlaying ? "Pause Simulation" : "Resume Simulation"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-terminal-amber" /> : <Play className="w-3.5 h-3.5 text-terminal-green" />}
                </button>

                <button
                  onClick={() => setSeed(s => s + 1)}
                  className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-slate-200 transition-colors"
                  title="Regenerate Coordinates"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-terminal-cyan" />
                </button>

                <button
                  onClick={handleDownloadSnapshot}
                  className="px-2.5 py-1 rounded-lg bg-terminal-cyan/10 hover:bg-terminal-cyan/20 border border-terminal-cyan/30 text-terminal-cyan transition-colors flex items-center gap-1 text-[11px]"
                  title="Export PNG Artwork Snapshot"
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden sm:inline">Export PNG</span>
                </button>
              </div>

            </div>

          </div>

          {/* Interactive Canvas Viewport */}
          <div className="relative w-full h-[450px] sm:h-[540px] bg-[#080B10] cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute bottom-4 left-4 pointer-events-none p-3 rounded-xl bg-bg-secondary/80 border border-bg-tertiary backdrop-blur-md font-mono text-[11px] text-muted">
              <span className="text-terminal-green font-bold">Pointer Interaction Active</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Drag cursor to bend harmonic vector field lines.</p>
            </div>
          </div>

          {/* Canvas Footer Bar */}
          <div className="px-4 py-2 bg-bg-secondary border-t border-bg-tertiary flex items-center justify-between font-mono text-[11px] text-muted">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-terminal-purple" />
              <span>Palette: {palettes[palette].name}</span>
            </div>
            <span>Generative Engine: HTML5 Canvas 2D Context</span>
          </div>

        </div>

      </div>
    </section>
  );
};
