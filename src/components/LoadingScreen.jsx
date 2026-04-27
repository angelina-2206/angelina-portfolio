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

import { useEffect, useRef, useState, useCallback } from "react";
import { useSound } from "../context/SoundContext";

// ── Timing constants (ms) ─────────────────────────────────────────────────────
const T_PROGRESS_DONE   = 3000;   // when bar hits 100
const T_CRACK_START     = 3200;   // crack lines appear
const T_SHATTER_START   = 3550;   // shards explode
const T_REVEAL          = 4000;   // hero visible underneath
const T_SCRAMBLE_START  = 4150;   // name scramble begins
const T_COMPLETE        = 5400;   // onComplete fires

// ── Voronoi-ish shatter: generate N random seed points, assign each pixel
//    to nearest seed → gives natural crack pattern ───────────────────────────
function generateShards(W, H, count = 38) {
  const seeds = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
  }));

  // For each shard we need: center, polygon points, velocity, rotation
  // We approximate polygon as the seed's Voronoi cell using clipping
  // For performance we use a simpler convex hull approach:
  // Each shard = irregular polygon centered on seed

  return seeds.map((seed, i) => {
    const sides = 5 + Math.floor(Math.random() * 4);
    const r = 60 + Math.random() * 140;
    const angleOffset = Math.random() * Math.PI * 2;
    const pts = Array.from({ length: sides }, (_, j) => {
      const angle = angleOffset + (j / sides) * Math.PI * 2;
      const rr = r * (0.5 + Math.random() * 0.7);
      return {
        x: seed.x + Math.cos(angle) * rr,
        y: seed.y + Math.sin(angle) * rr,
      };
    });

    const dx = seed.x - W / 2;
    const dy = seed.y - H / 2;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const speed = 3 + Math.random() * 8;

    return {
      seed,
      pts,
      vx: (dx / dist) * speed * (0.5 + Math.random()),
      vy: (dy / dist) * speed * (0.5 + Math.random()),
      vz: Math.random() * 4,           // z-scale shrink
      vr: (Math.random() - 0.5) * 0.3, // rotation
      rotation: 0,
      opacity: 1,
      scaleZ: 1,
      progress: 0,                      // 0→1 explosion progress
    };
  });
}



// ── Main component ────────────────────────────────────────────────────────────
export default function LoadingScreen({ children, onComplete }) {
  const { playBassHit } = useSound();
  const [phase, setPhase] = useState("loading"); 
  // phases: loading → cracking → shattering → revealed → done
  const [progress, setProgress] = useState(0);
  const [shatterActive, setShatterActive] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const canvasRef = useRef(null);
  const shardsRef = useRef([]);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
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
      setTimeout(() => setShatterActive(true),   T_SHATTER_START),
      setTimeout(() => setHeroVisible(true),      T_REVEAL),
      setTimeout(() => { setPhase("done"); onComplete?.(); }, T_COMPLETE),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Canvas: crack lines + shatter animation ───────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    shardsRef.current = generateShards(W, H, 42);

    let shatterProgress = 0;

    const draw = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      ctx.clearRect(0, 0, W, H);

      // ── Draw shattering shards ────────────────────────────────────────
      if (shatterActive) {
        shatterProgress = Math.min(1, shatterProgress + 0.025);

        shardsRef.current.forEach(shard => {
          shard.progress = Math.min(1, shard.progress + 0.018 + Math.random() * 0.012);
          const p = shard.progress;

          shard.rotation += shard.vr;
          const tx = shard.seed.x + shard.vx * p * 60;
          const ty = shard.seed.y + shard.vy * p * 60;
          shard.opacity = Math.max(0, 1 - p * 1.4);

          if (shard.opacity <= 0) return;

          ctx.save();
          ctx.globalAlpha = shard.opacity;
          ctx.translate(tx, ty);
          ctx.rotate(shard.rotation);
          ctx.translate(-shard.seed.x, -shard.seed.y);

          // Shard shape
          ctx.beginPath();
          ctx.moveTo(shard.pts[0].x, shard.pts[0].y);
          shard.pts.forEach(pt => ctx.lineTo(pt.x, pt.y));
          ctx.closePath();

          // Fill: dark glass with slight blue-white tint
          const grad = ctx.createLinearGradient(
            shard.seed.x - 60, shard.seed.y - 60,
            shard.seed.x + 60, shard.seed.y + 60
          );
          grad.addColorStop(0, "rgba(8,8,12,0.95)");
          grad.addColorStop(0.4, "rgba(20,20,30,0.9)");
          grad.addColorStop(1, "rgba(30,20,20,0.85)");
          ctx.fillStyle = grad;
          ctx.fill();

          // Edge highlight (glass edge catch)
          ctx.strokeStyle = `rgba(225,6,0,${0.4 * shard.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Inner white glint
          ctx.strokeStyle = `rgba(255,255,255,${0.12 * shard.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.restore();
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shatterActive]);

  if (phase === "done") return <>{children}</>;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>

      {/* Hero page — hidden underneath, revealed after shatter */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: heroVisible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}>
        {children}
        {/* Name scramble overlay on hero removed */}
      </div>

      {/* Loading screen — your existing design, exactly preserved ─────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        background: "#080808",
        opacity: shatterActive ? 0 : 1,
        pointerEvents: shatterActive ? "none" : "auto",
        transition: shatterActive ? "opacity 0.3s 0.3s" : "none",
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
          fontSize: "clamp(2.2rem, 9vw, 11rem)",
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

      {/* Canvas: crack lines + shatter shards — top layer ──────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          pointerEvents: "none",
          opacity: shatterActive ? 1 : 0,
        }}
      />

      {/* Red flash on 100% ──────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 8,
        background: "#e10600",
        pointerEvents: "none",
        opacity: 0,
        animation: progress === 100 ? "redFlash 0.4s ease-out 0.2s forwards" : "none",
      }} />

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        @keyframes redFlash {
          0% { opacity: 0; }
          30% { opacity: 0.18; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
