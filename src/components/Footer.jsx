import { Sparkles, ArrowUp, Heart, Terminal, FileText, Phone, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/audioEffects';

export default function Footer({ onOpenTerminal, onOpenResume }) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#060812] py-12 z-10 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          {/* Left: Branding & Status */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-lg text-white font-display">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                5+ Years Experience
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Frontend Developer • React.js • Next.js • TypeScript • Tailwind CSS
            </p>
          </div>

          {/* Center: Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <button
              onClick={() => {
                playClickSound();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Interactive 3D Terminal</span>
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                playClickSound();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Resume Summary</span>
            </button>
            <span className="text-white/20">•</span>
            <a
              href="mailto:chandu.senapathi220@gmail.com"
              className="hover:text-cyan-400 transition-colors"
            >
              chandu.senapathi220@gmail.com
            </a>
          </div>

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4 w-full">
          <div>
            Crafted with Three.js, React 19, and 3D Interactive WebGL physics.
          </div>
          <div>
            Current: Visakhapatnam, AP • Office: Pune, MH • Open to Relocation
          </div>
        </div>
      </div>
    </footer>
  );
}
