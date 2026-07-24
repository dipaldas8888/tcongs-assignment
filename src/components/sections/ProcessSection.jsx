import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, PenTool, Layout, Code2, CheckCircle2, Rocket, ArrowRight, Zap, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Business & Market Analysis',
    desc: 'We understand your business goals, target audience, and competitors. This helps us define the right strategy to build a strong digital foundation.',
    icon: Search,
    color: '#E51A4B',
    stats: ['Goal Alignment', 'User Insights', 'Market Fit'],
    metric: { label: 'Research Depth', value: '97%' },
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '02',
    title: 'Planning',
    subtitle: 'Strategy & Architecture',
    desc: 'We create detailed project plans, user flows, and system architecture to ensure smooth development and clear execution.',
    icon: Layout,
    color: '#3B82F6',
    stats: ['User Flows', 'Wireframes', 'Tech Stack'],
    metric: { label: 'Timeline Accuracy', value: '94%' },
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'UI/UX & Branding',
    desc: 'Our team designs modern, user-friendly interfaces that enhance user experience and reflect your brand identity.',
    icon: PenTool,
    color: '#E2EC07',
    stats: ['UI Components', 'Design System', 'Prototype'],
    metric: { label: 'Client Satisfaction', value: '99%' },
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '04',
    title: 'Development',
    subtitle: 'Clean Code & Scalable Tech',
    desc: 'We build robust, high-performance web & mobile applications using modern frameworks and standard coding practices.',
    icon: Code2,
    color: '#10B981',
    stats: ['Frontend & Backend', 'API Integration', 'Performance'],
    metric: { label: 'Code Quality', value: '98%' },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '05',
    title: 'Testing & QA',
    subtitle: 'Quality & Performance',
    desc: 'Rigorous automated and manual testing to ensure maximum security, responsiveness, and flawless execution.',
    icon: CheckCircle2,
    color: '#9333EA',
    stats: ['Cross-Browser', 'Security Audit', 'Speed Boost'],
    metric: { label: 'Bug Free Rate', value: '99.9%' },
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '06',
    title: 'Deployment',
    subtitle: 'Launch & Continuous Growth',
    desc: 'Seamless cloud deployment, monitoring, and ongoing updates to scale your product effortlessly.',
    icon: Rocket,
    color: '#F97316',
    stats: ['Cloud Deploy', '24/7 Monitor', 'Scalability'],
    metric: { label: 'Uptime Guarantee', value: '99.9%' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  },
]

// Orbit particles around the 3D card
const ORBIT_PARTICLES = [
  { angle: 0,   r: 190, size: 5,   dur: 12, color: 'rgba(229,26,75,0.7)'   },
  { angle: 72,  r: 210, size: 3.5, dur: 16, color: 'rgba(226,236,7,0.6)'   },
  { angle: 144, r: 195, size: 4,   dur: 10, color: 'rgba(59,130,246,0.65)' },
  { angle: 216, r: 205, size: 3,   dur: 14, color: 'rgba(16,185,129,0.6)'  },
  { angle: 288, r: 185, size: 4.5, dur: 18, color: 'rgba(147,51,234,0.6)'  },
]

