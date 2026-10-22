import React, { useState, useEffect, useRef } from 'react';
import { AudienceFilterType } from '../types';
import { 
  FileDown, 
  Menu, 
  X, 
  Code2, 
  Bot, 
  Sparkles, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentFilter: AudienceFilterType;
  onFilterChange: (filter: AudienceFilterType) => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentFilter,
  onFilterChange,
  onOpenResumeModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Close mobile menu and dropdown on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setResumeDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Interactive Lab', href: '#laboratory', highlight: true },
    { label: 'About', href: '#about' },
    { label: 'Art', href: '#art-studio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="Nandeesh Narayan Kurubar — Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-dark-850 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover:border-cyan-400 transition-colors">
            <span className="font-mono font-bold text-sm bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              NK
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                Nandeesh
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                Available July 2026
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Full-Stack &amp; AI Builder
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-dark-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                link.highlight 
                  ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-900/40 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Resume Download Dropdown with Click-Outside Guard */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-gradient-to-r from-slate-900 to-slate-850 hover:to-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-expanded={resumeDropdownOpen}
              aria-haspopup="true"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {resumeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-dark-900 border border-slate-800 shadow-2xl p-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-800/80">
                  <p className="text-xs font-semibold text-white">Verified Career Resumes</p>
                  <p className="text-[11px] text-slate-400 font-mono">BCA Graduate • Available July 2026</p>
                </div>
                
                <a
                  href="/resumes/Nandeesh_NK_Resume_AI.pdf"
                  download="Nandeesh_NK_Resume_AI.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors group mt-1"
                  onClick={() => setResumeDropdownOpen(false)}
                >
                  <div className="p-1.5 rounded bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 group-hover:border-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 flex items-center gap-1.5">
                      AI &amp; Software Engineering PDF
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      ATS-optimized for LLMs, GenAI, and backend roles
                    </div>
                  </div>
                </a>

                <a
                  href="/resumes/Nandeesh_NK_Resume.pdf"
                  download="Nandeesh_NK_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors group"
                  onClick={() => setResumeDropdownOpen(false)}
                >
                  <div className="p-1.5 rounded bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 group-hover:border-emerald-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-200 group-hover:text-emerald-300 flex items-center gap-1.5">
                      Full-Stack &amp; Mobile PDF
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Tailored for React, Flutter, and Android engineering
                    </div>
                  </div>
                </a>

                <button
                  onClick={() => {
                    setResumeDropdownOpen(false);
                    onOpenResumeModal();
                  }}
                  className="w-full mt-1.5 py-1.5 text-center text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 rounded-lg transition-colors border border-dashed border-cyan-900/40"
                >
                  Preview Full Credentials in Modal
                </button>
              </div>
            )}
          </div>

          {/* Quick Contact Action */}
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-dark-950 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-dark-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.highlight 
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30' 
                    : 'text-slate-200 hover:bg-slate-800/60 hover:text-cyan-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-medium bg-dark-900 border border-slate-700 text-slate-200"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              Download Resume (PDF)
            </button>
            
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-dark-950"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
