import React, { useState, useEffect, forwardRef } from 'react';
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
  className?: string;
}

export const HeroDesktop = forwardRef<HTMLElement, HeroDesktopProps>(
  ({ onNavigateSection, className = '' }, ref) => {
  const [activeWindowTab, setActiveWindowTab] = useState<'terminal' | 'code'>('terminal');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1024;

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative min-h-[85vh] lg:min-h-[90vh] pt-16 pb-8 lg:pb-12 flex flex-col justify-center overflow-hidden ${className}`}
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-6 sm:space-y-8 my-auto">
        
        {/* Top Developer Introduction Hero Block (Split with Neon Cyberpunk Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Text & Bio & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-muted">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="text-slate-300">HYPRLAND WORKSPACE // LINUX POWERED</span>
              <span className="text-slate-600">•</span>
              <span className="text-terminal-cyan">BCA 2026</span>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <p className="text-terminal-green font-mono text-base sm:text-lg flex items-center gap-2">
                <span>&gt;</span>
                <span>Hi, I'm</span>
              </p>
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
                className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-terminal-green text-[#080B10] hover:shadow-glow-green hover:-translate-y-0.5 transition-all focus-visible-ring focus-visible-ring-green active:scale-[0.98]"
              >
                <span>&gt;_ Explore My Projects</span>
                <span className="magnetic-icon inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <a
                href="./resumes/Nandeesh_NK_Resume_AI.pdf"
                download="Nandeesh_NK_Resume_AI.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary hover:border-terminal-cyan/50 text-slate-200 hover:text-white transition-all focus-visible-ring focus-visible-ring-cyan"
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

            {/* Distro & Tech Badges Bar (from Neon Terminal Hero) */}
            <div className="flex items-center gap-5 pt-3 text-slate-400 font-mono text-xs border-t border-bg-tertiary/60">
              {/* Tux Linux Logo */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Linux Native">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.2 3.1-.7 1.2-1.2 2.7-1.2 4.4 0 2.8 1.5 5.5 3.5 6.5-.8.5-1.5 1.2-1.5 2 0 1.1 1.1 1.5 2.5 1.5s2.5-.4 2.5-1.5c0-.8-.7-1.5-1.5-2 2-1 3.5-3.7 3.5-6.5 0-1.7-.5-3.2-1.2-4.4.7-.8 1.2-1.9 1.2-3.1C16.5 4 14.5 2 12 2z" />
                </svg>
                <span className="text-[11px]">Linux</span>
              </div>

              {/* Windows Logo */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Windows Boot">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5.5l7-1v7H3v-6zm0 8h7v7l-7-1v-6zm8.5-9.2l9.5-1.3v8.5h-9.5V4.3zm0 9.2H21v8.5L11.5 20v-6.5z" />
                </svg>
                <span className="text-[11px]">Windows</span>
              </div>

              {/* Zorin Logo */}
              <div className="flex items-center gap-1.5 text-terminal-cyan font-bold" title="Zorin OS">
                <span className="text-xs">Z</span>
                <span className="text-[11px] text-slate-300">Zorin OS</span>
              </div>

              {/* Kali Dragon Glyph */}
              <div className="flex items-center gap-1.5 text-terminal-purple font-bold" title="Kali Linux">
                <span className="text-xs">K</span>
                <span className="text-[11px] text-slate-300">Kali Linux</span>
              </div>

              {/* Triple boot separator & code badge */}
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="hidden sm:flex items-center gap-1 text-terminal-green font-mono text-[11px]">
                <span>&lt;/&gt;</span>
                <span className="text-slate-300">Triple Boot Workstation</span>
              </div>
            </div>
          </div>

          {/* Right: Neon Terminal Portfolio Hero Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-[450px] rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-terminal-green/30 via-terminal-cyan/20 to-terminal-purple/30 shadow-[0_0_50px_rgba(0,245,255,0.2)] hover:shadow-[0_0_75px_rgba(57,255,136,0.3)] transition-all duration-500">
              
              {/* Card Container */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#0A0E17]">
                <img
                  src="/images/Neon Terminal Portfolio Hero.png"
                  alt="Nandeesh Narayan Kurubar — Neon Terminal Portfolio Hero"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 block"
                />

                {/* Subtle bottom shadow vignette */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent pointer-events-none" />
              </div>

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

          {/* Desktop Tiling Grid View - On mobile, show only active tab to save space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Primary Interactive Terminal Window (7 cols) */}
            <div className="lg:col-span-7 flex flex-col min-h-[460px]">
              {(activeWindowTab === 'terminal' || !isMobile) && (
                <TerminalComponent onNavigateSection={onNavigateSection} />
              )}
            </div>

            {/* Secondary Code Editor Window (5 cols) */}
            <div className="lg:col-span-5 flex flex-col min-h-[460px]">
              {(activeWindowTab === 'code' || !isMobile) && (
                <CodeEditorWindow />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

HeroDesktop.displayName = 'HeroDesktop';

export default HeroDesktop;
