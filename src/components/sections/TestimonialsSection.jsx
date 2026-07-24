import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Rohan Mehta',
    role: 'Founder & CEO',
    company: 'FinStack',
    avatar: 'RM',
    avatarBg: '#E51A4B',
    stars: 5,
    text: "Tcongs transformed our complex SaaS dashboard into something users actually love. The attention to detail in their design system was incredible — every interaction felt intentional and polished.",
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Head of Product',
    company: 'NovaMed',
    avatar: 'SW',
    avatarBg: '#7C3AED',
    stars: 5,
    text: "We came to Tcongs with a vague idea and left with a full brand identity, design system, and a Webflow site that converts. Their process is thorough, their communication is top-notch.",
  },
  {
    id: 3,
    name: 'Arjun Kapoor',
    role: 'CTO',
    company: 'LogiFlow',
    avatar: 'AK',
    avatarBg: '#E2EC07',
    stars: 5,
    text: "The Figma-to-React conversion was flawless. Pixel-perfect, performant, and the animations they added elevated our product to a whole new level. Highly recommend the entire team.",
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Product Designer',
    company: 'EdTech Labs',
    avatar: 'PS',
    avatarBg: '#10B981',
    stars: 5,
    text: "Working with Tcongs on our mobile app was a seamless experience. They understood our users deeply and created flows that reduced our onboarding drop-off by 40%. Real business impact.",
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection(1)
    setActive((a) => (a + 1) % testimonials.length)
  }

  const t = testimonials[active]

  const variants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
  }

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">Testimonials</span>
          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(2rem,4vw,3.2rem)]
                         tracking-tight mb-4">
            Loved by teams <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-white/45 text-sm max-w-md mx-auto">
            Don't take our word for it — here's what our clients say.
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl p-10 sm:p-14 relative overflow-hidden"
            >
              {/* Big quote icon */}
              <Quote
                size={64}
                className="absolute top-8 right-8 opacity-[0.06] text-white"
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#E2EC07] fill-[#E2EC07]" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="font-['Inter'] text-white/80 text-[clamp(1rem,2vw,1.2rem)]
                                     leading-relaxed mb-10 relative z-10">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0
                             font-['Syne'] font-bold text-sm text-white"
                  style={{ background: t.avatarBg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-['Syne'] font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-7 h-2 bg-[#E51A4B]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={prev}
                className="w-11 h-11 rounded-full flex items-center justify-center
                           glass-card border border-white/[0.1] text-white/50
                           hover:text-white hover:border-[#E51A4B]/40 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center
                           bg-[#E51A4B] text-white hover:bg-[#ff2259] transition-all duration-300"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mini cards below */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {testimonials.map((tm, i) => (
            <motion.button
              key={tm.id}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
              className={`glass-card rounded-xl p-4 text-left transition-all duration-300 ${
                i === active ? 'border-[#E51A4B]/40 bg-[#E51A4B]/08' : 'hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: tm.avatarBg }}
                >
                  {tm.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{tm.name}</p>
                  <p className="text-white/35 text-[10px] truncate">{tm.company}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
