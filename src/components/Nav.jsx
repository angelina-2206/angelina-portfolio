import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '../context/SoundContext'

export default function ObsidianNav({ currentSection, onMenuToggle, isMenuOpen }) {
  const { playSoftClick } = useSound()
  const [theme, setTheme] = useState('nav-dark')

  useEffect(() => {
    // If menu is open, force dark theme for visibility
    if (isMenuOpen) {
      setTheme('nav-dark')
      return
    }

    const el = document.getElementById(currentSection)
    if (el && el.classList.contains('bg-light')) {
      setTheme('nav-light')
    } else {
      setTheme('nav-dark')
    }
  }, [currentSection, isMenuOpen])

  return (
    <nav className={`obs-nav ${theme}`}>
      {/* Top Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#" className="obs-nav-logo" style={{ display: 'block', transition: 'transform 0.3s ease' }}>
          <svg width="40" height="40" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>{`
              .obs-nav-logo:hover .orbit-circle {
                transform-origin: center;
                animation: rotate 8s linear infinite;
              }
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5B2EFF"/>
                <stop offset="60%" stopColor="#9B5CFF"/>
                <stop offset="85%" stopColor="#3DA9FC"/>
                <stop offset="100%" stopColor="#FFD166"/>
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle className="orbit-circle" cx="110" cy="110" r="72"
                    stroke="url(#purpleGrad)"
                    strokeWidth="1.8"
                    opacity="0.6"
                    fill="none"
                    filter="url(#glow)"/>
            <path d="M50 110 A60 60 0 0 1 170 110"
                  stroke="#9B5CFF"
                  strokeWidth="1.2"
                  strokeDasharray="8 10"
                  opacity="0.5"
                  fill="none"/>
            <circle cx="182" cy="110" r="4" fill="#9B5CFF" filter="url(#glow)"/>
            <path d="M110 50 L150 170 H132 L120 138 H100 L88 170 H70 L110 50 Z
                     M102 120 H118 L110 96 Z"
                  fill="url(#purpleGrad)"
                  filter="url(#glow)"/>
          </svg>
        </a>
      </div>

      {/* Center Links */}
      <div className="obs-nav-links">
        <a href="#about" className={currentSection === 'about' ? 'active' : ''} onMouseEnter={playSoftClick}>ABOUT</a>
        <a href="#projects" className={currentSection === 'projects' ? 'active' : ''} onMouseEnter={playSoftClick}>PROJECTS</a>
        <a href="#process" className={currentSection === 'process' ? 'active' : ''} onMouseEnter={playSoftClick}>PROCESS</a>
        <a href="#achievements" className={currentSection === 'achievements' ? 'active' : ''} onMouseEnter={playSoftClick}>ACHIEVEMENTS</a>
      </div>

      {/* Top Right: CTA / Menu */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-end' }}>


        <motion.a 
          href="#contact" 
          className="pill-btn h-btn hide-mobile"
          onMouseEnter={playSoftClick}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 35px rgba(139,92,246,0.6), inset 0 0 10px rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(139,92,246,0.2)'
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          style={{ 
            padding: '10px 24px', 
            opacity: 1, 
            border: '1px solid rgba(139,92,246,0.3)', 
            background: 'rgba(139,92,246,0.1)',
            minWidth: '220px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.05em',
            transition: 'border-color 0.3s, background-color 0.3s'
          }}
        >
          LET'S BUILD SOMETHING
        </motion.a>
        <button 
          className="obs-nav-menu" 
          onClick={onMenuToggle}
          style={{ 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'inherit',
            minWidth: '80px',
            justifyContent: 'flex-end'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'inherit';
          }}
        >
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
             {isMenuOpen ? (
               <>
                 <line x1="18" y1="6" x2="6" y2="18" />
                 <line x1="6" y1="6" x2="18" y2="18" />
               </>
             ) : (
               <>
                 <line x1="3" y1="12" x2="21" y2="12" />
                 <line x1="3" y1="6" x2="21" y2="6" />
                 <line x1="3" y1="18" x2="21" y2="18" />
               </>
             )}
           </svg>
           <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em' }}>
             {isMenuOpen ? 'CLOSE' : 'SYSTEM'}
           </span>
        </button>
      </div>
    </nav>
  )
}

