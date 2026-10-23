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
      className={`py-24 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2">
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

        {/* Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Portrait Photo (5 cols) */}
          <div className="lg:col-span-5 h-[380px] sm:h-[460px] hypr-window rounded-2xl overflow-hidden relative flex flex-col">
            <div className="relative flex-1 w-full h-full bg-[#080B10]">
              <img 
                src="/images/portrait.jpg" 
                alt={developerProfile.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-bg-secondary/90 border border-bg-tertiary backdrop-blur-md font-mono text-xs">
                <p className="text-white font-bold">{developerProfile.name}</p>
                <p className="text-terminal-green text-[11px] mt-0.5">
                  {developerProfile.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Biography & Linux System-Info Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Specific Biography Narrative */}
            <div className="hypr-window p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <User className="w-5 h-5 text-terminal-green" />
                <span>Developer Biography</span>
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                "{developerProfile.aboutBio}"
              </p>
            </div>

            {/* Linux-Inspired System Information Card */}
            <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs">
              <div className="px-4 py-2.5 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between">
                <span className="text-terminal-cyan font-bold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>/etc/nandeesh.conf</span>
                </span>
                <span className="text-muted text-[11px]">read-only</span>
              </div>

              <div className="p-5 divide-y divide-bg-tertiary bg-bg-card/70 space-y-2">
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

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
