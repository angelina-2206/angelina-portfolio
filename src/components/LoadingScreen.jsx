/**
 * LoadingTransition.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in replacement / wrapper for your existing loading screen.
 *
 * SEQUENCE:
 *   0.0s  — Screen shows exactly your current loading UI (black, big name,
 *            SYSTEM LOAD %, ASSEMBLY PROTOCOL, progress bar)
 *   0→3s  — Progress bar counts 0→100% with realistic stutters
 *   3.0s  — "SYSTEM LOAD 100%" reached, tiny red flash on the counter
 *   3.2s  — CRACK LINES spider across the screen (CSS + canvas)
 *   3.5s  — Glass shatter: the entire loading screen fractures into
 *            Voronoi shards, each flying outward with physics
 *   4.0s  — Shards gone, hero page underneath is revealed
 *   4.2s  — Name scramble: "ANGELINA CHATTERJEE" resolves char by char
 *            from random glyphs (the alphabet energy you wanted — refined)
 *
 * INSTALL:
 *   npm install three  (already installed from ShatterHero)
 *
 * USAGE in App.jsx:
 *   import LoadingTransition from './LoadingTransition';
 *   <LoadingTransition onComplete={() => setShowHero(true)}>
 *     <YourHeroSection />
 *   </LoadingTransition>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import { useSound } from "../context/SoundContext";

// ── Timing constants (ms) ─────────────────────────────────────────────────────
const T_PROGRESS_DONE   = 3000;   // when bar hits 100
const T_REVEAL          = 3400;   // hero visible underneath
const T_COMPLETE        = 4500;   // onComplete fires

// ── Main component ────────────────────────────────────────────────────────────
export default function LoadingScreen({ children, onComplete }) {
  const { playBassHit } = useSound();
  const [phase, setPhase] = useState("loading"); 
  // phases: loading → revealed → done
  const [progress, setProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const timeRef = useRef(null);

  // ── Live Date and Time ───────────────────────────────────────────────────
  useEffect(() => {
    let cancel = false;
    const updateTime = () => {
      if (cancel) return;
      const now = new Date();
      const d = String(now.getDate()).padStart(2, '0');
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const y = now.getFullYear();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      
      if (timeRef.current) {
        timeRef.current.textContent = `${d}.${mo}.${y} // ${h}:${m}:${s}:${ms}`;
      }
      requestAnimationFrame(updateTime);
    };
    updateTime();
    return () => { cancel = true; };
  }, []);

  // ── Progress bar with realistic stutters ─────────────────────────────────
  useEffect(() => {
    const stutters = [
      { at: 15, pause: 200 },
      { at: 47, pause: 350 },
      { at: 73, pause: 180 },
      { at: 89, pause: 400 },
      { at: 96, pause: 250 },
    ];
    let current = 0;
    let stutterIdx = 0;
    let paused = false;
    let pauseTimer = null;

    const interval = setInterval(() => {
      if (paused) return;
      current += 0.4 + Math.random() * 0.8;
      if (current >= 100) { 
        current = 100; 
        clearInterval(interval); 
        playBassHit();
      }

      // Check stutters
      if (stutterIdx < stutters.length && current >= stutters[stutterIdx].at) {
        paused = true;
        const pauseDur = stutters[stutterIdx].pause;
        stutterIdx++;
        pauseTimer = setTimeout(() => { paused = false; }, pauseDur);
      }

      setProgress(Math.min(100, Math.round(current)));
    }, 28);

    return () => { clearInterval(interval); clearTimeout(pauseTimer); };
  }, []);

  // ── Main sequence timer ───────────────────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setHeroVisible(true),      T_REVEAL),
      setTimeout(() => { setPhase("done"); onComplete?.(); }, T_COMPLETE),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") return <>{children}</>;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>

      {/* Hero page — hidden underneath, revealed after fade */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
      }}>
        {children}
      </div>

      {/* Loading screen — your existing design, exactly preserved ─────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        background: "#080808",
        opacity: heroVisible ? 0 : 1,
        pointerEvents: heroVisible ? "none" : "auto",
        transition: "opacity 0.8s ease",
      }}>
        {/* Watermark giant letters — your existing bg text */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          overflow: "hidden", pointerEvents: "none",
          paddingRight: "-2rem",
        }}>
          <span style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(12rem, 40vw, 38rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.06em",
            userSelect: "none",
            lineHeight: 1,
          }}>
            AC
          </span>
        </div>

        {/* Top label */}
        <div style={{
          position: "absolute", top: "clamp(1.5rem, 5vh, 3rem)",
          left: "clamp(1.5rem, 6vw, 5rem)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.5rem, 0.9vw, 0.75rem)",
          color: "#4a6fa5",
          letterSpacing: "0.28em",
        }}>
          PORTFOLIO — {new Date().getFullYear()}
        </div>

        {/* Date Stamp (Top Right) */}
        <div ref={timeRef} style={{
          position: "absolute", top: "clamp(1.5rem, 5vh, 3rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.5rem, 0.9vw, 0.75rem)",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
        }} />

        {/* Main name — massive */}
        <div style={{
          position: "absolute",
          top: "50%", left: "clamp(1.5rem, 6vw, 5rem)",
          transform: "translateY(-55%)",
          fontFamily: "sans-serif",
          fontSize: "clamp(1.5rem, 5vw, 5rem)",
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}>
          <div>ANGELINA</div>
          <div>CHATTERJEE</div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute",
          bottom: "clamp(4rem, 12vh, 7rem)",
          left: "clamp(1.5rem, 6vw, 5rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
        }}>
          <div style={{
            width: "100%", height: "1px",
            background: "rgba(255,255,255,0.1)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "1px",
              width: `${progress}%`,
              background: `linear-gradient(90deg, #1a3a6b, #e10600)`,
              transition: "width 0.1s linear",
              boxShadow: "0 0 8px rgba(225,6,0,0.6)",
            }} />
          </div>
        </div>

        {/* Bottom-left */}
        <div style={{
          position: "absolute",
          bottom: "clamp(1.2rem, 3vh, 2rem)",
          left: "clamp(1.5rem, 6vw, 5rem)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(0.45rem, 0.8vw, 0.65rem)",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.22em",
        }}>
          | ASSEMBLY PROTOCOL |
        </div>

        {/* Bottom-right: SYSTEM LOAD counter */}
        <div style={{
          position: "absolute",
          bottom: "clamp(1rem, 4vh, 3rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
          textAlign: "right",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.45rem, 0.8vw, 0.65rem)",
            color: progress === 100 ? "#e10600" : "rgba(255,255,255,0.25)",
            letterSpacing: "0.22em",
            marginBottom: "0.25rem",
            transition: "color 0.3s",
          }}>
            SYSTEM LOAD
          </div>
          <div style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 900,
            color: progress === 100 ? "#e10600" : "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            transition: "color 0.3s",
            textShadow: progress === 100 ? "0 0 30px rgba(225,6,0,0.8)" : "none",
          }}>
            {String(progress).padStart(3, "0")}
            <span style={{ fontSize: "0.3em", verticalAlign: "super", opacity: 0.6 }}>%</span>
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.45rem, 0.8vw, 0.65rem)",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.18em",
            marginTop: "0.2rem",
          }}>
            X-RAY : {progress < 100 ? "LOADING..." : "COMPLETE"}
          </div>
        </div>

        {/* Scroll hint icon — your existing mouse icon */}
        <div style={{
          position: "absolute",
          bottom: "clamp(4.5rem, 13vh, 8rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "6px",
          opacity: progress === 100 ? 0 : 0.5,
          transition: "opacity 0.5s",
        }}>
          <div style={{
            width: "20px", height: "30px",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "10px",
            display: "flex", justifyContent: "center",
            paddingTop: "5px",
          }}>
            <div style={{
              width: "2px", height: "6px",
              background: "#fff",
              borderRadius: "2px",
              animation: "scrollDot 1.4s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
