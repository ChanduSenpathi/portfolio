import { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react';
import { personalInfo, skillsData, projectsData, experienceData } from '../data/portfolioData';
import { playClickSound } from '../utils/audioEffects';

export default function InteractiveTerminal({ isOpen, onClose, onThemeChange, currentTheme }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "⚡ Welcome to Chandu Senapathi's Interactive 3D Dev Console v5.0.0"
    },
    {
      type: 'system',
      text: 'Type "help" to see available commands or "hire" to connect immediately.'
    }
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    playClickSound();

    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    if (cmd === 'help') {
      newHistory.push({
        type: 'response',
        text: `AVAILABLE COMMANDS:
  • skills        : List technical expertise across React, Next.js, TypeScript, etc.
  • projects      : Overview of IngenAI 360, Birla Estates, Kinemeric Hub, AMH
  • experience    : Neosoft Technologies 5-year journey & achievements
  • architecture  : Core system architecture patterns implemented
  • contact       : Direct email, phone, location & relocation status
  • hire          : Instant interview booking & connection info
  • theme <name>  : Switch 3D theme ('cyber', 'cosmic', 'matrix')
  • clear         : Clear the terminal console
  • exit          : Close the terminal`
      });
    } else if (cmd === 'skills') {
      newHistory.push({
        type: 'response',
        text: `🚀 CORE TECHNICAL SKILLS:
  Frontend   : React.js (96%), Next.js (92%), TypeScript (90%), Tailwind CSS (95%), Redux Toolkit (91%), Formik & Yup (93%), Material UI (89%)
  Backend    : Node.js, Express.js, Prisma ORM, PostgreSQL, MongoDB, RESTful APIs
  Testing/Dev: Vitest, Unit Testing, Azure DevOps CI/CD, Git, JIRA
  AI/Modern  : AI-Assisted Dev, Claude Code, Agile/Scrum, Modular Design Systems`
      });
    } else if (cmd === 'projects') {
      const projText = projectsData
        .map(
          (p, i) =>
            `[${i + 1}] ${p.title} (${p.category})
     Badge : ${p.badge}
     Stack : ${p.techStack.join(', ')}
     Key   : ${p.tagline}`
        )
        .join('\n\n');
      newHistory.push({
        type: 'response',
        text: `💼 FEATURED ENTERPRISE PROJECTS:\n\n${projText}`
      });
    } else if (cmd === 'experience') {
      const exp = experienceData[0];
      newHistory.push({
        type: 'response',
        text: `🏢 EXPERIENCE SUMMARY:
  Company   : ${exp.company} (${exp.period})
  Role      : ${exp.role} — ${exp.location}
  Projects  : ${exp.projectsWorked.join(', ')}
  Highlights:
  • Built scalable AI platform apps using React, Next.js, TS & Tailwind CSS.
  • Engineered 5 independent role-based portals in single React codebase for Birla Estates.
  • Integrated Node.js + Prisma ORM + PostgreSQL for data-driven backends.
  • Vitest unit testing suites ensuring rock-solid release reliability.`
      });
    } else if (cmd === 'architecture') {
      newHistory.push({
        type: 'response',
        text: `🏛️ ARCHITECTURAL HIGHLIGHTS:
  1. IngenXAI 360: Next.js 14 App Router + Server Components + Prisma ORM + PostgreSQL.
  2. Aditya Birla: Single React SPA with 5 independent role dashboards, strict Route Guards & Formik/Yup state machines.
  3. Kinemeric Hub: Dynamic code-splitting & route lazy loading, reducing bundle size by 35%, with Redux Toolkit slices.
  4. AMH: Standardized UI pattern library & atomic design system with 100% TypeScript.`
      });
    } else if (cmd === 'contact') {
      newHistory.push({
        type: 'response',
        text: `📬 CONTACT CHANDU SENAPATHI:
  • Phone    : ${personalInfo.phone}
  • Email    : ${personalInfo.email}
  • Location : ${personalInfo.location}
  • Status   : ${personalInfo.relocation}`
      });
    } else if (cmd.startsWith('theme')) {
      const parts = cmd.split(' ');
      const t = parts[1];
      if (['cyber', 'cosmic', 'matrix'].includes(t)) {
        onThemeChange(t);
        newHistory.push({
          type: 'success',
          text: `✓ 3D Universe switched to "${t}" mode.`
        });
      } else {
        newHistory.push({
          type: 'error',
          text: `Unknown theme. Available themes: cyber, cosmic, matrix`
        });
      }
    } else if (cmd === 'hire') {
      newHistory.push({
        type: 'success',
        text: `🎉 Thank you! Chandu Senapathi is open for Frontend Developer roles & ready for immediate interviews.
Direct Email: chandu.senapathi220@gmail.com
Phone/WhatsApp: +91 9491285183`
      });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      return;
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" for valid commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-violet-500/30 bg-[#0d111e]/95 shadow-2xl shadow-purple-500/20 flex flex-col max-h-[80vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#13192b]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-slate-300 truncate">
              <Terminal className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">chandu@terminal ~ (3D Active)</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onThemeChange(currentTheme === 'cyber' ? 'cosmic' : currentTheme === 'cosmic' ? 'matrix' : 'cyber')}
              className="text-xs px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Theme: {currentTheme}
            </button>
            <button
              onClick={onClose}
              className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-2 select-text">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                item.type === 'user'
                  ? 'text-cyan-300 font-semibold'
                  : item.type === 'error'
                  ? 'text-rose-400'
                  : item.type === 'success'
                  ? 'text-emerald-400 font-semibold'
                  : item.type === 'system'
                  ? 'text-violet-400'
                  : 'text-slate-300'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 border-t border-white/10 bg-[#0a0d18] px-4 py-2.5"
        >
          <span className="font-mono text-xs font-bold text-cyan-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'theme cosmic', 'hire'..."
            className="flex-1 bg-transparent font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded p-1 text-slate-400 hover:text-cyan-400"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
