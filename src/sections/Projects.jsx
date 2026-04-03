import { useState } from 'react'

const projects = [
  {
    code: '01',
    name: 'Burnout Sentinel',
    desc: 'AI Mental Health & Burnout Detection Platform. Built to analyze patterns before they break.',
  },
  {
    code: '02',
    name: 'PostPehchaan',
    desc: 'India Post Mail Automation and Recognition. Precision at national scale.',
  },
  {
    code: '03',
    name: 'TrapEye',
    desc: 'AI Surveillance & Intrusion Detection. An eye that never closes.',
  },
  {
    code: '04',
    name: 'EcoPulse',
    desc: 'Environmental Data Dashboard. Mapping the physical to the digital.',
  }
]

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section id="projects" className="obs-section bg-light">
      <div className="obs-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Label */}
        <div className="obs-label reveal-up" style={{ color: 'var(--color-primary-dim)' }}>
          002 — THE CONSTRUCTS
        </div>

        {/* Flanked layout for title and text */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end', marginBottom: '60px' }}>
          <div>
            <p className="flank-text reveal-up" style={{ color: '#555', marginBottom: '20px' }}>
              THESE ITEMS ARE FORMED WITHIN<br/>THE EXPERIENCES THEMSELVES.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="flank-text reveal-up" style={{ color: '#555', marginBottom: '20px' }}>
              EACH ORIGINATES ON SITE, SHAPED<br/>BY LOGIC, PROCESS, AND PURPOSE.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          
          {/* Left Title Half */}
          <h2 className="display-massive reveal-up" style={{ position: 'absolute', left: 0, zIndex: 1, letterSpacing: '-0.05em' }}>
            Origin
          </h2>

          {/* Center Interactive Object area */}
          <div className="reveal-up" style={{
            width: '32vw', height: '45vh', minWidth: '280px', minHeight: '360px',
            background: 'white', borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.05)',
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden', cursor: 'none'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-warm)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--color-primary-dim)', opacity: 0.2 }}>
                {projects[activeIdx].code}
              </span>
            </div>
            <div style={{ padding: '24px', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#111' }}>
                (V) {projects[activeIdx].name}
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', lineHeight: 1.6 }}>
                {projects[activeIdx].desc}
              </p>
            </div>

            {/* Click zones for next/prev */}
            <div 
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%' }}
              onClick={() => setActiveIdx(p => p === 0 ? projects.length - 1 : p - 1)}
            />
            <div 
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%' }}
              onClick={() => setActiveIdx(p => (p + 1) % projects.length)}
            />
          </div>

          {/* Right Title Half */}
          <h2 className="display-massive reveal-up" style={{ position: 'absolute', right: 0, zIndex: 1, letterSpacing: '-0.05em' }}>
            Objects
          </h2>

        </div>

        {/* Counter & Controls below */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
          <button className="pill-btn" style={{ borderColor: 'var(--color-primary-dim)', color: 'var(--color-primary-dim)' }}>
            EXPLORE COMMITS
          </button>
          <div className="fraction-counter reveal-up" style={{ color: 'var(--color-primary-dim)' }}>
            {activeIdx + 1}/{projects.length}
          </div>
        </div>

      </div>
    </section>
  )
}
