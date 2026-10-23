import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { BootSequence } from './components/BootSequence';
import { Waybar } from './components/Waybar';
import { HeroDesktop } from './components/HeroDesktop';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GenerativeArtPlayground } from './components/GenerativeArtPlayground';
import { DossierSection } from './components/DossierSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingTerminalModal } from './components/FloatingTerminalModal';

export const App: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
    return sessionStorage.getItem('nandeeshos_booted') === 'true';
  });
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('matrix');
  const [terminalModalOpen, setTerminalModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Synchronize theme on DOM attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Section observer to update active workspace pill in Waybar
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'art', 'dossier', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('nandeeshos_booted', 'true');
    setBootCompleted(true);
  };

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E0E6ED] relative selection:bg-terminal-green/20 selection:text-terminal-green">
      
      {/* Initial Boot Sequence (Only runs once per session, skippable) */}
      {!bootCompleted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Subtle Scanline Overlay across entire desktop */}
      <div className="fixed inset-0 scanline-overlay pointer-events-none z-30" />

      {/* Minimal Top Waybar Panel */}
      <Waybar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onOpenTerminal={() => setTerminalModalOpen(true)}
        onNavigate={navigateToSection}
        activeSection={activeSection}
      />

      {/* Main Desktop Sections */}
      <main className="relative z-10">
        <HeroDesktop onNavigateSection={navigateToSection} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GenerativeArtPlayground />
        <DossierSection />
        <ContactSection />
      </main>

      {/* Desktop Footer */}
      <Footer />

      {/* Persistent / Floating Terminal Modal ($) */}
      <FloatingTerminalModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
        onNavigateSection={navigateToSection}
      />

    </div>
  );
};

export default App;
