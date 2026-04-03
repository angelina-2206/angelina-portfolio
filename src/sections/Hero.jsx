import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Hero3DObject from '../components/Hero3DObject'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Subtle float effect on mouse move for the background text
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 40
      const y = (clientY / window.innerHeight - 0.5) * 40
      
      gsap.to('.hero-title-layer', { x: -x*0.5, y: -y*0.5, duration: 1.5, ease: 'power2.out' })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="hero" className="obs-section bg-dark" ref={containerRef} style={{ padding: 0, overflow: 'hidden', position: 'relative', backgroundColor: '#050505' }}>
      
      {/* Dark Purple Skeumorphic Ambient Gradient */}
      <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(157, 78, 221, 0.15) 0%, rgba(5,5,5,1) 80%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' // Inner shadow for skeumorphic depth
      }} />

      {/* Embossed Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        boxShadow: 'inset 0px 4px 10px rgba(0,0,0,0.5)'
      }} />

      <div className="obs-inner" style={{ position: 'relative', height: '100%', width: '100%', maxWidth: 'none', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Giant Skeuomorphic Background Typography */}
        <motion.div 
          className="hero-title-layer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: '100vw', textAlign: 'center', pointerEvents: 'none'
          }}
        >
          {['ANGELINA', 'CHATTERJEE', 'AI BUILDER'].map((text, idx) => (
             <div key={idx} style={{ 
              fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 12vw, 14rem)', 
              fontWeight: 800, color: '#ffffff', lineHeight: 0.85, letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              // High contrast shadow for pop
              textShadow: '0px 10px 30px rgba(157, 78, 221, 0.5), 0px 4px 10px rgba(0,0,0,0.8)'
            }}>
              {text}
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ 
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 10
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(157, 78, 221, 0.7)' }}>
            SCROLL FOR MORE
          </span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, rgba(157, 78, 221, 0.7), transparent)', boxShadow: '0 0 10px rgba(157, 78, 221, 0.3)' }} />
        </motion.div>

      </div>

      {/* 3D Glass Object overlaying the text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}>
        <Hero3DObject />
      </div>

    </section>
  )
}
