import React, { forwardRef } from 'react';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Terminal,
  Languages,
  CheckCircle2,
  Calendar,
  FileText
} from 'lucide-react';
import {
  educationData,
  certificationsData,
  achievementsData,
  developerProfile
} from '../data/portfolioData';

interface SectionProps {
  className?: string;
}

export const DossierSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
  return (
    <section
      ref={ref}
      id="dossier"
      className={`py-12 sm:py-16 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-green">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // AUDIT_LOG // EDUCATION_&amp;_CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Education, Certifications &amp; Achievements
          </h2>
          <p className="text-muted text-sm sm:text-base font-mono">
            System audit dossier: academic foundations, verified technical certifications, and competition honors.
          </p>
        </div>

        {/* Dossier Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Education (4 cols) */}
          <div className="lg:col-span-4 hypr-window rounded-2xl overflow-hidden flex flex-col font-mono text-xs">
            <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-terminal-cyan">
                <GraduationCap className="w-4 h-4" />
                <span>EDUCATION_HISTORY.log</span>
              </span>
              <span className="text-[10px] text-muted">2 ENTRIES</span>
            </div>

            <div className="p-5 space-y-6 bg-bg-card/70">
              {educationData.map((edu, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-terminal-cyan/40 space-y-1.5">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-terminal-cyan" />
                  <span className="text-[10px] text-terminal-green font-semibold">
                    {edu.period}
                  </span>
                  <h4 className="text-sm font-bold text-white font-sans leading-tight">
                    {edu.degree}
                  </h4>
                  <p className="text-muted text-xs">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications & Spoken Languages (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Certifications Window */}
            <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs">
              <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2 text-terminal-purple">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CERTIFICATIONS.crt</span>
                </span>
                <span className="text-[10px] text-terminal-green">[VERIFIED]</span>
              </div>

              <div className="p-5 divide-y divide-bg-tertiary bg-bg-card/70 space-y-3">
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs font-sans">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] text-terminal-green px-1.5 py-0.5 rounded bg-terminal-green/10 border border-terminal-green/30">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-muted text-[11px]">Issuer: {cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Window */}
            <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs">
              <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2 text-terminal-pink">
                  <Languages className="w-4 h-4" />
                  <span>SPOKEN_LANGUAGES.locale</span>
                </span>
              </div>

              <div className="p-5 bg-bg-card/70 space-y-2.5">
                {developerProfile.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between p-2 rounded-lg bg-bg-secondary/70 border border-bg-tertiary">
                    <span className="font-bold text-slate-200">{lang.name}</span>
                    <span className="text-[11px] text-terminal-cyan font-semibold">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 3: Achievements & Honors (4 cols) */}
          <div className="lg:col-span-4 hypr-window rounded-2xl overflow-hidden flex flex-col font-mono text-xs">
            <div className="px-4 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-terminal-amber">
                <Award className="w-4 h-4" />
                <span>HONORS_&amp;_AWARDS.dossier</span>
              </span>
              <span className="text-[10px] text-terminal-amber">TOP_HONORS</span>
            </div>

            <div className="p-5 space-y-4 bg-bg-card/70 overflow-y-auto">
              {achievementsData.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-bg-secondary/70 border border-bg-tertiary space-y-1 hover:border-terminal-amber/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-amber font-bold text-[11px] font-sans">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[11px] text-terminal-cyan">
                    {item.event}
                  </p>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

DossierSection.displayName = 'DossierSection';

export default DossierSection;
