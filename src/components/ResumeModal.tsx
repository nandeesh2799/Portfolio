import React, { useEffect } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  X,
  CheckCircle2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[88vh] max-h-[900px] shadow-2xl flex flex-col hypr-window rounded-2xl overflow-hidden border border-bg-tertiary bg-[#0B0F17]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Linux Document Viewer Header Bar */}
        <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between select-none font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-terminal-red/80 hover:bg-terminal-red flex items-center justify-center group"
                title="Close"
              >
                <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <span className="w-3 h-3 rounded-full bg-terminal-amber/80" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/80" />
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FileText className="w-4 h-4 text-terminal-cyan" />
              <span className="font-semibold text-white">zathura // Nandeesh_Resume.pdf</span>
              <span className="hidden sm:inline-block text-[10px] text-terminal-green bg-terminal-green/10 border border-terminal-green/20 px-2 py-0.5 rounded-full">
                UPDATED 2026
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <a
              href="./resumes/Nandeesh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card border border-bg-tertiary text-slate-200 hover:text-white transition-colors text-xs"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <a
              href="./resumes/Nandeesh_Resume.pdf"
              download="Nandeesh_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terminal-green text-[#080B10] hover:shadow-glow-green font-bold transition-all text-xs"
              title="Download official PDF copy"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-bg-tertiary hover:bg-bg-card text-muted hover:text-white transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Ribbon */}
        <div className="px-4 py-2 bg-bg-card/70 border-b border-bg-tertiary text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-terminal-cyan font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-terminal-green" />
              BCA (2026) Candidate
            </span>
            <span className="text-muted hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Full-Stack &amp; Applied AI Engineer</span>
            <span className="text-muted hidden md:inline">•</span>
            <span className="text-terminal-green flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terminal-pink" />
              {developerProfile.location}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <a
              href={`mailto:${developerProfile.email}`}
              className="hover:text-terminal-cyan flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>{developerProfile.email}</span>
            </a>
            <span className="text-muted">•</span>
            <a
              href={developerProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terminal-green flex items-center gap-1 text-terminal-green"
            >
              <Phone className="w-3 h-3" />
              <span>{developerProfile.phone}</span>
            </a>
          </div>
        </div>

        {/* PDF Document Container */}
        <div className="flex-1 bg-[#1A1E29] relative overflow-hidden flex flex-col">
          <iframe
            src="./resumes/Nandeesh_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
            title="Nandeesh Resume PDF Document"
            className="w-full h-full border-none"
          />

          {/* Bottom Fallback Strip */}
          <div className="p-3 bg-bg-secondary border-t border-bg-tertiary flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-2">
            <span>
              Tip: If PDF preview is restricted by your browser, open it directly using the buttons above.
            </span>
            <div className="flex items-center gap-3 text-slate-300">
              <a
                href="./resumes/Nandeesh_Resume.pdf"
                download="Nandeesh_Resume.pdf"
                className="text-terminal-cyan hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Local Copy (54 KB)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
