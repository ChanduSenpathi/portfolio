# Chandu Senapathi — 3D Interactive Portfolio

An enterprise-grade, highly interactive 3D portfolio showcasing 5+ years of frontend engineering expertise across React, Next.js, TypeScript, and modern web architectures.

---

## 📦 Packages Used, Rationale & Purpose

Every package in this project has been deliberately selected to deliver maximum visual performance, seamless user experience, and robust code quality.

### Production Dependencies (`dependencies`)

| Package | Version | Why It Was Used | Purpose & Exact Role in Project |
| :--- | :--- | :--- | :--- |
| **`react`** | `^19.3.1` | Modern, declarative component-based UI architecture with cutting-edge React 19 performance optimizations. | Powers the entire application lifecycle, state hooks (`useState`, `useEffect`, `useRef`), dynamic rendering, and responsive component hierarchy. |
| **`react-dom`** | `^19.3.1` | Official DOM renderer for React applications. | Mounts the root React virtual DOM tree into the HTML5 document (`index.html`) and handles seamless DOM reconciliation. |
| **`three`** | `^0.186.1` | The industry-standard WebGL 3D graphics rendering library for web browsers. | Powers `ThreeCanvas.jsx` to create an interactive 3D universe: orbiting React atom with glowing electron rings, 3D Virtual DOM hierarchy tree, particle starfields, floating tech badge meshes, and interactive mouse parallax. |
| **`lucide-react`** | `^1.61.0` | Comprehensive, consistent, and tree-shakeable SVG icon collection optimized for React. | Provides crisp iconography across the interface: navigation badges, category filters, audio/video player playback controls, terminal indicators, contact links, and resume actions. |
| **`canvas-confetti`** | `^1.9.4` | High-performance, 60fps canvas-based confetti particle animation engine with zero external dependencies. | Delivers celebratory micro-interactions when copying resume text, submitting contact/booking requests, and triggering easter eggs in the terminal. |

---

### Development Dependencies (`devDependencies`)

| Package | Version | Why It Was Used | Purpose & Exact Role in Project |
| :--- | :--- | :--- | :--- |
| **`vite`** | `^8.3.4` | Next-generation frontend tooling providing lightning-fast native ES-module Hot Module Replacement (HMR) and optimized Rollup bundling. | Serves the local development environment instantly and compiles minified, optimized production bundles for deployment. |
| **`@vitejs/plugin-react`** | `^6.1.2` | Official Vite plugin for React supporting Fast Refresh and modern JSX compilation. | Automatically handles JSX transformation and preserves React component state across hot reloads during development. |
| **`tailwindcss`** | `^4.3.3` | Modern, utility-first CSS framework (v4 engine) for building bespoke, highly responsive user interfaces directly in markup. | Powers the visual design system: glassmorphic cards (`backdrop-blur`), neon glow gradients, responsive grid layouts, animations, and PDF print formatting. |
| **`@tailwindcss/vite`** | `^4.3.3` | Direct Vite integration plugin for Tailwind CSS v4. | Seamlessly integrates the Tailwind CSS compiler directly into Vite’s build pipeline without requiring external PostCSS configuration files. |
| **`eslint`** | `^10.13.0` | Industry-standard static code analysis tool for identifying and fixing code quality issues. | Scans JavaScript/JSX code to maintain clean syntax, enforce coding best practices, and catch potential bugs before deployment. |
| **`@eslint/js`** | `^10.0.1` | Official ESLint configuration recommendations for JavaScript. | Provides standardized JavaScript linting rules and baseline code quality standards across the workspace. |
| **`eslint-plugin-react-hooks`** | `^7.1.1` | Official ESLint plugin enforcing the Rules of Hooks for React. | Guarantees that React hooks (`useEffect`, `useRef`, `useState`) follow call-order rules and exhaustive dependency standards. |
| **`eslint-plugin-react-refresh`** | `^0.5.7` | ESLint plugin validating component safety for Vite's React Fast Refresh. | Ensures components are structured cleanly so that hot reloads maintain state without causing full browser refreshes. |
| **`globals`** | `^17.13.0` | Library containing global variable definitions for browser and Node environments. | Provides ESLint with knowledge of standard browser APIs (`window`, `document`, `navigator`, `Audio`) and prevents false-positive "undefined variable" errors. |
| **`@types/react`** | `^19.3.0` | TypeScript type declarations for React. | Provides rich IDE intellisense, accurate parameter completions, and hook signature hints during development. |
| **`@types/react-dom`** | `^19.3.0` | TypeScript type declarations for ReactDOM. | Supplies DOM-specific typing definitions for root mounting and event handling. |

