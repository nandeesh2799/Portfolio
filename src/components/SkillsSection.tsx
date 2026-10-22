import React from 'react';
import { skillsData } from '../data/skillsData';
import { 
  Terminal, 
  Cpu, 
  Code2, 
  Smartphone, 
  Database, 
  GitBranch, 
  Sparkles,
  Layers
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 1: return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 2: return <Smartphone className="w-4 h-4 text-purple-400" />;
      case 3: return <Database className="w-4 h-4 text-blue-400" />;
      case 4: return <Cpu className="w-4 h-4 text-amber-400" />;
      default: return <GitBranch className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-dark-950/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 font-mono text-xs mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES &amp; APPLICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Grounded Competencies &amp; Concrete Context
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every technology listed below reflects actual hands-on repository code and production pipelines — contextualized by where and how it was applied.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 mb-3">
                  <div className="p-2 rounded-xl bg-dark-950 border border-slate-800">
                    {getCategoryIcon(idx)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 mt-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        skill.highlight
                          ? 'bg-dark-950/90 border-slate-700/80 text-white'
                          : 'bg-dark-950/50 border-slate-850 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className={skill.highlight ? 'text-cyan-300' : 'text-slate-200'}>
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">
                        ↳ {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                Verified via GitHub &amp; Resume Sources
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
