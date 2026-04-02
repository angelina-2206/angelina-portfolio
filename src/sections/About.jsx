import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const bioLines = [
    "I'm Angelina Chatterjee — a full stack developer and AI builder currently pursuing Computer Science (Business Systems).",
    "I don't just write code. I build systems that solve real problems — from AI-driven mental health tools to NLP-based legal assistants. Every project starts with a question: \"What's broken, and how do I fix it?\"",
    "My work sits at the intersection of engineering precision and creative thinking. I believe the best technology isn't the most complex — it's the most intentional.",
    "I move fast, learn faster, and document eventually. If it can be automated, optimized, or rethought from scratch — I've probably already started.",
  ]

  return (
    <section
      data-section="about"
      id="about"
      ref={sectionRef}
      className="section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Grid bg */}
      <div className="grid-bg" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section tag */}
        <motion.div
          className="section-tag"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          SECTOR 02 — SUBJECT FILE: 001
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          About the Operator
        </motion.h2>

        {/* Split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
          gap: '48px',
          alignItems: 'start',
        }}
        className="about-grid"
        >
          {/* Left — Photo area with crime-doc overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              background: 'var(--color-card)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* CCTV overlay aesthetic */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255,255,255,0.02) 2px,
                  rgba(255,255,255,0.02) 4px
                )
              `,
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Placeholder silhouette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '6rem',
              color: 'rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
            }}>
              AC
            </div>

            {/* Corner markers */}
            {[
              { top: '12px', left: '12px', borderTop: '2px solid var(--color-ferrari)', borderLeft: '2px solid var(--color-ferrari)' },
              { top: '12px', right: '12px', borderTop: '2px solid var(--color-ferrari)', borderRight: '2px solid var(--color-ferrari)' },
              { bottom: '12px', left: '12px', borderBottom: '2px solid var(--color-ferrari)', borderLeft: '2px solid var(--color-ferrari)' },
              { bottom: '12px', right: '12px', borderBottom: '2px solid var(--color-ferrari)', borderRight: '2px solid var(--color-ferrari)' },
            ].map((style, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                ...style,
                zIndex: 3,
              }} />
            ))}

            {/* Timestamp */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-ferrari)',
              letterSpacing: '0.15em',
              zIndex: 3,
            }}>
              REC ● 2025.04.03
            </div>

            {/* Classification banner */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--color-text-dim)',
              letterSpacing: '0.2em',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
              zIndex: 3,
            }}>
              CLASSIFIED
            </div>
          </motion.div>

          {/* Right — Bio + Stats */}
          <div>
            {/* Bio paragraphs with stagger */}
            <div style={{ marginBottom: '40px' }}>
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.8,
                    color: i === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    marginBottom: '16px',
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* F1 Driver Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'var(--color-ferrari)',
                marginBottom: '16px',
              }}>
                ■ DRIVER PROFILE
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}>
                {[
                  { label: 'ROLE', value: 'Full Stack + AI Developer' },
                  { label: 'TEAM', value: 'CS Business Systems' },
                  { label: 'SEASON', value: '2025' },
                  { label: 'FASTEST LAP', value: 'TrapEye — 89% acc / 12hrs' },
                  { label: 'STATUS', value: 'POINTS SCORING', color: 'var(--color-teal)' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: 'var(--color-text-dim)',
                      marginBottom: '4px',
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: stat.color || 'var(--color-text-primary)',
                      letterSpacing: '0.05em',
                    }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-ferrari), transparent)',
          transformOrigin: 'left',
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
