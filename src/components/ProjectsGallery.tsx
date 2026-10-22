import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory, AudienceFilterType } from '../types';
import { projectsData } from '../data/projectsData';
import { 
  Github, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  Cpu, 
  Bot, 
  Smartphone, 
  Search,
  Filter
} from 'lucide-react';

interface ProjectsGalleryProps {
  currentAudience: AudienceFilterType;
  onSelectProject: (project: Project) => void;
  onNavigateToDemo: (demoId: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  currentAudience,
  onSelectProject,
  onNavigateToDemo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Full Stack', label: 'Full Stack' },
    { id: 'AI & GenAI', label: 'AI & GenAI' },
    { id: 'Automation', label: 'Automation' },
    { id: 'Mobile', label: 'Mobile Apps' },
    { id: 'Machine Learning', label: 'Machine Learning' },
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 1. Audience filter (if not 'all')
      if (currentAudience !== 'all' && !project.audience.includes(currentAudience)) {
        return false;
      }
      // 2. Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesSubtitle = project.subtitle.toLowerCase().includes(query);
        const matchesTech = project.tech.some((t) => t.toLowerCase().includes(query));
        const matchesProblem = project.problem.toLowerCase().includes(query);
        return matchesTitle || matchesSubtitle || matchesTech || matchesProblem;
      }
      return true;
    });
  }, [currentAudience, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 font-mono text-xs mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>SELECTED ENGINEERING WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Software Systems &amp; Autonomous Agents
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Inspect verified repositories, architecture designs, and production workflows. All projects are grounded in verifiable code.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="font-mono text-xs text-slate-400 bg-dark-900 px-3 py-2 rounded-xl border border-slate-800 max-w-fit">
            Showing <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> of {projectsData.length} projects
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-dark-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                role="tab"
                aria-selected={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tech, title, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-dark-900/40 border border-dashed border-slate-800">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium text-sm">No matching projects found</p>
            <p className="text-slate-500 text-xs mt-1">Try clearing your search query or switching the category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-dark-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Accent top gradient indicator */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {/* Card Header: Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-dark-950 border border-slate-700/80 text-cyan-300">
                      {project.category}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'Production-Ready' ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`} />
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.highlightStat && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                          {project.highlightStat.value}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Problem Snippet */}
                  <p className="text-xs text-slate-300 leading-relaxed my-3 line-clamp-3 flex-1">
                    {project.problem}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5 my-3">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-dark-950/70 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none"
                  >
                    <span>Read Architecture &amp; Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.demoUrl === '#laboratory' && (
                      <button
                        onClick={() => onNavigateToDemo(project.id)}
                        className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/50 text-cyan-300 transition-colors"
                        title="Open Interactive Demo in Lab"
                        aria-label={`Interactive Demo for ${project.title}`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
                      title="Inspect GitHub Repository"
                      aria-label={`GitHub Repository for ${project.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
