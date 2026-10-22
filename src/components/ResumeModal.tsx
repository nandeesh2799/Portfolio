import React, { useEffect, useRef } from 'react';
import { 
  X, 
  FileDown, 
  Bot, 
  Code2, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl bg-dark-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-5 border-b border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
            OFFICIAL CAREER DOSSIER
          </span>
          <h2 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Verified Resumes &amp; Credentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Nandeesh Narayan Kurubar • BCA (Christ Academy, 2026) • Bengaluru, India
          </p>
        </div>

        {/* Available Resumes Selection Cards */}
        <div className="py-6 space-y-4">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Select Tailored Resume Document:
          </p>

          {/* Resume Option 1: AI & Full-Stack ATS */}
          <div className="p-4 rounded-xl bg-dark-950 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    AI Implementation &amp; Software Engineering Resume
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    ATS-Optimized
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Focus: StockBridge SaaS, Aria desktop AI companion, Groq/Ollama/Claude API, OCR pipelines, and Python.
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  Format: PDF (170 KB) • 2 Pages • Verified 2026 Edition
                </p>
              </div>
            </div>

            <a
              href="/resumes/Nandeesh_NK_Resume_AI.pdf"
              download="Nandeesh_NK_Resume_AI.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-all shadow-md flex-shrink-0 w-full sm:w-auto justify-center"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>

          {/* Resume Option 2: Full-Stack & Mobile */}
          <div className="p-4 rounded-xl bg-dark-950 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Full-Stack &amp; Mobile Developer Resume
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Standard
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Focus: MERN stack, Flutter &amp; Dart mobile engineering, Java Android SQLite, and AgriTech hackathon project.
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  Format: PDF (79 KB) • 2 Pages • Verified 2026 Edition
                </p>
              </div>
            </div>

            <a
              href="/resumes/Nandeesh_NK_Resume.pdf"
              download="Nandeesh_NK_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-dark-950 transition-all shadow-md flex-shrink-0 w-full sm:w-auto justify-center"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Fact Sheet Verification */}
        <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
          <p className="text-cyan-400 font-bold uppercase text-[10px]">Document Source Guarantee:</p>
          <ul className="space-y-1 text-[11px] text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero fabricated experience or artificial employment histories.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct match with GitHub repositories at github.com/nandeesh2799.</span>
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
