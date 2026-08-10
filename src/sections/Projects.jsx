import { useState, useRef, useCallback, useEffect } from 'react'
import { trackGitHubClick, trackProjectDemoClick } from '../lib/analytics'

const PROJECTS = [
  {
    num: '01', title: 'TrapEye',
    subtitle: 'Phishing Detection · Chrome Extension',
    desc: '89% accuracy, sub-200ms inference. On-device ML model built in 12 hours. Web app + Chrome extension for real-time phishing detection that\'s fast, private, and practical.',
    accent: '#E10600',
    accentGrad: 'linear-gradient(90deg,#E10600,#FF6B35)',
    bgWord: 'TRAPEYE',
    tags: [
      { t: '2nd · HackAura', c: 'gold' }, { t: 'On-Device ML', c: 'red' },
      { t: 'Chrome Ext', c: 'muted' }
    ],
    flagship: false,
    status: { label: 'Awarded', dot: '#FFD700', text: 'rgba(255,215,0,0.85)', border: 'rgba(255,215,0,0.3)' },
    github: 'https://github.com/angelina-2206/TrapEye-Demo',
    live: null,
  },
  {
    num: '02', title: 'Burnout Sentinel',
    subtitle: 'AI · Mental Health · Behavioral Analytics',
    desc: 'AI-powered personal analytics that transforms calendar data into burnout prevention insights. Multi-agent architecture + NLP detects overload trends before they break you.',
    accent: '#8B5CF6',
    accentGrad: 'linear-gradient(90deg,#8B5CF6,#C4B5FD)',
    bgWord: 'BURNOUT',
    tags: [
      { t: 'Multi-Agent', c: 'purple' }, { t: 'NLP', c: 'purple' },
      { t: 'Python', c: 'teal' }, { t: 'FastAPI', c: 'muted' }
    ],
    flagship: true,
    status: { label: 'Active', dot: '#2ECC71', text: 'rgba(46,204,113,0.85)', border: 'rgba(46,204,113,0.3)' },
    github: 'https://github.com/angelina-2206/burnout-sentinel',
    live: null,
  },
  {
    num: '03', title: 'Gear Guard',
    subtitle: 'Asset Tracking · Equipment Management · Downtime Analytics',
    desc: 'Prototype equipment management solution streamlining asset tracking and maintenance workflows. Uniquely integrates downtime cost modeling with human impact assessments — quantifying the real cost of equipment failure.',
    accent: '#F59E0B',
    accentGrad: 'linear-gradient(90deg,#F59E0B,#EF4444)',
    bgWord: 'GEAR',
    tags: [
      { t: 'Asset Tracking', c: 'gold' }, { t: 'Cost Modeling', c: 'orange' },
      { t: 'Prototype', c: 'muted' }
    ],
    flagship: false,
    status: { label: 'Prototype', dot: '#F59E0B', text: 'rgba(245,158,11,0.85)', border: 'rgba(245,158,11,0.3)' },
    github: 'https://github.com/angelina-2206/Gear-Guard',
    live: null,
  },
  {
    num: '04', title: 'Formula Decoded',
    subtitle: '3D Engineering · 2026 Regulations · Aerodynamics',
    desc: 'Interactive 3D platform exploring F1 engineering, aerodynamics, and 2026 hybrid power units. Visualizing the next generation of motorsport physics through immersive web technologies.',
    accent: '#EC4899',
    accentGrad: 'linear-gradient(90deg,#EC4899,#8B5CF6)',
    bgWord: 'FORMULA',
    tags: [
      { t: 'Three.js', c: 'purple' }, { t: 'React Three Fiber', c: 'purple' },
      { t: 'GSAP', c: 'muted' }
    ],
    flagship: false,
    status: { label: 'In Progress', dot: '#EC4899', text: 'rgba(236,72,153,0.85)', border: 'rgba(236,72,153,0.3)' },
    github: 'https://github.com/angelina-2206/Formula-Decoded',
    live: null,
  },
  {
    num: '05', title: 'OrbitOps GCS',
    subtitle: 'Aerospace · Ground Control Station · Telemetry',
    desc: 'High-reliability Ground Control Station for CanSat & CubeSat missions. Features real-time high-frequency telemetry ingestion, 3D WebGL orientation visualization, GIS flight trajectory tracking, and Web Serial API hardware links.',
    accent: '#38BDF8',
    accentGrad: 'linear-gradient(90deg,#38BDF8,#8B5CF6)',
    bgWord: 'ORBITOPS',
    tags: [
      { t: 'Space Tech', c: 'teal' }, { t: 'Three.js / WebGL', c: 'purple' },
      { t: 'Web Serial API', c: 'gold' }
    ],
    flagship: false,
    status: { label: 'Deployed', dot: '#38BDF8', text: 'rgba(56,189,248,0.85)', border: 'rgba(56,189,248,0.3)' },
    github: 'https://github.com/angelina-2206/OrbitOps',
    live: null,
  },
  {
    num: '06', title: 'What If Wizard',
    subtitle: 'GenAI · Legal Scenarios · Google Cloud',
    desc: 'Simulates "what-if" legal scenarios using generative AI. Built at Google Cloud × Hack2skill — lets users explore possible legal outcomes interactively, making legal reasoning human.',
    accent: '#FF6B35',
    accentGrad: 'linear-gradient(90deg,#FF6B35,#8B5CF6)',
    bgWord: 'WIZARD',
    tags: [
      { t: 'Google Cloud', c: 'gold' }, { t: 'Generative AI', c: 'orange' },
      { t: 'FastAPI', c: 'muted' }
    ],
    flagship: false,
    status: { label: 'Deployed', dot: '#00D2BE', text: 'rgba(0,210,190,0.85)', border: 'rgba(0,210,190,0.3)' },
    github: 'https://github.com/angelina-2206/What-If-Wizard',
    live: null,
  },
  {
    num: '07', title: 'PostPehchaan',
    subtitle: 'Digital Identity · Offline-First Platform',
    desc: 'Secure identity verification for low-connectivity environments. Offline-first mobile app with real-time dashboard, AI trust scoring, multilingual voice interface + blockchain audit trails.',
    accent: '#00D2BE',
    accentGrad: 'linear-gradient(90deg,#00D2BE,#7B68EE)',
    bgWord: 'IDENTITY',
    tags: [
      { t: 'Top 8 · India Post', c: 'gold' }, { t: 'Blockchain', c: 'teal' },
      { t: 'React Native', c: 'muted' }
    ],
    flagship: false,
    status: { label: 'Awarded', dot: '#FFD700', text: 'rgba(255,215,0,0.85)', border: 'rgba(255,215,0,0.3)' },
    github: 'https://github.com/angelina-2206/postpehchaan',
    live: null,
  },
]

