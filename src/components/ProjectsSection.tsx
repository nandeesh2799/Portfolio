import React, { useState, forwardRef } from 'react';
import {
  Terminal,
  Github,
  ExternalLink,
  ArrowUpRight,
  ShoppingCart,
  Bot,
  FileSpreadsheet,
  Smartphone,
  CheckCircle2,
  X,
  Layers,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';

interface SectionProps {
  className?: string;
}

export const ProjectsSection = forwardRef<HTMLElement, SectionProps>(
  ({ className = '' }, ref) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-terminal-green" />;
      case 'Bot': return <Bot className="w-5 h-5 text-terminal-cyan" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-terminal-purple" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-terminal-pink" />;
      default: return <Terminal className="w-5 h-5 text-terminal-green" />;
    }
  };

  return (
    <section
      ref={ref}
      id="projects"
      className={`py-12 sm:py-16 relative border-t border-bg-tertiary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-bg-tertiary text-xs font-mono text-terminal-green">
              <Terminal className="w-3.5 h-3.5" />
              <span>04 // MOUNTED_MODULES // REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Featured Engineering Projects
            </h2>
            <p className="text-muted text-sm sm:text-base font-mono">
              Inspect real-world systems: full-stack SaaS, local AI agents, automated ETL pipelines, and mobile apps.
            </p>
          </div>

          <div className="font-mono text-xs text-muted bg-bg-secondary px-3 py-2 rounded-xl border border-bg-tertiary">
            <span>Mounted: </span>
            <span className="text-terminal-green font-bold">4 / 4 Nodes</span>
          </div>
        </div>

        {/* 4 Flagship Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="hypr-window rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-terminal-green/50 transition-all duration-300 shadow-window"
            >
              {/* Window Header */}
              <div className="px-5 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-mono text-xs select-none">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-terminal-red/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-terminal-amber/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-terminal-green/80" />
                  </div>
                  <span className="text-muted text-[11px] ml-1">app://{project.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-bg-tertiary text-terminal-cyan">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5 flex-1 flex flex-col">
                {/* Title & Category */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white group-hover:text-terminal-green transition-colors font-sans flex items-center gap-2.5">
                      {getProjectIcon(project.iconName)}
                      <span>{project.title}</span>
                    </h3>
                    {project.metrics && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-terminal-green/10 text-terminal-green border border-terminal-green/30">
                        {project.metrics.value}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-terminal-cyan">
                    {project.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
                    Key Features:
                  </span>
                  {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-terminal-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {project.keyFeatures.length > 3 && (
                    <p className="text-[11px] font-mono text-muted pl-5">
                      + {project.keyFeatures.length - 3} more technical capabilities
                    </p>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-3 border-t border-bg-tertiary flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg-secondary text-slate-300 border border-bg-tertiary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-bg-secondary/70 border-t border-bg-tertiary flex items-center justify-between gap-3 font-mono text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-terminal-cyan hover:text-white transition-colors font-semibold focus-visible-ring focus-visible-ring-cyan"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Architecture Window</span>
                </button>

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-tertiary hover:bg-terminal-green/20 text-slate-200 hover:text-terminal-green border border-bg-tertiary hover:border-terminal-green/40 transition-all focus-visible-ring focus-visible-ring-green"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                    <ArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                ) : (
                  <span className="text-[11px] text-muted italic">Enterprise Tool</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Architecture Modal Window */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="hypr-window rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Window Header */}
              <div className="px-5 py-3 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  {getProjectIcon(selectedProject.iconName)}
                  <span className="font-bold text-white">{selectedProject.title} — System Dossier</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 hover:text-terminal-red text-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 bg-bg-card font-mono text-xs">
                <div>
                  <span className="text-[10px] text-terminal-cyan uppercase tracking-wider block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    {selectedProject.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                {/* All Features */}
                <div className="space-y-2 bg-bg-secondary/60 p-4 rounded-xl border border-bg-tertiary">
                  <span className="text-terminal-green font-bold block mb-1">
                    System Architecture &amp; Core Capabilities:
                  </span>
                  <div className="space-y-2">
                    {selectedProject.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-200 font-sans text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-terminal-green shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="text-muted block mb-2 font-bold uppercase text-[10px]">
                    Integrated Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-bg-tertiary text-slate-200 border border-bg-tertiary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-bg-tertiary">
                  {selectedProject.repoUrl ? (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-terminal-green text-[#080B10] hover:shadow-glow-green transition-all focus-visible-ring focus-visible-ring-green"
                    >
                      <Github className="w-4 h-4" />
                      <span>Inspect GitHub Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-muted text-xs">Internal Production Script</span>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-slate-300 border border-bg-tertiary transition-colors focus-visible-ring focus-visible-ring-cyan"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
