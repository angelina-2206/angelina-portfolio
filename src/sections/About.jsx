import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

/* ── Persona Mode Data ──────────────────────────────────────── */
const MODES = [
  {
    key: 'builder',
    label: 'BUILDER',
    quote: `I turn ideas into real, working systems.\nFrom concept to deployment, I focus on execution.`,
    icon: '◈',
  },
  {
    key: 'debugger',
    label: 'DEBUGGER',
    quote: `I break things down, trace problems, and fix what others overlook.\nEfficiency starts with understanding.`,
    icon: '⏣',
  },
  {
    key: 'designer',
    label: 'DESIGNER',
    quote: `I care about how things feel and function.\nClean interfaces, intuitive flows, and thoughtful UX.`,
    icon: '✦',
  },
  {
    key: 'system-thinker',
    label: 'SYSTEM THINKER',
    quote: `I think in systems, not just features.\nScalability, structure, and long-term impact matter.`,
    icon: '⬡',
  },
]

/* ── Easing presets ──────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1]

/* ── Stagger text component ─────────────────────────────────── */
function StaggerLines({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Split by newline, then render each line
  const lines = typeof children === 'string' ? children.split('\n') : [children]

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.1,
            ease: EASE_OUT,
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Auto-cycling hook ──────────────────────────────────────── */
function useAutoCycle(length, intervalMs = 5000) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % length)
    }, intervalMs)
  }, [length, intervalMs])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const goNext = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % length)
    resetTimer()
  }

  const goPrev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + length) % length)
    resetTimer()
  }

  return { index, direction, goNext, goPrev }
}

