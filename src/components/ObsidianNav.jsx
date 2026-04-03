import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ObsidianNav({ currentSection }) {
  const [theme, setTheme] = useState('nav-dark')

  useEffect(() => {
    // Check if the current section has bg-light class to invert nav colors
    const el = document.getElementById(currentSection)
    if (el && el.classList.contains('bg-light')) {
      setTheme('nav-light')
    } else {
      setTheme('nav-dark')
    }
  }, [currentSection])

  return (
    <nav className={`obs-nav ${theme}`}>
      {/* Top Left: Logo */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href="#" className="obs-nav-logo">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Angelina<br/>Chatterjee
          </span>
        </a>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', opacity: 0.5, marginTop: '4px' }}>
          Imagine Possible
        </span>
      </div>

      {/* Center Links (The 'Places/Objects' equivalent) */}
      <div className="obs-nav-links">
        <a href="#about" className={currentSection === 'about' ? 'active' : ''}>ABOUT</a>
        <a href="#projects" className={currentSection === 'projects' || currentSection === 'gallery' ? 'active' : ''}>PROJECTS</a>
      </div>

      {/* Top Right: CTA / Menu */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <a href="#contact" className="pill-btn" style={{ padding: '8px 24px', opacity: 1, border: 'none', background: 'rgba(139,92,246,0.1)' }}>
          SEND REQUEST
        </a>
        <button className="obs-nav-menu">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
             <line x1="4" y1="9" x2="20" y2="9" />
             <line x1="4" y1="15" x2="20" y2="15" />
           </svg>
           MENU
        </button>
      </div>
    </nav>
  )
}
