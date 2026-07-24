import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ShieldCheck, ArrowRight, Zap } from 'lucide-react'
import Hero3DCanvas from '../3d/Hero3DCanvas'

const badgeTech = [
  { name: 'Figma',   color: '#F24E1E', symbol: '❖' },
  { name: 'Webflow', color: '#146EF5', symbol: 'W' },
  { name: 'React',   color: '#61DAFB', symbol: '⚛' },
  { name: 'Framer',  color: '#0055FF', symbol: '▲' },
  { name: 'Next',    color: '#FFFFFF', symbol: 'N' },
]

// 3D floating card data
const floatCards = [
  { label: '50+ Projects', sub: 'Delivered worldwide',  color: '#E51A4B', x: '-right-4 top-24',  delay: 0    },
  { label: '98% Satisfaction', sub: 'Client rating',    color: '#10B981', x: '-left-4 top-40',   delay: 0.4  },
  { label: '3+ Years',     sub: 'Industry experience',  color: '#3B82F6', x: '-right-8 bottom-32', delay: 0.8 },
]

export default function HeroSection() {
  const containerRef = useRef(null)
  const orbRef1      = useRef(null)
  const orbRef2      = useRef(null)
  const orbRef3      = useRef(null)
  const gridRef      = useRef(null)
  const card3DRef    = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. BADGE (slides + fades in) ─────────────────────────
      gsap.fromTo('.hero-badge-pill',
        { y: -40, opacity: 0, scale: 0.85 },
        { y: 0,   opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.7)', delay: 0.1 }
      )

      // ── 2. HEADLINE: 3-D flip-up per word ────────────────────
      gsap.set('.hero-word', { transformStyle: 'preserve-3d', transformPerspective: 1200 })
      gsap.fromTo('.hero-word',
        { y: 90, opacity: 0, rotateX: -55, skewX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0, skewX: 0,
          stagger: 0.08, duration: 1.1, ease: 'power4.out', delay: 0.35,
        }
      )

      // ── 3. SUB-HEADLINE ───────────────────────────────────────
      gsap.fromTo('.hero-sub',
        { y: 28, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { y: 0,  opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out', delay: 0.9 }
      )

      // ── 4. BUTTONS ────────────────────────────────────────────
      gsap.fromTo('.hero-btns > *',
        { y: 24, opacity: 0, scale: 0.9 },
        { y: 0,  opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)', delay: 1.1 }
      )

      // ── 5. GREAT-AT banner ────────────────────────────────────
      gsap.fromTo('.hero-great-at',
        { y: 35, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.4 }
      )

      // ── 6. FLOATING 3-D CARDS ─────────────────────────────────
      gsap.fromTo('.hero-float-card',
        { opacity: 0, scale: 0.7, y: 30, rotateY: -15 },
        {
          opacity: 1, scale: 1, y: 0, rotateY: 0,
          stagger: 0.18, duration: 1, ease: 'power3.out', delay: 1.5,
        }
      )
      // continuous bob animation
      gsap.to('.hero-float-card', {
        y: -10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { each: 0.4, from: 'start' },
      })

      // ── 7. PARTICLE DOTS ─────────────────────────────────────
      particlesRef.current.forEach((p, i) => {
        if (!p) return
        gsap.to(p, {
          x: `random(-40,40)`,
          y: `random(-40,40)`,
          opacity: `random(0.1,0.6)`,
          duration: `random(3,7)`,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.15,
        })
      })

      // ── 8. ORB FLOAT ─────────────────────────────────────────
      gsap.to(orbRef1.current, { y: -35, x: 20,  duration: 8,  repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orbRef2.current, { y: 28,  x: -25, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
      gsap.to(orbRef3.current, { y: -20, x: 15,  duration: 6,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 })

      // ── 9. MOUSE PARALLAX (grid + headline perspective shift) ──
      const onMouseMove = (e) => {
        const rx = (e.clientX / window.innerWidth  - 0.5)
        const ry = (e.clientY / window.innerHeight - 0.5)

        gsap.to(gridRef.current, { x: rx * 18, y: ry * 18, duration: 1.8, ease: 'power2.out' })
        gsap.to(card3DRef.current, {
          rotateY: rx * 12, rotateX: -ry * 8,
          transformPerspective: 1000, duration: 0.8, ease: 'power2.out',
        })
      }
      window.addEventListener('mousemove', onMouseMove)
      return () => window.removeEventListener('mousemove', onMouseMove)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const words = ['SMART', 'DIGITAL', 'SOLUTIONS', 'FOR', 'MODERN', 'BUSINESSES']

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-12"
    >
      {/* ── Three.js Interactive 3D WebGL Canvas ────────────────── */}
      <Hero3DCanvas />

      {/* ── Grid texture ────────────────────────────────────────── */}
      <div ref={gridRef} className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none scale-110" style={{ willChange: 'transform' }} />

      {/* ── Central radiant glow ─────────────────────────────────── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229,26,75,0.2) 0%, rgba(226,236,7,0.04) 55%, transparent 80%)', filter: 'blur(65px)' }}
      />

      {/* ── Floating orbs ────────────────────────────────────────── */}
      <div ref={orbRef1} className="absolute top-[15%] left-[6%] w-80 h-80 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(229,26,75,0.13) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div ref={orbRef2} className="absolute bottom-[20%] right-[6%] w-80 h-80 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(226,236,7,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div ref={orbRef3} className="absolute top-[55%] left-[45%] w-60 h-60 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(45px)' }} />

      {/* ── Random particle dots ─────────────────────────────────── */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  `${Math.random() * 3 + 1.5}px`,
            height: `${Math.random() * 3 + 1.5}px`,
            top:    `${Math.random() * 90 + 5}%`,
            left:   `${Math.random() * 90 + 5}%`,
            background: i % 3 === 0 ? '#E51A4B' : i % 3 === 1 ? '#E2EC07' : 'rgba(255,255,255,0.5)',
            opacity: 0.25,
          }}
        />
      ))}

      {/* ── Main content ─────────────────────────────────────────── */}
      <div ref={card3DRef} className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 text-center w-full">

        {/* Trust badge */}
        <div className="hero-badge-pill inline-flex flex-wrap items-center justify-center gap-2 mb-10 px-5 py-2.5 rounded-full
                        bg-black/70 backdrop-blur-md border border-white/12 shadow-[0_4px_24px_rgba(0,0,0,0.6)]
                        text-xs text-white/90 font-medium">
          <div className="w-5 h-5 rounded-md bg-[#E51A4B]/25 flex items-center justify-center text-[#E51A4B]">
            <ShieldCheck size={13} />
          </div>
          <span>Trusted by businesses worldwide to build scalable digital solutions</span>
          <div className="flex items-center gap-1.5 pl-2.5 border-l border-white/15 ml-1">
            {badgeTech.map((t) => (
              <span key={t.name} title={t.name}
                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold"
                style={{ color: t.color }}>
                {t.symbol}
              </span>
            ))}
          </div>
        </div>

        {/* Headline — 3-D flip-up per word */}
        <h1 className="overflow-hidden font-['Syne'] font-extrabold leading-[1.08] tracking-tight
                       text-[clamp(2.4rem,6.2vw,5.6rem)] mb-6 uppercase max-w-5xl mx-auto perspective-[1200px]">
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em] opacity-0 last:mr-0 text-white"
                  style={{ transformOrigin: '50% 100%' }}>
              {i === 1 ? (
                <span className="gradient-text">{word}</span>
              ) : word}
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <p className="hero-sub opacity-0 text-white/60 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed
                      max-w-2xl mx-auto mb-10 font-['Inter']">
          We Help Brands Grow With{' '}
          <span className="text-[#E51A4B] font-semibold">Web, Apps & Marketing</span>{' '}
          Solutions Across The Globe.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns flex flex-wrap items-center justify-center gap-4 mb-24">
          <a href="#cta"
            style={{ color: '#000000' }}
            className="group relative px-8 py-3.5 bg-white font-bold text-sm rounded-full
                       shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]
                       hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
            <span style={{ color: '#000000' }}>Schedule Meeting</span>
            <ArrowRight size={16} color="#000000" className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services"
            className="group px-8 py-3.5 bg-white/[0.06] text-white font-semibold text-sm rounded-full
                       border border-white/20 hover:border-[#E51A4B]/60 hover:bg-[#E51A4B]/10
                       transition-all duration-300 backdrop-blur-md flex items-center gap-2">
            <Zap size={15} className="text-[#E51A4B]" />
            <span>Explore Services</span>
          </a>
        </div>

        {/* WE ARE GREAT AT */}
        <div className="hero-great-at opacity-0 pt-6 relative">
          {/* Divider line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <p className="text-[#E51A4B] text-xs font-bold uppercase tracking-[0.2em] mb-3">WE ARE GREAT AT</p>
          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(1.6rem,3.2vw,2.6rem)] tracking-tight mb-2">
            Digital Solutions & Development Services
          </h2>
          <p className="text-white/45 text-sm">Scalable solutions for modern businesses</p>
        </div>
      </div>

      {/* ── 3-D Floating stat cards ───────────────────────────────── */}
      {floatCards.map((card, i) => (
        <div
          key={i}
          className={`hero-float-card hidden xl:block absolute opacity-0 z-20 ${card.x}`}
          style={{ perspective: '600px' }}
        >
          <div className="glass-card rounded-2xl px-4 py-3 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                          backdrop-blur-xl min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: card.color }} />
              <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{card.sub}</span>
            </div>
            <p className="font-['Syne'] font-extrabold text-white text-base">{card.label}</p>
          </div>
        </div>
      ))}

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#E51A4B]/70 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
