import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Quote() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;
    
    let ctx = gsap.context(() => {

      // A single timeline tied cleanly to the scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',   // Fire when section enters 80% down the viewport
          end: 'bottom top',  // Scrub finishes when section leaves top
          scrub: 1.5,         // Smooth tight scrub
        }
      });

      // Parallax horizontal scroll - use xPercent to avoid scrollWidth calculation issues
      tl.to(textRef.current, {
        xPercent: -40, 
        ease: 'none'
      }, 0); // '0' means start at the very beginning of the timeline

      // Typing stagger effect synced across the timeline
      tl.fromTo('.quote-char', 
        { opacity: 0, filter: 'blur(10px)', x: 30, scale: 1.2 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          x: 0, 
          scale: 1, 
          stagger: 0.05, 
          ease: 'power2.out',
        }, 
        0 // Fire at the exact same start time so they happen simultaneously
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chunks = [
    { text: "PERFORMANCE SETTLES ", italic: false },
    { text: "CONVERSATIONS. ", italic: true },
    { text: "EVERYTHING ELSE ", italic: false },
    { text: "TENDS TO FOLLOW.", italic: false },
  ]

  return (
    <section 
      id="quote" 
      ref={sectionRef}
      className="obs-section bg-void" 
      style={{ 
        background: 'var(--color-void)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '20vh 0', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      
      {/* Dynamic background effect akin to Leclerc's blurry parallax */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* 
        Container that slides horizontally via GSAP.
        Must allow its content to overflow without breaking lines.
      */}
      <div 
        ref={textRef} 
        style={{ 
          zIndex: 10, 
          display: 'flex',
          whiteSpace: 'nowrap', // FORCE literally one line
          paddingLeft: '10vw'   // Start slightly inset
        }}
      >
        <h2 
          style={{ 
            color: 'white', 
            lineHeight: 0.85, 
            letterSpacing: '-0.03em', 
            textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 20vw, 25rem)', // MASSIVE LECLERC SIZING
            fontWeight: 800,
            display: 'inline-block',
            margin: 0
          }}
        >
          {chunks.map((chunk, chunkIndex) => (
            <span key={chunkIndex}>
              {chunk.text.split('').map((char, charIndex) => (
                <span
                  key={`${chunkIndex}-${charIndex}`}
                  className="quote-char"
                  style={{
                    display: 'inline-block',
                    fontStyle: chunk.italic ? 'italic' : 'normal',
                    color: chunk.italic ? 'var(--color-lavender)' : 'inherit',
                    whiteSpace: 'pre'
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
