import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '../context/SoundContext'

export default function LoadingScreen({ onComplete }) {
  const { playBassHit } = useSound()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const duration = 2400
    const interval = 20
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const p = Math.floor((current / steps) * 100)
      setPercent(p)

      if (current >= steps) {
        clearInterval(timer)
        playBassHit()
        setTimeout(onComplete, 800)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete, playBassHit])

  const containerVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    }
  }

  const textVariants = {
    initial: { x: '100%' },
    animate: { 
      x: '-100%',
      transition: {
        duration: 5,
        ease: 'linear',
        repeat: Infinity
      }
    }
  }

  const revealVariants = {
    initial: { y: '100%' },
    animate: { 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <motion.div
      className="loading-screen"
      variants={containerVariants}
      exit="exit"
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        background: '#050505', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', overflow: 'hidden'
      }}
    >
      {/* Background massive text sliding around */}
      <div style={{ position: 'absolute', top: '15%', left: 0, right: 0, opacity: 0.05, pointerEvents: 'none' }}>
        <motion.h2 
          variants={textVariants}
          initial="initial"
          animate="animate"
          style={{ 
            fontSize: '25vw', fontFamily: 'var(--font-display)', 
            fontWeight: 900, whiteSpace: 'nowrap', color: 'white' 
          }}
        >
          ANGELINA CHATTERJEE ANGELINA CHATTERJEE
        </motion.h2>
      </div>

      <div className="obs-inner" style={{ position: 'relative', zIndex: 2, padding: '0 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <div style={{ overflow: 'hidden' }}>
            <motion.div variants={revealVariants} initial="initial" animate="animate">
              <span style={{ 
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', 
                letterSpacing: '0.4em', color: 'var(--color-primary-light)', opacity: 0.8
              }}>
                PORTFOLIO — 2026
              </span>
            </motion.div>
          </div>

          <div style={{ overflow: 'hidden', marginTop: '-10px' }}>
            <motion.div 
              variants={revealVariants} 
              initial="initial" 
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <h1 style={{ 
                fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 12vw, 10rem)', 
                fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'white'
              }}>
                ANGELINA <br/> CHATTERJEE
              </h1>
            </motion.div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
             <div style={{ width: '40%', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  style={{ height: '100%', background: 'var(--color-primary)', position: 'absolute', left: 0, top: 0 }}
                />
             </div>
             
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.3, letterSpacing: '0.2em' }}>SYSTEM LOAD</div>
                <div style={{ 
                  fontFamily: 'var(--font-display)', fontSize: '4rem', 
                  fontWeight: 300, color: 'white', lineHeight: 1 
                }}>
                  {percent}<span style={{ fontSize: '1.5rem', opacity: 0.5 }}>%</span>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Aesthetic decorative lines */}
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', opacity: 0.2 }}>
         <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>[ ASSEMBLY PROTOCOL ]</span>
         <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>X-RAY : LOADING...</span>
      </div>

    </motion.div>
  )
}
