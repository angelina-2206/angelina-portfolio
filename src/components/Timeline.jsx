import { useState } from 'react'

const CONTRIBUTIONS = [
  {
    id: 'bserc',
    year: 'Jun 2026 - Present · 3 mos',
    org: 'BSERC',
    fullName: 'Bharat Space Education Research Centre (भारत अंतरिक्ष शिक्षा अनुसंधान केंद्र) · Internship',
    role: 'Space Technology Intern',
    location: 'Remote',
    accent: '#38BDF8',
    accentGrad: 'linear-gradient(135deg,#38BDF8,#8B5CF6)',
    logoBg: '#FFFFFF',
    logoUrl: '/logos/bserc.png',
    svgLogo: (
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#FFFFFF" />
        {/* Outer serrated gear wheel */}
        <circle cx="50" cy="50" r="41" stroke="#1E293B" strokeWidth="4.5" strokeDasharray="7 3.5" />
        <circle cx="50" cy="50" r="34" stroke="#1E293B" strokeWidth="2.5" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="24" fill="#0F172A" />
        {/* Space tech atomic orbits */}
        <ellipse cx="50" cy="50" rx="18" ry="6.5" stroke="#38BDF8" strokeWidth="2" transform="rotate(-30 50 50)" />
        <ellipse cx="50" cy="50" rx="18" ry="6.5" stroke="#60A5FA" strokeWidth="2" transform="rotate(30 50 50)" />
        <circle cx="50" cy="50" r="4" fill="#38BDF8" />
        <circle cx="50" cy="50" r="30" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
    copy: 'Space Technology Intern (Remote) at Bharat Space Education Research Centre (भारत अंतरिक्ष शिक्षा अनुसंधान केंद्र). Engaging in space science research, satellite systems engineering, and tech innovations.',
    tags: ['Space Tech', 'Internship', 'Remote', 'Research'],
    status: 'Active',
    statusColor: '#22C55E',
  },
  {
    id: 'gssoc',
    year: 'Apr 2026 - Present · 5 mos',
    org: 'GSSoC',
    fullName: 'GirlScript Summer of Code · Part-time',
    role: 'Open Source Contributor',
    location: 'Remote',
    accent: '#F97316',
    accentGrad: 'linear-gradient(135deg,#F97316,#FBBF24)',
    logoBg: '#FFFFFF',
    logoUrl: '/logos/gssoc.png',
    svgLogo: (
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orange base card with geometric border accents */}
        <rect width="100" height="100" rx="20" fill="#F97316" />
        {/* Decorative corner patterns */}
        <circle cx="0" cy="0" r="26" fill="#EA580C" opacity="0.6" />
        <circle cx="100" cy="0" r="26" fill="#EA580C" opacity="0.6" />
        <circle cx="0" cy="100" r="26" fill="#EA580C" opacity="0.6" />
        <circle cx="100" cy="100" r="26" fill="#EA580C" opacity="0.6" />
        {/* Center white circle */}
        <circle cx="50" cy="50" r="28" fill="#FFFFFF" />
        {/* Inner orange badge */}
        <rect x="29" y="29" width="42" height="42" rx="11" fill="#F97316" />
        {/* </> symbol inside */}
        <path d="M42 42 L35 50 L42 58 M58 42 L65 50 L58 58 M52 37 L48 63" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    copy: 'Contributor at GirlScript Summer of Code 2026, working across Open Source & reliable applications.',
    tags: ['Open-Source Development', 'GitHub', 'Open Source', 'Remote'],
    status: 'Active',
    statusColor: '#22C55E',
  },
  {
    id: 'wios',
    year: 'Sep 2025 - Present · 1 yr',
    org: 'WIOS',
    fullName: 'Women in Open Source, VIT-AP · Full-time',
    role: 'Technical Team Member',
    location: 'On-site',
    accent: '#EC4899',
    accentGrad: 'linear-gradient(135deg,#EC4899,#A855F7)',
    logoBg: '#FFFFFF',
    logoUrl: '/logos/wios.png',
    svgLogo: (
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White rounded rectangle background */}
        <rect width="100" height="100" rx="20" fill="#FFFFFF" />
        {/* Laurel Wreath Left */}
        <path d="M 30 75 C 18 60 18 40 30 25 C 28 32 30 40 34 46 M 22 68 C 12 55 14 38 25 28 M 24 55 C 16 45 20 32 30 30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Laurel Wreath Right */}
        <path d="M 70 75 C 82 60 82 40 70 25 C 72 32 70 40 66 46 M 78 68 C 88 55 86 38 75 28 M 76 55 C 84 45 80 32 70 30" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Laurel Leaves left */}
        <path d="M 28 65 C 22 62 20 54 26 52 C 28 58 30 62 28 65 Z" fill="#334155"/>
        <path d="M 25 50 C 18 46 18 38 24 38 C 26 44 27 48 25 50 Z" fill="#334155"/>
        <path d="M 30 35 C 24 30 26 22 32 24 C 33 29 32 33 30 35 Z" fill="#334155"/>
        {/* Laurel Leaves right */}
        <path d="M 72 65 C 78 62 80 54 74 52 C 72 58 70 62 72 65 Z" fill="#334155"/>
        <path d="M 75 50 C 82 46 82 38 76 38 C 74 44 73 48 75 50 Z" fill="#334155"/>
        <path d="M 70 35 C 76 30 74 22 68 24 C 67 29 68 33 70 35 Z" fill="#334155"/>
        {/* Center WIOS figure logo */}
        <circle cx="50" cy="38" r="7" fill="#8B5CF6"/>
        <path d="M38 52 C38 43 62 43 62 52 C62 60 38 60 38 52 Z" fill="#8B5CF6"/>
        {/* Text WIOS & VIT-AP */}
        <text x="50" y="65" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="800" fontFamily="sans-serif">WIOS</text>
        <text x="50" y="74" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="700" fontFamily="sans-serif">VIT-AP</text>
      </svg>
    ),
    copy: 'Technical Team Member at Women in Open Source, VIT-AP. Building technical community initiatives, mentoring contributors, and shipping production open-source software.',
    tags: ['Technical Team', 'VIT-AP', 'On-site', 'Open Source'],
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
        EXPERIENCE
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1, background: '#F97316' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.7)' }}>
              004 — Experience & Journey
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', color: '#F0EEF6', lineHeight: 1, marginBottom: 12
          }}>
            Experience & Contributions
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(240,238,246,0.4)', maxWidth: 480, lineHeight: 1.8 }}>
            Proof, not padding. These are the organizations and communities where the work is public, the reviews are honest, and the commits actually ship.
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
                  {/* Logo Container */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: c.logoBg || `${c.accent}15`,
                    border: `0.5px solid ${c.accent}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    flexShrink: 0,
                  }}>
                    {c.logoUrl ? (
                      <img 
                        src={c.logoUrl} 
                        alt={`${c.org} logo`} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: c.logoBg === '#FFFFFF' ? 4 : 0 }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextSibling) {
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div style={{ display: c.logoUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.svgLogo || c.icon}
                    </div>
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
