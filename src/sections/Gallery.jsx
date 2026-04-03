import { useState } from 'react'

const images = [
  { id: 1, title: 'THE VAULT', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { id: 2, title: 'INNER SANCTUM', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2340&auto=format&fit=crop' },
  { id: 3, title: 'STRUCTURAL LOGIC', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2338&auto=format&fit=crop' }
]

export default function Gallery() {
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  // Obsidian style: image takes up almost full viewport, big UI overlaid
  return (
    <section id="gallery" className="obs-section bg-dark" style={{ padding: 0 }}>
      
      {/* Background Dark Container */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-void)', zIndex: 0 }} />

      {/* Main Image Viewport */}
      <div 
        className="tactile-card float-anim"
        style={{
          width: '90vw', height: '85vh', position: 'relative', zIndex: 2,
          borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={() => setModalOpen(true)}
      >
        {/* Placeholder gradient / Actual Image goes here. Using a generated gradient for now until user uploads images */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, #111 0%, #2a1b4d 100%)`, // Placeholder visually
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'all 0.8s ease'
        }} />
        
        {/* Dark overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />

        {/* Overlaid Title */}
        <h3 style={{
          position: 'absolute', bottom: '60px', left: '60px',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'white', zIndex: 10, letterSpacing: '-0.02em'
        }}>
          {images[active].title}
        </h3>

        {/* Hover affordance */}
        <span style={{
          position: 'absolute', bottom: '30px', left: '60px',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em',
          color: 'var(--color-primary-light)', textTransform: 'uppercase'
        }}>
          [ CLICK TO ENLARGE ]
        </span>
      </div>

      {/* External Controls overlaying the bottom/center */}
      <div style={{
        position: 'absolute', bottom: '5vh', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '40px', zIndex: 10
      }}>
        <button 
          className="arrow-btn" 
          onClick={(e) => { e.stopPropagation(); setActive(p => p === 0 ? images.length - 1 : p - 1); }}
        >←</button>
        
        <span className="fraction-counter" style={{ color: 'white', opacity: 0.5, fontSize: '2rem' }}>
          {active + 1}/{images.length}
        </span>
        
        <button 
          className="arrow-btn" 
          onClick={(e) => { e.stopPropagation(); setActive(p => (p + 1) % images.length); }}
        >→</button>
      </div>

      {/* Enlarged Modal (Lightbox) */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.98)', zIndex: 100000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer' // Click anywhere to close
        }} onClick={() => setModalOpen(false)}>
          
          <div style={{ position: 'absolute', top: '40px', right: '40px', color: 'white', fontFamily: 'var(--font-mono)' }}>
            [ CLOSE ]
          </div>

          <div style={{
            width: '90vw', height: '90vh', background: 'linear-gradient(135deg, #2a1b4d 0%, #111 100%)',
            borderRadius: '8px', boxShadow: '0 0 100px rgba(139,92,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'scale(1)', animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--color-lavender)', opacity: 0.3 }}>
              IMAGE CONTAINER<br/>{images[active].title}
            </h2>
          </div>
          <style>{`
            @keyframes popIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}

    </section>
  )
}
