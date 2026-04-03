import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Subtle parallax on the orbital lines
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      
      gsap.to('.orbital-line-1', { x: x * 2, y: y * 2, duration: 2, ease: 'power2.out' })
      gsap.to('.orbital-line-2', { x: -x * 1.5, y: -y * 1.5, duration: 2, ease: 'power2.out' })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="hero" className="obs-section bg-dark" ref={containerRef}>
      {/* Decorative orbital lines */}
      <div className="orbital-line orbital-line-1" style={{ width: '80vw', height: '80vw', top: '-20%', right: '-10%', border: '1px solid rgba(139,92,246,0.2)' }} />
      <div className="orbital-line orbital-line-2" style={{ width: '60vw', height: '60vw', bottom: '-15%', left: '-5%', border: '1px solid rgba(139,92,246,0.1)' }} />

      <div className="obs-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Left-aligned small flanked text */}
        <div style={{ position: 'absolute', left: 0, top: '40%', transform: 'translateY(-50%)', maxWidth: '200px' }}>
          <p className="flank-text reveal-up">
            An Assembly of<br/>Algorithms & Design
          </p>
        </div>

        {/* Right-aligned small flanked text */}
        <div style={{ position: 'absolute', right: 0, top: '30%', transform: 'translateY(-50%)', textAlign: 'right', maxWidth: '200px' }}>
          <p className="flank-text reveal-up" style={{ transitionDelay: '0.2s' }}>
            Coordinates<br/>Withheld
          </p>
        </div>

        {/* Main Massive Title */}
        <div style={{ textAlign: 'center', zIndex: 10 }}>
          <motion.h1 
            className="display-massive"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ color: 'var(--color-warm)' }}
          >
            Nothing
            <br/>
            <span style={{ fontStyle: 'italic', paddingRight: '0.1em' }}>Built</span> First
          </motion.h1>
        </div>

        {/* Central visual piece (placeholder for Obsidian's dark crystal) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            position: 'absolute', left: '50%', top: '55%',
            transform: 'translate(-50%, -50%)', zIndex: 1,
            width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px',
            background: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15) 0%, transparent 60%)',
            borderRadius: '50%', filter: 'blur(40px)'
          }}
        />

        {/* Lower center subtext */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
              Commitment
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-lavender)' }}>
              Precedes
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
              Entry
            </span>
          </div>
          
          <div className="obs-divider" style={{ marginTop: '24px', height: '80px' }} />
        </motion.div>

      </div>
    </section>
  )
}
