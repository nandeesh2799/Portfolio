import React, { useState, forwardRef } from 'react';
import {
  Code2,
  Layers,
  Database,
  Cpu,
  Wrench,
  Terminal,
  Check,
  Copy,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { skillGroups } from '../data/portfolioData';

interface SectionProps {
  className?: string;
}

export const SkillsSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
  const [viewMode, setViewMode] = useState<'matrix' | 'terminal'>('matrix');
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return <Code2 className="w-4 h-4 text-terminal-green" />;
      case 'Frameworks': return <Layers className="w-4 h-4 text-terminal-cyan" />;
      case 'Databases': return <Database className="w-4 h-4 text-terminal-purple" />;
      case 'AI & LLMs': return <Cpu className="w-4 h-4 text-terminal-pink" />;
      default: return <Wrench className="w-4 h-4 text-terminal-amber" />;
    }
  };

  const copyConfig = () => {
    const raw = skillGroups.map(g => `[${g.category.toUpperCase()}]\n${g.skills.join(', ')}`).join('\n\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section
      ref={ref}
      id="skills"
      className={`py-24 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-cyan">
              <Terminal className="w-3.5 h-3.5" />
              <span>03 // DEPENDENCIES // SKILL_MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Technology Stack &amp; Tooling
            </h2>
            <p className="text-muted text-sm sm:text-base font-mono">
              Engineered competencies across languages, distributed frameworks, AI models, and databases.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setViewMode(viewMode === 'matrix' ? 'terminal' : 'matrix')}
              className="px-3.5 py-1.5 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary text-slate-200 flex items-center gap-2 transition-colors"
            >
              <span>View: {viewMode === 'matrix' ? 'Visual Grid' : 'Raw Config ($)'}</span>
              {viewMode === 'matrix' ? <ToggleLeft className="w-4 h-4 text-terminal-cyan" /> : <ToggleRight className="w-4 h-4 text-terminal-green" />}
            </button>
          </div>
        </div>

        {/* View Mode: Visual Cards Matrix */}
        {viewMode === 'matrix' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div 
                key={group.category}
                className="hypr-window rounded-2xl overflow-hidden p-5 space-y-4 hover:border-terminal-cyan/50 transition-all group"
              >
                {/* Group Title Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-bg-tertiary">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-bg-secondary border border-bg-tertiary">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm font-sans group-hover:text-terminal-cyan transition-colors">
                        {group.category}
                      </h3>
                      <span className="text-[10px] font-mono text-muted">
                        {group.skills.length} modules loaded
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-bg-tertiary hover:border-terminal-green/50 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-default flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-terminal-green" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode: Raw Terminal Config Output */
          <div className="hypr-window rounded-2xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-bg-secondary border-b border-bg-tertiary">
              <span className="text-terminal-green flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>cat /etc/developer/skills.conf</span>
              </span>
              <button 
                onClick={copyConfig}
                className="text-muted hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-terminal-green" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-6 bg-[#080B10] space-y-6 text-slate-300 leading-relaxed overflow-x-auto">
              {skillGroups.map((group) => (
                <div key={group.category} className="space-y-1">
                  <p className="text-terminal-cyan font-bold">[{group.category.toUpperCase()}]</p>
                  <p className="text-terminal-green">enabled = true</p>
                  <p className="text-slate-300">modules = [ {group.skills.map(s => `"${s}"`).join(', ')} ]</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
