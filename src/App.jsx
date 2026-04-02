import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import HudStrip from './components/HudStrip'
import SectorProgress from './components/SectorProgress'
import Hero from './sections/Hero'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)

  const sections = ['hero']

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      {!isLoading && (
        <>
          <HudStrip currentSection={currentSection} />
          <SectorProgress 
            sections={sections} 
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <main>
            <Hero />
          </main>
        </>
      )}
    </>
  )
}

export default App
