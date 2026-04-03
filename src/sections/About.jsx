export default function About() {
  return (
    <section id="about" className="obs-section bg-deep">
      <div className="obs-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 0' }}>
        
        {/* Top Label */}
        <div className="obs-label reveal-up">001 — THE MAKER</div>

        {/* Massive Display Title */}
        <h2 className="display-large reveal-up" style={{ marginBottom: '60px', color: 'var(--color-text-primary)' }}>
          Explore
          <br/>
          <span style={{ color: 'var(--color-lavender)', fontStyle: 'italic' }}>Origins</span>
        </h2>

        {/* Flanked Layout matching Obsidian's image carousel style */}
        <div className="flanked-layout" style={{ flex: 1, height: '60vh' }}>
          
          {/* Left Flank */}
          <div style={{ alignSelf: 'flex-end', paddingBottom: '40px' }}>
            <p className="flank-text reveal-up" style={{ position: 'relative', paddingLeft: '20px' }}>
              <span style={{ position: 'absolute', left: 0, top: '4px', width: '1px', height: '100%', background: 'var(--color-primary)' }} />
              I am Angelina Chatterjee — a full stack developer and AI builder pursuing Computer Science (Business Systems).
              <br/><br/>
              Every system starts with a question:<br/>
              "What's broken, and how do I fix it?"
            </p>
          </div>

          {/* Center Image/Object Box */}
          <div className="reveal-up" style={{
            width: '100%', height: '100%', position: 'relative',
            borderRadius: '16px', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(139,92,246,0.02))',
            border: '1px solid rgba(139,92,246,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {/* The "Inner Chamber" style text overlaid on image */}
            <div style={{
              position: 'absolute', bottom: '30px', left: '30px',
              fontFamily: 'var(--font-display)', fontSize: '2rem',
              color: 'var(--color-text-primary)', zIndex: 10
            }}>
              Inner Space
            </div>

            {/* Simulated arrows */}
            <div style={{ position: 'absolute', bottom: '30px', right: '30px', display: 'flex', gap: '12px', zIndex: 10 }}>
              <button className="arrow-btn">←</button>
              <button className="arrow-btn">→</button>
            </div>

            {/* Index counter overlaid */}
            <div className="fraction-counter" style={{ position: 'absolute', bottom: '30px', right: '160px', zIndex: 10 }}>
              1/4
            </div>

            {/* Glowing orb inside */}
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
              filter: 'blur(20px)', opacity: 0.6
            }} />
          </div>

          {/* Right Flank */}
          <div style={{ alignSelf: 'flex-start', paddingTop: '40px' }}>
            <p className="flank-text reveal-up">
              My work sits at the intersection of engineering precision and creative thinking.
              <br/><br/>
              I move fast, learn faster, and document eventually. If it can be optimized, I've already started.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
