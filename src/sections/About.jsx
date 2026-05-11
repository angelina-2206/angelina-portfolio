import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

const EASE_OUT = [0.16, 1, 0.3, 1]

const TECH = [
  {
    id: "py", name: "Python", devicon: "devicon-python-plain colored", cat: "language",
    mastery: 95, rarity: "legendary",
    color: "#FFD700", icon_bg: "rgba(255,215,0,0.12)",
    grad: "linear-gradient(90deg,#FFD700,#FF6B35)",
    glow: "rgba(255,215,0,0.5)",
    projects: ["Burnout Sentinel", "TrapEye", "EcoPulse"],
  },
  {
    id: "genai", name: "Generative AI", devicon: "devicon-tensorflow-original colored", cat: "ai",
    mastery: 90, rarity: "legendary",
    color: "#FFD700", icon_bg: "rgba(255,215,0,0.12)",
    grad: "linear-gradient(90deg,#FFD700,#8B5CF6)",
    glow: "rgba(255,215,0,0.5)",
    projects: ["What If Wizard", "NyayaSathi", "EcoPulse"],
  },
  {
    id: "react", name: "React", devicon: "devicon-react-original colored", cat: "frontend",
    mastery: 85, rarity: "epic",
    color: "#61DAFB", icon_bg: "rgba(97,218,251,0.1)",
    grad: "linear-gradient(90deg,#61DAFB,#8B5CF6)",
    glow: "rgba(97,218,251,0.5)",
    projects: ["Portfolio", "PostPehchaan", "What If Wizard"],
  },
  {
    id: "js", name: "JavaScript", devicon: "devicon-javascript-plain colored", cat: "language",
    mastery: 80, rarity: "epic",
    color: "#F7DF1E", icon_bg: "rgba(247,223,30,0.1)",
    grad: "linear-gradient(90deg,#F7DF1E,#8B5CF6)",
    glow: "rgba(247,223,30,0.5)",
    projects: ["TrapEye", "Portfolio", "PostPehchaan"],
  },
  {
    id: "fastapi", name: "FastAPI", devicon: "devicon-fastapi-plain colored", cat: "backend",
    mastery: 78, rarity: "rare",
    color: "#00D2BE", icon_bg: "rgba(0,210,190,0.1)",
    grad: "linear-gradient(90deg,#00D2BE,#8B5CF6)",
    glow: "rgba(0,210,190,0.5)",
    projects: ["Burnout Sentinel", "TrapEye"],
  },
  {
    id: "node", name: "Node.js", devicon: "devicon-nodejs-plain colored", cat: "backend",
    mastery: 75, rarity: "rare",
    color: "#539E43", icon_bg: "rgba(83,158,67,0.1)",
    grad: "linear-gradient(90deg,#539E43,#00D2BE)",
    glow: "rgba(83,158,67,0.5)",
    projects: ["Portfolio", "PostPehchaan"],
  },
  {
    id: "tailwind", name: "Tailwind CSS", devicon: "devicon-tailwindcss-plain colored", cat: "frontend",
    mastery: 82, rarity: "rare",
    color: "#38BDF8", icon_bg: "rgba(56,189,248,0.1)",
    grad: "linear-gradient(90deg,#38BDF8,#8B5CF6)",
    glow: "rgba(56,189,248,0.5)",
    projects: ["Portfolio", "What If Wizard"],
  },
  {
    id: "git", name: "Git", devicon: "devicon-git-plain colored", cat: "tools",
    mastery: 88, rarity: "rare",
    color: "#F05032", icon_bg: "rgba(240,80,50,0.1)",
    grad: "linear-gradient(90deg,#F05032,#FF6B35)",
    glow: "rgba(240,80,50,0.5)",
    projects: ["All Projects"],
  },
  {
    id: "sklearn", name: "Scikit-learn", devicon: "devicon-scikitlearn-plain colored", cat: "ai",
    mastery: 68, rarity: "common",
    color: "rgba(255,255,255,0.35)", icon_bg: "rgba(255,255,255,0.05)",
    grad: "linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.15))",
    glow: "rgba(255,255,255,0.2)",
    projects: ["TrapEye", "Burnout Sentinel"],
  },
  {
    id: "pandas", name: "Pandas", devicon: "devicon-pandas-plain colored", cat: "data",
    mastery: 70, rarity: "common",
    color: "rgba(255,255,255,0.35)", icon_bg: "rgba(255,255,255,0.05)",
    grad: "linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,0.1))",
    glow: "rgba(255,255,255,0.2)",
    projects: ["Burnout Sentinel", "EcoPulse"],
  },
  {
    id: "postgres", name: "PostgreSQL", devicon: "devicon-postgresql-plain colored", cat: "data",
    mastery: 65, rarity: "common",
    color: "rgba(255,255,255,0.35)", icon_bg: "rgba(255,255,255,0.05)",
    grad: "linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,0.1))",
    glow: "rgba(255,255,255,0.2)",
    projects: ["PostPehchaan"],
  },
  {
    id: "c", name: "C / C++", devicon: "devicon-cplusplus-plain colored", cat: "language",
    mastery: 65, rarity: "common",
    color: "rgba(255,255,255,0.35)", icon_bg: "rgba(255,255,255,0.05)",
    grad: "linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.1))",
    glow: "rgba(255,255,255,0.2)",
    projects: ["Systems coursework"],
  },
  {
    id: "html", name: "HTML5", devicon: "devicon-html5-plain colored", cat: "frontend",
    mastery: 88, rarity: "rare",
    color: "#E34F26", icon_bg: "rgba(227,79,38,0.1)",
    grad: "linear-gradient(90deg,#E34F26,#F06529)",
    glow: "rgba(227,79,38,0.5)",
    projects: ["Portfolio", "PostPehchaan", "What If Wizard"],
  },
  {
    id: "css", name: "CSS3", devicon: "devicon-css3-plain colored", cat: "frontend",
    mastery: 85, rarity: "rare",
    color: "#1572B6", icon_bg: "rgba(21,114,182,0.1)",
    grad: "linear-gradient(90deg,#1572B6,#33A9DC)",
    glow: "rgba(21,114,182,0.5)",
    projects: ["Portfolio", "PostPehchaan", "What If Wizard"],
  },
  {
    id: "flutter", name: "Flutter", devicon: "devicon-flutter-plain colored", cat: "frontend",
    mastery: 75, rarity: "common",
    color: "#54C5F8", icon_bg: "rgba(84,197,248,0.1)",
    grad: "linear-gradient(90deg,#54C5F8,#01579B)",
    glow: "rgba(84,197,248,0.5)",
    projects: ["Mobile App Prototypes"],
  },
  {
    id: "mysql", name: "MySQL", devicon: "devicon-mysql-plain colored", cat: "data",
    mastery: 72, rarity: "common",
    color: "#4479A1", icon_bg: "rgba(68,121,161,0.1)",
    grad: "linear-gradient(90deg,#4479A1,#00D2BE)",
    glow: "rgba(68,121,161,0.5)",
    projects: ["Coursework", "PostPehchaan"],
  },
  {
    id: "r", name: "R", devicon: "devicon-r-plain colored", cat: "data",
    mastery: 65, rarity: "common",
    color: "#276DC3", icon_bg: "rgba(39,109,195,0.1)",
    grad: "linear-gradient(90deg,#276DC3,#165CA8)",
    glow: "rgba(39,109,195,0.5)",
    projects: ["Data Analysis Coursework"],
  },
]

