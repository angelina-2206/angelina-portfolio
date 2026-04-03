import { useEffect } from 'react'

export default function Quote() {

  useEffect(() => {
    // Setup intersection observer for the dramatic reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, { threshold: 0.3 })
    
    document.querySelectorAll('.quote-text').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="quote" className="obs-section bg-void" style={{ background: 'var(--color-void)', display: 'flex', alignItems: 'center', padding: '10%' }}>
      
      {/* Dynamic background effect akin to Leclerc's blurry parallax */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
        background: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)',
        filter: 'blur(50px)'
      }} />

      <div className="obs-inner" style={{ zIndex: 10, textAlign: 'center', width: '100%' }}>
        
        {/* Massive philosophical quote area */}
        <h2 
          className="quote-text display-massive" 
          style={{ 
            color: 'white', lineHeight: 0.85, 
            letterSpacing: '-0.04em', textTransform: 'uppercase',
            opacity: 0, transform: 'translateY(60px)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          [ INSERT YOUR
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--color-lavender)' }}>DRAMATIC</span>
          <br />
          QUOTE HERE ]
        </h2>

      </div>
    </section>
  )
}
