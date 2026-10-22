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

  // Exact 2-sentence executive bio (22.91s total master audio)
  const bioSentences = [
    {
      id: 0,
      speech: "Hello, I am Chandu Senapathi, a Frontend Developer with 5 years of experience building scalable enterprise web applications at Neosoft Technologies.",
      caption: "Hello, I am Chandu Senapathi, a Frontend Developer with 5 years of experience building scalable enterprise web applications at Neosoft Technologies.",
      audioSrc: "/audio/bio-0.wav",
      duration: 10.41,
      startTime: 0
    },
    {
      id: 1,
      speech: "I specialize in React, Next.js, and TypeScript, and have engineered enterprise AI platforms like IngenXAI 360 and multi-role systems for Birla Estates.",
      caption: "I specialize in React, Next.js, and TypeScript, and have engineered enterprise AI platforms like IngenXAI 360 and multi-role systems for Birla Estates.",
      audioSrc: "/audio/bio-1.wav",
      duration: 12.50,
      startTime: 10.41
    }
  ];

  const TOTAL_DURATION = 22.91; // Exact combined duration of master audio
  const elapsedRef = useRef(0);
  const audioRef = useRef(null);
  const activeIndexRef = useRef(0);

  // Initialize and manage high-fidelity HTML5 Audio engine
  // Guarantees strictly male voice across ALL devices (Desktop, iPhone, Android, Samsung)
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const currentSentence = bioSentences[activeIndexRef.current] || bioSentences[0];
      const curTime = audioRef.current.currentTime || 0;
      const totalElapsed = Math.min(TOTAL_DURATION, currentSentence.startTime + curTime);
      elapsedRef.current = totalElapsed;
      setProgressPercent(Math.min(100, (totalElapsed / TOTAL_DURATION) * 100));
    };

    const handleEnded = () => {
      const nextIdx = activeIndexRef.current + 1;
      if (nextIdx < bioSentences.length) {
        playSentence(nextIdx, 0);
      } else {
        setIsPlaying(false);
        setProgressPercent(100);
        setTimeout(() => {
          setActiveSentenceIndex(0);
          activeIndexRef.current = 0;
          setProgressPercent(0);
          elapsedRef.current = 0;
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = bioSentences[0].audioSrc;
          }
        }, 1200);
      }
    };

    const handleError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Exact Audio & Subtitle Synchronization Engine
  // Seamlessly starts or resumes from exact millisecond offset
  const playSentence = (index, startOffset = 0) => {
    if (index >= bioSentences.length) {
      setIsPlaying(false);
      setProgressPercent(100);
      setTimeout(() => {
        setActiveSentenceIndex(0);
        activeIndexRef.current = 0;
        setProgressPercent(0);
        elapsedRef.current = 0;
      }, 1200);
      return;
    }

    setActiveSentenceIndex(index);
    activeIndexRef.current = index;
    setIsPlaying(true);

    const sentenceObj = bioSentences[index];
    const audio = audioRef.current;
    if (!audio) return;

    const currentSrc = audio.src ? new URL(audio.src, window.location.href).pathname : '';
    if (currentSrc !== sentenceObj.audioSrc) {
      audio.src = sentenceObj.audioSrc;
      audio.currentTime = startOffset || 0;
    } else if (startOffset > 0) {
      audio.currentTime = startOffset;
    }

    audio.playbackRate = playbackSpeed;
    audio.muted = isMuted;

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  };

  // Main Play / Pause Handler with instant millisecond resume
  const handlePlayToggle = () => {
    playClickSound();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Pause
      audio.pause();
      setIsPlaying(false);
    } else {
      // Resume from current exact position
      const currentSentence = bioSentences[activeSentenceIndex] || bioSentences[0];
      const currentSrc = audio.src ? new URL(audio.src, window.location.href).pathname : '';
      if (currentSrc !== currentSentence.audioSrc) {
        audio.src = currentSentence.audioSrc;
      }
      audio.playbackRate = playbackSpeed;
      audio.muted = isMuted;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Replay from beginning
  const handleRestart = () => {
    playClickSound();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = bioSentences[0].audioSrc;
    }
    setActiveSentenceIndex(0);
    activeIndexRef.current = 0;
    setProgressPercent(0);
    elapsedRef.current = 0;
    setIsPlaying(false);
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

    // Determine sentence at that time position
    let targetIdx = 0;
    let sentenceOffset = 0;
    if (targetSeconds < 10.41) {
      targetIdx = 0;
      sentenceOffset = targetSeconds;
    } else {
      targetIdx = 1;
      sentenceOffset = Math.min(12.50, targetSeconds - 10.41);
    }

    if (isPlaying) {
      playSentence(targetIdx, sentenceOffset);
    } else {
      setActiveSentenceIndex(targetIdx);
      activeIndexRef.current = targetIdx;
      const audio = audioRef.current;
      if (audio) {
        audio.src = bioSentences[targetIdx].audioSrc;
        audio.currentTime = sentenceOffset;
      }
    }
  };

  // Mute toggle
  const handleMuteToggle = () => {
    playClickSound();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Playback speed handler
  const handleSpeedChange = (speed) => {
    playClickSound();
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const currentSecondsFormatted = Math.floor(elapsedRef.current);
  const totalSecondsFormatted = Math.floor(TOTAL_DURATION);
  const formattedTime = `0:${currentSecondsFormatted < 10 ? '0' : ''}${currentSecondsFormatted} / 0:${totalSecondsFormatted}`;

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
                    IngenXAI 360 & Birla Estates
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
                    onClick={() => handleSpeedChange(speed)}
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