const TAG_COLORS = {
  purple: { border: 'rgba(139,92,246,0.45)', color: 'rgba(139,92,246,0.9)' },
  gold:   { border: 'rgba(255,215,0,0.45)',  color: 'rgba(255,215,0,0.9)'  },
  teal:   { border: 'rgba(0,210,190,0.4)',   color: 'rgba(0,210,190,0.85)' },
  red:    { border: 'rgba(225,6,0,0.4)',     color: 'rgba(225,6,0,0.9)'    },
  green:  { border: 'rgba(46,204,113,0.4)',  color: 'rgba(46,204,113,0.85)'},
  orange: { border: 'rgba(255,107,53,0.4)',  color: 'rgba(255,107,53,0.85)'},
  muted:  { border: 'rgba(255,255,255,0.15)',color: 'rgba(255,255,255,0.45)'},
}

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [anim, setAnim] = useState('') // 'enter' | 'leave-left' | 'leave-right'
  const [displayed, setDisplayed] = useState(0)
  const animating = useRef(false)
  const cardRef = useRef(null)
  const touchStart = useRef(0)

  const p = PROJECTS[displayed]

  const navigate = useCallback((dir) => {
    if (animating.current) return
    const next = current + dir
    if (next < 0 || next >= PROJECTS.length) return
    animating.current = true
    setAnim(dir > 0 ? 'leave-left' : 'leave-right')
    setTimeout(() => {
      setDisplayed(next)
      setCurrent(next)
      setAnim('enter')
      setTimeout(() => {
        setAnim('')
        animating.current = false
      }, 500)
    }, 320)
  }, [current])

  const goTo = useCallback((i) => {
    if (animating.current || i === current) return
    navigate(i > current ? 1 : -1)
    // override next index directly
    animating.current = true
    setAnim(i > current ? 'leave-left' : 'leave-right')
    setTimeout(() => {
      setDisplayed(i)
      setCurrent(i)
      setAnim('enter')
      setTimeout(() => { setAnim(''); animating.current = false }, 500)
    }, 320)
  }, [current])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const animStyle = anim === 'enter'
    ? { animation: 'projCardIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }
    : anim === 'leave-left'
    ? { animation: 'projCardOutLeft 0.32s cubic-bezier(0.4,0,1,1) forwards' }
    : anim === 'leave-right'
    ? { animation: 'projCardOutRight 0.32s cubic-bezier(0.4,0,1,1) forwards' }
    : {}

  return (
    <section id="projects" className="obs-section bg-dark" style={{ position: 'relative', overflow: 'hidden', padding: '60px 48px' }}>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes projCardIn {
          from { opacity:0; transform:translateY(36px) scale(0.96) }
          to   { opacity:1; transform:translateY(0)    scale(1)    }
        }
        @keyframes projCardOutLeft {
          from { opacity:1; transform:translateX(0)    scale(1)    }
          to   { opacity:0; transform:translateX(-56px) scale(0.94) }
        }
        @keyframes projCardOutRight {
          from { opacity:1; transform:translateX(0)   scale(1)    }
          to   { opacity:0; transform:translateX(56px) scale(0.94) }
        }
        .proj-nav-btn:hover { background: rgba(255,255,255,0.06) !important; transform: scale(1.06) !important; }
        .proj-nav-btn:active { transform: scale(0.94) !important; }
        .proj-nav-btn:disabled { opacity: 0.2 !important; cursor: not-allowed !important; transform: none !important; }
        .proj-view-btn:hover { opacity: 1 !important; }
        .proj-gh-btn:hover { opacity: 1 !important; background: rgba(255,255,255,0.06) !important; }
        .proj-pdot:hover { background: rgba(139,92,246,0.5) !important; }
        .proj-card-wrap:hover { transform: translateY(-6px) rotateX(2deg) !important; }
        .proj-explore:hover { color: rgba(139,92,246,0.9) !important; }
      `}</style>

      {/* Ghost background word */}
      <div className="ghost-text-bg" style={{
        position: 'absolute', top: '50%', left: '-1.5rem',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(6rem,20vw,16rem)', fontWeight: 900,
        color: `rgba(${hexToRgb(p.accent)},0.035)`,
        letterSpacing: '-0.06em', lineHeight: 1,
        pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 0,
        fontFamily: 'var(--font-display)',
        transition: 'color 0.7s cubic-bezier(0.16,1,0.3,1)',
        userSelect: 'none',
      }}>
        {p.bgWord}
      </div>

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2, marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 20, height: 1, background: p.accent, transition: 'background 0.4s' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${p.accent}99`, transition: 'color 0.4s' }}>
              002 — The Constructs
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.08em', lineHeight: 1.6, color: 'rgba(240,238,246,0.3)', maxWidth: 240 }}>
            These items are formed within<br />the experiences themselves.
          </p>
        </div>
        <p className="hide-mobile" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.08em', lineHeight: 1.6, color: 'rgba(240,238,246,0.3)', textAlign: 'right', maxWidth: 220 }}>
          Each originates on site. Shaped<br />by logic, process, and purpose.
        </p>
      </div>

      {/* Card stage */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 420, perspective: 1200 }}>
        <div style={{ position: 'relative', width: 'min(540px,92%)' }}>
          <div
            ref={cardRef}
            className="proj-card-wrap"
            style={{
              background: '#141414',
              border: `0.5px solid ${p.accent}44`,
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s',
              boxShadow: `0 0 40px ${p.accent}11`,
              cursor: 'default',
              ...animStyle,
            }}
            onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - touchStart.current
              if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1)
            }}
          >
            {/* Accent top bar */}
            <div style={{ height: 3, background: p.accentGrad, width: '100%', transition: 'background 0.4s' }} />

            <div style={{ padding: '2rem 2rem 1.5rem' }}>
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem,7vw,5rem)',
                  fontWeight: 900, lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: p.accent, opacity: 0.14,
                  transition: 'color 0.4s',
                }}>
                  {p.num}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  {p.flagship && (
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em',
                      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                      background: 'rgba(139,92,246,0.12)', border: '0.5px solid rgba(139,92,246,0.35)',
                      color: 'rgba(139,92,246,0.9)',
                    }}>
                      Flagship Mission
                    </div>
                  )}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em',
                    textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100,
                    border: `0.5px solid ${p.status.border}`, color: p.status.text,
                    transition: 'all 0.4s',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.status.dot, flexShrink: 0 }} />
                    {p.status.label}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: 'clamp(1.4rem,4vw,2.2rem)', fontWeight: 900, color: '#F0EEF6', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem', wordBreak: 'break-word' }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', opacity: 0.4, marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {p.subtitle}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(240,238,246,0.55)', lineHeight: 1.75 }}>
                  {p.desc}
                </p>
              </div>

              {/* Card footer — tags + buttons */}
              <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {p.tags.map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, padding: '3px 9px',
                      borderRadius: 100, letterSpacing: '0.08em', whiteSpace: 'nowrap',
                      border: `0.5px solid ${TAG_COLORS[tag.c].border}`,
                      color: TAG_COLORS[tag.c].color,
                    }}>
                      {tag.t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* GitHub button */}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-gh-btn"
                    onClick={e => { e.stopPropagation(); trackGitHubClick(p.title) }}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em',
                      textTransform: 'uppercase', padding: '6px 12px', borderRadius: 100,
                      border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)',
                      background: 'transparent', textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'all 0.2s', opacity: 0.7,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                  </a>

                  {/* View / Live button — falls back to GitHub if no live URL */}
                  <button
                    className="proj-view-btn"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em',
                      textTransform: 'uppercase', padding: '6px 14px', borderRadius: 100,
                      border: `0.5px solid ${p.accent}55`, color: p.accent,
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'all 0.2s', opacity: 0.8,
                    }}
                    onClick={() => {
                      const url = p.live || p.github
                      trackProjectDemoClick(p.title, url)
                      window.open(url, '_blank')
                    }}
                    title={p.live ? 'View live demo' : 'View on GitHub'}
                  >
                    {p.live ? 'Live' : 'Repo'} <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav row */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            className="proj-nav-btn"
            disabled={current === 0}
            onClick={() => navigate(-1)}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              border: '0.5px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.03)', color: '#F0EEF6', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none', transition: 'all 0.2s',
            }}
          >←</button>
          <button
            className="proj-nav-btn"
            disabled={current === PROJECTS.length - 1}
            onClick={() => navigate(1)}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              border: '0.5px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.03)', color: '#F0EEF6', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none', transition: 'all 0.2s',
            }}
          >→</button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                className="proj-pdot"
                onClick={() => goTo(i)}
                style={{
                  height: 4, borderRadius: 2, cursor: 'none',
                  background: i === current ? p.accent : 'rgba(255,255,255,0.12)',
                  width: i === current ? 28 : 7,
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Counter */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem,3.5vw,2rem)',
          fontWeight: 900, letterSpacing: '-0.04em',
          color: `${p.accent}66`, transition: 'color 0.4s',
        }}>
          {current + 1}<span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.6em' }}>/{PROJECTS.length}</span>
        </div>
      </div>

      {/* Bottom labels */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase', zIndex: 2 }}>
        | Assembly Protocol |
      </div>
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-explore"
        style={{
          position: 'absolute', bottom: '1.5rem', right: '2rem',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: `${p.accent}66`, letterSpacing: '0.15em',
          textTransform: 'uppercase', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: 5,
          textDecoration: 'none', transition: 'color 0.2s',
        }}
      >
        Explore Commits ↗
      </a>

    </section>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
