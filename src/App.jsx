import { useState, useEffect } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BioVideoPlayer from './components/BioVideoPlayer';
import Skills3D from './components/Skills3D';
import Projects3D from './components/Projects3D';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InteractiveTerminal from './components/InteractiveTerminal';
import ResumeModal from './components/ResumeModal';
import { playBurstSound } from './utils/audioEffects';

export default function App() {
  const [theme, setTheme] = useState('cyber');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [triggerBurst, setTriggerBurst] = useState(0);

  // Keyboard shortcut: Cmd+K or Ctrl+K to toggle Terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTriggerBurst = () => {
    setTriggerBurst((prev) => prev + 1);
  };

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 selection:bg-violet-500/30 selection:text-cyan-300">
      {/* 3D WebGL Canvas Layer - Full Vibrant 3D Experience */}
      <ThreeCanvas theme={theme} triggerBurst={triggerBurst} />

      {/* Interactive Cursor Aura & Ripples */}
      <CursorGlow />

      {/* Subtle tech grid background texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-tech-grid opacity-10" />

      {/* High-contrast radial scrim to safeguard text readability against WebGL objects */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-radial-scrim" />

      {/* Main Foreground Container */}
      <div className="relative z-10 flex flex-col">
        {/* Navigation */}
        <Navbar
          onOpenTerminal={() => setIsTerminalOpen(true)}
          currentTheme={theme}
          onThemeChange={(newTheme) => {
            setTheme(newTheme);
            playBurstSound();
          }}
          onOpenContact={handleOpenContact}
        />

        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContact={handleOpenContact}
          onTriggerBurst={handleTriggerBurst}
        />

        {/* Video Profile & Audio Bio Presentation */}
        <BioVideoPlayer />

        {/* Skills & Architecture Matrix */}
        <Skills3D />

        {/* Flagship Enterprise Projects */}
        <Projects3D />

        {/* Experience & Education */}
        <ExperienceTimeline />

        {/* Contact & Hire Chandu */}
        <ContactSection />

        {/* Footer */}
        <Footer
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
      />

      {/* Resume Viewer / Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
