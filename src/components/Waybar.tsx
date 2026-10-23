import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  HardDrive, 
  Clock, 
  Palette, 
  FileDown, 
  Sparkles, 
  Code2, 
  FolderGit2, 
  User, 
  Mail,
  Zap
} from 'lucide-react';
import { ThemeMode } from '../types';

interface WaybarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenTerminal: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Waybar: React.FC<WaybarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenTerminal,
  onNavigate,
  activeSection
}) => {
  const [time, setTime] = useState<string>('');
  const [cpuUsage, setCpuUsage] = useState<number>(14);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fluctuate CPU slightly to simulate living system monitor
  useEffect(() => {
    const cpuTimer = setInterval(() => {
      setCpuUsage(Math.floor(12 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(cpuTimer);
  }, []);

  const workspaces = [
    { id: 'hero', label: '1:term', icon: Terminal },
    { id: 'about', label: '2:about', icon: User },
    { id: 'skills', label: '3:skills', icon: Code2 },
    { id: 'projects', label: '4:proj', icon: FolderGit2 },
    { id: 'art', label: '5:art', icon: Sparkles },
    { id: 'contact', label: '6:mail', icon: Mail },
  ];

  const cycleTheme = () => {
    const themes: ThemeMode[] = ['matrix', 'cyberpunk', 'creative'];
    const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    onThemeChange(themes[nextIndex]);
  };

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

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            className="p-1.5 rounded bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary text-terminal-purple hover:text-white transition-all flex items-center gap-1"
            title={`Current theme: ${currentTheme}. Click to cycle.`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px] text-muted capitalize">{currentTheme}</span>
          </button>

          {/* System Telemetry (CPU & RAM) */}
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded bg-bg-secondary border border-bg-tertiary text-[11px] text-muted">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-terminal-cyan" />
              <span>{cpuUsage}%</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-terminal-purple" />
              <span>4.1G</span>
            </div>
          </div>

          {/* Real-time Clock */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-bg-secondary border border-bg-tertiary text-slate-300 text-[11px]">
            <Clock className="w-3 h-3 text-terminal-green" />
            <span>{time || '00:00:00'}</span>
          </div>

          {/* Resume PDF Download */}
          <a
            href="./resumes/Nandeesh_NK_Resume_AI.pdf"
            download="Nandeesh_NK_Resume_AI.pdf"
            className="px-2.5 py-1 rounded bg-terminal-green text-[#080B10] font-bold hover:shadow-glow-green transition-all flex items-center gap-1 text-[11px]"
            title="Download Verified Resume PDF"
          >
            <FileDown className="w-3 h-3" />
            <span className="hidden sm:inline">Resume</span>
          </a>

        </div>

      </div>
    </header>
  );
};