const CATS = [
  { id: "all",      label: "All"       },
  { id: "ai",       label: "AI / ML"   },
  { id: "frontend", label: "Frontend"  },
  { id: "backend",  label: "Backend"   },
  { id: "language", label: "Languages" },
  { id: "data",     label: "Data"      },
  { id: "tools",    label: "Tools"     },
]

const RARITY = {
  legendary: { label: "Legendary", bg: "rgba(255,215,0,0.12)",  color: "#FFD700",              border: "rgba(255,215,0,0.35)"  },
  epic:      { label: "Epic",      bg: "rgba(139,92,246,0.12)", color: "#8B5CF6",              border: "rgba(139,92,246,0.35)" },
  rare:      { label: "Rare",      bg: "rgba(0,210,190,0.10)",  color: "#00D2BE",              border: "rgba(0,210,190,0.3)"   },
  common:    { label: "Common",    bg: "rgba(255,255,255,0.05)",color: "rgba(255,255,255,0.3)",border: "rgba(255,255,255,0.12)" },
}

/* ── Hooks ──────────────────────────────────────────────────── */

function useScramble(text, active) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-[]{}—+*?#∎·"
  const [display, setDisplay] = useState(() => text.replace(/[^\n ]/g, "█"))
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const lines = text.split("\n")
    const flat  = text.replace("\n", "")
    const total = flat.length * 3 + 20

    const tick = () => {
      let fi = 0
      const result = lines.map(line => {
        let out = ""
        for (let i = 0; i < line.length; i++) {
          const ch = line[i]
          if (ch === " ") { out += " "; fi++; continue; }
          if (frame > fi * 3 + 20) out += ch
          else if (frame > fi * 2)  out += CHARS[Math.floor(Math.random() * CHARS.length)]
          else                        out += "█"
          fi++
        }
        return out
      })
      setDisplay(result.join("\n"))
      frame++
      if (frame < total) rafRef.current = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => { rafRef.current = requestAnimationFrame(tick) }, 300)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current) }
  }, [active, text])

  return display
}

