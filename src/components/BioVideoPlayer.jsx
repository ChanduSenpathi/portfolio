import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Subtitles,
  Briefcase,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';

export default function BioVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const southIndianVoiceRef = useRef(null);
  const charOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  // Exact 3-sentence executive bio (under 22 seconds total)
  const bioSentences = [
    {
      id: 0,
      speech: "Hello, I am Chandu Senapathi, a Frontend Developer with 5 years of experience building scalable enterprise web applications at Neosoft Technologies.",
      caption: "Hello, I am Chandu Senapathi, a Frontend Developer with 5 years of experience building scalable enterprise web applications at Neosoft Technologies.",
      estSeconds: 7.5
    },
    {
      id: 1,
      speech: "I specialize in React, Next.js, and TypeScript, and have engineered enterprise AI platforms like IngenXAI 360 and multi-role systems for Birla Estates.",
      caption: "I specialize in React, Next.js, and TypeScript, and have engineered enterprise AI platforms like IngenXAI 360 and multi-role systems for Birla Estates.",
      estSeconds: 7.5
    },
    {
      id: 2,
      speech: "My office location is Pune and my current location is Visakhapatnam. I am open to relocation and available for immediate frontend developer opportunities.",
      caption: "My office location is Pune and my current location is Visakhapatnam. I am open to relocation, and available for immediate frontend developer opportunities.",
      estSeconds: 7.0
    }
  ];

  const TOTAL_DURATION = 35; // Generous 35s duration ensuring audio never gets cut off
  const elapsedRef = useRef(0);
  const timerRef = useRef(null);

  // Exclusively Select and Guarantee a Male Voice across All Devices (Desktop, Android, iOS Safari, Samsung)
  useEffect(() => {
    const setupMaleVoice = () => {
      if (!window.speechSynthesis) return;
      const allVoices = window.speechSynthesis.getVoices();
      if (!allVoices || allVoices.length === 0) return;

      // Female voice identifiers to strictly reject across all platforms
      const femaleKeywords = [
        'female', 'woman', 'girl',
        'veena', 'sangeeta', 'priya', 'kavya', 'ananya', 'heera', 'lekha', 'neerja',
        'shruti', 'pooja', 'aditi', 'zira', 'samantha', 'victoria', 'karen', 'fiona',
        'tessa', 'serena', 'hazel', 'susan', 'moira', 'catherine', 'jenny', 'aria',
        'ava', 'allison', 'stephanie', 'siri', 'helena', 'laura', 'alice', 'sara',
        'sarah', 'zoe', 'joana', 'luciana', 'kyoko', 'yuna', 'amelie', 'anna',
        'clara', 'emma', 'olivia', 'sophia', 'isabella', 'charlotte', 'amelia',
        'mia', 'harper', 'evelyn', 'abigail', 'emily', 'elizabeth', 'mila', 'ella',
        'avery', 'sofia', 'camila', 'scarlett', 'madison', 'luna', 'grace', 'chloe',
        'penelope', 'layla', 'riley', 'zoey', 'nora', 'lily', 'eleanor', 'hannah',
        'lillian', 'addison', 'aubrey', 'ellie', 'stella', 'natalie', 'leah', 'violet',
        'aurora', 'savannah', 'audrey', 'brooklyn', 'bella', 'claire', 'skylar'
      ];

      // Explicit mobile default voices known to be female despite lacking the keyword "female"
      const forbiddenMobileFemaleDefaults = [
        'google english (india)',
        'google english india',
        'samsung english (india)',
        'samsung english india'
      ];

      const isKnownFemale = (v) => {
        const name = (v.name || '').toLowerCase();
        const uri = (v.voiceURI || '').toLowerCase();
        const combined = `${name} ${uri}`;

        if (forbiddenMobileFemaleDefaults.some((f) => name === f || uri === f)) {
          // If it doesn't explicitly have a male tag, it is female
          if (!combined.includes('male') && !combined.includes('man')) return true;
        }

        return femaleKeywords.some((kw) => combined.includes(kw));
      };

      // Explicit male keywords across Windows, Mac, iOS, Android (Google TTS), Samsung, Linux
      const maleKeywords = [
        'rishi',    // iOS / macOS premier Indian English Male
        'ravi',     // Microsoft Indian English Male
        'prabhat',  // Microsoft Indian English Male
        'hemant',   // Microsoft Indian English Male
        'male',     // Explicit male flag in name or voiceURI (#male, en-in-x-enc#male, etc.)
        'man',
        'boy',
        'daniel',   // High-quality British Male (popular across mobile & desktop)
        'alex',     // Premier Male on iOS / macOS
        'david',    // Windows / Google Male
        'mark',     // Windows Male
        'george',   // Microsoft UK Male
        'aaron',    // Apple Male
        'arthur',   // Apple Male
        'oliver',   // Apple Male
        'tom',      // Apple Male
        'guy',      // Microsoft Male
        'brian',    // Google / Apple Male
        'ryan',     // Apple / Google Male
        'eric',     // Google / Windows Male
        'fred',     // Apple Male
        'gordon',   // Apple Male
        'james',    // Android / Windows Male
        'richard'   // Android / Windows Male
      ];

      const isVerifiedMale = (v) => {
        if (isKnownFemale(v)) return false;
        const combined = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
        return maleKeywords.some((kw) => combined.includes(kw));
      };

      // 1. First priority: Indian English Male (e.g. Rishi on iOS/Mac, Ravi/Prabhat/Hemant on Windows, Google en-IN Male on Android)
      const indianMale = allVoices.find(
        (v) =>
          (v.lang.toLowerCase().includes('in') || v.name.toLowerCase().includes('india')) &&
          isVerifiedMale(v)
      );

      // 2. Second priority: Any verified English Male voice (e.g. Daniel, Alex, David, George, Aaron, Oliver)
      const englishMale = allVoices.find(
        (v) => v.lang.toLowerCase().startsWith('en') && isVerifiedMale(v)
      );

      // 3. Third priority: Any verified male voice
      const anyMale = allVoices.find((v) => isVerifiedMale(v));

      // 4. Safe fallback: any English voice that is strictly not known female
      const safeNonFemale = allVoices.find(
        (v) => v.lang.toLowerCase().startsWith('en') && !isKnownFemale(v)
      );

      // 5. Ultimate fallback
      const chosenVoice =
        indianMale ||
        englishMale ||
        anyMale ||
        safeNonFemale ||
        allVoices.find((v) => !isKnownFemale(v)) ||
        allVoices[0];

      southIndianVoiceRef.current = chosenVoice;
    };

    setupMaleVoice();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = setupMaleVoice;
    }
  }, []);

  // 100% Exact Speech & Subtitle Synchronization Engine
  // Supports resuming modulation and words from the exact position paused
  const playSentence = (index, fromChar = 0) => {
    if (index >= bioSentences.length) {
      setIsPlaying(false);
      setProgressPercent(100);
      clearInterval(timerRef.current);
      charOffsetRef.current = 0;
      isPausedRef.current = false;
      setTimeout(() => {
        setActiveSentenceIndex(0);
        setProgressPercent(0);
        elapsedRef.current = 0;
      }, 1200);
      return;
    }

    // Set subtitle to this sentence immediately
    setActiveSentenceIndex(index);
    setIsPlaying(true);
    isPausedRef.current = false;

    if (window.speechSynthesis && !isMuted) {
      window.speechSynthesis.cancel();
      // Resume speech synthesis engine in case mobile browser paused it
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const sentenceObj = bioSentences[index];
      const validFrom = Math.max(0, Math.min(fromChar, sentenceObj.speech.length - 1));
      const textToSpeak = validFrom > 0 ? sentenceObj.speech.slice(validFrom) : sentenceObj.speech;
      charOffsetRef.current = validFrom;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Set Male Voice & Masculine Resonance
      if (southIndianVoiceRef.current) {
        utterance.voice = southIndianVoiceRef.current;
        utterance.lang = southIndianVoiceRef.current.lang || 'en-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      // Strictly masculine pitch & resonant baritone (0.76 produces a deep, natural, authoritative male voice across all devices)
      utterance.pitch = 0.76;
      utterance.rate = 0.92 * playbackSpeed;

      // Track speech character/word boundary in real-time so pause/resume resumes from the exact spot
      utterance.onboundary = (e) => {
        if (typeof e.charIndex === 'number') {
          charOffsetRef.current = validFrom + e.charIndex;
        }
      };

      // Trigger next sentence the EXACT millisecond this sentence finishes!
      utterance.onend = () => {
        // If pause was requested, browser cancel() may trigger onend - ignore if paused
        if (isPausedRef.current) return;

        charOffsetRef.current = 0;
        const nextIndex = index + 1;
        if (nextIndex < bioSentences.length) {
          playSentence(nextIndex, 0); // Speaks next sentence and updates subtitle in lockstep
        } else {
          // Voice has completely finished speaking the final sentence!
          setIsPlaying(false);
          setProgressPercent(100);
          clearInterval(timerRef.current);
          setTimeout(() => {
            setActiveSentenceIndex(0);
            setProgressPercent(0);
            elapsedRef.current = 0;
          }, 1500);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && !isPausedRef.current) {
          setIsPlaying(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Smooth real-time progress bar (Glides linearly, never terminates before audio finishes)
  useEffect(() => {
    if (isPlaying) {
      const stepMs = 50;
      const stepSec = (stepMs / 1000) * playbackSpeed;

      timerRef.current = setInterval(() => {
        elapsedRef.current += stepSec;
        // Cap at 95% while voice is still speaking, jumps to 100% ONLY when voice actually completes
        const pct = Math.min(95, (elapsedRef.current / TOTAL_DURATION) * 100);
        setProgressPercent(pct);
      }, stepMs);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, playbackSpeed]);

  // Main Play / Pause Handler with instant resume from exact word position
  const handlePlayToggle = () => {
    playClickSound();

    if (isPlaying) {
      // Pause
      isPausedRef.current = true;
      setIsPlaying(false);
      clearInterval(timerRef.current);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Resume from current active sentence and exact character/word offset
      isPausedRef.current = false;
      playSentence(activeSentenceIndex, charOffsetRef.current);
    }
  };

  // Replay from beginning
  const handleRestart = () => {
    playClickSound();
    isPausedRef.current = false;
    charOffsetRef.current = 0;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setActiveSentenceIndex(0);
    setProgressPercent(0);
    elapsedRef.current = 0;
    setIsPlaying(false);
    clearInterval(timerRef.current);
    setTimeout(() => {
      playSentence(0, 0);
    }, 120);
  };

  // Smooth Scrubber Click to jump
  const handleScrubberClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = ratio * TOTAL_DURATION;

    elapsedRef.current = targetSeconds;
    setProgressPercent(ratio * 100);
    charOffsetRef.current = 0;
    isPausedRef.current = false;

    // Determine sentence at that time position
    let targetIdx = 0;
    if (targetSeconds < 7.5) {
      targetIdx = 0;
    } else if (targetSeconds < 15.0) {
      targetIdx = 1;
    } else {
      targetIdx = 2;
    }

    if (isPlaying) {
      playSentence(targetIdx, 0);
    } else {
      setActiveSentenceIndex(targetIdx);
    }
  };

  // Mute toggle
  const handleMuteToggle = () => {
    playClickSound();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const currentSecondsFormatted = Math.floor(elapsedRef.current);
  const formattedTime = `0:${currentSecondsFormatted < 10 ? '0' : ''}${currentSecondsFormatted} / 0:${TOTAL_DURATION}`;

  return (
    <section id="bio-video" className="relative py-20 z-10 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Executive Video Profile & Audio Bio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Meet Chandu Senapathi
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Executive audio introduction with real-time synchronized subtitles in South Indian English.
          </p>
        </div>

        {/* Video Player Card Frame */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#11162b] to-[#090c19] overflow-hidden shadow-2xl shadow-purple-950/40">
          {/* Top Video Chrome Bar (NO DROPDOWN - Clean Single South Indian Voice) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3 bg-[#0c1020]/90 backdrop-blur-md gap-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 inline-block" />
              <span className="ml-1.5 text-xs text-slate-300 flex items-center gap-1.5 font-medium truncate">
                <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                chandu-presentation.mp4
              </span>
            </div>

            {/* Locked South Indian Male Voice Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 font-medium flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>South Indian English (Male)</span>
              </span>

              <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Main Video Presentation Display */}
          <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[380px] bg-[#070a14]">
            {/* Left 5 Cols: Authentic High-Resolution Portrait Display */}
            <div className="md:col-span-5 relative flex items-center justify-center p-5 sm:p-6 bg-gradient-to-b from-[#0e1428] to-[#090d1c] overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-cyan-500/15 to-transparent transition-opacity duration-700 ${isPlaying ? 'opacity-100 scale-105' : 'opacity-40'
                  }`}
              />

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`relative h-56 w-44 sm:h-64 sm:w-56 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isPlaying
                      ? 'border-cyan-400 shadow-2xl shadow-cyan-500/40 scale-[1.02]'
                      : 'border-white/20 shadow-xl'
                    }`}
                >
                  <img
                    src="/chandu.jpg"
                    alt="Chandu Senapathi - Frontend Developer"
                    className="h-full w-full object-cover object-top"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090d1c] via-[#090d1c]/60 to-transparent flex flex-col justify-end p-3">
                    <span className="font-bold text-white text-sm font-display leading-tight">
                      Chandu Senapathi
                    </span>
                    <span className="text-[11px] text-cyan-300">
                      Frontend Developer (5 Yrs)
                    </span>
                  </div>

                  {isPlaying && (
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-600/90 backdrop-blur-md text-[10px] text-white font-bold animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      SPEAKING
                    </div>
                  )}
                </div>

                {/* Animated Audio Equalizer Waveform Bars */}
                <div className="mt-4 flex items-center justify-center gap-1 h-5">
                  {[45, 80, 95, 65, 90, 100, 75, 55, 90, 70, 85, 50].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400 transition-all duration-150"
                      style={{
                        height: isPlaying ? `${Math.max(20, (h * Math.random()).toFixed(0))}%` : '20%',
                        opacity: isPlaying ? 0.95 : 0.35
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Real-time Synchronized Subtitles Display */}
            <div className="md:col-span-7 p-5 sm:p-6 lg:p-8 flex flex-col justify-between space-y-5 sm:space-y-6">
              {/* Teleprompter Subtitles Active Box */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    <Subtitles className="h-3.5 w-3.5" />
                    Synchronized Speech Subtitles
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {formattedTime}
                  </span>
                </div>

                <div className="min-h-[100px] sm:min-h-[120px] rounded-2xl border border-cyan-500/40 bg-[#0c1020] p-4 sm:p-6 flex items-center justify-center text-center shadow-lg shadow-cyan-950/20">
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-relaxed font-sans transition-all duration-200">
                    "{bioSentences[activeSentenceIndex]?.caption}"
                  </p>
                </div>
              </div>

              {/* Highlights cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-violet-400" />
                    Experience
                  </div>
                  <div className="text-slate-300">
                    5 Years at Neosoft Technologies
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-cyan-400" />
                    Flagship Systems
                  </div>
                  <div className="text-slate-300">
                    IngenAI 360 & Birla Estates
                  </div>
                </div>
              </div>

              {/* Connect CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <a
                  href="#contact"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-center"
                >
                  <span>Connect with Chandu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="mailto:chandu.senapathi220@gmail.com"
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors truncate text-center"
                >
                  chandu.senapathi220@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Video Scrubbing & Control Bar */}
          <div className="border-t border-white/10 bg-[#0c1020] p-3.5 sm:p-4 space-y-3">
            {/* 100% Smooth Continuous Progress Bar */}
            <div
              className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden cursor-pointer"
              onClick={handleScrubberClick}
              title="Click anywhere to seek"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500"
                style={{
                  width: `${progressPercent}%`,
                  transition: isPlaying ? 'width 0.05s linear' : 'none'
                }}
              />
            </div>

            {/* Controls Row (Fully responsive, no tool breaking) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Clean Play / Pause / Resume Button */}
                <button
                  onClick={handlePlayToggle}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-md shadow-violet-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-white" />
                      <span>{progressPercent > 0 && progressPercent < 100 ? 'Resume' : 'Play Audio Bio'}</span>
                    </>
                  )}
                </button>

                {/* Restart */}
                <button
                  onClick={handleRestart}
                  title="Replay from beginning"
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                {/* Mute / Unmute */}
                <button
                  onClick={handleMuteToggle}
                  title={isMuted ? 'Unmute voice' : 'Mute voice'}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
                </button>

                <span className="text-[11px] sm:text-xs text-slate-400 font-mono shrink-0 ml-1">
                  {formattedTime}
                </span>
              </div>

              {/* Playback speed selector */}
              <div className="flex items-center justify-end sm:justify-start gap-1.5 sm:gap-2 self-end sm:self-auto">
                <span className="text-xs text-slate-400 font-mono">Speed:</span>
                {[1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      playClickSound();
                      setPlaybackSpeed(speed);
                      if (isPlaying) {
                        playSentence(activeSentenceIndex);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${playbackSpeed === speed
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
