/**
 * LapCounter.jsx
 * ─────────────────────────────────────────────────────────────────
 * F1-style lap counter that tracks portfolio section progress.
 * Every scroll region = 1 lap. Shows bottom-right corner.
 *
 * USAGE in your main App/layout wrapper:
 *   import LapCounter from './LapCounter';
 *   <LapCounter />
 *
 * HOW IT WORKS:
 *   - Tracks scroll progress through entire page
 *   - Maps page sections to "laps"
 *   - Displays "LAP 01", "LAP 02", etc. as user scrolls
 *   - "FINAL LAP" pulse when near contact section
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";

// Section heights as percentage of total page (adjust based on your layout)
const SECTIONS = [
  { name: "HERO", start: 0, end: 15 },
  { name: "QUOTE", start: 15, end: 25 },
  { name: "ABOUT", start: 25, end: 40 },
  { name: "SKILLS", start: 40, end: 55 },
  { name: "PROJECTS", start: 55, end: 70 },
  { name: "PROCESS", start: 70, end: 82 },
  { name: "CONTRIBUTIONS", start: 82, end: 90 },
  { name: "CONTACT", start: 90, end: 100 },
];

export default function LapCounter() {
  const [currentLap, setCurrentLap] = useState(1);
  const [isFinalLap, setIsFinalLap] = useState(false);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent =
          docHeight === 0 ? 0 : (scrollTop / docHeight) * 100;

        setProgress(scrollPercent);

        // Find current section/lap
        let lap = 1;
        SECTIONS.forEach((section, i) => {
          if (scrollPercent >= section.start && scrollPercent < section.end) {
            lap = i + 1;
          }
        });
        setCurrentLap(lap);
        setIsFinalLap(lap === SECTIONS.length);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial call

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "clamp(1.5rem, 4vh, 2.5rem)",
        right: "clamp(1.5rem, 4vw, 2.5rem)",
        zIndex: 50,
        pointerEvents: "none",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {/* Glow background (stronger on final lap) */}
      <div
        style={{
          position: "absolute",
          inset: "-12px",
          borderRadius: "100%",
          background: isFinalLap
            ? "radial-gradient(circle, #e1060040, transparent)"
            : "radial-gradient(circle, rgba(139,92,246,0.15), transparent)",
          opacity: progress > 5 ? 1 : 0,
          transition: "opacity 0.4s ease, background 0.5s ease",
        }}
      />

      {/* Counter display */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section indicator */}
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            transition: "color 0.3s ease",
          }}
        >
          {SECTIONS[Math.min(currentLap - 1, SECTIONS.length - 1)].name}
        </div>

        {/* Lap number - pulsing on final */}
        <div
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: isFinalLap ? "#e10600" : "#8B5CF6",
            lineHeight: 0.9,
            transition: "color 0.5s ease",
            animation: isFinalLap
              ? "lapPulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite"
              : "none",
            textShadow: isFinalLap ? "0 0 20px rgba(225,6,0,0.6)" : "none",
          }}
        >
          LAP
          <br />
          {String(currentLap).padStart(2, "0")}
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
            marginTop: "0.25rem",
          }}
        >
          <div
            style={{
              height: "100%",
              background: isFinalLap
                ? "linear-gradient(90deg, #e10600, #FF6B35)"
                : "linear-gradient(90deg, #8B5CF6, #C4B5FD)",
              width: `${((progress % (100 / SECTIONS.length)) / (100 / SECTIONS.length)) * 100}%`,
              transition: "width 0.3s ease, background 0.5s ease",
            }}
          />
        </div>

        {/* Final lap badge */}
        {isFinalLap && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "8px",
              padding: "2px 6px",
              borderRadius: "100px",
              background: "rgba(225,6,0,0.15)",
              border: "0.5px solid rgba(225,6,0,0.4)",
              color: "#e10600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              animation:
                "fadeInOut 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite",
            }}
          >
            Final Lap
          </div>
        )}
      </div>

      <style>{`
        @keyframes lapPulse {
          0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 20px rgba(225,6,0,0.6);
          }
          50% { 
            transform: scale(1.08);
            text-shadow: 0 0 40px rgba(225,6,0,0.9);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
