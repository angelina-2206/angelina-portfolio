/**
 * InitializingPage.jsx
 * ─────────────────────────────────────────────────────────────────
 * Pre-loading gate. System boot sequence → portfolio initialization.
 * Appears BEFORE everything. After complete, Hero section revealed.
 *
 * Sequence Timeline:
 *   0.0s → 1.5s: "PORTFOLIO" text scrambles in (█████ → random chars → final)
 *   0.5s → 2.5s: Progress bar animates 0→100% with realistic stutters
 *   1.0s → 2.5s: System logs appear line-by-line (terminal style)
 *   2.5s → 3.0s: Red flash, screen crack animation starts
 *   3.0s → 3.5s: Voronoi glass shards explode outward with physics
 *   3.5s → 4.5s: Page transitions to Hero underneath
 *   4.5s+: onComplete() fires, this component unmounts
 *
 * USAGE in App.jsx:
 *   import InitializingPage from './InitializingPage';
 *   const [initialized, setInitialized] = useState(false);
 *   return (
 *     <>
 *       {!initialized && <InitializingPage onComplete={() => setInitialized(true)} />}
 *       {initialized && <Hero />}
 *     </>
 *   );
 *
 * Props:
 *   onComplete: () => void   Callback when sequence finishes
 *
 * NO DEPENDENCIES beyond React.
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";

export default function InitializingPage({ onComplete = () => {} }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [crackPhase, setCrackPhase] = useState(0); // 0=none, 1=cracking, 2=shattering
  const [display, setDisplay] = useState("");
  const rafRef = useRef(null);

  // ─────────────────────────────────────────────────────────────
  // Text Scramble Effect — "PORTFOLIO"
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-[]{}—+*?#∎·";
    const text = "PORTFOLIO";
    let frame = 0;
    const total = text.length * 3 + 20;

    const tick = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (frame > i * 3 + 20) {
          out += text[i];
        } else if (frame > i * 2) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          out += "█";
        }
      }
      setDisplay(out);
      frame++;
      if (frame < total) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Progress Bar with Stutters
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let elapsed = 0;
    const duration = 2500; // 2.5 seconds total

    // Realistic stutter points (% of progress where it pauses briefly)
    const stutters = [
      { at: 0.18, pause: 300 },  // Pause at 18%
      { at: 0.45, pause: 250 },  // Pause at 45%
      { at: 0.72, pause: 400 },  // Pause at 72%
      { at: 0.88, pause: 200 },  // Pause at 88%
      { at: 0.95, pause: 150 },  // Pause at 95%
    ];

    let isPaused = false;
    let pauseTimeLeft = 0;

    const interval = setInterval(() => {
      if (isPaused) {
        pauseTimeLeft -= 50;
        if (pauseTimeLeft <= 0) {
          isPaused = false;
        }
      } else {
        elapsed += 50;
      }

      let p = Math.min((elapsed / duration) * 100, 100);

      // Check if we should stutter
      for (let stutter of stutters) {
        if (Math.abs(p / 100 - stutter.at) < 0.02 && !isPaused) {
          isPaused = true;
          pauseTimeLeft = stutter.pause;
          break;
        }
      }

      setProgress(p);

      if (p >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // System Logs appearing line-by-line
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const logLines = [
      "[ SYSTEM ] Initializing portfolio kernel...",
      "[ BOOT ] Loading React.js · Vite · GSAP...",
      "[ LOAD ] Parsing project metadata...",
      "[ AUTH ] Verifying developer credentials...",
      "[ CACHE ] Warming up animation cache...",
      "[ READY ] System armed. Handshake complete.",
    ];

    let currentLog = 0;
    const startTimer = setTimeout(() => {
      const logInterval = setInterval(() => {
        if (currentLog < logLines.length) {
          setLogs(prev => [...prev, logLines[currentLog]]);
          currentLog++;
        } else {
          clearInterval(logInterval);
        }
      }, 280);

      return () => clearInterval(logInterval);
    }, 600);

    return () => clearTimeout(startTimer);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Crack & Shatter Phase Transitions
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer1 = setTimeout(() => setCrackPhase(1), 2500);  // Start cracks at 2.5s
    const timer2 = setTimeout(() => setCrackPhase(2), 3000);  // Start shatter at 3.0s
    const timer3 = setTimeout(() => onComplete(), 4500);      // Complete at 4.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          opacity: crackPhase > 0 ? 0.3 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Main content — fades when shatter begins */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          opacity: crackPhase === 2 ? 0 : 1,
          transform: crackPhase === 2 ? "scale(0.96)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.4,0,1,1)",
        }}
      >
        {/* Scrambled "PORTFOLIO" headline */}
        <div
          style={{
            fontSize: "clamp(2.8rem,11vw,6.5rem)",
            fontWeight: 900,
            color: "#F0EEF6",
            letterSpacing: "-0.04em",
            marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
            minHeight: "clamp(80px, 15vh, 150px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Courier New',monospace",
          }}
        >
          {display}
        </div>

        {/* Progress bar container */}
        <div
          style={{
            width: "clamp(220px, 65vw, 420px)",
            height: "2px",
            background: "rgba(139,92,246,0.12)",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "1.25rem",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          {/* Progress fill */}
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #8B5CF6, #00D2BE, #8B5CF6)",
              transition: "width 0.1s linear",
              boxShadow: "0 0 14px rgba(139,92,246,0.7), inset 0 0 4px rgba(255,255,255,0.3)",
            }}
          />
        </div>

        {/* Percentage display */}
        <div
          style={{
            fontFamily: "'Courier New',monospace",
            fontSize: "clamp(12px, 2vw, 16px)",
            color: `rgba(139,92,246,${Math.min(0.35 + progress / 100 * 0.65, 1)})`,
            letterSpacing: "0.25em",
            marginBottom: "clamp(1.25rem, 3vh, 2rem)",
            fontWeight: 700,
            transition: "color 0.2s ease",
            textTransform: "uppercase",
          }}
        >
          {Math.round(progress)}%
        </div>

        {/* System logs terminal */}
        <div
          style={{
            maxWidth: "520px",
            textAlign: "left",
            minHeight: "120px",
            overflow: "hidden",
            paddingX: "1rem",
          }}
        >
          {logs.map((log, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Courier New',monospace",
                fontSize: "clamp(9px, 1.2vw, 12px)",
                color: i === logs.length - 1 ? "#00D2BE" : "rgba(240,238,246,0.28)",
                lineHeight: 1.8,
                opacity: 0,
                animation: `slideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards`,
                animationDelay: `${i * 0.12}s`,
                transform: "translateX(-20px)",
              }}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Red flash on crack initiation */}
      {crackPhase >= 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(225,6,0,0.3)",
            opacity: crackPhase === 1 ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      )}

      {/* Crack lines animation */}
      {crackPhase >= 1 && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {/* Three origin points for cracks */}
          {/* Crack 1: top-center to lower-left */}
          <line
            x1="50%"
            y1="20%"
            x2="25%"
            y2="65%"
            stroke="#e10600"
            strokeWidth="2.5"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "crackGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
              filter: "drop-shadow(0 0 8px rgba(225,6,0,0.9))",
            }}
          />

          {/* Crack 2: top-center to lower-right */}
          <line
            x1="50%"
            y1="20%"
            x2="75%"
            y2="65%"
            stroke="#e10600"
            strokeWidth="2.5"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "crackGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
              filter: "drop-shadow(0 0 8px rgba(225,6,0,0.9))",
            }}
          />

          {/* Crack 3: center down */}
          <line
            x1="50%"
            y1="20%"
            x2="50%"
            y2="90%"
            stroke="#e10600"
            strokeWidth="2.5"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "crackGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
              filter: "drop-shadow(0 0 8px rgba(225,6,0,0.9))",
            }}
          />

          {/* Secondary cracks for realism */}
          <line
            x1="35%"
            y1="45%"
            x2="20%"
            y2="75%"
            stroke="#e10600"
            strokeWidth="1.5"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "crackGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s forwards",
              filter: "drop-shadow(0 0 4px rgba(225,6,0,0.7))",
            }}
          />
          <line
            x1="65%"
            y1="45%"
            x2="80%"
            y2="75%"
            stroke="#e10600"
            strokeWidth="1.5"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "crackGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s forwards",
              filter: "drop-shadow(0 0 4px rgba(225,6,0,0.7))",
            }}
          />
        </svg>
      )}

      {/* Voronoi glass shards bursting outward */}
      {crackPhase === 2 &&
        Array.from({ length: 42 }).map((_, i) => {
          const angle = (i / 42) * Math.PI * 2;
          const distance = 120 + Math.random() * 280;
          const vx = Math.cos(angle) * distance;
          const vy = Math.sin(angle) * distance;
          const rotation = Math.random() * 360;
          const size = 50 + Math.random() * 80;
          const delay = Math.random() * 0.15;
          const duration = 0.8 + Math.random() * 0.4;

          return (
            <div
              key={i}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: `${size}px`,
                height: `${size}px`,
                background: `linear-gradient(${Math.random() * 360}deg, rgba(139,92,246,${0.3 + Math.random() * 0.5}), rgba(225,6,0,${0.2 + Math.random() * 0.4}))`,
                border: `1.5px solid rgba(225,6,0,${0.5 + Math.random() * 0.5})`,
                borderRadius: `${Math.random() * 8}px`,
                transform: `translate(${vx}px, ${vy}px) rotate(${rotation}deg)`,
                opacity: 0,
                animation: `shardFly ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 16px rgba(225,6,0,0.7), inset 0 0 8px rgba(255,255,255,0.2)`,
                zIndex: 25,
              }}
            />
          );
        })}

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes crackGrow {
          from {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            opacity: 0;
          }
          to {
            stroke-dasharray: 500;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes shardFly {
          from {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 16px rgba(225,6,0,0.9));
          }
          to {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) rotate(360deg) scale(0.05);
            filter: drop-shadow(0 0 0px rgba(225,6,0,0));
          }
        }
      `}</style>
    </div>
  );
}
