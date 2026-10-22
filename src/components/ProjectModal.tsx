import React, { useEffect, useRef } from 'react';
import { Project } from '../types';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  AlertTriangle, 
  Cpu, 
  Users, 
  Code2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateToDemo: (demoId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNavigateToDemo
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Auto-focus close button
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasInteractiveDemo = project.demoUrl === '#laboratory';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-dark-900 border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-slate-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="pr-10 border-b border-slate-800 pb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400">
              {project.status}
            </span>
            <span className="text-slate-400">• Year: {project.year}</span>
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            {project.subtitle}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-white border border-slate-600/70 transition-all shadow-sm"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>Inspect Source on GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {hasInteractiveDemo && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToDemo(project.id);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-dark-950 shadow-md hover:shadow-cyan-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Case Study Content Grid */}
        <div className="py-6 space-y-6">
          
          {/* Problem vs Intended Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem &amp; Inefficiency</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Target Users &amp; Context</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.users}
              </p>
            </div>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div className="p-5 rounded-xl bg-dark-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>System Architecture &amp; Data Flow</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Verified Implemented Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Verified Implemented Features</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-dark-850/60 p-2.5 rounded-lg border border-slate-800/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Technical Challenge & Approach */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
              <Cpu className="w-4 h-4" />
              <span>Engineering Challenge &amp; Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              {project.challenges}
            </p>
          </div>

          {/* Author's Personal Contribution */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Code2 className="w-4 h-4" />
              <span>My Engineering Contribution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {project.contribution}
            </p>
          </div>

          {/* Technology Badges */}
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technologies Actually Used:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Source-verified repository</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
