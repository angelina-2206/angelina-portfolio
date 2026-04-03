export default function Marquee() {
  const items = [
    'FULL STACK', 'AI BUILDER', 'DATA-DRIVEN', 'CREATING',
    'BUILDING', 'DESIGNING', 'DEPLOYING', '—',
  ]
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <div className="marquee-inner">
          {repeated.map((item, i) => (
            <span key={i} className="marquee-text">
              {item}{i < repeated.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
        <div className="marquee-inner" aria-hidden="true">
          {repeated.map((item, i) => (
            <span key={`dup-${i}`} className="marquee-text">
              {item}{i < repeated.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
