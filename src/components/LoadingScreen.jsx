import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2500
    const steps = 100
    const step = duration / steps
    let current = 0

    const interval = setInterval(() => {
      current += 1
      // Non-linear easing — fast at start, pause at 73, fast finish
      let display = current
      if (current > 60 && current < 75) {
        display = 60 + Math.floor((current - 60) * 0.6)
      }
      setCount(Math.min(display, 100))

      if (current >= steps) {
        clearInterval(interval)
        setTimeout(onComplete, 400)
      }
    }, step)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="loading-counter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: count >= 100 ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
        >
          {String(count).padStart(3, '0')}
        </motion.div>
        <div className="loading-label">INITIALIZING</div>
        <div className="loading-bar">
          <div className="loading-bar-fill" style={{ width: `${count}%` }} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
