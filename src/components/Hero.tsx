import React from 'react';
import { ThreeScene } from './ThreeScene';
import { 
  ArrowRight, 
  FileDown, 
  Github, 
  Sparkles, 
  Cpu, 
  Layers, 
  Award, 
  Palette,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onExploreWork }) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Positioning & Headlines (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-300 text-xs font-mono max-w-fit shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>NANDEESH NARAYAN KURUBAR</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-300">BCA Graduate (2026)</span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Building intelligent systems. <br />
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200 bg-clip-text text-transparent">
                  Creating experiences.
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              I'm Nandeesh — a multidisciplinary builder exploring full-stack engineering, AI-powered products, automation agents, and creative technology. From production MERN systems with live LLM integrations to tactile canvas paintings, I bridge engineering discipline with visual craftsmanship.
            </p>

            {/* Verification highlights ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                  <Cpu className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">12+ Projects</span>
                </div>
                <p className="text-[11px] text-slate-400">Inspected &amp; Verified</p>
              </div>

              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">1st Place</span>
                </div>
                <p className="text-[11px] text-slate-400">College Hackathon</p>
              </div>

              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-purple-400 mb-1">
                  <Layers className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">MERN &amp; Flutter</span>
                </div>
                <p className="text-[11px] text-slate-400">Full-Stack Platforms</p>
              </div>

              <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Palette className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">4 Mediums</span>
                </div>
                <p className="text-[11px] text-slate-400">Physical Fine Art</p>
              </div>
            </div>

            {/* Call to Actions Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-dark-950 hover:shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#laboratory"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-dark-900/90 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Try Lab Demos</span>
              </a>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:text-white transition-all"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="https://github.com/nandeesh2799"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
                aria-label="Nandeesh's GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Tech badges inline footer */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Core Toolkit:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">React 19</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">Node / Express</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">Python FastAPI</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">Groq &amp; Ollama</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">Flutter &amp; Dart</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300">MongoDB &amp; SQLite</span>
            </div>

          </div>

          {/* Right Column: Interactive 3D Digital Studio Matrix (5 cols) */}
          <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-auto sm:h-[520px] flex items-center justify-center">
            
            {/* Visual Studio Card Shell */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/95 border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden flex flex-col">
              
              {/* Studio Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-dark-950/70 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-400 text-[11px] ml-2">studio://nandeesh/interactive_core.three</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono">
                    PHYSICAL SIM
                  </span>
                </div>
              </div>

              {/* 3D Scene Viewport */}
              <div className="relative flex-1 w-full h-full">
                <ThreeScene className="w-full h-full" />
              </div>

              {/* Studio Window Footer Telemetry */}
              <div className="px-4 py-2.5 border-t border-slate-800/80 bg-dark-950/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Interactive Parallax Active</span>
                </div>
                <div className="text-slate-500 hidden sm:block">
                  Drag / Hover to Inspect
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
