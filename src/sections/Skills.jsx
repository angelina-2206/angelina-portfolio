import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollRevealText from '../components/ScrollRevealText'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'HTML/CSS', 'Kotlin'],
    accent: 'var(--color-primary)',
  },
  {
    title: 'AI / ML',
    skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'Hugging Face', 'NLP', 'Computer Vision'],
    accent: 'var(--color-primary-light)',
  },
  {
    title: 'Web & Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'Flask', 'FastAPI', 'Tailwind', 'GSAP'],
    accent: 'var(--color-lavender)',
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'Docker', 'Firebase', 'MongoDB', 'PostgreSQL', 'Figma', 'Vercel'],
    accent: 'var(--color-accent)',
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section data-section="skills" id="skills" ref={ref} className="section section-light">
      <div className="section-number">002</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          CAPABILITIES
        </motion.div>

        <ScrollRevealText as="h2" className="section-title">
          What I work with.
        </ScrollRevealText>

        {/* Skills grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="skills-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              style={{
                padding: '32px',
                background: 'rgba(139, 92, 246, 0.04)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.1)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--color-primary-dim)', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.accent }} />
                {cat.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    padding: '6px 14px', borderRadius: '999px',
                    background: 'rgba(139, 92, 246, 0.06)',
                    border: '1px solid rgba(139, 92, 246, 0.12)',
                    color: '#3a3a3a', letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            marginTop: '48px', textAlign: 'right',
            fontFamily: 'var(--font-display)', fontSize: '1rem',
            color: 'var(--color-primary-dim)', lineHeight: 1.6,
          }}
        >
          "The right tool for the right problem."
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
