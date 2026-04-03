import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ObsidianNav from './components/ObsidianNav'
import Hero from './sections/Hero'
import Quote from './sections/Quote'
import About from './sections/About'
import Projects from './sections/Projects'
import Gallery from './sections/Gallery'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')
  
  // Track scroll position for Nav updates (dark/light theme)
  useEffect(() => {
    if (isLoading) return
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.obs-section')
      let current = ''
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        // If we've scrolled past this section (with some buffer)
        if (window.scrollY >= sectionTop - window.innerHeight / 3) {
          current = section.getAttribute('id')
        }
      })
      
      if (current !== currentSection) {
        setCurrentSection(current)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, currentSection])

  useEffect(() => {
    // Add scroll reveal observer
    if (isLoading) return
    const obsvr = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.reveal-up').forEach(el => obsvr.observe(el))
    return () => obsvr.disconnect()
  }, [isLoading])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      
      {!isLoading && (
        <>
          <ObsidianNav currentSection={currentSection} />
          
          <main>
            <Hero />
            <Quote />
            <About />
            <Projects />
            <Gallery />
            <Achievements />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}

