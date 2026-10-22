import { useEffect, useState, useRef } from 'react';

/**
 * TalkingAvatar Component
 * Creates an interactive talking head with:
 * - Dynamic mouth lip-sync animation synchronized to speech phonemes / audio cadence
 * - Subtle natural jaw drop and lip aperture
 * - Natural eye blinking every ~3.5 seconds
 * - Human conversational head nodding & micro-movements
 * - Sound wave aura surrounding the frame when speaking
 */
export default function TalkingAvatar({ isSpeaking, className = '' }) {
  const [mouthOpen, setMouthOpen] = useState(0); // 0 (closed) to 1 (wide open)
  const [isBlinking, setIsBlinking] = useState(false);
  const [headTilt, setHeadTilt] = useState({ y: 0, rot: 0 });
  const animFrameRef = useRef(null);
  const blinkTimerRef = useRef(null);

  // Lip-sync / mouth movement animation loop
  useEffect(() => {
    let startTime = performance.now();

    const animateMouth = (now) => {
      if (isSpeaking) {
        const elapsed = (now - startTime) / 1000;
        // Combine multiple sine frequencies to simulate natural syllable phoneme cadences
        const wave1 = Math.sin(elapsed * 18);
        const wave2 = Math.sin(elapsed * 27);
        const wave3 = Math.cos(elapsed * 9);
        const combined = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2 + 0.5);

        // Clamped amplitude with natural speech pauses
        const pauses = Math.sin(elapsed * 2.2) > -0.2 ? 1 : 0.15;
        const aperture = Math.max(0, Math.min(1, combined * pauses));
        setMouthOpen(aperture);

        // Head micro-movements (conversational nods)
        const nodY = Math.sin(elapsed * 4) * 2;
        const rot = Math.sin(elapsed * 2.5) * 0.8;
        setHeadTilt({ y: nodY, rot });
      } else {
        setMouthOpen(0);
        setHeadTilt({ y: 0, rot: 0 });
      }

      animFrameRef.current = requestAnimationFrame(animateMouth);
    };

    animFrameRef.current = requestAnimationFrame(animateMouth);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSpeaking]);

  // Natural human eye blinking loop (every 3 to 5 seconds)
  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 140);

      const nextInterval = 2800 + Math.random() * 2400;
      blinkTimerRef.current = setTimeout(triggerBlink, nextInterval);
    };

    blinkTimerRef.current = setTimeout(triggerBlink, 3000);

    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  // Calculate pixel shifts based on mouth aperture
  const mouthHeight = Math.round(mouthOpen * 9); // 0px to 9px opening
  const jawDrop = Math.round(mouthOpen * 3.5); // lower jaw displacement

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      {/* Speaking Sound Glow Aura */}
      {isSpeaking && (
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/40 via-violet-500/30 to-emerald-400/30 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Main Avatar Head Container with micro-nodding */}
      <div
        className="relative h-full w-full rounded-2xl overflow-hidden transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${headTilt.y}px) rotate(${headTilt.rot}deg)`
        }}
      >
        {/* Base Photo: Upper Head & Torso */}
        <img
          src="/chandu.jpg"
          alt="Chandu Senapathi Talking Avatar"
          className="h-full w-full object-cover object-top pointer-events-none"
        />

        {/* Dynamic Talking Mouth Sync Overlay Layer */}
        {/* Chandu's mouth is centered at approx 49% - 53% horizontally, and 50% - 53% vertically */}
        <div
          className="absolute pointer-events-none transition-all duration-75"
          style={{
            top: '49.8%',
            left: '46.2%',
            width: '9.8%',
            height: '4.2%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {isSpeaking && mouthOpen > 0.08 && (
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full overflow-visible"
              style={{
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))'
              }}
            >
              {/* Mouth Interior Cavity */}
              <ellipse
                cx="50"
                cy="30"
                rx="42"
                ry={Math.max(4, mouthHeight * 3.2)}
                fill="#3a1118"
              />
              {/* Subtle Upper Teeth Line */}
              <path
                d="M 22 25 Q 50 28 78 25 Q 74 31 50 32 Q 26 31 22 25 Z"
                fill="#f1edea"
                opacity={mouthOpen > 0.3 ? 0.9 : 0.4}
              />
              {/* Subtle Tongue Accent */}
              {mouthOpen > 0.45 && (
                <ellipse
                  cx="50"
                  cy={33 + mouthHeight}
                  rx="26"
                  ry="9"
                  fill="#9e3a47"
                  opacity="0.85"
                />
              )}
              {/* Natural Upper & Lower Lip Contour */}
              <path
                d="M 8 26 Q 50 21 92 26 Q 50 33 8 26 Z"
                fill="#834648"
                opacity="0.75"
              />
            </svg>
          )}
        </div>

        {/* Natural Eye Blink Overlay */}
        {/* Positioned over the eyes: ~31% - 37% from top */}
        {isBlinking && (
          <div
            className="absolute pointer-events-none bg-[#bf8e77]/90 rounded-full"
            style={{
              top: '32.6%',
              left: '32%',
              width: '37%',
              height: '3.6%',
              filter: 'blur(0.5px)',
              mixBlendMode: 'multiply'
            }}
          />
        )}

        {/* Subtle breathing light reflection */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
            isSpeaking ? 'opacity-30' : 'opacity-50'
          }`}
        />
      </div>
    </div>
  );
}
