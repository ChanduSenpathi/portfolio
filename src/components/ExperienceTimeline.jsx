import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Globe,
  Award,
  Sparkles
} from 'lucide-react';
import { experienceData, educationData, languagesData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound } from '../utils/audioEffects';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono">
                <Briefcase className="h-3 w-3" />
                <span>Professional Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                5 Years of Engineering Impact
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Driving front-end initiatives, scalable UI architectures, and production
                deployments at Neosoft Technologies.
              </p>
            </div>

            {/* Experience Timeline Item */}
            {experienceData.map((exp, idx) => (
              <TiltCard
                key={idx}
                maxTilt={8}
                scale={1.01}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#13192f]/90 via-[#0e1428]/80 to-[#080b18]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-purple-950/20"
              >
                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                          {exp.company}
                        </h3>
                      </div>
                      <div className="text-sm font-mono text-cyan-400 font-semibold mt-0.5">
                        {exp.role}
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-xs font-mono text-slate-400">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium">
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 mt-1 text-slate-400">
                        <MapPin className="h-3 w-3 text-cyan-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {exp.description}
                  </p>

                  {/* Flagship Projects Delivered */}
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                      Enterprise Platforms Spearheaded:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.projectsWorked.map((proj) => (
                        <span
                          key={proj}
                          className="px-3 py-1 rounded-lg bg-violet-950/40 border border-violet-500/30 text-xs font-mono text-violet-300 font-medium"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Responsibilities & Achievements */}
                  <div className="space-y-2.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                      Core Responsibilities & Deliverables:
                    </span>
                    <div className="space-y-2">
                      {exp.keyAchievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Right Column: Education & Linguistic Proficiency */}
          <div className="lg:col-span-5 space-y-8" id="education">
            {/* Education Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                <GraduationCap className="h-3 w-3" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Engineering Education
              </h2>

              <div className="space-y-4">
                {educationData.map((edu, idx) => (
                  <TiltCard
                    key={idx}
                    maxTilt={10}
                    scale={1.02}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider">
                          {edu.badge}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {edu.period}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {edu.degree}
                      </h3>
                      <div className="text-xs text-slate-300">
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <MapPin className="h-3 w-3 text-cyan-400" />
                        {edu.location}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
                <Globe className="h-3 w-3" />
                <span>Languages</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Communication & Collaboration
              </h3>

              <div className="space-y-3">
                {languagesData.map((lang) => (
                  <div
                    key={lang.name}
                    className="rounded-xl border border-white/10 bg-black/20 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">{lang.name}</span>
                      <span className="text-slate-400">{lang.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
