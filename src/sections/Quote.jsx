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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',    
          end: '+=600%',       
          scrub: 1.5, // Higher scrub for more "lazy" cinematic feel
          pin: true,
          anticipatePin: 1,
        }
      });

      // Horizontal Slide
      tl.to(textRef.current, {
        x: () => -(textRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
        ease: 'none',
        duration: 1 
      }, 0);

      // Typing Reveal — High-impact reveal with stable easing
      tl.fromTo('.quote-char', 
        { 
          opacity: 0, 
          filter: 'blur(15px)', 
          y: 30,
          scale: 0.95 
        },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0,
          scale: 1,
          stagger: 0.1, 
          duration: 0.4,
          ease: 'expo.out' // Using expo.out for that premium snap
        }, 
        0
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
      style={{ 
        background: '#050505', 
        position: 'relative',
        width: '100%',
        height: '100vh', 
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingLeft: '10vw' // Start visible slightly inset
        }}
      >
        {/* Dynamic background effect */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
          background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div 
          ref={textRef} 
          style={{ 
            zIndex: 10, 
            display: 'flex',
            whiteSpace: 'nowrap'
          }}
        >
          <h2 
            style={{ 
              color: 'white', 
              lineHeight: 0.9, 
              letterSpacing: '-0.02em', 
              textTransform: 'uppercase',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 15vw, 20rem)', 
              fontWeight: 900,
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
      </div>
    </section>
  )
}
