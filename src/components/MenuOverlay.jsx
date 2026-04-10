import { motion } from 'framer-motion'

export default function MenuOverlay({ isOpen, onClose }) {
  const menuVariants = {
    closed: {
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5
      }
    })
  }

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.div
      className="menu-overlay"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10%',
        willChange: 'transform'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.1em'
        }}
      >
        CLOSE
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={onClose}
            custom={i}
            variants={linkVariants}
            style={{
              fontSize: 'clamp(2rem, 7vw, 4.5rem)',
              fontFamily: 'var(--font-display)',
              color: 'white',
              textDecoration: 'none',
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}
            whileHover={{ x: 20, color: 'var(--accent-primary)' }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '10%',
        right: '10%',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-body)'
      }}>
        <div>© 2026 angelina chatterjee</div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>TWITTER</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
        </div>
      </div>
    </motion.div>
  )
}
