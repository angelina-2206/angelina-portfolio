/**
 * ProcessBreakdown.jsx
 * ─────────────────────────────────────────────────────────────────
 * Obsidian-style project showcase with hover-driven reveals.
 * Problem → Approach → Results revealed progressively on hover.
 *
 * INSTALL:
 *   npm install react framer-motion  (already have these)
 *
 * USAGE:
 *   import ProcessBreakdown from './ProcessBreakdown';
 *   <ProcessBreakdown />
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useRef } from "react";

const PROJECTS = [
  {
    id: "01",
    name: "TrapEye",
    subtitle: "Phishing Detection · On-Device ML",
    problem: "How do you detect phishing in 200ms without cloud? How do you protect users when attacks move faster than human reaction time?",
    approach:
      "Multi-model ensemble, on-device. Why on-device? Privacy. Why ensemble? Redundancy. Why 200ms? Because you get one shot. Built the entire system in 12 hours.",
    results: "89% accuracy. Sub-200ms inference. Chrome extension + web app live. 2nd Place HackAura. Real threat detection that actually ships.",
    tags: ["On-Device ML", "Chrome Ext", "Real-Time"],
    award: "2nd Place · HackAura",
    accentColor: "#E10600",
    accentGrad: "linear-gradient(135deg, #E10600, #FF6B35)",
  },
  {
    id: "02",
    name: "Burnout Sentinel",
    subtitle: "AI Mental Health · Multi-Agent Architecture",
    problem:
      "Burnout kills quietly. By the time you notice, you're already broken. Calendar data sits there, unused. What if it could tell you when you're spiraling before you do?",
    approach:
      "Multi-agent system that reads calendar patterns like a detective reads crime scenes. NLP parses intent. Behavioral pattern recognition catches the warning signs. Recommends smarter scheduling. Entire architecture built for the moment when prevention actually matters.",
    results:
      "Detects overload trends. Suggests actionable scheduling changes. Still evolving because the problem doesn't have easy answers. Real solution for a real problem.",
    tags: ["Multi-Agent", "NLP", "Behavioral Analytics"],
    award: "Flagship · Active",
    accentColor: "#8B5CF6",
    accentGrad: "linear-gradient(135deg, #8B5CF6, #C4B5FD)",
    flagship: true,
  },
  {
    id: "03",
    name: "PostPehchaan",
    subtitle: "Digital Identity · Offline-First",
    problem:
      "Identity verification in low-connectivity environments. Traditional systems assume everyone has consistent internet. That's not reality for millions. How do you build trust in places where connection is a luxury?",
    approach:
      "Offline-first mobile app that doesn't depend on cloud. Real-time dashboard when connection exists. AI trust scoring based on behavioral analysis. Blockchain audit trail for immutability. Multilingual voice interface because not everyone types.",
    results:
      "Top 8 at India Post. Works reliably in 2G networks. Deployed in real field conditions. Proven in actual constraint-driven environment.",
    tags: ["Offline-First", "Blockchain", "Voice Interface"],
    award: "Top 8 · India Post",
    accentColor: "#00D2BE",
    accentGrad: "linear-gradient(135deg, #00D2BE, #7B68EE)",
  },
  {
    id: "04",
    name: "What If Wizard",
    subtitle: "Generative AI · Legal Scenarios",
    problem:
      "Legal reasoning is opaque. Outcomes feel arbitrary. Users can't explore possibilities. What if you could simulate legal scenarios before committing to them?",
    approach:
      "Generative AI that simulates 'what-if' legal scenarios interactively. Built at Google Cloud × Hack2skill. Makes abstract legal reasoning concrete and explorable. Takes something intimidating and turns it into a conversation.",
    results:
      "Deployed. Live playground for legal exploration. Shows that generative AI works best when it removes friction from understanding, not just generating content.",
    tags: ["Generative AI", "Google Cloud", "Interactive"],
    award: "Google Cloud Hackathon",
    accentColor: "#FF6B35",
    accentGrad: "linear-gradient(135deg, #FF6B35, #8B5CF6)",
  },
];

export default function ProcessBreakdown() {
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const containerRef = useRef(null);

  const project = PROJECTS[activeProject];

  return (
    <section
      ref={containerRef}
      style={{
        background: "#050505",
        minHeight: "100vh",
        padding: "clamp(2rem, 8vw, 6rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${project.accentColor}15 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: hoveredPhase ? 0.6 : 0.3,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Header */}
      <div
        style={{
          marginBottom: "clamp(2rem, 6vw, 4rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "1.5px",
              background: project.accentColor,
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(10px, 1.2vw, 12px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: `${project.accentColor}80`,
            }}
          >
            003 — Process Log
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            fontWeight: 900,
            color: "#F0EEF6",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: "0.5rem",
          }}
        >
          THE PROBLEM-<br />
          <span style={{ color: project.accentColor }}>SOLVING</span>
          <br />
          BREAKDOWN.
        </h2>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "rgba(240,238,246,0.35)",
            maxWidth: "600px",
            lineHeight: 1.7,
            letterSpacing: "0.05em",
          }}
        >
          Hover each project. Watch the story unfold. Problem first. Then the
          approach. Finally, proof it worked.
        </p>
      </div>

      {/* Project showcase */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 6vw, 4rem)",
          alignItems: "start",
          position: "relative",
          zIndex: 2,
          marginBottom: "clamp(2rem, 6vw, 4rem)",
        }}
      >
        {/* Project list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => setActiveProject(i)}
              onMouseEnter={() => setActiveProject(i)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "1rem 0",
                borderBottom:
                  i !== PROJECTS.length - 1
                    ? "0.5px solid rgba(255,255,255,0.06)"
                    : "none",
                textAlign: "left",
                transition: "all 0.3s ease",
                transform: activeProject === i ? "translateX(8px)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color:
                    activeProject === i ? proj.accentColor : "rgba(255,255,255,0.2)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.3rem",
                  transition: "color 0.3s ease",
                }}
              >
                {proj.name}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color:
                    activeProject === i
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.15)",
                  letterSpacing: "0.08em",
                  transition: "color 0.3s ease",
                }}
              >
                {proj.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Project detail panel */}
        <div
          style={{
            background: "rgba(20,20,30,0.5)",
            border: `0.5px solid ${project.accentColor}30`,
            borderRadius: "16px",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: project.accentGrad,
            }}
          />

          {/* Badge */}
          {project.flagship && (
            <div
              style={{
                display: "inline-block",
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                padding: "3px 9px",
                borderRadius: "100px",
                background: `${project.accentColor}15`,
                border: `0.5px solid ${project.accentColor}40`,
                color: project.accentColor,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Flagship Project
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: 900,
              color: "#F0EEF6",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              lineHeight: 1,
            }}
          >
            {project.name}
          </h3>

          {/* Reveal phases */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Problem */}
            <div
              onMouseEnter={() => setHoveredPhase("problem")}
              onMouseLeave={() => setHoveredPhase(null)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background:
                  hoveredPhase === "problem"
                    ? `${project.accentColor}12`
                    : "rgba(255,255,255,0.03)",
                border:
                  hoveredPhase === "problem"
                    ? `0.5px solid ${project.accentColor}40`
                    : "0.5px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: project.accentColor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                → The Problem
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color:
                    hoveredPhase === "problem"
                      ? "#F0EEF6"
                      : "rgba(240,238,246,0.55)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div
              onMouseEnter={() => setHoveredPhase("approach")}
              onMouseLeave={() => setHoveredPhase(null)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background:
                  hoveredPhase === "approach"
                    ? `${project.accentColor}12`
                    : "rgba(255,255,255,0.03)",
                border:
                  hoveredPhase === "approach"
                    ? `0.5px solid ${project.accentColor}40`
                    : "0.5px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: project.accentColor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                → The Approach
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color:
                    hoveredPhase === "approach"
                      ? "#F0EEF6"
                      : "rgba(240,238,246,0.55)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.approach}
              </p>
            </div>

            {/* Results */}
            <div
              onMouseEnter={() => setHoveredPhase("results")}
              onMouseLeave={() => setHoveredPhase(null)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background:
                  hoveredPhase === "results"
                    ? `${project.accentColor}12`
                    : "rgba(255,255,255,0.03)",
                border:
                  hoveredPhase === "results"
                    ? `0.5px solid ${project.accentColor}40`
                    : "0.5px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: project.accentColor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                → The Results
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color:
                    hoveredPhase === "results"
                      ? "#F0EEF6"
                      : "rgba(240,238,246,0.55)",
                  marginBottom: "0.75rem",
                  transition: "color 0.3s ease",
                }}
              >
                {project.results}
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      padding: "3px 8px",
                      borderRadius: "100px",
                      border: `0.5px solid ${project.accentColor}40`,
                      color: project.accentColor,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Award */}
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1rem",
              borderTop: "0.5px solid rgba(255,255,255,0.1)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: project.accentColor,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ✓ {project.award}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
          paddingTop: "2rem",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          More on GitHub · Shipping faster than I document
        </div>
        <div
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2rem)",
            fontWeight: 900,
            color: `${project.accentColor}40`,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.1)" }}>
            {String(activeProject + 1).padStart(2, "0")}
          </span>
          <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.5em" }}>
            {" "}
            / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
