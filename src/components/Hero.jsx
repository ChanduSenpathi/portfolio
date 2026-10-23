import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Download,
  Terminal as TerminalIcon,
  MapPin,
  Briefcase,
  Layers,
  Code2,
  CheckCircle2,
  Cpu,
  ChevronDown
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound, playBurstSound } from '../utils/audioEffects';

export default function Hero({ onOpenTerminal, onOpenContact, onTriggerBurst }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const roles = [
    'Frontend Developer',
    'React & Next.js Architect',
    'Enterprise AI Platform Engineer',
    'Multi-Role Portal Specialist'
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolled past 60px; show when at top/hero section
      setShowScrollIndicator(window.scrollY < 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleAvatarClick = () => {
    playBurstSound();
    onTriggerBurst();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 pb-8 sm:pt-24 sm:pb-8 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {/* Status Badge with 3D glow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 text-xs font-mono font-medium shadow-md shadow-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Relocation • Available for Frontend Developer Roles</span>
            </div>

            {/* Main Title & Typewriter */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-display">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-indigo-400">
                  {personalInfo.name}
                </span>
              </h1>

              <div className="h-8 sm:h-10 flex items-center">
                <span className="font-mono text-lg sm:text-xl xl:text-2xl text-cyan-400 font-semibold tracking-wide">
                  &gt; {roles[roleIndex]}
                  <span className="inline-block w-2.5 h-5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                </span>
              </div>
            </div>

            {/* Resume Summary snippet */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Frontend Developer with{' '}
              <strong className="text-white font-semibold">5 years of experience</strong>{' '}
              building responsive, high-performance web applications using{' '}
              <span className="text-violet-300 font-medium">React.js, Next.js, TypeScript</span>
              , and <span className="text-cyan-300 font-medium">Tailwind CSS</span>. Proven record
              architecting enterprise AI platforms and multi-role dashboards with clean code and
              rigorous Vitest coverage.
            </p>

            {/* Quick Location & Company Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-violet-400" />
                <span>Neosoft Technologies (Nov 2021 – Present)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>Office: {personalInfo.officeLocation}</span>
              </div>
            </div>

            {/* Interactive 3D Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              {/* Explore Projects Button */}
              <a
                href="#projects"
                onClick={() => playClickSound()}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-600/25 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center"
              >
                <span>Explore Enterprise Work</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Terminal Button */}
              <button
                onClick={() => {
                  playClickSound();
                  onOpenTerminal();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 backdrop-blur-md transition-all duration-200 active:scale-95 text-center"
              >
                <TerminalIcon className="h-4 w-4 text-violet-400" />
                <span>Launch 3D CLI</span>
              </button>

              {/* Contact Button */}
              <button
                onClick={() => {
                  playClickSound();
                  onOpenContact();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-200 active:scale-95 text-center"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Holographic Identity Card & Interactive Orbit */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltCard
              maxTilt={16}
              scale={1.03}
              className="w-full max-w-sm rounded-2xl border border-white/15 bg-gradient-to-b from-[#13192e]/90 via-[#0e1324]/85 to-[#090c18]/90 p-5 backdrop-blur-2xl shadow-xl shadow-purple-950/35"
            >
              <div className="relative space-y-4">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide text-slate-300">
                      Frontend Engineer Profile
                    </span>
                  </div>
                  <a
                    href="#bio-video"
                    onClick={() => playClickSound()}
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border border-violet-500/40 transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    <span>Watch Video Bio</span>
                  </a>
                </div>

                {/* Real Photo Avatar Frame */}
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-[spin_16s_linear_infinite]" />
                  <div className="absolute -inset-1.5 rounded-full border border-violet-500/30" />

                  {/* Real Photo Image */}
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/30 p-1 bg-[#0b0e1b]">
                    <img
                      src="/chandu.jpg"
                      alt="Chandu Senapathi"
                      className="h-full w-full rounded-lg object-cover object-top"
                    />
                  </div>
                </div>

                {/* Live System Capabilities List */}
                <div className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Code2 className="h-3.5 w-3.5 text-cyan-400" /> Core Stack
                    </span>
                    <span className="font-semibold text-white">Next.js / React / TS</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Layers className="h-3.5 w-3.5 text-violet-400" /> Architecture
                    </span>
                    <span className="text-cyan-300">5-Role Portals & AI</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Testing
                    </span>
                    <span className="text-emerald-300">Vitest & CI/CD Pipelines</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Cpu className="h-3.5 w-3.5 text-amber-400" /> AI Augmentation
                    </span>
                    <span className="text-amber-300">Claude Code & Modern AI</span>
                  </div>
                </div>

                {/* Quick Interactive Mini-actions */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
                  <a
                    href="mailto:chandu.senapathi220@gmail.com"
                    onClick={() => playClickSound()}
                    className="rounded-lg border border-white/10 bg-white/5 py-1.5 text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Email Direct
                  </a>
                  <a
                    href="tel:+919491285183"
                    onClick={() => playClickSound()}
                    className="rounded-lg border border-violet-500/30 bg-violet-500/10 py-1.5 text-violet-300 hover:bg-violet-500/20 transition-colors"
                  >
                    +91 9491285183
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* 3D Interactive Key Metrics Row (Balanced Responsive Grid) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {personalInfo.stats.map((stat, idx) => (
            <TiltCard
              key={idx}
              maxTilt={12}
              scale={1.04}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3 backdrop-blur-md hover:border-violet-500/40 hover:bg-white/[0.06] transition-all last:col-span-2 sm:last:col-span-1 lg:last:col-span-1 shadow-md shadow-black/30"
            >
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-300 to-white font-display">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 leading-tight">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/90">
                  {stat.change}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Scroll indicator - Visible in Hero section, smoothly hides when scrolling away */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ${
            showScrollIndicator
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <a
            href="#bio-video"
            onClick={() => playClickSound()}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-md text-[11px] font-mono tracking-wider text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-xl shadow-black/60 animate-bounce"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
