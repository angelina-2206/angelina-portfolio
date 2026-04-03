export default function Contact() {
  return (
    <section id="contact" className="obs-section bg-void" style={{ background: 'var(--color-void)' }}>
      <div className="obs-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="display-massive reveal-up" style={{ color: 'var(--color-warm)' }}>
            Imagine
            <br/>
            <span style={{ fontStyle: 'italic', color: 'var(--color-lavender)' }}>Possible</span>
          </h2>
          
          <div className="obs-divider reveal-up" style={{ margin: '40px auto 30px' }} />
          
          <p className="flank-text reveal-up" style={{ textAlign: 'center' }}>
            A PRIVATE ASSEMBLY FOR MAKERS
            <br/><br/>
            ACCEPTING NEW COMMITS
          </p>
        </div>

        <div className="reveal-up" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="mailto:contact@angelinachatterjee.com" className="pill-btn" style={{ borderColor: 'var(--color-primary-light)', color: 'var(--color-primary-light)' }}>
            SEND REQUEST
          </a>
          <a href="https://github.com/angelina-2206" target="_blank" rel="noreferrer" className="pill-btn" style={{ opacity: 0.4 }}>
            GITHUB
          </a>
          <a href="#" className="pill-btn" style={{ opacity: 0.4 }}>
            LINKEDIN
          </a>
        </div>

        {/* Fine print */}
        <div className="reveal-up" style={{
          position: 'absolute', bottom: '40px', left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          letterSpacing: '0.2em', opacity: 0.3, textTransform: 'uppercase'
        }}>
          <span>© 2025 ANGELINA CHATTERJEE</span>
          <span>THE OBSIDIAN ARCHITECTURE</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </section>
  )
}
