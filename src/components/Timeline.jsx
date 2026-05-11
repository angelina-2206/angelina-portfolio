import { useState } from 'react'

const CONTRIBUTIONS = [
  {
    id: 'gssoc',
    year: '2026',
    org: 'GSSoC',
    fullName: 'GirlScript Summer of Code',
    role: 'Open Source Contributor',
    accent: '#F97316',
    accentGrad: 'linear-gradient(135deg,#F97316,#FBBF24)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    copy: 'Not the kind that adds a README typo fix and calls it open source. Real PRs, real codebases, real maintainers who review your work and don\'t sugarcoat it. GSSoC\'26 — currently contributing, actively shipping.',
    tags: ['Open Source', 'Collaborative Development', 'Code Review'],
    status: 'Active',
    statusColor: '#22C55E',
  },
  {
    id: 'ssoc',
    year: '2026',
    org: 'SSoC',
    fullName: 'Social Summer of Code',
    role: 'Open Source Contributor',
    accent: '#3B82F6',
    accentGrad: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    copy: 'Social Summer of Code — contributing to projects that build for communities, not just companies. Because building things that matter to real people is harder than building things that look good on a pitch deck.',
    tags: ['Community Tech', 'Open Source', 'Social Impact'],
    status: 'Active',
    statusColor: '#22C55E',
  },
  {
    id: 'wios',
    year: '2025–26',
    org: 'WIOS',
    fullName: 'Women in Open Source',
    role: 'Community Member',
    accent: '#EC4899',
    accentGrad: 'linear-gradient(135deg,#EC4899,#A855F7)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    copy: 'Women in Open Source — because representation in technical communities isn\'t a feel-good statistic, it\'s a structural fix. Being here, contributing, and making it normal for people who look like me to ship production code.',
    tags: ['Representation', 'Community', 'Open Source'],
    status: 'Member',
    statusColor: '#EC4899',
  },
]

export default function ContributionsTimeline() {
  const [hovered, setHovered] = useState(null)

  return (
    <section
      id="contributions"
      className="obs-section bg-dark"
      style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ctCardIn {
          from { opacity: 0; transform: translateY(20px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .ct-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s; }
        .ct-card:hover { transform: translateY(-6px) !important; }
      `}</style>

      {/* Ghost background text */}
      <div className="ghost-text-bg" style={{
        position: 'absolute', top: '50%', left: '-1rem',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(5rem,18vw,13rem)', fontWeight: 900,
        color: 'rgba(255,255,255,0.02)',
        letterSpacing: '-0.06em', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        fontFamily: 'var(--font-display)',
      }}>
        COMMUNITY
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1, background: '#F97316' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.7)' }}>
              004 — In The Wild
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', color: '#F0EEF6', lineHeight: 1, marginBottom: 12
          }}>
            Contributions & Community
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(240,238,246,0.4)', maxWidth: 480, lineHeight: 1.8 }}>
            Proof, not padding. These are the communities where the work is public, the reviews are honest, and the commits actually ship.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {CONTRIBUTIONS.map((c, i) => (
            <div
              key={c.id}
              className="ct-card"
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#0D0D0D',
                border: `0.5px solid ${hovered === c.id ? c.accent + '55' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 16, overflow: 'hidden',
                boxShadow: hovered === c.id ? `0 12px 60px ${c.accent}15` : '0 4px 20px rgba(0,0,0,0.3)',
                animation: `ctCardIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
                cursor: 'default',
              }}
            >
              {/* Top gradient bar */}
              <div style={{ height: 3, background: c.accentGrad }} />

              <div style={{ padding: '1.75rem' }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${c.accent}15`,
                    border: `0.5px solid ${c.accent}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.accent,
                    transition: 'background 0.3s',
                  }}>
                    {c.icon}
                  </div>

                  {/* Status pill */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em',
                    textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100,
                    border: `0.5px solid ${c.statusColor}44`,
                    color: c.statusColor,
                    background: `${c.statusColor}10`,
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.statusColor, flexShrink: 0 }} />
                    {c.status}
                  </div>
                </div>

                {/* Org name */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem,3vw,1.9rem)',
                  fontWeight: 900, letterSpacing: '-0.03em',
                  color: '#F0EEF6', lineHeight: 1, marginBottom: 4,
                }}>
                  {c.org}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: 'rgba(240,238,246,0.35)', letterSpacing: '0.08em',
                  marginBottom: '1rem',
                }}>
                  {c.fullName} · {c.year}
                </div>

                {/* Role badge */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: c.accent,
                  marginBottom: '1rem',
                }}>
                  {c.role}
                </div>

                {/* Copy */}
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'rgba(240,238,246,0.55)', lineHeight: 1.85,
                  borderLeft: `2px solid ${c.accent}44`,
                  paddingLeft: 12, marginBottom: '1.25rem',
                }}>
                  {c.copy}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {c.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8,
                      padding: '3px 9px', borderRadius: 100,
                      border: `0.5px solid ${c.accent}33`,
                      color: `${c.accent}88`,
                      letterSpacing: '0.08em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Certifications ── */}
        <div style={{ marginTop: '3.5rem' }}>

          {/* Sub-header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
            <div style={{ width: 20, height: 1, background: '#FFD700' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.7)' }}>
              Certifications
            </span>
          </div>

          {/* Oracle cert card */}
          <a
            href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=2D51C4C86DF645928399B2D666A4934CB6C0A18DD5F942D689A881E89883FB00"
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{ height: 2, background: 'linear-gradient(90deg,#C74634,#FFD700)' }} />
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>

              {/* Left — icon + text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Oracle "O" icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: '#C74634',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(199,70,52,0.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 0C7.6 0 0 7.6 0 17s7.6 17 17 17 17-7.6 17-17S26.4 0 17 0zm0 28.6C10.6 28.6 5.4 23.4 5.4 17S10.6 5.4 17 5.4 28.6 10.6 28.6 17 23.4 28.6 17 28.6z" fill="#FFFFFF"/>
                  </svg>
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.95rem,2vw,1.15rem)',
                    fontWeight: 800, letterSpacing: '-0.02em',
                    color: '#F0EEF6', marginBottom: 3,
                  }}>
                    Oracle Infrastructure Generative AI Professional
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(240,238,246,0.4)', letterSpacing: '0.08em' }}>
                    Oracle · Issued Oct 2025
                  </div>
                </div>
              </div>

              {/* Right — verified badge + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-mono)', fontSize: 8,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 100,
                  background: 'rgba(255,215,0,0.08)',
                  border: '0.5px solid rgba(255,215,0,0.3)',
                  color: '#FFD700',
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verified
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,215,0,0.5)' }}>↗</span>
              </div>

            </div>
          </a>

        </div>

        <style>{`
          .cert-card {
            background: #0D0D0D;
            border: 0.5px solid rgba(199,70,52,0.2);
            border-radius: 14px;
            overflow: hidden;
            transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          }
          .cert-card:hover {
            border-color: rgba(199,70,52,0.5);
            box-shadow: 0 12px 48px rgba(199,70,52,0.12);
            transform: translateY(-4px);
          }
        `}</style>

      </div>
    </section>
  )
}
