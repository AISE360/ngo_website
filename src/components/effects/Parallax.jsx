import { useEffect, useRef } from 'react'

// True parallax band: background image translates slower than scroll.
// Inspired by Antara's cinematic full-bleed bands, but with real field photos.
export function ParallaxBand({ src, alt = '', children, height = 'min-h-[70vh]', scrim = 'parallax-scrim-teal', speed = 0.22 }) {
  const imgRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        const img = imgRef.current
        if (!el || !img) return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // only animate when in viewport
        if (rect.bottom < 0 || rect.top > vh) return
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh // -0.5..0.5
        const y = progress * -100 * speed * 4
        img.style.transform = `translateY(${y}px) scale(1.15)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <section ref={wrapRef} className={`parallax-band ${height} flex items-center`}>
      <img ref={imgRef} src={src} alt={alt} className="parallax-bg" loading="lazy" />
      <div className={`absolute inset-0 ${scrim}`} />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}

// Simple reveal-on-scroll counter (no extra dep needed, CountUp kept for Hero stats)
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <div data-aos="fade-up" data-aos-delay={delay} className={className}>
      {children}
    </div>
  )
}
