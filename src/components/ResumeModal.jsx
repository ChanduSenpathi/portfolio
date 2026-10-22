import { X, Download, Printer, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { personalInfo, experienceData, educationData, skillsData, projectsData } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { playBurstSound, playClickSound } from '../utils/audioEffects';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('resume-modal-open');
    } else {
      document.body.classList.remove('resume-modal-open');
    }
    return () => document.body.classList.remove('resume-modal-open');
  }, [isOpen]);

  useEffect(() => {
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    playClickSound();

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrinting(false);
      }, 1200);
    }, 100);
  };

  const handleCopyText = () => {
    playBurstSound();
    const text = `
CHANDU SENAPATHI - Frontend Developer
+91 9491285183 | chandu.senapathi220@gmail.com | Current: Visakhapatnam, AP | Office: Pune, MH | Open to Relocation

SUMMARY:
${personalInfo.summary}

EXPERIENCE:
Neosoft Technologies — Frontend Developer (Nov 2021 – Present, Office: Pune, India)
- IngenXAI 360 (2025 – Present)
- Asset Matrix Hub (AMH) (2023 – 2025)
- Kinemeric Hub (2022 – 2023)
- Aditya Birla — Birla Estates (2021 – 2022)

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, Bootstrap, Material UI, SCSS, Formik, Yup
- Backend & DB: Node.js, Express.js, Prisma ORM, PostgreSQL, MongoDB, RESTful APIs
- Testing: Vitest, Unit Testing
- Cloud & Tools: Azure DevOps, CI/CD Pipelines, Git, JIRA, Figma
- AI: AI-Assisted Development, Claude Code

EDUCATION:
- B.Tech, Electrical & Electronics Engineering — Avanthi Institute (2017 – 2020)
- Diploma, Electrical & Electronics Engineering — Balajee Polytechnic (2014 – 2017)
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn resume-modal-backdrop">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-violet-500/30 bg-[#0c1020] shadow-2xl shadow-purple-950/50 resume-modal-card">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 bg-[#11172c] rounded-t-3xl gap-2.5 no-print">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <span className="font-mono text-xs font-bold text-cyan-400 truncate">
              RESUME_VIEWER // CHANDU_SENAPATHI
            </span>
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? 'Copied' : 'Copy All Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className={`px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-xs font-mono text-white flex items-center gap-1.5 shadow-md transition-all active:scale-95 ${
                isPrinting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{isPrinting ? 'Preparing PDF...' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="hidden sm:inline-flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 font-sans select-text resume-modal-body">
          {/* Header with Photo */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-center gap-5 print-avoid-break">
            <img
              src="/chandu.jpg"
              alt="Chandu Senapathi"
              className="h-20 w-20 rounded-2xl object-cover object-top border-2 border-cyan-400/80 shadow-md shadow-cyan-500/20"
            />
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {personalInfo.name}
              </h1>
              <div className="text-sm text-cyan-300 font-semibold">
                Frontend Developer (5 Years Experience)
              </div>
              <div className="text-xs font-mono text-slate-400">
                +91 9491285183 | chandu.senapathi220@gmail.com | Current: Visakhapatnam, AP | Office: Pune, MH | Open to Relocation
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2 print-avoid-break">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 border-b border-violet-500/30 pb-1">
              Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              {personalInfo.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 border-b border-violet-500/30 pb-1">
              Experience
            </h2>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between text-xs print-avoid-break">
                <div>
                  <span className="font-bold text-white text-sm">Neosoft Technologies</span>
                  <span className="text-slate-400"> — Frontend Developer</span>
                  <div className="text-[11px] text-slate-400">Pune, India (Office) • Current: Visakhapatnam (Open to Relocation)</div>
                </div>
                <span className="font-mono text-cyan-400 font-semibold">Nov 2021 – Present</span>
              </div>

              {projectsData.map((p) => (
                <div key={p.id} className="space-y-1.5 pl-2 border-l-2 border-white/10 print-avoid-break">
                  <div className="text-xs font-bold text-white font-mono flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-[11px] text-cyan-400 font-semibold">{p.period}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 italic">{p.tagline}</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2 print-avoid-break">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 border-b border-violet-500/30 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300 font-sans">
              <div>
                <strong className="text-white">Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3
              </div>
              <div>
                <strong className="text-white">Frontend:</strong> React.js, Next.js, Redux Toolkit, Tailwind CSS, Bootstrap, Material UI, SCSS, Formik, Yup, Responsive Design, Cross-Browser Compatibility, Performance Optimization
              </div>
              <div>
                <strong className="text-white">Backend & Database:</strong> Node.js, Express.js, RESTful API Development & Integration, Prisma ORM, PostgreSQL, MongoDB
              </div>
              <div>
                <strong className="text-white">Testing:</strong> Vitest, Unit Testing
              </div>
              <div>
                <strong className="text-white">Cloud & Tools:</strong> Azure DevOps, CI/CD Pipelines, Git, JIRA, Figma
              </div>
              <div>
                <strong className="text-white">Practices:</strong> Agile/Scrum, Sprint Planning, Code Reviews, Clean & Reusable Code, Technical Documentation, UI/UX Collaboration
              </div>
              <div>
                <strong className="text-white">AI:</strong> AI-Assisted Development, Claude Code
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 print-avoid-break">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 border-b border-violet-500/30 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {educationData.map((e, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-white">{e.degree}</span> — {e.institution}, {e.location}
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">{e.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional */}
          <div className="space-y-1 print-avoid-break">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 border-b border-violet-500/30 pb-1">
              Additional
            </h2>
            <div className="text-xs text-slate-300">
              <strong className="text-white">Languages:</strong> English, Hindi, Telugu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
