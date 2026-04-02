import { useEffect } from 'react'

export default function SectorProgress({ sections, currentSection, setCurrentSection }) {
  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('[data-section]')
      const scrollY = window.scrollY + window.innerHeight / 2

      sectionEls.forEach((el, i) => {
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (scrollY >= top && scrollY < bottom) {
          setCurrentSection(i)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setCurrentSection])

  const scrollToSection = (index) => {
    const sectionEls = document.querySelectorAll('[data-section]')
    if (sectionEls[index]) {
      sectionEls[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sector-progress">
      {sections.map((_, i) => (
        <button
          key={i}
          className={`sector-dot ${currentSection === i ? 'active' : ''}`}
          onClick={() => scrollToSection(i)}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  )
}
