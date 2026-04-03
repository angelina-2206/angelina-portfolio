import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const quickX = useRef(null)
  const quickY = useRef(null)
  const magnetTargets = useRef([])

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || window.innerWidth < 768) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Set up GSAP quickTo for smooth cursor movement
    quickX.current = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' })
    quickY.current = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' })

    const onMouseMove = (e) => {
      quickX.current(e.clientX)
      quickY.current(e.clientY)
    }

    const setupMagneticElements = () => {
      // Clean up old listeners
      magnetTargets.current.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.removeEventListener('mousemove', move)
      })
      magnetTargets.current = []

      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-hover], .project-hover-target, .pill-btn, .skill-pill'
      )

      interactiveElements.forEach((el) => {
        const elQuickX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
        const elQuickY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

        const enter = () => {
          cursor.classList.add('cursor-hover')
          gsap.to(cursor, {
            width: 44,
            height: 44,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const leave = () => {
          cursor.classList.remove('cursor-hover')
          gsap.to(cursor, {
            width: 12,
            height: 12,
            duration: 0.3,
            ease: 'power2.out',
          })
          // Reset element position
          elQuickX(0)
          elQuickY(0)
        }

        const move = (e) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (e.clientX - centerX) * 0.25
          const deltaY = (e.clientY - centerY) * 0.25
          
          // Clamp the magnetic pull to 8-12px max
          const clamp = (val, max) => Math.max(-max, Math.min(max, val))
          elQuickX(clamp(deltaX, 12))
          elQuickY(clamp(deltaY, 12))
        }

        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        el.addEventListener('mousemove', move)

        magnetTargets.current.push({ el, enter, leave, move })
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    setupMagneticElements()

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      setupMagneticElements()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      magnetTargets.current.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.removeEventListener('mousemove', move)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    />
  )
}
