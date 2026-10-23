import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Clock,
  FileDown,
  FileText,
  Sparkles,
  Code2,
  FolderGit2,
  User,
  Mail,
  Zap
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface WaybarProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Waybar: React.FC<WaybarProps> = ({
  onOpenTerminal,
  onOpenResume,
  onNavigate,
  activeSection
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const workspaces = [
    { id: 'hero', label: '1:term', icon: Terminal },
    { id: 'about', label: '2:about', icon: User },
    { id: 'skills', label: '3:skills', icon: Code2 },
    { id: 'projects', label: '4:proj', icon: FolderGit2 },
    { id: 'art', label: '5:art', icon: Sparkles },
    { id: 'contact', label: '6:mail', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#080B10]/95 backdrop-blur-md border-b border-bg-tertiary px-3 sm:px-6 py-1.5 font-mono text-xs select-none shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Brand & Hyprland Workspaces */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-1.5 text-terminal-green hover:opacity-80 transition-opacity font-bold tracking-tight"
            title="NandeeshOS Desktop Root"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
            <span className="hidden sm:inline text-slate-100">NandeeshOS</span>
            <span className="text-terminal-cyan text-[10px]">hyprland</span>
          </button>

          <div className="h-4 w-px bg-bg-tertiary hidden sm:block" />

          {/* Workspaces Pills */}
          <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-md border border-bg-tertiary overflow-x-auto scrollbar-none">
            {workspaces.map((ws) => {
              const isActive = activeSection === ws.id;
              const Icon = ws.icon;
              return (
                <button
                  key={ws.id}
                  onClick={() => onNavigate(ws.id)}
                  className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-all ${
                    isActive
                      ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/40 shadow-sm font-semibold'
                      : 'text-muted hover:text-slate-200 hover:bg-bg-tertiary'
                  }`}
                  title={`Switch to workspace ${ws.label}`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden md:inline">{ws.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Active Title / Section (Hidden on tiny screens) */}
        <div className="hidden lg:flex items-center gap-2 text-muted text-[11px]">
          <span className="text-terminal-cyan">workspace:</span>
          <span className="text-slate-300 font-semibold uppercase tracking-wider">{activeSection}</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-400">nand@portfolio:~</span>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Terminal Launch */}
          <button
            onClick={onOpenTerminal}
            className="px-2.5 py-1 rounded bg-bg-secondary hover:bg-terminal-green/20 text-terminal-green border border-bg-tertiary hover:border-terminal-green/50 flex items-center gap-1.5 transition-all"
            title="Open Interactive Terminal ($)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">Terminal</span>
          </button>

          {/* Real-time Clock */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-bg-secondary border border-bg-tertiary text-slate-300 text-[11px]">
            <Clock className="w-3 h-3 text-terminal-green" />
            <span>{time || '00:00:00'}</span>
          </div>

          {/* Resume PDF Actions */}
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="px-2.5 py-1 rounded bg-bg-secondary hover:bg-terminal-cyan/20 text-terminal-cyan border border-bg-tertiary hover:border-terminal-cyan/50 flex items-center gap-1.5 transition-all text-[11px]"
              title="Preview Verified Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">Resume</span>
            </button>
          )}

          <a
            href="./resumes/Nandeesh_Resume.pdf"
            download="Nandeesh_Resume.pdf"
            className="px-2.5 py-1 rounded bg-terminal-green text-[#080B10] font-bold hover:shadow-glow-green transition-all flex items-center gap-1 text-[11px] focus-visible-ring focus-visible-ring-green"
            title="Download Verified Resume PDF (54 KB)"
          >
            <FileDown className="w-3 h-3" />
            <span className="hidden sm:inline">PDF</span>
          </a>

        </div>

      </div>
    </header>
  );
};
