import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const achievements = [
  { label: 'HACKATHONS WON', value: '04' },
  { label: 'SYSTEMS DEPLOYED', value: '12' },
  { label: 'LINES OF CODE', value: '1.2M+' },
  { label: 'PROJECTS LED', value: '07' }
]

export default function Achievements() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Horizontal parallax effect for the giant background text overlay
  const xTransform = useTransform(scrollYProgress, [0, 1], [100, -300])

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stat-revealed')
        }
      })
    }, { threshold: 0.2 })
    
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" ref={containerRef} className="obs-section bg-dark" style={{ padding: '150px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Watermark Text (Leclerc Style) */}
      <motion.div 
        style={{
          position: 'absolute', top: '50%', left: 0, 
          whiteSpace: 'nowrap', zIndex: 0, x: xTransform,
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 25rem)',
          fontWeight: 800, color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.03)',
          pointerEvents: 'none', transform: 'translateY(-50%)',
          lineHeight: 1
        }}
      >
        METRICS METRICS METRICS
      </motion.div>

      <div className="obs-inner" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '30px', marginBottom: '80px' }}>
          <div className="reveal-up" style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff4400' 
          }}>
            [ 003 — PERFORMANCE METRICS ]
          </div>
          <div className="reveal-up" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textAlign: 'right'
          }}>
            CAREER / OVERVIEW
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          
          {achievements.map((item, idx) => (
            <div 
              key={idx} 
              className="stat-item" 
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '50px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
                transitionDelay: `${idx * 0.1}s`, position: 'relative', group: 'true'
              }}
            >
              {/* Overlay hover effect */}
              <div className="hover-bg" style={{
                position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,68,0,0) 0%, rgba(255,68,0,0.05) 50%, rgba(255,68,0,0) 100%)',
                opacity: 0, transition: 'opacity 0.4s ease', zIndex: -1, pointerEvents: 'none'
              }} />

              <div style={{ 
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', 
                fontWeight: 600, color: 'white', letterSpacing: '0.02em', textTransform: 'uppercase',
                flex: 1
              }}>
                <span style={{ color: '#ff4400', fontSize: '0.4em', verticalAlign: 'top', marginRight: '20px' }}>0{idx + 1}</span>
                {item.label}
              </div>
              <div style={{ 
                fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 10vw, 8rem)', 
                fontWeight: 800, color: '#ff4400', lineHeight: 0.9, letterSpacing: '-0.04em',
                textAlign: 'right'
              }}>
                {item.value}
              </div>
            </div>
          ))}

        </div>
      </div>

      <style>{`
        .stat-item {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-item:hover .hover-bg {
          opacity: 1;
        }
        .stat-item.stat-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
