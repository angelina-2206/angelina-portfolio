import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const subtitles = [
  'Full Stack Developer',
  'AI Builder',
  'Data-Driven Thinker',
  'Still Debugging.',
]

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const nameRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const current = subtitles[subtitleIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1))
        }, 60)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1))
        }, 30)
      } else {
        setIsDeleting(false)
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, subtitleIndex])

  const nameChars = 'ANGELINA CHATTERJEE'.split('')

  return (
    <section data-section="hero" className="section" id="hero" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* F1 Grid Background */}
      <div className="grid-bg" />

      {/* Decorative corner brackets */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '40px',
        width: '40px',
        height: '40px',
        borderTop: '1px solid rgba(225, 6, 0, 0.3)',
        borderLeft: '1px solid rgba(225, 6, 0, 0.3)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
        width: '40px',
        height: '40px',
        borderBottom: '1px solid rgba(225, 6, 0, 0.3)',
        borderRight: '1px solid rgba(225, 6, 0, 0.3)',
      }} />

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        {/* Sector Tag */}
        <motion.div
          className="section-tag"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          SECTOR 01 — IDENTIFICATION
        </motion.div>

        {/* Name — letter-by-letter stagger */}
        <h1 ref={nameRef} style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}>
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + i * 0.04, 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: 'var(--color-text-secondary)',
            marginBottom: '48px',
            letterSpacing: '0.1em',
            height: '2em',
          }}
        >
          {'> '}{displayText}
          <span style={{ 
            animation: 'blink 1s step-end infinite',
            color: 'var(--color-ferrari)',
            fontWeight: 700,
          }}>_</span>
          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="pill-btn">
            VIEW_PROJECTS
          </a>
          <a href="https://github.com/angelina-2206" target="_blank" rel="noopener noreferrer" className="pill-btn" style={{ borderColor: 'var(--color-text-dim)' }}>
            GITHUB
          </a>
          <a href="#contact" className="pill-btn" style={{ borderColor: 'var(--color-text-dim)' }}>
            CONTACT
          </a>
        </motion.div>
      </div>

      {/* "SCROLL TO DEPLOY" vertical text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '20px',
          writingMode: 'vertical-lr',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'var(--color-ferrari)',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '0.5rem' }}
        >
          ▼
        </motion.div>
        SCROLL TO DEPLOY
      </motion.div>

      {/* Red accent line bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
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
    </section>
  )
}
