import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Subtle parallax effect on mouse move for the central elements
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 40
      const y = (clientY / window.innerHeight - 0.5) * 40
      
      gsap.to('.hero-bg-core', { x: x, y: y, duration: 1.5, ease: 'power2.out' })
      gsap.to('.hero-title-left', { x: -x*0.5, y: -y*0.5, duration: 1.5, ease: 'power2.out' })
      gsap.to('.hero-title-right', { x: -x*0.5, y: -y*0.5, duration: 1.5, ease: 'power2.out' })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="hero" className="obs-section bg-dark" ref={containerRef} style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
      
      {/* Central Visual Focus (Inspired by Leclerc's cinematic video center) */}
      <div 
        className="hero-bg-core float-anim" 
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.3) 0%, rgba(5,5,5,1) 70%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {/* Placeholder for future portrait or video / Currently a sleek 3D architectural orb */}
        <div style={{
          width: '45vh', height: '60vh', borderRadius: '240px',
          background: 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0) 100%)',
          boxShadow: 'inset 0px 40px 100px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.2)',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)'
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.5
      }} />

      <div className="obs-inner" style={{ position: 'relative', height: '100%', width: '100%', maxWidth: 'none', zIndex: 10 }}>
        
        {/* Giant Vertical Title Left */}
        <motion.div 
          className="hero-title-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', left: '-2%', top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--font-display)', fontSize: 'clamp(10rem, 25vw, 22rem)',
            fontWeight: 800, color: 'white', lineHeight: 0.8, letterSpacing: '-0.06em',
            textTransform: 'uppercase', writingMode: 'vertical-rl', textOrientation: 'mixed',
            opacity: 0.9, textShadow: '20px 20px 60px rgba(0,0,0,0.8)'
          }}
        >
          ANGELINA
        </motion.div>

        {/* Giant Vertical Title Right */}
        <motion.div 
          className="hero-title-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%) rotate(180deg)',
            fontFamily: 'var(--font-display)', fontSize: 'clamp(10rem, 25vw, 22rem)',
            fontWeight: 800, color: 'white', lineHeight: 0.8, letterSpacing: '-0.06em',
            textTransform: 'uppercase', writingMode: 'vertical-rl', textOrientation: 'mixed',
            opacity: 0.9, textShadow: '20px 20px 60px rgba(0,0,0,0.8)'
          }}
        >
          CHATTERJEE
        </motion.div>

        {/* Bottom CTA / SCROLL TO EXPLORE inspired by Leclerc */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ 
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            SCROLL TO EXPLORE
          </span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--color-primary-light), transparent)' }} />
        </motion.div>

      </div>
    </section>
  )
}
