import { useState, useEffect } from 'react'

const sectionLabels = {
  0: { lap: '01', sector: '01', status: 'ACTIVE' },
  1: { lap: '01', sector: '02', status: 'SUBJECT FILE: 001' },
  2: { lap: '01', sector: '03', status: 'TECHNICAL LOADOUT' },
  3: { lap: '02', sector: '01', status: 'MISSION LOG' },
  4: { lap: '02', sector: '02', status: 'HONOURS BOARD' },
  5: { lap: '02', sector: '03', status: 'GALLERY' },
  6: { lap: '03', sector: '01', status: 'INTEL SYSTEM' },
  7: { lap: '03', sector: '02', status: 'OPEN COMMS' },
}

export default function HudStrip({ currentSection }) {
  const labels = sectionLabels[currentSection] || sectionLabels[0]
  const [time, setTime] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Hide HUD strip when on hero section (it has its own nav)
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="hud-strip" style={{
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.4s ease',
    }}>
      <div className="hud-item">
        <div className="hud-dot" />
        <span>LAP {labels.lap}</span>
      </div>
      <div className="hud-item">
        <span>SECTOR {labels.sector}</span>
      </div>
      <div className="hud-item">
        <span>STATUS: {labels.status}</span>
      </div>
      <div className="hud-item" style={{ color: '#888880' }}>
        <span>{time}</span>
      </div>
    </div>
  )
}
