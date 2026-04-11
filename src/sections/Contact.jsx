import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Collaboration Modal ────────────────────────────────────── */
function CollabModal({ isOpen, onClose }) {
  const options = [
    {
      label: 'Internship',
      desc: 'Looking for a driven developer to join your team',
      icon: '⚡',
      mailto: 'mailto:angelinachatterjee2206@gmail.com?subject=Internship%20Opportunity&body=Hi%20Angelina%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20internship%20opportunity.',
    },
    {
      label: 'Collaboration',
      desc: 'Partner on a project, hackathon, or open-source initiative',
      icon: '🤝',
      mailto: 'mailto:angelinachatterjee2206@gmail.com?subject=Collaboration%20Proposal&body=Hi%20Angelina%2C%0A%0AI%27d%20love%20to%20collaborate%20on%20a%20project%20together.',
    },
    {
      label: 'Project Idea',
      desc: 'Have a concept that needs engineering and execution',
      icon: '🚀',
      mailto: 'mailto:angelinachatterjee2206@gmail.com?subject=Project%20Idea&body=Hi%20Angelina%2C%0A%0AI%20have%20a%20project%20idea%20I%27d%20like%20to%20discuss%20with%20you.',
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cta-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            className="cta-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cta-modal-header">
              <span className="cta-modal-label">WHAT BRINGS YOU HERE?</span>
              <button className="cta-modal-close" onClick={onClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="cta-modal-options">
              {options.map((opt, i) => (
                <motion.a
                  key={i}
                  href={opt.mailto}
                  className="cta-modal-option"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="cta-modal-icon">{opt.icon}</span>
                  <div className="cta-modal-option-body">
                    <span className="cta-modal-option-label">{opt.label}</span>
                    <span className="cta-modal-option-desc">{opt.desc}</span>
                  </div>
                  <span className="cta-modal-arrow">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main Contact Section ───────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [modalOpen, setModalOpen] = useState(false)

  /* Stagger children */
  const stagger = (i) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="obs-section bg-dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 40px 60px',
      }}
    >
      {/* ── Background Watermark ── */}
      <div className="cta-watermark">CONNECT</div>

      {/* ── Ambient Glow ── */}
      <div className="cta-ambient-glow" />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '900px', textAlign: 'center' }}>

        {/* Status Badge */}
        <motion.div {...stagger(0)} className="cta-status">
          <span className="cta-status-dot" />
          STATUS: AVAILABLE FOR COLLABORATION
        </motion.div>

        {/* Divider Line (animated) */}
        <motion.div
          className="cta-divider-v"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Headline */}
        <div className="cta-headline-wrap">
          <motion.h2 {...stagger(1)} className="cta-headline-line1">
            LET'S BUILD SOMETHING
          </motion.h2>
          <motion.h2 {...stagger(2)} className="cta-headline-line2">
            THAT <span className="cta-keyword">MATTERS</span>
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p {...stagger(3)} className="cta-subtext">
          Open to collaborations, internships, and ambitious ideas.
          <br />
          Let's turn concepts into working systems.
        </motion.p>

        {/* Primary CTA */}
        <motion.div {...stagger(4)}>
          <button className="cta-primary" onClick={() => setModalOpen(true)}>
            <span className="cta-primary-glow" />
            <span className="cta-primary-text">START A CONVERSATION</span>
          </button>
        </motion.div>

        {/* Secondary Links */}
        <motion.div {...stagger(5)} className="cta-secondary">
          <a href="https://github.com/angelina-2206" target="_blank" rel="noreferrer" className="cta-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GITHUB
          </a>
          <a href="https://www.linkedin.com/in/angelina-chatterjee/" target="_blank" rel="noreferrer" className="cta-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LINKEDIN
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="cta-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            RESUME
          </a>
        </motion.div>

        {/* Horizontal Divider */}
        <motion.div
          className="cta-hr"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Footer */}
        <motion.div {...stagger(6)} className="cta-footer">
          <span>© 2026 ANGELINA CHATTERJEE</span>
          <span className="cta-footer-brand">THE OBSIDIAN ARCHITECTURE</span>
          <span>ALL RIGHTS RESERVED</span>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <CollabModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ─────────────────────────────────────────────────────
           STYLES
         ───────────────────────────────────────────────────── */}
      <style>{`
        /* ── Watermark ── */
        .cta-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(8rem, 22vw, 28rem);
          font-weight: 800;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(139, 92, 246, 0.03);
          pointer-events: none;
          z-index: 0;
          user-select: none;
          white-space: nowrap;
          line-height: 1;
        }

        /* ── Ambient Glow ── */
        .cta-ambient-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Status Badge ── */
        .cta-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: rgba(167, 139, 250, 0.6);
          text-transform: uppercase;
          margin-bottom: 24px;
          padding: 6px 16px;
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 999px;
          background: rgba(139, 92, 246, 0.04);
        }

        .cta-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
          50% { opacity: 0.5; box-shadow: 0 0 4px rgba(34, 197, 94, 0.2); }
        }

        /* ── Vertical Divider ── */
        .cta-divider-v {
          width: 1px;
          height: 48px;
          background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.3), transparent);
          margin: 0 auto 36px;
          transform-origin: top;
        }

        /* ── Headline ── */
        .cta-headline-wrap {
          margin-bottom: 28px;
        }

        .cta-headline-line1 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5.5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--color-text-primary);
          margin: 0;
        }

        .cta-headline-line2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5.5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--color-text-primary);
          margin: 0;
        }

        .cta-keyword {
          background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-lavender) 50%, var(--color-primary) 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: keywordShift 6s ease-in-out infinite;
          font-style: italic;
        }

        @keyframes keywordShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ── Subtext ── */
        .cta-subtext {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 44px;
          letter-spacing: 0.01em;
        }

        /* ── Primary Button ── */
        .cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 44px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 999px;
          background: rgba(139, 92, 246, 0.08);
          cursor: none;
          overflow: hidden;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-primary-glow {
          position: absolute;
          inset: -1px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dim));
          opacity: 0;
          transition: opacity 0.45s ease;
          z-index: 0;
        }

        .cta-primary-text {
          position: relative;
          z-index: 1;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: var(--color-primary-light);
          font-weight: 600;
          transition: color 0.35s ease;
        }

        .cta-primary:hover {
          transform: scale(1.06);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 40px rgba(139, 92, 246, 0.2),
                      0 0 80px rgba(139, 92, 246, 0.08);
        }

        .cta-primary:hover .cta-primary-glow {
          opacity: 1;
        }

        .cta-primary:hover .cta-primary-text {
          color: #fff;
        }

        .cta-primary:active {
          transform: scale(0.98);
        }

        /* ── Secondary Links ── */
        .cta-secondary {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.3);
          padding: 10px 20px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-link svg {
          opacity: 0.5;
          transition: opacity 0.35s ease;
        }

        .cta-link:hover {
          color: var(--color-primary-light);
          border-color: rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1);
        }

        .cta-link:hover svg {
          opacity: 1;
        }

        /* ── Horizontal Divider ── */
        .cta-hr {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 60px 0 24px;
          transform-origin: center;
        }

        /* ── Footer ── */
        .cta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.18);
          padding: 0 4px;
        }

        .cta-footer-brand {
          color: rgba(139, 92, 246, 0.2);
        }

        /* ══════════════════════════════════════
           MODAL
           ══════════════════════════════════════ */
        .cta-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .cta-modal {
          width: 100%;
          max-width: 480px;
          background: linear-gradient(145deg, rgba(18, 18, 22, 0.95), rgba(8, 8, 12, 0.98));
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6),
                      0 0 60px rgba(139, 92, 246, 0.06);
        }

        .cta-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cta-modal-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .cta-modal-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.3);
          cursor: none;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .cta-modal-close:hover {
          color: var(--color-primary-light);
        }

        .cta-modal-options {
          display: flex;
          flex-direction: column;
          padding: 8px;
          gap: 4px;
        }

        .cta-modal-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.35s ease;
          cursor: none;
          border: 1px solid transparent;
        }

        .cta-modal-option:hover {
          background: rgba(139, 92, 246, 0.06);
          border-color: rgba(139, 92, 246, 0.12);
        }

        .cta-modal-icon {
          font-size: 1.3rem;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(139, 92, 246, 0.06);
          border: 1px solid rgba(139, 92, 246, 0.1);
          flex-shrink: 0;
        }

        .cta-modal-option-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .cta-modal-option-label {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: 0.02em;
        }

        .cta-modal-option-desc {
          font-family: var(--font-body);
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.35);
          line-height: 1.4;
        }

        .cta-modal-arrow {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: rgba(139, 92, 246, 0.3);
          transition: all 0.35s ease;
          flex-shrink: 0;
        }

        .cta-modal-option:hover .cta-modal-arrow {
          color: var(--color-primary-light);
          transform: translateX(4px);
        }

        .cta-modal-option:hover .cta-modal-option-label {
          color: #fff;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .cta-headline-line1,
          .cta-headline-line2 {
            font-size: clamp(1.6rem, 8vw, 2.8rem);
          }

          .cta-footer {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }

          .cta-secondary {
            flex-direction: column;
            align-items: center;
          }

          .cta-link {
            width: 200px;
            justify-content: center;
          }

          .cta-watermark {
            font-size: clamp(4rem, 20vw, 8rem);
            -webkit-text-stroke-width: 1px;
          }
        }
      `}</style>
    </section>
  )
}
