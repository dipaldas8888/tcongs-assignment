import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import LogoTicker from './components/sections/LogoTicker'
import ServicesSection from './components/sections/ServicesSection'
import StatsSection from './components/sections/StatsSection'
import ProcessSection from './components/sections/ProcessSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import CTASection from './components/sections/CTASection'
import FaqSection from './components/sections/FaqSection'
import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Cursor glow follow
  useEffect(() => {
    const el = cursorRef.current
    const onMove = (e) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Page load animation
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    })
    tl.fromTo(
      '#page-loader',
      { scaleY: 1 },
      { scaleY: 0, duration: 0.9, ease: 'power4.inOut', transformOrigin: 'top', delay: 0.3 }
    )
  }, [])

  return (
    <>
      {/* Page loader */}
      <div
        id="page-loader"
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #080808 0%, #0f0f0f 100%)',
          transformOrigin: 'top',
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cursor glow (desktop only) */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="hidden lg:block fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(229,26,75,0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* App shell */}
      <div className="relative min-h-screen bg-[#080808] text-white">
        <Navbar />
        <main>
          <HeroSection />
          <LogoTicker />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <TestimonialsSection />
          <FaqSection />
          <CTASection />
        </main>
        <Footer />

        {/* Floating Chat widget button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="#cta"
            className="flex items-center gap-2 px-4 py-2 bg-[#E2EC07] text-black font-extrabold text-xs rounded-full
                       shadow-[0_8px_25px_rgba(226,236,7,0.4)] hover:scale-105 transition-all duration-300 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
            <span>Chat</span>
          </a>
        </div>
      </div>
    </>
  )
}
