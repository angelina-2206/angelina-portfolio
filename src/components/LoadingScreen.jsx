import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [activeLights, setActiveLights] = useState(0)
  const [phase, setPhase] = useState('countdown') // 'countdown' | 'go' | 'done'
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEMS')

  useEffect(() => {
    const texts = [
      'INITIALIZING SYSTEMS',
      'LOADING TELEMETRY',
      'CALIBRATING SENSORS',
      'SYSTEMS ONLINE',
    ]
    
    // Light 1
    const t1 = setTimeout(() => {
      setActiveLights(1)
      setLoadingText(texts[1])
    }, 600)
    
    // Light 2
    const t2 = setTimeout(() => {
      setActiveLights(2)
      setLoadingText(texts[2])
    }, 1200)
    
    // Light 3
    const t3 = setTimeout(() => {
      setActiveLights(3)
      setLoadingText(texts[3])
    }, 1800)
    
    // Light 4
    const t4 = setTimeout(() => {
      setActiveLights(4)
    }, 2400)
    
    // Light 5
    const t5 = setTimeout(() => {
      setActiveLights(5)
    }, 3000)
    
    // LIGHTS OUT
    const t6 = setTimeout(() => {
      setPhase('go')
      setLoadingText('LIGHTS OUT AND AWAY WE GO')
    }, 3600)
    
    // Complete
    const t7 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 4400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      clearTimeout(t7)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* F1 Grid Pattern */}
        <div className="grid-bg" style={{ opacity: 0.3 }} />

        {/* F1 Lights */}
        <div className="f1-lights">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`f1-light ${
                phase === 'go' ? 'go' : activeLights >= i ? 'active' : ''
              }`}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="loading-text"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.div>

        {/* Progress Bar */}
        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: phase === 'go' ? '#00D2BE' : '#E10600',
              borderRadius: '1px',
            }}
            initial={{ width: '0%' }}
            animate={{ width: phase === 'go' ? '100%' : `${(activeLights / 5) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