---

## 🛠️ Built-in Custom Audio & Web Utilities (No Heavy External Dependencies)

To ensure maximum performance and avoid bundle bloat, several specialized utilities were built natively:

- **HTML5 Audio Engine** (`BioVideoPlayer.jsx`): Employs pre-rendered master audio assets (`bio-0.wav`, `bio-1.wav`) with precise timeline scrubbing and reliable male voice reproduction across all mobile and desktop browsers without relying on device-dependent Web Speech APIs.
- **Web Audio API Sound Synthesizer** (`audioEffects.js`): Generates dynamic cyber sound effects (button clicks, laser bursts, toggle blips) directly using the browser's native `AudioContext` oscillator nodes without downloading external sound files.
- **3D Card Gyroscope/Tilt Effect** (`TiltCard.jsx`): Implements physics-based 3D perspective transforms with mouse tracking and mobile gyroscope support.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ChanduSenpathi/portfolio.git

# Navigate into project directory
cd portfolio

# Install all packages
npm install
```

### Development
```bash
# Start Vite development server with Hot Module Replacement
npm run dev
```

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Architecture

```
portfolio/
├── public/
│   ├── audio/              # Pre-rendered high-fidelity master bio audio
│   ├── chandu.jpg          # Profile photo
│   └── favicon.svg         # Modern gradient portfolio favicon
├── src/
│   ├── components/
│   │   ├── BioVideoPlayer.jsx        # Audio bio player with real-time waveform & captions
│   │   ├── ContactSection.jsx        # Contact form, direct links & calendar slot scheduler
│   │   ├── Footer.jsx                # Portfolio footer with copyright & quick links
│   │   ├── Hero.jsx                  # Hero section with avatar, live stats & CTA triggers
│   │   ├── InteractiveTerminal.jsx   # Interactive Linux-style CLI terminal
│   │   ├── Navbar.jsx                # Floating glassmorphic navigation bar
│   │   ├── Projects3D.jsx            # 3D project cards with interactive AI simulation
│   │   ├── ResumeModal.jsx           # Printable/PDF exportable resume viewer with copy utility
│   │   ├── Skills3D.jsx              # Technical Arsenal & Architecture deep-dive matrix
│   │   ├── TalkingAvatar.jsx         # Audio-reactive talking avatar component
│   │   ├── ThreeCanvas.jsx           # Three.js 3D universe (React atom, particles, DOM tree)
│   │   └── TiltCard.jsx              # Interactive 3D tilt card wrapper
│   ├── data/
│   │   └── portfolioData.js          # Centralized data store (experience, projects, skills, education)
│   ├── utils/
│   │   └── audioEffects.js           # Native Web Audio API sound effect synthesizer
│   ├── App.jsx                       # Main application layout and theme state
│   ├── index.css                     # Tailwind CSS v4 directives and custom scrollbar/print styles
│   └── main.jsx                      # React 19 root entry point
├── index.html                        # Application entry HTML with metadata & Google Fonts
├── package.json                      # Project dependencies & scripts
├── vite.config.js                    # Vite build configuration with Tailwind CSS plugin
└── README.md                         # Project documentation
```
