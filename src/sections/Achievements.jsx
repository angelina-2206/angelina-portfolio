import { useEffect } from 'react'

const achievements = [
  { label: 'HACKATHONS WON', value: '4' },
  { label: 'SYSTEMS DEPLOYED', value: '12' },
  { label: 'LINES OF CODE', value: '1.2M' },
  { label: 'PROJECTS LED', value: '7' }
]

export default function Achievements() {

  useEffect(() => {
    // Scroll reveal observer similar to Leclerc's stats slide-up
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
    <section id="achievements" className="obs-section bg-deep" style={{ padding: '120px 40px', position: 'relative' }}>
      
      {/* Blueprint Grid background (Leclerc style technical background adapted to dark theme) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15,
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="obs-inner" style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="obs-label reveal-up" style={{ color: 'var(--color-primary-light)', marginBottom: '80px' }}>
          003 — PERFORMANCE METRICS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
          
          {achievements.map((item, idx) => (
            <div 
              key={idx} 
              className="stat-item" 
              style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(139,92,246,0.2)', transitionDelay: `${idx * 0.15}s` }}
            >
              <div style={{ 
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', 
                color: 'var(--color-lavender)', letterSpacing: '0.15em', 
                marginBottom: '16px' 
              }}>
                {item.label}
              </div>
              <div style={{ 
                fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 8vw, 6rem)', 
                fontWeight: 700, color: 'white', lineHeight: 0.9, letterSpacing: '-0.04em' 
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
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-item.stat-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
