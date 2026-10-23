import React, { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootMessages = [
    'Initializing creative environment...',
    'Loading developer profile: Nandeesh Narayan Kurubar...',
    'Mounting /projects [StockBridge, Aria, OCR, UPS]...',
    'Starting AI modules & LLM orchestration layers...',
    'Initializing generative art engine & canvas pipeline...',
    'Starting Hyprland Wayland compositor...',
    'Loading digital workspace & terminal runtime...',
    'Welcome to NandeeshOS v2026. Ready.'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 400);
        }, 500);
      }
    }, 180);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        clearInterval(interval);
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#080B10] flex flex-col justify-between p-6 sm:p-12 font-mono text-xs sm:text-sm transition-opacity duration-500 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between text-muted border-b border-bg-tertiary pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          <span className="text-terminal-green font-bold">NANDEESH_OS // BOOT_LOADER_v6.8</span>
        </div>
        <button
          onClick={onComplete}
          className="px-2.5 py-1 rounded bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary text-terminal-cyan hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Skip [ESC]</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Terminal Output */}
      <div className="max-w-3xl w-full my-auto space-y-2 z-10">
        <div className="text-terminal-cyan text-sm sm:text-base font-bold mb-4 tracking-wider">
          ARCH LINUX / HYPRLAND KERNEL BOOT SEQUENCE
        </div>

        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 leading-relaxed">
            <span className="text-terminal-green font-bold">[ OK ]</span>
            <span className="text-slate-200">{log}</span>
          </div>
        ))}

        <div className="flex items-center gap-2 text-terminal-green pt-2">
          <span className="text-terminal-cyan">nand@portfolio:~$</span>
          <span className="w-2 h-4 bg-terminal-green animate-blink" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-muted border-t border-bg-tertiary pt-3 z-10">
        <span>Target: /dev/nvme0n1p2 (Nandeesh-Workstation)</span>
        <span className="text-terminal-green font-semibold">Security Integrity: 100% OK</span>
      </div>
    </div>
  );
};