/* ── Main About / The Maker Section ─────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const headlineInView = useInView(headlineRef, { once: true, margin: '-80px' })
  const { index: modeIndex, direction, goNext, goPrev } = useAutoCycle(MODES.length, 5000)
  const activeMode = MODES[modeIndex]

  /* Parallax watermark */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['5%', '-20%'])

  /* Mode card swipe variants */
  const cardVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 28 : -28,
      scale: 0.97,
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -28 : 28,
      scale: 0.97,
    }),
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="obs-section bg-deep about-section"
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        padding: '140px 0 120px',
      }}
    >
      {/* ── Giant Background Watermark ── */}
      <motion.div className="about-watermark" style={{ x: watermarkX }}>
        PERSONA
      </motion.div>

      {/* ── Ambient glow ── */}
      <div className="about-ambient-glow" />

      {/* ── Inner Container ── */}
      <div
        className="obs-inner"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        {/* ── 3-Column Grid ── */}
        <div className="about-grid">
          {/* ═══ LEFT COLUMN ═══ */}
          <div className="about-col-left">
            {/* Section Label */}
            <motion.div
              className="about-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <span className="about-label-line" />
              [ 001 — THE MAKER ]
            </motion.div>

            {/* Headline */}
            <div ref={headlineRef} className="about-headline">
              <motion.span
                className="about-headline-line"
                initial={{ opacity: 0, y: 30 }}
                animate={headlineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                ENGINEERED,
              </motion.span>
              <motion.span
                className="about-headline-line about-headline-accent"
                initial={{ opacity: 0, y: 40 }}
                animate={headlineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              >
                NOT ACCIDENTAL
              </motion.span>
            </div>

            {/* Divider */}
            <motion.div
              className="about-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            />

            {/* Intro Text */}
            <StaggerLines delay={0.3} className="about-intro">
              {`I build systems that solve real problems.`}
            </StaggerLines>

            <StaggerLines delay={0.45} className="about-body">
              {`Full-stack developer and CS (Business Systems) student\nfocused on turning ideas into scalable, working products.`}
            </StaggerLines>

            <StaggerLines delay={0.6} className="about-body about-body-emphasis">
              {`I don't just write code —\nI design how things work.`}
            </StaggerLines>

            {/* Philosophy */}
            <motion.div
              className="about-philosophy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT }}
            >
              <span className="about-philosophy-bar" />
              <p>
                Every system starts the same way:<br />
                <em>"What's broken — and why hasn't it been fixed yet?"</em>
              </p>
            </motion.div>
          </div>

          {/* ═══ CENTER COLUMN — PERSONA CARD ═══ */}
          <div className="about-col-center">
            <motion.div
              className="about-persona-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
              whileHover={{
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.15), 0 30px 80px rgba(0,0,0,0.5)',
                y: -4,
              }}
            >
              {/* Card glow border */}
              <div className="about-card-glow" />

              {/* Card header */}
              <div className="about-card-header">
                <div className="about-card-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="about-card-sys">PERSONA.SYS</span>
              </div>

              {/* Mode Title */}
              <div className="about-mode-title">
                <span className="about-mode-prefix">MODE:</span>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.span
                    key={activeMode.key}
                    className="about-mode-name"
                    custom={direction}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    {activeMode.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Mode icon */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeMode.key + '-icon'}
                  className="about-mode-icon"
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {activeMode.icon}
                </motion.div>
              </AnimatePresence>

              {/* Mode quote */}
              <div className="about-mode-quote-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.p
                    key={activeMode.key + '-quote'}
                    className="about-mode-quote"
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    {activeMode.quote}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="about-card-nav">
                <motion.button
                  className="about-card-arrow"
                  onClick={goPrev}
                  whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(139,92,246,0.35)' }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Previous mode"
                >
                  ←
                </motion.button>

                {/* Progress dots */}
                <div className="about-card-progress">
                  {MODES.map((_, i) => (
                    <motion.span
                      key={i}
                      className={`about-progress-dot ${i === modeIndex ? 'active' : ''}`}
                      animate={{
                        scale: i === modeIndex ? 1.4 : 1,
                        backgroundColor:
                          i === modeIndex
                            ? 'rgba(167, 139, 250, 1)'
                            : 'rgba(255,255,255,0.15)',
                      }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                  ))}
                  <span className="about-progress-counter">
                    {String(modeIndex + 1).padStart(2, '0')} / {String(MODES.length).padStart(2, '0')}
                  </span>
                </div>

                <motion.button
                  className="about-card-arrow"
                  onClick={goNext}
                  whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(139,92,246,0.35)' }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Next mode"
                >
                  →
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="about-col-right">
            <StaggerLines delay={0.2} className="about-right-text">
              {`I work at the intersection of\nlogic and product thinking —`}
            </StaggerLines>

            <StaggerLines delay={0.4} className="about-right-text">
              {`where systems aren't just built,\nthey're designed to scale.`}
            </StaggerLines>

            <motion.div
              className="about-right-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
            />

            <StaggerLines delay={0.55} className="about-right-text">
              {`I move fast, iterate faster,\nand ship things that actually work.`}
            </StaggerLines>

            {/* ── Highlighted CTA Card ── */}
            <motion.a
              href="#contact"
              className="about-cta-card"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <div className="about-cta-glow-border" />
              <div className="about-cta-status">
                <span className="about-cta-pill">OPEN TO WORK</span>
              </div>
              <p className="about-cta-headline">
                Currently building,<br />learning, and open to<br />
                <span className="about-cta-accent">internship opportunities.</span>
              </p>
              <span className="about-cta-arrow">↓</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
           SCOPED STYLES
         ──────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Watermark ── */
        .about-watermark {
          position: absolute;
          top: 50%;
          left: 0;
          white-space: nowrap;
          transform: translateY(-50%);
          font-family: var(--font-display);
          font-size: clamp(8rem, 20vw, 26rem);
          font-weight: 800;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(139, 92, 246, 0.035);
          pointer-events: none;
          z-index: 0;
          user-select: none;
          line-height: 1;
        }

        /* ── Ambient glow ── */
        .about-ambient-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          width: 700px;
          height: 700px;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.06) 0%,
            rgba(139, 92, 246, 0.02) 40%,
            transparent 70%
          );
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 0.85fr;
          gap: 56px;
          align-items: start;
        }

        /* ── LEFT COLUMN ── */
        .about-col-left {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-primary-light);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .about-label-line {
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--color-primary);
          opacity: 0.6;
        }

        .about-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
        }

        .about-headline-line {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          line-height: 1.1;
          color: var(--color-text-primary);
          display: block;
        }

        .about-headline-accent {
          color: var(--color-lavender);
        }

        .about-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-primary), transparent);
          margin-bottom: 28px;
          transform-origin: left;
        }

        .about-intro {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .about-body {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          line-height: 1.9;
          letter-spacing: 0.04em;
          color: var(--color-text-secondary);
          margin-bottom: 18px;
        }

        .about-body-emphasis {
          color: rgba(196, 181, 253, 0.7);
          font-style: italic;
        }

        .about-philosophy {
          display: flex;
          align-items: stretch;
          gap: 14px;
          margin-top: 12px;
          padding: 14px 0;
        }

        .about-philosophy-bar {
          width: 2px;
          flex-shrink: 0;
          background: linear-gradient(180deg, var(--color-primary) 0%, rgba(139,92,246,0.1) 100%);
          border-radius: 2px;
        }

        .about-philosophy p {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          line-height: 1.8;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.35);
        }

        .about-philosophy em {
          color: var(--color-lavender);
          font-style: italic;
          opacity: 0.8;
        }

        /* ── CENTER COLUMN — PERSONA CARD ── */
        .about-col-center {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 24px;
        }

        .about-persona-card {
          position: relative;
          width: 100%;
          max-width: 380px;
          padding: 32px 28px 28px;
          border-radius: 20px;
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(139, 92, 246, 0.04) 30%,
            rgba(0, 0, 0, 0.25) 100%
          );
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(139, 92, 246, 0.12);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(139, 92, 246, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .about-card-glow {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.15) 0%,
            transparent 40%,
            transparent 60%,
            rgba(196, 181, 253, 0.08) 100%
          );
          pointer-events: none;
          z-index: -1;
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .about-persona-card:hover .about-card-glow {
          opacity: 1;
        }

        .about-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .about-card-dots {
          display: flex;
          gap: 6px;
        }

        .about-card-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .about-card-dots span:first-child {
          background: rgba(139, 92, 246, 0.5);
        }

        .about-card-sys {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          letter-spacing: 0.25em;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
        }

        .about-mode-title {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 20px;
          min-height: 28px;
        }

        .about-mode-prefix {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .about-mode-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-lavender);
          text-transform: uppercase;
          display: inline-block;
        }

        .about-mode-icon {
          font-size: 2.4rem;
          text-align: center;
          margin-bottom: 20px;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.3));
        }

        .about-mode-quote-wrapper {
          min-height: 80px;
          display: flex;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .about-mode-quote {
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.55);
          white-space: pre-line;
          letter-spacing: 0.01em;
        }

        .about-card-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 20px;
        }

        .about-card-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.35s ease;
          cursor: none;
        }

        .about-card-arrow:hover {
          border-color: var(--color-primary);
          color: var(--color-lavender);
          background: rgba(139, 92, 246, 0.1);
        }

        .about-card-progress {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .about-progress-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: block;
          transition: all 0.35s ease;
        }

        .about-progress-counter {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.2);
          margin-left: 8px;
        }

        /* ── RIGHT COLUMN ── */
        .about-col-right {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 60px;
        }

        .about-right-text {
          font-family: var(--font-display);
          font-size: 0.92rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          font-weight: 400;
        }

        .about-right-divider {
          width: 36px;
          height: 1px;
          background: rgba(139, 92, 246, 0.25);
          margin-bottom: 20px;
          transform-origin: left;
        }

        /* ── CTA Card ── */
        .about-cta-card {
          position: relative;
          display: block;
          text-decoration: none;
          margin-top: 20px;
          padding: 24px 24px 28px;
          border-radius: 16px;
          background: linear-gradient(
            160deg,
            rgba(139, 92, 246, 0.08) 0%,
            rgba(139, 92, 246, 0.03) 40%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border: 1px solid rgba(139, 92, 246, 0.15);
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-cta-card:hover {
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 0 50px rgba(139, 92, 246, 0.12);
          transform: translateY(-3px);
        }

        .about-cta-glow-border {
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.25) 0%,
            transparent 35%,
            transparent 65%,
            rgba(196, 181, 253, 0.12) 100%
          );
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          animation: ctaGlowPulse 4s ease-in-out infinite;
        }

        @keyframes ctaGlowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .about-cta-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .about-cta-pill {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #34d399;
          padding: 4px 12px;
          border: 1px solid rgba(52, 211, 153, 0.25);
          border-radius: 999px;
          background: rgba(52, 211, 153, 0.06);
          box-shadow: 0 0 12px rgba(52, 211, 153, 0.15);
          transition: box-shadow 0.4s ease, background 0.4s ease;
        }

        .about-cta-card:hover .about-cta-pill {
          box-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.1);
        }

        .about-cta-headline {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          position: relative;
          z-index: 1;
        }

        .about-cta-arrow {
          position: absolute;
          bottom: 20px;
          right: 22px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.15);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .about-cta-card:hover .about-cta-arrow {
          color: var(--color-lavender);
          transform: translateY(3px);
        }

        .about-cta-accent {
          color: var(--color-lavender);
          font-style: italic;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .about-col-right {
            grid-column: 1 / -1;
            padding-top: 0;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px 24px;
          }

          .about-right-divider {
            width: 100%;
            flex-basis: 100%;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 80px 0 60px !important;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-col-center {
            padding-top: 0;
          }

          .about-persona-card {
            max-width: 100%;
          }

          .about-headline-line {
            font-size: clamp(1.6rem, 7vw, 2.4rem);
          }

          .about-col-right {
            padding-top: 0;
          }

          .about-watermark {
            font-size: clamp(4rem, 22vw, 8rem);
            -webkit-text-stroke-width: 1px;
          }
        }

        @media (max-width: 480px) {
          .about-persona-card {
            padding: 24px 20px 20px;
          }

          .about-mode-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
