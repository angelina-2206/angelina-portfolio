import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Word-by-word mask reveal component.
 * Each word is wrapped in overflow:hidden, starting at translateY(100%) 
 * and animating to translateY(0) on scroll with stagger.
 */
export default function ScrollRevealText({ 
  children, 
  as: Tag = 'div', 
  className = '', 
  style = {},
  stagger = 0.06,
  duration = 0.8,
  triggerOffset = '-15%',
  ...props 
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wordSpans = container.querySelectorAll('.word-inner')
    
    if (wordSpans.length === 0) return

    gsap.set(wordSpans, { yPercent: 100 })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: `top bottom${triggerOffset}`,
      once: true,
      onEnter: () => {
        gsap.to(wordSpans, {
          yPercent: 0,
          duration,
          stagger,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [stagger, duration, triggerOffset])

  // Split text into words
  const splitIntoWords = (text) => {
    if (typeof text !== 'string') return text
    
    return text.split(' ').map((word, i) => (
      <span key={i} className="word-mask" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
        <span className="word-inner" style={{ display: 'inline-block', willChange: 'transform' }}>
          {word}
        </span>
        {i < text.split(' ').length - 1 && '\u00A0'}
      </span>
    ))
  }

  const processChildren = (children) => {
    if (typeof children === 'string') {
      return splitIntoWords(children)
    }
    return children
  }

  return (
    <Tag ref={containerRef} className={`scroll-reveal-text ${className}`} style={style} {...props}>
      {processChildren(children)}
    </Tag>
  )
}
