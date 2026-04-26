/**
 * ContributionsTimeline.jsx
 * ─────────────────────────────────────────────────────────────────
 * Community & Open Source contributions section.
 * Shows credibility signals: GSoC, SSoC, WIOS involvement.
 *
 * USAGE:
 *   import ContributionsTimeline from './ContributionsTimeline';
 *   <ContributionsTimeline />
 * ─────────────────────────────────────────────────────────────────
 */

import { useState } from "react";

const CONTRIBUTIONS = [
  {
    id: "01",
    title: "GSSoC '26 Contributor",
    org: "Google Summer of Code",
    role: "Selected Developer",
    description:
      "Contributing to open-source at scale. Validating code, building features, thinking in systems. Real commitment to the ecosystem.",
    impact: "Active in 2026 cycle",
    color: "#00D2BE",
    icon: "🚀",
  },
  {
    id: "02",
    title: "SSoC '26 Contributor",
    org: "Semester of Code",
    role: "Selected Developer",
    description:
      "Building solutions across full product cycles. From ideation to deployment. Understanding what it means to own a feature end-to-end.",
    impact: "Active in 2026 cycle",
    color: "#8B5CF6",
    icon: "⚙️",
  },
  {
    id: "03",
    title: "Women in Open Source",
    org: "WIOS Community",
    role: "Technical Team Member",
    description:
      "Building infrastructure for open-source contribution. Supporting other developers. Thinking about community, not just code.",
    impact: "Active contributor",
    color: "#FFD700",
    icon: "🔗",
  },
];

export default function ContributionsTimeline() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      style={{
        background: "#050505",
        minHeight: "80vh",
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
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,210,190,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          opacity: hoveredId ? 0.8 : 0.4,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: "clamp(2rem, 6vw, 4rem)", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ width: "28px", height: "1.5px", background: "#00D2BE" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(10px, 1.2vw, 12px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(0,210,190,0.7)",
            }}
          >
            004 — Community & Impact
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            fontWeight: 900,
            color: "#F0EEF6",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: "0.75rem",
          }}
        >
          PROOF OF COMMITMENT
        </h2>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "rgba(240,238,246,0.35)",
            maxWidth: "700px",
            lineHeight: 1.7,
            letterSpacing: "0.05em",
          }}
        >
          Not just building for yourself. Building with communities. Contributing to
          open-source at scale. Showing up, staying consistent, understanding systems.
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(1.5rem, 3vw, 2rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {CONTRIBUTIONS.map((contrib, i) => (
          <button
            key={contrib.id}
            onMouseEnter={() => setHoveredId(contrib.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background:
                hoveredId === contrib.id
                  ? `${contrib.color}12`
                  : "rgba(20,20,30,0.4)",
              border:
                hoveredId === contrib.id
                  ? `0.5px solid ${contrib.color}40`
                  : "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "clamp(1.5rem, 3vw, 2rem)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              transform:
                hoveredId === contrib.id
                  ? "translateY(-8px)"
                  : "translateY(0)",
              textAlign: "left",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: contrib.color,
              }}
            />

            {/* Icon */}
            <div
              style={{
                fontSize: "28px",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              {contrib.icon}
            </div>

            {/* Badge */}
            <div
              style={{
                display: "inline-block",
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                padding: "3px 8px",
                borderRadius: "100px",
                background: `${contrib.color}15`,
                border: `0.5px solid ${contrib.color}40`,
                color: contrib.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {contrib.id}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                fontWeight: 800,
                color:
                  hoveredId === contrib.id ? contrib.color : "rgba(255,255,255,0.8)",
                letterSpacing: "-0.02em",
                marginBottom: "0.3rem",
                transition: "color 0.3s ease",
              }}
            >
              {contrib.title}
            </h3>

            {/* Org */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color:
                  hoveredId === contrib.id
                    ? contrib.color
                    : "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              {contrib.org}
            </div>

            {/* Role */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: contrib.color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              → {contrib.role}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "12px",
                lineHeight: 1.7,
                color:
                  hoveredId === contrib.id
                    ? "rgba(240,238,246,0.8)"
                    : "rgba(240,238,246,0.5)",
                marginBottom: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              {contrib.description}
            </p>

            {/* Impact */}
            <div
              style={{
                paddingTop: "1rem",
                borderTop: `0.5px solid ${contrib.color}20`,
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: contrib.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ✓ {contrib.impact}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom note */}
      <div
        style={{
          marginTop: "clamp(2rem, 6vw, 4rem)",
          padding: "1.25rem 1.5rem",
          background: "rgba(0,210,190,0.06)",
          border: "0.5px solid rgba(0,210,190,0.2)",
          borderRadius: "12px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "rgba(0,210,190,0.7)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Real commitment.
        </div>
        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.7,
            color: "rgba(240,238,246,0.5)",
          }}
        >
          Not collecting badges. Actually contributing. Learning how real teams work.
          Understanding that code is written by humans, for humans. That's what matters.
        </p>
      </div>
    </section>
  );
}
