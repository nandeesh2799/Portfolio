import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Languages, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Bot,
  Palette
} from 'lucide-react';

interface AboutSectionProps {
  onOpenResumeModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>BACKGROUND &amp; BUILDER PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Grounded Engineering. Creative Individuality.
          </h2>
        </div>

        {/* Two-Column Grid: Visual Studio Portrait (4 cols) & Journey Narrative (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Portrait & Fast Fact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-dark-900 group">
              <div className="aspect-[3/4] w-full overflow-hidden bg-dark-950">
                <img
                  src="/images/portrait.jpg"
                  alt="Nandeesh Narayan Kurubar in studio with artwork and creative tools"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none" />

              {/* Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-dark-900/90 border border-slate-800 backdrop-blur-md">
                <p className="text-xs font-bold text-white">Nandeesh Narayan Kurubar</p>
                <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
                  Software Developer • AI Builder • Artist
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Availability Fact Sheet */}
            <div className="p-5 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available from July 2026
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Education:</span>
                <span className="text-slate-200">BCA, Christ Academy</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Primary Focus:</span>
                <span className="text-cyan-300">Full-Stack &amp; AI Engineering</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Spoken Languages:</span>
                <span className="text-slate-200">English, Kannada, Hindi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio Narrative & Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            
            <p>
              I am a final-year <strong className="text-white">Bachelor of Computer Applications (BCA)</strong> student at Christ Academy Institute for Advanced Studies in Bengaluru (graduating in June 2026). My approach to software is simple: <strong className="text-cyan-300">I ship working systems, not pilots.</strong>
            </p>

            <p>
              Over the course of my degree, I have systematically built real-world software across the entire spectrum — from a full-stack retail point-of-sale platform (<strong className="text-white">StockBridge</strong>) with JWT auth, 15+ REST endpoints, and a Groq LLaMA 3.3 business agent, to a transparent desktop AI overlay (<strong className="text-white">Aria</strong>) orchestrated with local Ollama, Whisper speech-to-text, and SQLite vector memory.
            </p>

            <p>
              I take pride in identifying operational friction in real-world workflows and replacing it with clean code. Whether automating payment reconciliation pipelines from bulk OCR screenshots or training machine learning models with SMOTE to catch payment fraud, I focus on measurable utility and fault-tolerant architecture.
            </p>

            {/* Three Foundations Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-1.5">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xs font-bold text-white">Full-Stack Discipline</h4>
                <p className="text-[11px] text-slate-400">
                  Clean modular REST APIs, state machines, offline-first sync caches, and accessible UI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-1.5">
                <Bot className="w-5 h-5 text-cyan-400" />
                <h4 className="text-xs font-bold text-white">Autonomous AI Systems</h4>
                <p className="text-[11px] text-slate-400">
                  Model orchestration (Claude, Gemini, Groq, Ollama), vector RAG, and prompt guardrails.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-1.5">
                <Palette className="w-5 h-5 text-amber-400" />
                <h4 className="text-xs font-bold text-white">Visual Craftsmanship</h4>
                <p className="text-[11px] text-slate-400">
                  Patience with surface, material depth, proportion, and visual hierarchy from studio art.
                </p>
              </div>
            </div>

            {/* Quick Resume CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-dark-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 transition-colors"
              >
                <span>View Full Career Credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#art-studio"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                <span>Explore the Art Studio</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
