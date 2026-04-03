import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollRevealText from '../components/ScrollRevealText'

const achievements = [
  { year: '2025', rank: '1st', event: 'National Hackathon — AI for Social Impact', project: 'Burnout Sentinel', isTop: true },
  { year: '2025', rank: '2nd', event: 'Smart India Hackathon Regional', project: 'PostPehchaan', isTop: true },
  { year: '2025', rank: 'Top 10', event: 'Inter-University AI Challenge', project: 'TrapEye' },
  { year: '2024', rank: 'Winner', event: 'CodeStorm 2024', project: 'EcoPulse', isTop: true },
  { year: '2024', rank: 'Finalist', event: 'TechFest Innovation Track', project: 'Sentinelix' },
  { year: '2024', rank: '1st', event: 'Women in Tech Hackathon', project: 'AquaPredict', isTop: true },
]

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section data-section="achievements" id="achievements" ref={ref} className="section section-purple">
      <div className="section-number" style={{ color: 'rgba(139,92,246,0.12)' }}>004</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} style={{ color: 'var(--color-lavender)' }}>
          RECOGNITION
        </motion.div>

        <ScrollRevealText as="h2" className="section-title">
          Awards & achievements.
        </ScrollRevealText>

        {/* Table header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="achievement-row"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', color: 'var(--color-lavender)' }}
        >
          <span>YEAR</span>
          <span>RANK</span>
          <span>EVENT</span>
          <span>PROJECT</span>
        </motion.div>

        {/* Rows */}
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className="achievement-row"
            style={{ borderColor: 'rgba(139,92,246,0.08)' }}
          >
            <span style={{ color: 'var(--color-text-dim)' }}>{a.year}</span>
            <span style={{ color: a.isTop ? 'var(--color-lavender)' : 'var(--color-text-secondary)' }}>
              {a.isTop && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-lavender)', marginRight: '6px', boxShadow: '0 0 8px rgba(196,181,253,0.4)' }} />}
              {a.rank}
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>{a.event}</span>
            <span style={{ color: 'var(--color-text-secondary)', textAlign: 'right' }}>{a.project}</span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            marginTop: '40px', fontFamily: 'var(--font-display)',
            fontSize: '1rem', color: 'var(--color-lavender)', lineHeight: 1.6,
            opacity: 0.6, textAlign: 'right',
          }}
        >
          "Results don't lie."
        </motion.div>
      </div>
    </section>
  )
}
