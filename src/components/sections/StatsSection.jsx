import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50,  suffix: '+', label: 'Projects Delivered',  desc: 'Across web, mobile & SaaS' },
  { value: 30,  suffix: '+', label: 'Happy Clients',       desc: 'Worldwide partnerships' },
  { value: 3,   suffix: '+', label: 'Years Experience',    desc: 'Crafting digital products' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', desc: 'We obsess over quality' },
]

function StatCard({ stat, index }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            { val: 0 },
            {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate() {
                if (el) el.textContent = Math.round(this.targets()[0].val)
              },
            }
          )
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    if (el) observer.observe(el.parentElement)
    return () => observer.disconnect()
  }, [stat.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-2xl p-8 text-center overflow-hidden"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ boxShadow: 'inset 0 0 0 1px rgba(229,26,75,0.3)' }} />

      {/* Bg glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: 'radial-gradient(circle, rgba(229,26,75,0.15) 0%, transparent 70%)' }} />

      {/* Number */}
      <div className="flex items-end justify-center gap-0.5 mb-2">
        <span
          ref={numRef}
          className="font-['Syne'] font-extrabold text-[3.5rem] leading-none text-white"
        >
          0
        </span>
        <span className="font-['Syne'] font-extrabold text-[3.5rem] leading-none text-[#E51A4B]">
          {stat.suffix}
        </span>
      </div>

      <h3 className="font-['Syne'] font-semibold text-white text-base mb-1.5">
        {stat.label}
      </h3>
      <p className="text-white/35 text-xs">{stat.desc}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)' }} />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">By The Numbers</span>
          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(2rem,4vw,3rem)]
                         tracking-tight mb-4">
            Trusted by <span className="gradient-text">ambitious teams</span>
          </h2>
          <p className="text-white/45 text-sm max-w-md mx-auto">
            Numbers that speak to our dedication, quality, and impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
