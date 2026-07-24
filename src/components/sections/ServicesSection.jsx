import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Globe, Smartphone, Layers, Code2, Cpu, ArrowUpRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'ui-ux',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Pixel-perfect, user-centered interfaces that balance aesthetics with seamless usability across all platforms.',
    tags: ['Figma', 'User Research', 'Prototyping'],
    color: '#E51A4B',
  },
  {
    id: 'web-dev',
    icon: Globe,
    title: 'Web Development',
    description: 'High-performance, scalable web applications built with modern frameworks and best engineering practices.',
    tags: ['React', 'Next.js', 'Webflow'],
    color: '#E2EC07',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Dev',
    description: 'Cross-platform iOS & Android apps with native performance, engaging UX, and robust architecture.',
    tags: ['Flutter', 'React Native', 'Swift'],
    color: '#7C3AED',
  },
  {
    id: 'branding',
    icon: Layers,
    title: 'Branding & Identity',
    description: 'Compelling visual identities that tell your brand story — logos, style guides, and design systems.',
    tags: ['Logo Design', 'Style Guide', 'Brand Strategy'],
    color: '#F97316',
  },
  {
    id: 'figma-webflow',
    icon: Code2,
    title: 'Figma → Webflow',
    description: 'Seamlessly convert your Figma designs to fully responsive, production-ready Webflow websites.',
    tags: ['Webflow', 'CMS', 'Animations'],
    color: '#06B6D4',
  },
  {
    id: 'saas',
    icon: Cpu,
    title: 'SaaS Product Design',
    description: 'End-to-end product design for SaaS platforms — from complex dashboards to delightful onboarding flows.',
    tags: ['Dashboard UI', 'Design Systems', 'SaaS'],
    color: '#10B981',
  },
]

// Static particle positions
const PARTICLES = [
  { id: 0, size: 2.8, x: 15, y: 20, dur: 4.2, delay: 0,   dx:  7 },
  { id: 1, size: 2.0, x: 75, y: 35, dur: 5.8, delay: 0.6, dx: -7 },
  { id: 2, size: 3.2, x: 40, y: 70, dur: 3.6, delay: 1.2, dx:  6 },
  { id: 3, size: 1.8, x: 85, y: 80, dur: 6.1, delay: 0.3, dx: -8 },
  { id: 4, size: 2.5, x: 25, y: 55, dur: 4.9, delay: 1.7, dx:  5 },
  { id: 5, size: 2.1, x: 60, y: 15, dur: 5.3, delay: 0.9, dx: -6 },
]

function ServiceCard({ service, index }) {
  const { icon: Icon, title, description, tags, color } = service
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const iconRef  = useRef(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx   = e.clientX - rect.left
    const cy   = e.clientY - rect.top
    const nx   = (cx / rect.width  - 0.5) * 2
    const ny   = (cy / rect.height - 0.5) * 2

    gsap.to(card, {
      rotateY:  nx * 14,
      rotateX: -ny * 10,
      scale:    1.035,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 900,
    })

    if (glowRef.current) {
      glowRef.current.style.left = cx + 'px'
      glowRef.current.style.top  = cy + 'px'
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    gsap.fromTo(iconRef.current,
      { rotateY: -90, scale: 0.65 },
      { rotateY: 0,   scale: 1, duration: 0.55, ease: 'back.out(1.7)' }
    )
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.65, ease: 'elastic.out(1, 0.55)',
      transformPerspective: 900,
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '900px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative glass-card rounded-2xl p-7 flex flex-col gap-5 cursor-default overflow-hidden h-full"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          boxShadow: hovered
            ? '0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px ' + color + '45, 0 0 48px ' + color + '18'
            : '0 4px 24px rgba(0,0,0,0.35)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Cursor glow spot */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, ' + color + '28 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 0,
          }}
        />

        {/* Shimmer border sweep */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
          <motion.div
            style={{
              background: 'linear-gradient(90deg, transparent, ' + color + ', transparent)',
              height: '100%',
            }}
            animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
            transition={hovered ? { duration: 1.3, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
          />
        </div>

        {/* Corner pulse dot */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none" style={{ transform: 'translateZ(10px)', zIndex: 10 }}>
          <motion.div
            className="rounded-full"
            style={{ background: color, width: '7px', height: '7px' }}
            animate={hovered
              ? { scale: [1, 1.9, 1], opacity: [0.6, 1, 0.6] }
              : { scale: 1, opacity: 0.25 }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating micro-particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size + 'px',
              height: p.size + 'px',
              left: p.x + '%',
              top: p.y + '%',
              background: color,
              zIndex: 0,
            }}
            animate={hovered ? {
              y:       [0, -18, 0],
              x:       [0, p.dx, 0],
              opacity: [0, 0.65, 0],
              scale:   [0.4, 1.3, 0.4],
            } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* BG radial */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 10% 10%, ' + color + '15 0%, transparent 65%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
            zIndex: 0,
          }}
        />

        {/* Icon */}
        <div
          ref={iconRef}
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: color + '18',
            border: '1px solid ' + color + '40',
            transform: 'translateZ(22px)',
            boxShadow: hovered ? '0 0 22px ' + color + '45' : 'none',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          <Icon size={22} style={{ color }} />
        </div>

        {/* Text */}
        <div className="relative z-10 flex-1" style={{ transform: 'translateZ(12px)' }}>
          <h3 className="font-['Syne'] font-semibold text-white text-[1.1rem] mb-2.5">
            {title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Tags */}
        <div className="relative z-10 flex flex-wrap gap-2" style={{ transform: 'translateZ(8px)' }}>
          {tags.map((tag, ti) => (
            <motion.span
              key={tag}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 3, opacity: 0.5 }}
              transition={{ duration: 0.3, delay: ti * 0.07 }}
              className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-white/[0.05] text-white/60"
              style={{
                border: '1px solid ' + (hovered ? color + '40' : 'rgba(255,255,255,0.08)'),
                transition: 'border-color 0.3s ease',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Learn more */}
        <div
          className="relative z-10 flex items-center gap-1.5 text-xs font-semibold"
          style={{
            color: hovered ? color : 'rgba(255,255,255,0.25)',
            transform: 'translateZ(14px)',
            transition: 'color 0.3s ease',
          }}
        >
          <Sparkles size={11} />
          Learn more
          <motion.span
            animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'inline-flex' }}
          >
            <ArrowUpRight size={13} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(229,26,75,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div ref={headRef} className="text-center mb-16">
          <span className="section-label mb-5 inline-flex">Our Services</span>
          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-tight mb-5">
            Everything you need to{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">ship world-class products</span>
          </h2>
          <p className="text-white/45 text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed max-w-xl mx-auto">
            From strategy and design to development and launch — we cover the full spectrum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
