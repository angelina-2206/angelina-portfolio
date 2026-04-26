import { useState, useEffect } from 'react'
import { SoundProvider } from './context/SoundContext'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ObsidianNav from './components/ObsidianNav'
import MenuOverlay from './components/MenuOverlay'
import Hero from './components/ShatterHero'
import QuoteReveal from './sections/QuoteReveal'
import About from './sections/About'
import Projects from './sections/Projects'
import Gallery from './sections/Gallery'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    if (isLoading) return
    
    // Import Lenis dynamically to avoid SSR issues if any
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Connect Lenis to ScrollTrigger
      lenis.on('scroll', () => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          ScrollTrigger.update()
        })
      })

      return () => lenis.destroy()
    })
  }, [isLoading])

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
    <SoundProvider>
      <CustomCursor />
      <LoadingScreen onComplete={() => setIsLoading(false)}>
        <MenuOverlay 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
        <ObsidianNav 
          currentSection={currentSection} 
          onMenuToggle={() => setIsMenuOpen(true)} 
        />
        
        <main>
          <Hero />
          <QuoteReveal />
          <About />
          <Projects />
          <Gallery />
          <Achievements />
          <Contact />
        </main>
      </LoadingScreen>
    </SoundProvider>
  );
}

