import React from 'react';
import { Terminal, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-bg-tertiary bg-[#05070B] py-10 font-mono text-xs text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Terminal Echo Quote */}
        <div className="p-4 rounded-xl bg-bg-secondary/60 border border-bg-tertiary flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-terminal-cyan font-bold">nand@portfolio:~$</span>
            <span className="text-terminal-green font-semibold">echo "Code. Build. Create. Repeat."</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span>NandeeshOS v2026 // Kernel 6.8 Zen</span>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-bg-tertiary/50">
          <p className="text-slate-400 text-center sm:text-left">
            Crafted by <span className="text-white font-bold">{developerProfile.name}</span>. Powered by Zorin OS, Kali Linux, React &amp; Tailwind.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={developerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-terminal-green transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={developerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-terminal-cyan transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${developerProfile.email}`}
              className="text-slate-400 hover:text-terminal-pink transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