function OrbitRing({ color, size, delay, duration, clockwise = true }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top: '50%', left: '50%',
        marginTop: -size / 2, marginLeft: -size / 2,
        border: `1px solid ${color}`,
        boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}`,
      }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  )
}

function Process3DCard({ step, activeStep }) {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const wrapRef  = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const Icon = step.icon

  const handleMouseMove = (e) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = e.clientX - rect.left
    const cy   = e.clientY - rect.top
    const nx   = (cx / rect.width  - 0.5) * 2
    const ny   = (cy / rect.height - 0.5) * 2
    setMousePos({ x: cx, y: cy })

    gsap.to(cardRef.current, {
      rotateY:  nx * 18,
      rotateX: -ny * 12,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
    if (glowRef.current) {
      glowRef.current.style.left = cx + 'px'
      glowRef.current.style.top  = cy + 'px'
    }
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 1, ease: 'elastic.out(1, 0.5)',
      transformPerspective: 1000,
    })
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center"
      style={{ perspective: '1000px', minHeight: '520px' }}
    >
      {/* ── Orbit rings ─────────────────────────────────── */}
      <OrbitRing color={`${step.color}30`} size={460} delay={0}   duration={22} clockwise={true}  />
      <OrbitRing color={`${step.color}20`} size={520} delay={2}   duration={28} clockwise={false} />
      <OrbitRing color={`${step.color}15`} size={400} delay={1}   duration={18} clockwise={true}  />

      {/* ── Orbiting dots ───────────────────────────────── */}
      {ORBIT_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            top: '50%', left: '50%',
            marginTop: -p.size / 2, marginLeft: -p.size / 2,
          }}
          animate={{
            x: [
              Math.cos((p.angle * Math.PI) / 180) * p.r,
              Math.cos(((p.angle + 180) * Math.PI) / 180) * p.r,
              Math.cos((p.angle * Math.PI) / 180) * p.r,
            ],
            y: [
              Math.sin((p.angle * Math.PI) / 180) * p.r,
              Math.sin(((p.angle + 180) * Math.PI) / 180) * p.r,
              Math.sin((p.angle * Math.PI) / 180) * p.r,
            ],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* ── Radial glow behind card ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${step.color}22 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* ── The 3D Card itself ───────────────────────────── */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-[420px]"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Cursor glow inside */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none rounded-full z-20"
          style={{
            width: '220px', height: '220px',
            background: `radial-gradient(circle, ${step.color}25 0%, transparent 70%)`,
            transform: 'translate(-50%,-50%)',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Main card shell */}
        <div
          className="rounded-[24px] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: `1px solid ${step.color}35`,
            boxShadow: `
              0 32px 80px rgba(0,0,0,0.75),
              0 0 0 1px ${step.color}20,
              0 0 60px ${step.color}12,
              inset 0 1px 0 rgba(255,255,255,0.12)
            `,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* ── Header bar ──────────────────────────────── */}
          <div
            className="px-5 py-3.5 flex items-center justify-between border-b"
            style={{
              borderColor: `${step.color}25`,
              background: 'rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Three dot controls */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center ml-2"
                style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
              >
                <Icon size={14} style={{ color: step.color }} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white leading-tight">Phase {step.number}: {step.title}</p>
                <p className="text-[9px] text-white/40">{step.subtitle}</p>
              </div>
            </div>
            <span
              className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
            >
              Active
            </span>
          </div>

          {/* ── Image area with 3D depth layers ─────────── */}
          <div className="relative h-[240px] overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover object-center"
              style={{ transform: 'translateZ(-10px) scale(1.04)', transition: 'transform 0.6s ease' }}
            />

            {/* Holographic shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            />

            {/* Color tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${step.color}55 0%, transparent 50%)`,
              }}
            />

            {/* Top scanlines texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, transparent 1px, transparent 3px)',
                backgroundSize: '100% 4px',
              }}
            />

            {/* Stats chips — lifted in Z */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5" style={{ transform: 'translateZ(20px)' }}>
              {step.stats.map((stat) => (
                <div
                  key={stat}
                  className="px-2.5 py-1 rounded-lg text-[10px] text-white/90 font-semibold flex items-center gap-1"
                  style={{
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${step.color}40`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
                  {stat}
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom metrics bar ───────────────────────── */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: 'rgba(0,0,0,0.6)', borderTop: `1px solid ${step.color}20` }}
          >
            <div>
              <p className="text-[9px] text-white/35 uppercase tracking-wider mb-0.5">Expected Outcome</p>
              <p className="text-xs font-bold text-white">High-Impact {step.title} Deliverables</p>
            </div>

            {/* Animated metric badge */}
            <div
              className="flex flex-col items-center px-3 py-2 rounded-xl"
              style={{ background: `${step.color}15`, border: `1px solid ${step.color}35` }}
            >
              <motion.span
                className="font-['Syne'] font-extrabold text-sm leading-none"
                style={{ color: step.color }}
                key={step.number}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'back.out(1.7)' }}
              >
                {step.metric.value}
              </motion.span>
              <span className="text-[8px] text-white/40 mt-0.5">{step.metric.label}</span>
            </div>
          </div>
        </div>

        {/* ── Floating badge — 3D lifted above card ───────── */}
        <motion.div
          className="absolute -top-5 -right-5 px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}cc 100%)`,
            transform: 'translateZ(40px)',
            boxShadow: `0 8px 24px ${step.color}55`,
          }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star size={11} className="text-white" />
          <span className="text-[10px] font-bold text-white">Step {String(processSteps.findIndex(s => s.number === step.number) + 1).padStart(2,'0')} / 06</span>
        </motion.div>

        {/* ── Floating Zap chip — bottom left ─────────────── */}
        <motion.div
          className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            transform: 'translateZ(30px)',
          }}
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Zap size={11} style={{ color: step.color }} />
          <span className="text-[10px] font-semibold text-white/80">{step.metric.label}</span>
          <span className="text-[10px] font-extrabold" style={{ color: step.color }}>{step.metric.value}</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const progressLineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const currentStep = processSteps[activeStep]

  return (
    <section id="process" ref={sectionRef} className="py-28 relative overflow-hidden bg-[#080808]">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(229,26,75,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#E51A4B] text-xs font-extrabold uppercase tracking-[0.2em] mb-3">OUR PROCESS, YOUR GROWTH</p>
          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(2.2rem,4.5vw,3.6rem)] tracking-tight leading-tight mb-5">
            From Idea to Scalable Digital Solution
          </h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed font-['Inter']">
            At Tcongs Infotech, we follow a proven process to transform your ideas into high-performing digital products.
            From strategy to execution, we focus on delivering scalable and result-driven solutions.
          </p>
        </div>

        {/* Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Timeline */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-10">
            <div className="absolute top-4 bottom-4 left-3 sm:left-5 w-[2px] bg-white/10 rounded-full" />
            <div
              ref={progressLineRef}
              className="absolute top-4 bottom-4 left-3 sm:left-5 w-[2px] bg-[#E51A4B] rounded-full origin-top shadow-[0_0_10px_#E51A4B]"
            />

            <div className="space-y-8">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx
                const StepIcon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer group relative p-5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.05] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                        : 'hover:bg-white/[0.02] border border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                          : 'bg-[#080808] border-white/30 group-hover:border-white/70'
                      }`}
                      style={isActive ? { background: step.color } : {}}
                    >
                      {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>

                    <div className="flex items-start gap-4">
                      <span
                        className="font-['Syne'] font-extrabold text-lg sm:text-xl transition-colors duration-300"
                        style={{ color: isActive ? step.color : 'rgba(255,255,255,0.4)' }}
                      >
                        {step.number}
                      </span>

                      <div className="flex-1">
                        <h3 className="font-['Syne'] font-bold text-white text-lg sm:text-xl flex items-center gap-2">
                          {step.title}
                          {isActive && (
                            <motion.span
                              layoutId="activeDot"
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ background: step.color }}
                            />
                          )}
                        </h3>
                        <p className="text-xs font-semibold text-white/50 mb-2">{step.subtitle}</p>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-['Inter']">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: 3D Visual Card */}
          <div className="lg:col-span-6 sticky top-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.number}
                initial={{ opacity: 0, scale: 0.88, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotateY: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Process3DCard step={currentStep} activeStep={activeStep} />
              </motion.div>
            </AnimatePresence>

            {/* Next Phase button below card */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % processSteps.length)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentStep.color}30, ${currentStep.color}15)`,
                  border: `1px solid ${currentStep.color}50`,
                  boxShadow: `0 0 20px ${currentStep.color}20`,
                }}
              >
                Next Phase <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