/* ── Stagger text component ─────────────────────────────────── */
function StaggerLines({ children, delay = 0, className = '', highlightWords = [] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
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

/* ── Tech Card Component ────────────────────────────────────── */
function TechCard({ tech, visible, delay }) {
  const [hovered, setHovered] = useState(false)
  const r = RARITY[tech.rarity]

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.001, ease: EASE_OUT }}
      style={{
        background:  hovered ? `${tech.color}0E` : "rgba(255,255,255,0.02)",
        border:      `1px solid ${hovered ? tech.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px",
        padding:     "1rem",
        cursor:      "none",
        position:    "relative",
        overflow:    "hidden",
        boxShadow:   hovered ? `0 12px 32px ${tech.color}18` : "none",
        backdropFilter: "blur(10px)",
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`interactive-zone about-tcard ${tech.rarity === 'legendary' ? 'legendary-pulse' : ''}`}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: tech.grad,
        opacity:    hovered ? 1 : 0,
        transition: "opacity 0.28s",
      }} />

      {/* Rarity badge */}
      <div style={{
        position:    "absolute", top: "0.6rem", right: "0.6rem",
        fontSize:    "0.45rem", padding: "2px 6px", borderRadius: "100px",
        background:  r.bg, color: r.color, border: `1px solid ${r.border}`,
        fontFamily:  "var(--font-mono)", letterSpacing: "0.1em",
        textTransform: "uppercase", fontWeight: 600,
      }}>{r.label}</div>

      {/* Icon */}
      <div className="about-icon-wrap" style={{
        background: tech.icon_bg,
        border: `0.5px solid ${tech.color}22`,
        "--ac": tech.color,
        "--ac-i": tech.icon_bg,
        "--glow": tech.glow
      }}>
        <div className="about-icon-ring" style={{ "--ac": tech.color, "--ac-i": tech.icon_bg }}></div>
        <div className="about-orbit" style={{ "--ac": tech.color }}></div>
        <i className={tech.devicon} style={{ fontSize: "30px", "--glow": tech.glow }}></i>
      </div>

      {/* Name */}
      <div style={{
        fontSize:      "0.85rem", fontWeight: 700,
        color:         hovered ? tech.color : "var(--color-text-primary)",
        letterSpacing: "-0.01em", marginBottom: "0.2rem",
        transition:    "color 0.28s",
        fontFamily:    "var(--font-display)",
      }}>{tech.name}</div>

      {/* Category */}
      <div style={{
        fontFamily:    "var(--font-mono)", fontSize: "0.5rem",
        color:         "var(--color-text-secondary)", opacity: 0.6, letterSpacing: "0.08em",
        textTransform: "uppercase", marginBottom: "0.8rem",
      }}>{tech.cat}</div>

      {/* XP bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", marginBottom: "4px", overflow: "hidden" }}>
        <div style={{
          height:     "100%",
          background: tech.grad,
          width:      hovered ? `${tech.mastery}%` : "0%",
          borderRadius: "2px",
          transition: "width 0.65s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: "0.5rem",
        color: "var(--color-text-secondary)", opacity: 0.5, letterSpacing: "0.05em",
      }}>
        <span>MASTERY</span>
        <span style={{ color: hovered ? tech.color : "inherit", transition: "color 0.28s" }}>
          {tech.mastery}%
        </span>
      </div>

      {/* Projects tooltip */}
      <div style={{
        maxHeight: hovered ? "120px" : "0px",
        overflow:  "hidden",
        transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ marginTop: "0.8rem", paddingTop: "0.6rem", borderTop: `1px solid ${tech.color}22` }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.5rem",
            color: tech.color, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: "6px",
          }}>Used in:</div>
          {tech.projects.map((p, i) => (
            <div key={i} style={{
              fontSize: "0.6rem", color: "var(--color-text-secondary)", opacity: 0.8,
              fontFamily: "var(--font-mono)", lineHeight: 1.7,
            }}>→ {p}</div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main About Section ─────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const [activeCat, setActiveCat] = useState("all")
  const headline = useScramble("ENGINEERED,\nNOT LUCK", inView)

  const filtered  = activeCat === "all" ? TECH : TECH.filter(t => t.cat === activeCat)
  const avgMastery = Math.round(TECH.reduce((s, t) => s + t.mastery, 0) / TECH.length)
  const totalXP    = TECH.reduce((s, t) => s + Math.round(t.mastery * 8.47), 0)

  /* Parallax watermark */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

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
      {/* ── Giant Background Watermark (Static) ── */}
      <motion.div 
        className="about-watermark" 
        style={{ x: watermarkX }}
        initial={{ opacity: 0, y: '-45%' }}
        animate={{ opacity: 1, y: '-50%' }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      >
        SYSTEM
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
        {/* ── 2-Column Grid ── */}
        <div className="about-grid">
          {/* ═══ LEFT COLUMN ═══ */}
          <div className="about-col-left">
            {/* Section Label */}
            <motion.div
              className="about-label"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="about-label-line" />
              [ 001 — THE MAKER ]
            </motion.div>

            {/* Scrambled headline */}
            <h2 className="about-headline">
              {headline.split("\n").map((line, i) => (
                <div key={i} className={i === 1 ? "about-headline-accent" : "about-headline-line"}>
                  {line}
                </div>
              ))}
            </h2>

            {/* Signature Identity Line */}
            <motion.p
              className="about-signature"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.6, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
            >
              Turning caffeine into code and ideas into systems that (usually) work.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="about-divider"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
            />

            {/* Intro Text */}
            <StaggerLines delay={0.6} className="about-intro" highlightWords={['scalable', 'practical']}>
              {`Full-Stack Developer & Computer Science Engineering student focused on building scalable, practical products across web development, automation, and AI.`}
            </StaggerLines>

            <div style={{ height: '16px' }} />

            <StaggerLines delay={0.8} className="about-body">
              {`I don't really chase trends.\nI just like understanding how things work\nand rebuilding them until they make more sense.`}
            </StaggerLines>

            <div style={{ height: '16px' }} />

            <StaggerLines delay={0.85} className="about-body about-body-emphasis">
              {`Mostly learning.\nOccasionally shipping.`}
            </StaggerLines>

            <div style={{ height: '24px' }} />

            {/* Philosophy */}
            <motion.div
              className="about-philosophy"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
            >
              <span className="about-philosophy-bar" />
              <p>
                Most projects start with:<br />
                <em>"there's probably a better way to build this."</em>
              </p>
            </motion.div>

            {/* Badges */}
            <motion.div 
              style={{
                marginTop: "2rem",
                display: "flex", flexWrap: "wrap", gap: "10px",
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {[
                { label: "GSSoC '26",           color: "#00D2BE" },
                { label: "SSoC '26",             color: "#00D2BE" },
                { label: "WIOS · Technical Team", color: "var(--color-lavender)" },
              ].map((badge, i) => (
                <span key={i} style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.55rem", padding: "4px 12px", borderRadius: "100px",
                  border:        `1px solid ${badge.color}40`,
                  color:         badge.color,
                  background:    `${badge.color}10`,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{badge.label}</span>
              ))}
            </motion.div>

            <div style={{ height: '40px' }} />

            {/* ── Highlighted Status Card ── */}
            <motion.a
              href="#contact"
              className="about-cta-card interactive-zone"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.02 }}
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

          {/* ═══ RIGHT COLUMN — TECH ARSENAL ═══ */}
          <div className="about-col-right">
            {/* Arsenal header row */}
            <motion.div 
              style={{
                display:        "flex",
                alignItems:     "flex-end",
                justifyContent: "space-between",
                marginBottom:   "1.5rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              <div>
                <h3 style={{
                  fontSize:      "clamp(2rem,3.5vw,2.5rem)",
                  fontWeight:    900,
                  color:         "var(--color-text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight:    0.9,
                  marginBottom:  "0.5rem",
                  fontFamily:    "var(--font-display)",
                }}>
                  TECH<br />
                  <span style={{ color: "var(--color-lavender)" }}>ARSENAL.</span>
                </h3>
                <div style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.55rem",
                  color:         "var(--color-text-secondary)",
                  opacity:       0.6,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>Hover to inspect · sorted by mastery</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.55rem",
                  color:         "var(--color-lavender)",
                  opacity:       0.8,
                  letterSpacing: "0.1em",
                  marginBottom:  "4px",
                }}>TOTAL XP</div>
                <div style={{
                  fontSize:      "clamp(1.8rem,3.5vw,2.4rem)",
                  fontWeight:    900,
                  color:         "var(--color-lavender)",
                  letterSpacing: "-0.04em",
                  lineHeight:    1,
                  fontFamily:    "var(--font-display)",
                }}>{totalXP.toLocaleString()}</div>
              </div>
            </motion.div>

            {/* Category filter tabs */}
            <motion.div 
              style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.55rem",
                    padding:       "6px 14px",
                    borderRadius:  "100px",
                    border:        activeCat === cat.id
                      ? "1px solid rgba(139,92,246,0.55)"
                      : "1px solid rgba(255,255,255,0.08)",
                    background:    activeCat === cat.id
                      ? "rgba(139,92,246,0.14)"
                      : "transparent",
                    color:         activeCat === cat.id
                      ? "var(--color-lavender)"
                      : "var(--color-text-secondary)",
                    cursor:        "none",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    transition:    "all 0.2s",
                  }}
                  className="interactive-zone"
                >{cat.label}</button>
              ))}
            </motion.div>

            {/* Tech card grid */}
            <div style={{
              display:               "grid",
              gridTemplateColumns:   "repeat(auto-fill, minmax(160px,1fr))",
              gap:                   "12px",
              maxHeight:             "500px",
              overflowY:             "auto",
              paddingRight:          "8px",
              paddingBottom:         "120px", // Gives space for the hover tooltip on the last row
              alignContent:          "start",
            }} className="custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filtered.map((tech, i) => (
                  <TechCard key={tech.id} tech={tech} visible={inView} delay={i * 30 + 200} />
                ))}
              </AnimatePresence>
            </div>

            {/* Arsenal Strength bar */}
            <motion.div 
              style={{
                marginTop:    "1.5rem",
                padding:      "1rem 1.2rem",
                background:   "rgba(255,255,255,0.02)",
                border:       "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.55rem",
                  color:         "var(--color-text-secondary)",
                  opacity:       0.8,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}>Arsenal Strength</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize:   "0.55rem",
                  color:      "var(--color-text-secondary)",
                  opacity:    0.6,
                }}>{avgMastery}% · Leveling up daily</span>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div style={{
                  height:     "100%",
                  background: "linear-gradient(90deg, var(--color-lavender), #00D2BE, #FFD700)",
                  borderRadius: "2px",
                }}
                initial={{ width: "0%" }}
                animate={inView ? { width: `${avgMastery}%` } : {}}
                transition={{ duration: 1.5, delay: 1, ease: EASE_OUT }}
                />
              </div>
            </motion.div>

            {/* Rarity legend */}
            <motion.div 
              style={{ display: "flex", gap: "16px", marginTop: "1rem", flexWrap: "wrap" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {Object.entries(RARITY).map(([key, r]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: r.color }} />
                  <span style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.5rem",
                    color:         "var(--color-text-secondary)",
                    opacity:       0.7,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>{r.label}</span>
                </div>
              ))}
            </motion.div>
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
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
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
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.2vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: pre-wrap;
        }

        .about-headline-line {
          color: var(--color-text-primary);
        }

        .about-headline-accent {
          color: var(--color-lavender);
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

        .about-philosophy {
          position: relative;
          padding-left: 20px;
        }
        
        .about-philosophy-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-lavender);
          opacity: 0.5;
        }

        .about-philosophy p {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          opacity: 0.8;
        }
        
        .about-philosophy em {
          color: var(--color-lavender);
          font-style: italic;
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

        .about-cta-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
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
        
        .about-cta-accent {
          color: var(--color-lavender);
        }

        .about-cta-arrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          opacity: 0.6;
          text-transform: uppercase;
          color: var(--color-lavender);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }

        /* Icon container */
        .about-icon-wrap {
          width: 48px; height: 48px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.75rem; position: relative;
          transition: all 0.3s;
        }
        .about-tcard:hover .about-icon-wrap { transform: scale(1.1) rotate(-3deg); }
        .about-icon-wrap i { transition: all 0.3s; }
        .about-tcard:hover .about-icon-wrap i { filter: drop-shadow(0 0 8px var(--glow, rgba(139,92,246,0.6))); }

        /* Floating ring on hover */
        .about-icon-ring {
          position: absolute; inset: -4px; border-radius: 14px;
          border: 1px solid transparent;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .about-tcard:hover .about-icon-ring {
          border-color: var(--ac);
          box-shadow: 0 0 12px var(--ac), inset 0 0 12px var(--ac-i);
        }

        /* Orbit dots on hover */
        .about-orbit {
          position: absolute; inset: -12px; border-radius: 50%;
          border: 1px solid transparent;
          animation: none; pointer-events: none;
        }
        .about-tcard:hover .about-orbit {
          border-color: var(--ac);
          opacity: 0.3;
          animation: aboutSpin 3s linear infinite;
        }
        .about-orbit::before {
          content: ''; position: absolute; top: -3px; left: 50%;
          transform: translateX(-50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--ac);
        }
        @keyframes aboutSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Pulse animation for legendary */
        @keyframes legendaryPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(255,215,0,0); }
        }
        .about-tcard.legendary-pulse:hover .about-icon-wrap {
          animation: legendaryPulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 80px; }
        }
      `}</style>
    </section>
  )
}

