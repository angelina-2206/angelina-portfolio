import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

/* ── Persona Mode Data ──────────────────────────────────────── */
const MODES = [
  {
    key: 'builder',
    label: 'BUILDER',
    quote: `I turn ideas into real, working systems.\nFrom concept to deployment, I focus on execution.`,
    icon: '◈',
    watermark: 'BUILD',
  },
  {
    key: 'debugger',
    label: 'DEBUGGER',
    quote: `I break things down, trace problems, and fix what others overlook.\nEfficiency starts with understanding.`,
    icon: '⏣',
    watermark: 'DEBUG',
  },
  {
    key: 'designer',
    label: 'DESIGNER',
    quote: `I care about how things feel and function.\nClean interfaces, intuitive flows, and thoughtful UX.`,
    icon: '✦',
    watermark: 'DESIGN',
  },
  {
    key: 'system-thinker',
    label: 'SYSTEM THINKER',
    quote: `I think in systems, not just features.\nScalability, structure, and long-term impact matter.`,
    icon: '⬡',
    watermark: 'SYSTEM',
  },
]

/* ── Easing presets ──────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1]

/* ── Stagger text component ─────────────────────────────────── */
function StaggerLines({ children, delay = 0, className = '', highlightWords = [] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Split by newline, then render each line
  const lines = typeof children === 'string' ? children.split('\n') : [children]

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.12,
            ease: EASE_OUT,
          }}
          style={{ marginBottom: '0.4em' }}
        >
          {typeof line === 'string' ? (
            line.split(' ').map((word, idx) => {
              const isHighlighted = highlightWords.some(h => word.toLowerCase().includes(h.toLowerCase()))
              return (
                <span key={idx} style={{ color: isHighlighted ? 'var(--color-text-primary)' : 'inherit', fontWeight: isHighlighted ? 600 : 'inherit' }}>
                  {word}{' '}
                </span>
              )
            })
          ) : line}
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
  const { index: modeIndex, direction, goNext, goPrev } = useAutoCycle(MODES.length, 6000)
  const activeMode = MODES[modeIndex]

  const [headlineVariation, setHeadlineVariation] = useState(false)

  // Subtle headline text variation effect
  useEffect(() => {
    if (!headlineInView) return
    const timer = setInterval(() => {
      setHeadlineVariation(prev => !prev)
    }, 4500)
    return () => clearInterval(timer)
  }, [headlineInView])

  /* Parallax watermark */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  /* Mode card swipe variants */
  const cardContentVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 30 : -30,
      filter: 'blur(10px)',
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -30 : 30,
      filter: 'blur(10px)',
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
        padding: '160px 0 140px',
      }}
    >
      {/* ── Giant Background Watermark (Dynamic) ── */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeMode.watermark}
          className="about-watermark" 
          style={{ x: watermarkX }}
          initial={{ opacity: 0, y: '-45%' }}
          animate={{ opacity: 1, y: '-50%' }}
          exit={{ opacity: 0, y: '-55%' }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          {activeMode.watermark}
        </motion.div>
      </AnimatePresence>

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
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="about-label-line" />
              [ 001 — THE MAKER ]
            </motion.div>

            {/* Headline with slide and blur effect */}
            <div ref={headlineRef} className="about-headline">
              <motion.span
                className="about-headline-line"
                initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
                animate={headlineInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{ duration: 1.2, ease: EASE_OUT }}
              >
                ENGINEERED,
              </motion.span>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineVariation ? 'alt' : 'main'}
                    className="about-headline-line about-headline-accent"
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                  >
                    {headlineVariation ? 'NOT LUCK' : 'NOT ACCIDENTAL'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Signature Identity Line */}
            <motion.p
              className="about-signature"
              initial={{ opacity: 0, y: 10 }}
              animate={headlineInView ? { opacity: 0.6, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
            >
              I don’t chase trends. I build systems that last.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="about-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: EASE_OUT }}
            />

            {/* Intro Text - Separated Hierarchically */}
            <StaggerLines delay={0.7} className="about-intro" highlightWords={['systems', 'solve']}>
              {`I build systems that solve real problems.`}
            </StaggerLines>

            <div style={{ height: '20px' }} />

            <StaggerLines delay={0.9} className="about-body">
              {`Full-stack developer & Computer Science Engineering student\nfocused on turning ideas into scalable engineering products.`}
            </StaggerLines>

            <div style={{ height: '20px' }} />

            <StaggerLines delay={1.1} className="about-body about-body-emphasis">
              {`I don't just write code —\nI design how things work.`}
            </StaggerLines>

            {/* Philosophy */}
            <motion.div
              className="about-philosophy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1.3, ease: EASE_OUT }}
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
              className="about-persona-card float-anim"
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE_OUT }}
              whileHover={{
                boxShadow: '0 0 80px rgba(139, 92, 246, 0.25), 0 40px 100px rgba(0,0,0,0.6)',
                y: -8,
                scale: 1.02,
              }}
            >
              <div className="about-card-glow" />

              <div className="about-card-header">
                <div className="about-card-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="about-card-sys">PERSONA.SYS</span>
              </div>

              {/* Mode Title with scale animation */}
              <div className="about-mode-title">
                <span className="about-mode-prefix">MODE:</span>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.span
                    key={activeMode.key}
                    className="about-mode-name"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
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
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  {activeMode.icon}
                </motion.div>
              </AnimatePresence>

              {/* Mode quote with smoother slide transitions */}
              <div className="about-mode-quote-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.p
                    key={activeMode.key + '-quote'}
                    className="about-mode-quote"
                    variants={cardContentVariants}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    {activeMode.quote}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="about-card-nav">
                <motion.button
                  className="about-card-arrow interactive-zone"
                  onClick={goPrev}
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>

                <div className="about-card-progress">
                  {MODES.map((_, i) => (
                    <motion.span
                      key={i}
                      className={`about-progress-dot ${i === modeIndex ? 'active' : ''}`}
                      animate={{
                        width: i === modeIndex ? '20px' : '6px',
                        backgroundColor: i === modeIndex ? '#A78BFA' : 'rgba(255,255,255,0.1)',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  ))}
                </div>

                <motion.button
                  className="about-card-arrow interactive-zone"
                  onClick={goNext}
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="about-col-right">
            <StaggerLines delay={0.4} className="about-right-text">
              {`I work at the intersection of\nlogic and product thinking —`}
            </StaggerLines>

            <StaggerLines delay={0.6} className="about-right-text">
              {`where systems aren't just built,\nthey're designed to scale.`}
            </StaggerLines>

            <motion.div
              className="about-right-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
            />

            <StaggerLines delay={0.8} className="about-right-text" highlightWords={['fast', 'ship']}>
              {`I move fast, iterate faster,\nand ship things that actually work.`}
            </StaggerLines>

            <StaggerLines delay={1.0} className="about-right-text about-right-highlight">
              {`Built across AI, full-stack systems,\nand real-world applications.`}
            </StaggerLines>

            <div style={{ height: '30px' }} />

            {/* ── Highlighted Status Card ── */}
            <motion.a
              href="#contact"
              className="about-cta-card interactive-zone"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="about-cta-glow-border" />
              <div className="about-cta-status">
                <span className="about-status-blink-dot" />
                <span className="about-cta-pill">STATUS: BUILDING + AVAILABLE</span>
              </div>
              <p className="about-cta-headline">
                Currently building,<br />learning, and open to<br />
                <span className="about-cta-accent">internship opportunities.</span>
              </p>
              <span className="about-cta-arrow">View Contact ↓</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
           SCOPED STYLES
         ──────────────────────────────────────────────────────── */}
      <style>{`
        .about-watermark {
          position: absolute;
          top: 50%;
          left: 0;
          white-space: nowrap;
          transform: translateY(-50%);
          font-family: var(--font-display);
          font-size: clamp(10rem, 25vw, 35rem);
          font-weight: 800;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1px rgba(139, 92, 246, 0.03);
          pointer-events: none;
          z-index: 0;
          user-select: none;
          line-height: 1;
        }

        .about-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80vw;
          height: 80vw;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%);
          filter: blur(100px);
          pointer-events: none;
          z-index: 1;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1fr;
          gap: 50px;
          align-items: start;
        }

        .about-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-primary-light);
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 35px;
        }

        .about-label-line {
          width: 30px;
          height: 1px;
          background: var(--color-primary);
          opacity: 0.7;
        }

        .about-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
        }

        .about-headline-line {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.2vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          line-height: 1;
          color: var(--color-text-primary);
        }

        .about-headline-accent {
          color: var(--color-lavender);
          display: inline-block;
        }

        .about-signature {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          margin-bottom: 30px;
          color: var(--color-text-secondary);
        }

        .about-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-primary), transparent);
          margin-bottom: 35px;
          transform-origin: left;
        }

        .about-intro {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .about-body {
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          opacity: 0.6;
        }

        .about-body-emphasis {
          color: var(--color-lavender);
          opacity: 0.8;
          font-style: italic;
        }

        .float-anim {
          animation: aboutFloat 8s ease-in-out infinite;
        }

        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .about-persona-card {
          padding: 40px;
          border-radius: 24px;
          background: rgba(20, 10, 30, 0.4);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          position: relative;
          z-index: 5;
        }

        .about-card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .about-card-dots {
          display: flex;
          gap: 8px;
        }

        .about-card-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.2);
        }

        .about-card-dots span:first-child { background: var(--color-primary); }

        .about-card-sys {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          opacity: 0.3;
        }

        .about-mode-title {
          display: flex;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 30px;
        }

        .about-mode-prefix {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          opacity: 0.4;
        }

        .about-mode-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-lavender);
        }

        .about-mode-icon {
          font-size: 3.5rem;
          text-align: center;
          margin-bottom: 30px;
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.4));
        }

        .about-mode-quote {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          min-height: 100px;
        }

        .about-card-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .about-card-arrow {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: white;
          cursor: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .about-progress-dot {
          height: 6px;
          border-radius: 3px;
          margin: 0 4px;
        }

        .about-col-right {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 60px;
        }

        .about-right-text {
          font-family: var(--font-display);
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          margin-bottom: 0;
          letter-spacing: 0.01em;
        }

        .about-right-highlight {
          color: var(--color-lavender);
          opacity: 0.9;
        }

        .about-right-divider {
          width: 40px;
          height: 1px;
          background: rgba(139, 92, 246, 0.3);
          margin-bottom: 25px;
        }

        .about-cta-card {
          display: block;
          padding: 30px;
          border-radius: 20px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          text-decoration: none;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.4s;
        }

        .about-status-blink-dot {
          width: 10px;
          height: 10px;
          background: #34d399;
          border-radius: 50%;
          animation: aboutStatusBlink 2s infinite;
        }

        @keyframes aboutStatusBlink {
          0%, 100% { opacity: 0.4; transform: scale(0.8); box-shadow: 0 0 0 rgba(52, 211, 153, 0); }
          50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 15px rgba(52, 211, 153, 0.6); }
        }

        .about-cta-pill {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #34d399;
        }

        .about-cta-headline {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .about-cta-arrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          opacity: 0.4;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 80px; }
          .about-col-right { padding-top: 0; }
        }
      `}</style>
    </section>
  )
}
