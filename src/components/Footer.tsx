import React from 'react';
import { Github, Mail, Phone, ArrowUp, Heart, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
              NK
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">Nandeesh Narayan Kurubar</p>
              <p className="text-[11px] font-mono text-slate-500">
                Full-Stack Developer • AI Systems Builder • Fine Artist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href="https://github.com/nandeesh2799"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:nandeeshnk506@gmail.com"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href="tel:+917892726438"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>+91 78927 26438</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors font-mono text-xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Nandeesh Narayan Kurubar. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Engineered with React, TypeScript, Three.js WebGL &amp; Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
