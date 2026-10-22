import React, { useState, useEffect } from 'react';
import { AudienceFilterType, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsGallery } from './components/ProjectsGallery';
import { InteractiveLab } from './components/InteractiveLab';
import { ArtStudio } from './components/ArtStudio';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AiAssistant } from './components/AiAssistant';

export const App: React.FC = () => {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [initialLabDemo, setInitialLabDemo] = useState<string>('stockbridge');

  // Sync Audience filter with URL query parameter & browser back/forward
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') as AudienceFilterType;
      if (viewParam && ['all', 'fullstack', 'ai', 'creative'].includes(viewParam)) {
        setAudienceFilter(viewParam);
      } else {
        setAudienceFilter('all');
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const handleFilterChange = (filter: AudienceFilterType) => {
    setAudienceFilter(filter);
    const url = new URL(window.location.href);
    if (filter === 'all') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', filter);
    }
    window.history.pushState({}, '', url.toString());
  };

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToDemo = (demoId: string) => {
    setInitialLabDemo(demoId);
    navigateToSection('laboratory');
  };

  return (
    <div className="min-h-screen bg-[#04070D] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Sticky Navigation */}
      <Navbar
        currentFilter={audienceFilter}
        onFilterChange={handleFilterChange}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      <main className="flex-1">
        {/* Cinematic 3D Studio Hero */}
        <Hero
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onExploreWork={() => navigateToSection('projects')}
        />

        {/* Selected Work Gallery */}
        <ProjectsGallery
          currentAudience={audienceFilter}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onNavigateToDemo={handleNavigateToDemo}
        />

        {/* Interactive System Laboratory */}
        <InteractiveLab initialDemo={initialLabDemo} />

        {/* Fine Art Studio & Craftsmanship */}
        <ArtStudio />

        {/* About Me & Builder Mindset */}
        <AboutSection onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* Technical Skills & Practical Application */}
        <SkillsSection />

        {/* Education, Certifications & Achievements */}
        <EducationSection />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Drawer / Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigateToDemo={handleNavigateToDemo}
      />

      {/* Tailored Resume Downloader Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Floating AI Portfolio Copilot */}
      <AiAssistant
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onNavigateToSection={navigateToSection}
      />
    </div>
  );
};

export default App;
