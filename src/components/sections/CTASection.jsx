import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export default function CTASection() {
  return (
    <section id="cta" className="py-28 relative overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E51A4B]/40 to-transparent" />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229,26,75,0.08) 0%, transparent 70%)' }} />

      {/* Animated orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full float-anim pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(229,26,75,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-60 h-60 rounded-full float-anim2 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(226,236,7,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                       bg-[#E2EC07]/10 border border-[#E2EC07]/25 text-[#E2EC07]
                       text-xs font-semibold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#E2EC07] animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-['Syne'] font-extrabold text-white leading-[1.05] tracking-tight
                       text-[clamp(2.4rem,5vw,4.5rem)] mb-6"
          >
            Ready to build something{' '}
            <span className="gradient-text">extraordinary?</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-white/45 text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed mb-12 max-w-xl mx-auto"
          >
            Let's discuss your vision and transform it into a product users will love. No fluff — just great design and solid execution.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <MagneticButton
              className="flex items-center gap-3 px-8 py-4 bg-[#E51A4B] text-white font-semibold
                         text-sm rounded-full hover:bg-[#ff2259] transition-colors duration-300
                         shadow-[0_0_0_0_rgba(229,26,75,0)] hover:shadow-[0_0_40px_rgba(229,26,75,0.5)]"
            >
              <Mail size={16} />
              Start a Project
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              className="flex items-center gap-3 px-8 py-4 bg-white/[0.05] text-white font-semibold
                         text-sm rounded-full border border-white/[0.12]
                         hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300"
            >
              <MessageCircle size={16} />
              Let's Chat
            </MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-white/25 text-xs"
          >
            {['Free Consultation', '48h Response Time', 'NDA Available', 'Remote-Friendly'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E51A4B]/60" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
