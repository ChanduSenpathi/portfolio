import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleSound, isSoundEnabled, playClickSound } from '../utils/audioEffects';

export default function Navbar({
  onOpenTerminal,
  currentTheme,
  onThemeChange,
  onOpenContact
}) {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playClickSound();
    }
  };

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Video Bio', href: '#bio-video' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    playClickSound();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090c19]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo with Photo */}
        <a
          href="#hero"
          onClick={() => playClickSound()}
          className="group flex items-center gap-2.5 shrink-0 whitespace-nowrap"
        >
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-indigo-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-violet-500/30 shrink-0">
            <img
              src="/chandu.jpg"
              alt="Chandu Senapathi"
              className="h-full w-full rounded-[10px] object-cover object-top"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0c1020] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors font-display text-sm sm:text-base leading-none">
                Chandu Senapathi
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide mt-1 leading-none hidden sm:block">
              5 Yrs • React & Next.js Developer
            </p>
          </div>
        </a>

        {/* Desktop Navigation (Clean pills without text wrapping) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1 backdrop-blur-md shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="px-2.5 xl:px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-150 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden md:flex items-center gap-2 shrink-0 whitespace-nowrap">
          {/* Theme switcher */}
          <button
            onClick={() => {
              playClickSound();
              const next =
                currentTheme === 'cyber'
                  ? 'cosmic'
                  : currentTheme === 'cosmic'
                  ? 'matrix'
                  : 'cyber';
              onThemeChange(next);
            }}
            title="Toggle 3D Scene Theme"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="capitalize hidden xl:inline">{currentTheme}</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute Audio FX' : 'Enable Audio FX'}
            className={`p-2 rounded-lg border transition-all ${
              soundOn
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-sm shadow-cyan-500/30'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              playClickSound();
              onOpenTerminal();
            }}
            title="Open Interactive Terminal (Cmd+K)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-xs font-medium text-violet-300 hover:text-white transition-all shadow-sm shadow-violet-500/20"
          >
            <Terminal className="h-3.5 w-3.5 text-violet-400" />
            <span className="hidden xl:inline">Terminal</span>
          </button>

          {/* Hire Me CTA */}
          <button
            onClick={() => {
              playClickSound();
              onOpenContact();
            }}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 p-[1px] transition-transform duration-200 active:scale-95"
          >
            <div className="relative px-3.5 py-1.5 rounded-[11px] bg-[#0c1020] transition-colors group-hover:bg-opacity-80 flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white tracking-wide">
                Hire Chandu
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger / Quick Terminal */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            onClick={() => onOpenTerminal()}
            className="p-2 rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300"
            title="Terminal"
          >
            <Terminal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#0c1020]/95 backdrop-blur-xl border-b border-white/10 space-y-3 animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 rounded-lg whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => {
                const next = currentTheme === 'cyber' ? 'cosmic' : currentTheme === 'cosmic' ? 'matrix' : 'cyber';
                onThemeChange(next);
              }}
              className="text-xs font-medium px-3 py-1.5 rounded bg-white/5 text-slate-300 border border-white/10"
            >
              Theme: {currentTheme}
            </button>
            <button
              onClick={handleSoundToggle}
              className="text-xs px-3 py-1.5 rounded bg-white/5 text-slate-300 border border-white/10"
            >
              Sound: {soundOn ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
