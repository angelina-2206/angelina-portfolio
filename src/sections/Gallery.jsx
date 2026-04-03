import { useState } from 'react'

const galleryImages = [
  { id: 'I', label: 'HACKATHON DEPLOYMENT', title: 'The Assembly' },
  { id: 'II', label: 'UI ARCHITECTURE', title: 'Structural Design' },
  { id: 'III', label: 'ALGORITHM FLOW', title: 'Data Processing' }
]

export default function Gallery() {
  const [active, setActive] = useState(0)

  return (
    <section id="gallery" className="obs-section bg-dark" style={{ padding: 0 }}>
      {/* Full bleed contained background to act like Obsidian's Vault */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, var(--color-void), #1a0a3e 50%, var(--color-void))',
        opacity: 0.8, zIndex: 0
      }} />

      <div className="obs-inner" style={{ height: '100%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Large overlay text similar to "The Vault" */}
        <h2 className="display-medium reveal-up" style={{
          position: 'absolute', left: '10%', top: '50%',
          transform: 'translateY(-50%)', zIndex: 10,
          color: 'var(--color-warm)'
        }}>
          The
          <br/>
          <span style={{ fontStyle: 'italic', color: 'var(--color-lavender)' }}>Vault</span>
        </h2>

        <div className="reveal-up tactile-card" style={{
          position: 'relative', width: '60vw', height: '60vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             {/* Huge background roman numeral */}
             <span style={{
               fontFamily: 'var(--font-display)', fontSize: '8rem',
               color: 'var(--color-primary)', opacity: 0.1, position: 'absolute'
             }}>
               {galleryImages[active].id}
             </span>
             
             {/* Actual title */}
             <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', zIndex: 2, letterSpacing: '-0.02em' }}>
               {galleryImages[active].title}
             </span>
          </div>

          <div style={{
            padding: '24px', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', borderTop: '1px solid rgba(139,92,246,0.1)'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.6 }}>
              {galleryImages[active].label}
            </span>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="arrow-btn" style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={() => setActive(p => p === 0 ? galleryImages.length - 1 : p - 1)}
              >←</button>
              <button 
                className="arrow-btn" style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={() => setActive(p => (p + 1) % galleryImages.length)}
              >→</button>
            </div>
          </div>
        </div>

        {/* Fraction Counter */}
        <div className="fraction-counter reveal-up" style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)' }}>
          {active + 1}/{galleryImages.length}
        </div>

      </div>
    </section>
  )
}
