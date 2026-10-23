import React, { forwardRef } from 'react';
import { Terminal, User } from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface SectionProps {
  className?: string;
}

export const AboutSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className={`py-12 sm:py-16 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-green">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // USER_PROFILE // BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Intersection of Code, Technology &amp; Imagination
          </h2>
          <p className="text-muted text-sm sm:text-base font-mono">
            Bridging rigorous full-stack software development with artificial intelligence and visual craft.
          </p>
        </div>

        {/* Content Grid without Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Developer Biography Narrative */}
          <div className="hypr-window p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-bg-tertiary">
                <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                  <User className="w-5 h-5 text-terminal-green" />
                  <span>Developer Biography</span>
                </h3>
                <span className="text-[11px] font-mono text-terminal-cyan bg-terminal-cyan/10 border border-terminal-cyan/25 px-2.5 py-0.5 rounded-full">
                  Status: Open for Opportunities
                </span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                "{developerProfile.aboutBio}"
              </p>
            </div>

            {/* Spoken Languages */}
            <div className="pt-4 border-t border-bg-tertiary/60 font-mono text-xs">
              <span className="text-muted block mb-2">Spoken Languages:</span>
              <div className="flex flex-wrap gap-2">
                {developerProfile.languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="px-2.5 py-1 rounded bg-bg-secondary text-slate-300 border border-bg-tertiary text-[11px] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                    <span className="text-white font-medium">{lang.name}</span>
                    <span className="text-muted">({lang.level})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Linux-Inspired System Information Card */}
          <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs flex flex-col">
            <div className="px-4 py-2.5 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between">
              <span className="text-terminal-cyan font-bold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>/etc/nandeesh.conf</span>
              </span>
              <span className="text-muted text-[11px]">read-only</span>
            </div>

            <div className="p-5 divide-y divide-bg-tertiary bg-bg-card/70 space-y-2 flex-1 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                <span className="text-muted">Name</span>
                <span className="text-white font-bold">{developerProfile.name}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                <span className="text-muted">Role</span>
                <span className="text-terminal-green font-semibold">{developerProfile.role}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                <span className="text-muted">Education</span>
                <span className="text-slate-200">{developerProfile.education}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                <span className="text-muted">Location</span>
                <span className="text-terminal-pink font-semibold">{developerProfile.location}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                <span className="text-muted">OS / Environment</span>
                <span className="text-terminal-cyan font-mono font-medium">Triple Boot · Zorin OS + Kali Linux + Windows</span>
              </div>

              <div className="py-2 space-y-1.5">
                <span className="text-muted block">Core Technical Interests</span>
                <div className="flex flex-wrap gap-1.5">
                  {developerProfile.interests.map((item) => (
                    <span 
                      key={item}
                      className="px-2.5 py-1 rounded bg-bg-secondary text-terminal-cyan border border-bg-tertiary text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
