import { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Cpu,
  Database,
  Server,
  Zap,
  Play
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound, playBurstSound } from '../utils/audioEffects';

export default function Projects3D() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive simulation states inside project modal
  const [simRole, setSimRole] = useState('Admin');
  const [aiPrompt, setAiPrompt] = useState('Analyze tenant churn & predict renewals');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState(
    'AI Model initialized with Next.js streaming API. Ready to process.'
  );

  const handleOpenModal = (project) => {
    playClickSound();
    setSelectedProject(project);
    if (project.id === 'ingenai-360') {
      setAiOutput('AI Model initialized with Next.js streaming API. Ready to process.');
    }
  };

  const handleCloseModal = () => {
    playClickSound();
    setSelectedProject(null);
  };

  const runAiSimulation = () => {
    playBurstSound();
    setAiGenerating(true);
    setAiOutput('Querying Prisma ORM & streaming LLM inference through Next.js App Router...');
    setTimeout(() => {
      setAiGenerating(false);
      setAiOutput(
        `✓ Analysis Complete: Predicted 94.2% renewal probability for Q3 enterprise accounts. Generated localized tenant retention roadmap with zero UI latency.`
      );
    }, 1200);
  };

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) =>
          activeFilter === 'ai'
            ? p.id === 'ingenai-360'
            : activeFilter === 'portals'
            ? p.id === 'aditya-birla' || p.id === 'kinemeric-hub'
            : p.id === 'asset-matrix-hub'
        );

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono">
            <Layers className="h-3 w-3" />
            <span>Enterprise Flagship Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Mission-Critical Production Systems
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Architected and engineered at Neosoft Technologies across enterprise AI, real estate
            ecosystems, and multi-role operations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'ai', label: 'Enterprise AI (IngenXAI 360)' },
              { id: 'portals', label: 'Multi-Role Portals' },
              { id: 'design', label: 'Design Systems & UI' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playClickSound();
                  setActiveFilter(f.id);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-md shadow-violet-500/30'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={10}
              scale={1.02}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#131a30]/80 via-[#0e1426]/75 to-[#080b16]/90 p-7 sm:p-8 backdrop-blur-2xl hover:border-violet-500/50 hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header Badge & Period */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border"
                    style={{
                      borderColor: `${project.themeColor}55`,
                      backgroundColor: `${project.themeColor}18`,
                      color: project.themeColor
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {project.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {project.period}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-cyan-300">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Key Metrics row */}
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-center">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 hover:border-cyan-400/50 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  Role: <span className="text-white font-semibold">{project.role}</span>
                </div>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* INTERACTIVE ARCHITECTURE & SIMULATION MODAL */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-violet-500/40 bg-[#0d1222] p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  System Architecture & Production Workflow
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Architecture Breakdown Diagram Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(selectedProject.architecture).map(([layer, desc]) => (
                  <div
                    key={layer}
                    className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1.5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {layer}
                    </div>
                    <div className="text-xs text-slate-200 leading-snug">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* LIVE INTERACTIVE SIMULATION WIDGET */}
              <div className="rounded-2xl border border-violet-500/30 bg-[#080b16] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-cyan-400" />
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Interactive System Simulation
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    LIVE DEMO
                  </span>
                </div>

                {/* Scenario 1: IngenAI 360 AI Prompt Simulation */}
                {selectedProject.id === 'ingenai-360' && (
                  <div className="space-y-3 font-mono text-xs">
                    <label className="text-slate-400 block">
                      Test Next.js + Prisma ORM Streaming Request:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="flex-1 rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={runAiSimulation}
                        disabled={aiGenerating}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold disabled:opacity-50"
                      >
                        {aiGenerating ? 'Streaming...' : 'Run Action'}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-cyan-200 text-xs min-h-[50px] leading-relaxed">
                      {aiOutput}
                    </div>
                  </div>
                )}

                {/* Scenario 2: Aditya Birla 5-Portal Role Switcher */}
                {selectedProject.id === 'aditya-birla' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">
                      Switch Active Portal Role to Test Route Guards:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
                      {[
                        'Admin',
                        'Regional Head',
                        'Regional Manager',
                        'Team Lead',
                        'Customer'
                      ].map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            playClickSound();
                            setSimRole(role);
                          }}
                          className={`p-2 sm:p-2.5 rounded-lg text-center text-[11px] sm:text-xs truncate transition-all ${
                            simRole === role
                              ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Active Route:</span>
                        <span className="text-cyan-300 font-bold">
                          /portal/{simRole.toLowerCase().replace(/\s+/g, '-')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Route Guard Status:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> 200 OK — Authorized Claims
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-sans pt-1 border-t border-white/5">
                        {simRole === 'Admin' &&
                          'Full platform governance, audit trail verification, enterprise billing.'}
                        {simRole === 'Regional Head' &&
                          'Zonal property sales pipeline, revenue forecasts, regional agent management.'}
                        {simRole === 'Regional Manager' &&
                          'Branch compliance, lead approvals, contract signature routing.'}
                        {simRole === 'Team Lead' &&
                          'Daily sales quotas, agent ticketing, property inspection logs.'}
                        {simRole === 'Customer' &&
                          'Property browsing, installment payment schedules, document download vault.'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scenario 3 & 4: General highlights */}
                {selectedProject.id !== 'ingenai-360' &&
                  selectedProject.id !== 'aditya-birla' && (
                    <div className="font-mono text-xs text-slate-300 space-y-2">
                      <div className="text-cyan-300">
                        Module Architecture Specifications:
                      </div>
                      <ul className="space-y-1 list-disc list-inside text-slate-300">
                        <li>Lazy-loaded React.lazy chunks with custom fallback loaders.</li>
                        <li>Vitest test suites targeting 90%+ branch and statement coverage.</li>
                        <li>TypeScript standardized UI component contracts.</li>
                      </ul>
                    </div>
                  )}
              </div>

              {/* Responsibilities & Achievements from Resume */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  Key Accomplishments & Production Impact
                </span>
                <div className="space-y-2 font-sans text-xs text-slate-300">
                  {selectedProject.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
