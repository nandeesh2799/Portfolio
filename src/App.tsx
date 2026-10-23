import React, { useState, useEffect } from 'react';
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
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
    return sessionStorage.getItem('nandeeshos_booted') === 'true';
  });
  const [terminalModalOpen, setTerminalModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Scroll reveal for sections (staggered after boot)
  const heroReveal = useScrollReveal({ delay: 200 });
  const aboutReveal = useScrollReveal({ delay: 300 });
  const skillsReveal = useScrollReveal({ delay: 400 });
  const projectsReveal = useScrollReveal({ delay: 500 });
  const artReveal = useScrollReveal({ delay: 600 });
  const dossierReveal = useScrollReveal({ delay: 700 });
  const contactReveal = useScrollReveal({ delay: 800 });

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
      <div className="scanline-overlay" />

      {/* Minimal Top Waybar Panel */}
      <Waybar
        onOpenTerminal={() => setTerminalModalOpen(true)}
        onNavigate={navigateToSection}
        activeSection={activeSection}
      />

      {/* Main Desktop Sections */}
      <main className="relative z-10">
        <HeroDesktop
          ref={heroReveal.ref}
          className={`reveal-up ${heroReveal.isVisible ? 'is-visible' : ''}`}
          onNavigateSection={navigateToSection}
        />
        <AboutSection
          ref={aboutReveal.ref}
          className={`reveal-up ${aboutReveal.isVisible ? 'is-visible' : ''}`}
        />
        <SkillsSection
          ref={skillsReveal.ref}
          className={`reveal-up ${skillsReveal.isVisible ? 'is-visible' : ''}`}
        />
        <ProjectsSection
          ref={projectsReveal.ref}
          className={`reveal-up ${projectsReveal.isVisible ? 'is-visible' : ''}`}
        />
        <GenerativeArtPlayground
          ref={artReveal.ref}
          className={`reveal-up ${artReveal.isVisible ? 'is-visible' : ''}`}
        />
        <DossierSection
          ref={dossierReveal.ref}
          className={`reveal-up ${dossierReveal.isVisible ? 'is-visible' : ''}`}
        />
        <ContactSection
          ref={contactReveal.ref}
          className={`reveal-up ${contactReveal.isVisible ? 'is-visible' : ''}`}
        />
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
