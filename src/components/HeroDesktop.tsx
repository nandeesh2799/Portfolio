import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileDown, 
  Github, 
  Linkedin, 
  Terminal, 
  Code2, 
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';
import { TerminalComponent } from './TerminalComponent';
import { CodeEditorWindow } from './CodeEditorWindow';

interface HeroDesktopProps {
  onNavigateSection: (sectionId: string) => void;
}

export const HeroDesktop: React.FC<HeroDesktopProps> = ({ onNavigateSection }) => {
  const [activeWindowTab, setActiveWindowTab] = useState<'terminal' | 'code'>('terminal');

  return (
    <section id="hero" className="relative min-h-[96vh] pt-16 pb-12 flex flex-col justify-center overflow-hidden">
      {/* Subtle Background Grid & Ambient Glows */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #39FF88 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terminal-green/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-terminal-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-terminal-purple/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-8 my-auto">
        
        {/* Top Developer Introduction Hero Block */}
        <div className="max-w-4xl space-y-4">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span className="text-slate-300">HYPRLAND WORKSPACE // LINUX POWERED</span>
            <span className="text-slate-600">•</span>
            <span className="text-terminal-cyan">BCA 2026</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <p className="text-terminal-green font-mono text-base sm:text-lg">Hi, I'm</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              <span className="glitch-text" data-text={developerProfile.name}>
                {developerProfile.name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan font-mono pt-1">
              {developerProfile.role}
            </h2>
          </div>

          {/* Supporting Statement */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            {developerProfile.heroBio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => onNavigateSection('projects')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-terminal-green text-[#080B10] hover:shadow-glow-green hover:-translate-y-0.5 transition-all"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="./resumes/Nandeesh_NK_Resume_AI.pdf"
              download="Nandeesh_NK_Resume_AI.pdf"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary hover:border-terminal-cyan/50 text-slate-200 hover:text-white transition-all"
            >
              <FileDown className="w-4 h-4 text-terminal-cyan" />
              <span>Download Resume</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary text-slate-300 hover:text-terminal-green transition-colors"
                title="GitHub Profile (@nandeesh2799)"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary text-slate-300 hover:text-terminal-cyan transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Linux Desktop Window Manager Workstation Matrix */}
        <div className="space-y-3 pt-2">
          
          {/* Workstation Window Bar (Hyprland layout switcher) */}
          <div className="flex items-center justify-between gap-2 border-b border-bg-tertiary pb-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-muted">
              <LayoutGrid className="w-3.5 h-3.5 text-terminal-green" />
              <span className="hidden sm:inline font-semibold text-slate-300">TILING WORKSTATION MATRIX</span>
              <span className="text-slate-600 hidden sm:inline">//</span>
              <span className="text-[11px] text-muted hidden md:inline">Click tabs or type commands in terminal</span>
            </div>

            {/* Mobile / Desktop Window Switcher Tabs */}
            <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-lg border border-bg-tertiary">
              <button
                onClick={() => setActiveWindowTab('terminal')}
                className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                  activeWindowTab === 'terminal' 
                    ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/30 font-semibold' 
                    : 'text-muted hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>terminal</span>
              </button>

              <button
                onClick={() => setActiveWindowTab('code')}
                className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                  activeWindowTab === 'code' 
                    ? 'bg-terminal-cyan/20 text-terminal-cyan border border-terminal-cyan/30 font-semibold' 
                    : 'text-muted hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>code.ts</span>
              </button>
            </div>
          </div>

          {/* Desktop Tiling Grid View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Primary Interactive Terminal Window (7 cols) */}
            <div className="lg:col-span-7 flex flex-col min-h-[460px]">
              <TerminalComponent onNavigateSection={onNavigateSection} />
            </div>

            {/* Secondary Code Editor Window (5 cols) */}
            <div className="lg:col-span-5 flex flex-col min-h-[460px]">
              <CodeEditorWindow />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
