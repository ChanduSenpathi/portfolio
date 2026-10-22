import { useState } from 'react';
import {
  Code2,
  Layers,
  FileCode,
  Palette,
  Database,
  Server,
  HardDrive,
  Cpu,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  Sparkles,
  LayoutGrid,
  Workflow,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { playClickSound } from '../utils/audioEffects';

// Icon map helper
const iconMap = {
  Code2,
  Layers,
  FileCode,
  Palette,
  Database,
  Server,
  HardDrive,
  Cpu,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  Sparkles,
  LayoutGrid,
  Workflow
};

export default function Skills3D() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(skillsData.skills[0]);
  const [activeTabArchitecture, setActiveTabArchitecture] = useState('nextjs');

  const filteredSkills =
    activeCategory === 'all'
      ? skillsData.skills
      : skillsData.skills.filter((s) => s.category === activeCategory);

  const architectures = {
    nextjs: {
      title: 'Enterprise AI App Router & Prisma ORM',
      project: 'IngenXAI 360',
      description:
        'Next.js 14 server components fetching streaming LLM completions, combined with Prisma ORM querying PostgreSQL for instantaneous user prompt caching.',
      codeSnippet: `// IngenXAI 360 - App Router Server Action with Prisma
export async function streamAIQuery(prompt: string, userId: string) {
  'use server';
  const session = await verifyAuthToken(userId);
  if (!session) throw new UnauthorizedError();

  const userContext = await prisma.userProfile.findUnique({
    where: { id: userId },
    include: { preferences: true }
  });

  return streamEnterpriseAIResponse({
    prompt,
    context: userContext,
    model: 'gpt-enterprise'
  });
}`
    },
    portals: {
      title: '5 Independent Role-Based Route Guards',
      project: 'Aditya Birla Estates',
      description:
        'A single React SPA hosting 5 distinct role portals (Admin, Regional Head, Regional Manager, Team Lead, Customer) with JWT claims verification.',
      codeSnippet: `// Birla Estates - Hierarchical Role-Based Guard
export const ProtectedRoleRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized-access" replace />;
  }

  return <PortalLayout role={user.role}>{children}</PortalLayout>;
};`
    },
    redux: {
      title: 'Normalized Redux State & Route-Level Lazy Loading',
      project: 'Kinemeric Hub',
      description:
        'High-performance state cache using Redux Toolkit slices and dynamic code-splitting via React.lazy and Suspense, slicing bundle size by 35%.',
      codeSnippet: `// Kinemeric Hub - Route Splitting & RTK Query
const CompanyAdminDashboard = lazy(() => import('./modules/admin/CompanyAdmin'));
const AnalyticsView = lazy(() => import('./modules/analytics/AnalyticsView'));

export const adminSlice = createSlice({
  name: 'enterpriseAdmin',
  initialState: adminAdapter.getInitialState({ loading: false }),
  reducers: {
    syncMetrics: (state, action) => {
      adminAdapter.upsertMany(state, action.payload);
    }
  }
});`
    }
  };

  return (
    <section id="skills" className="relative py-24 z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
            <Sparkles className="h-3 w-3" />
            <span>Interactive 3D Skill Galaxy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Technical Arsenal & Architecture
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hover over any technology card for real-time 3D perspective feedback, or click to
            inspect production implementation details.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {skillsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 scale-105'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || Code2;
            const isSelected = selectedSkill.name === skill.name;

            return (
              <TiltCard
                key={skill.name}
                maxTilt={16}
                scale={1.03}
                onClick={() => {
                  playClickSound();
                  setSelectedSkill(skill);
                }}
                className={`cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-200 ${
                  isSelected
                    ? 'border-cyan-400/80 bg-cyan-950/30 shadow-lg shadow-cyan-500/20'
                    : 'border-white/10 bg-white/[0.03] hover:border-violet-500/40 hover:bg-white/[0.06]'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon & Mastery % */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 border border-white/15 flex items-center justify-center text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Skill Name & Description */}
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                      {skill.name}
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Production Highlight badge */}
                  <div className="rounded-lg bg-black/30 border border-white/5 p-2 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{skill.highlight}</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Selected Skill Deep Dive & Architecture Code Sandbox */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0d1222]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Detail about clicked skill */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono">
                <span>Selected Technology Deep Dive</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {selectedSkill.name} in Enterprise Production
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedSkill.description}
              </p>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                  Chandu's Implementation Case Study
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedSkill.highlight}
                </div>
              </div>

              {/* Architecture Switcher Tabs */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Inspect System Architectures Built By Chandu:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveTabArchitecture('nextjs');
                    }}
                    className={`p-2.5 rounded-lg text-xs font-mono text-center transition-all ${
                      activeTabArchitecture === 'nextjs'
                        ? 'bg-violet-600 text-white font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    IngenAI 360
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveTabArchitecture('portals');
                    }}
                    className={`p-2.5 rounded-lg text-xs font-mono text-center transition-all ${
                      activeTabArchitecture === 'portals'
                        ? 'bg-cyan-600 text-white font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Birla 5 Roles
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveTabArchitecture('redux');
                    }}
                    className={`p-2.5 rounded-lg text-xs font-mono text-center transition-all ${
                      activeTabArchitecture === 'redux'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Kinemeric Hub
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Code Sandbox Terminal */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#080b15] overflow-hidden shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-[#0e1324]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    {architectures[activeTabArchitecture].project} — Architecture Pattern
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-500/10">
                  TypeScript / React
                </span>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-300 font-mono">
                  // {architectures[activeTabArchitecture].description}
                </p>
                <pre className="overflow-x-auto text-xs font-mono text-cyan-200 leading-relaxed p-3 rounded-lg bg-black/40 border border-white/5">
                  <code>{architectures[activeTabArchitecture].codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
