import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '../context/SoundContext'

export default function ObsidianNav({ currentSection, onMenuToggle }) {
  const { isEnabled, toggleSound, playSoftClick } = useSound()
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#" className="obs-nav-logo">
          <img 
            src="/logo.svg" 
            alt="AC Logo" 
            style={{ width: '40px', height: 'auto', display: 'block' }} 
          />
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
        {/* Sound Toggle */}
        <button 
          onClick={toggleSound}
          onMouseEnter={playSoftClick}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            opacity: isEnabled ? 1 : 0.4,
            transition: 'opacity 0.3s'
          }}
          title={isEnabled ? "Mute" : "Unmute"}
        >
          {isEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
          )}
        </button>

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
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
             <line x1="3" y1="12" x2="21" y2="12" />
             <line x1="3" y1="6" x2="21" y2="6" />
             <line x1="3" y1="18" x2="21" y2="18" />
           </svg>
           <span style={{ fontSize: '0.55rem' }}>SYSTEM</span>
        </button>
      </div>
    </nav>
  )
}

