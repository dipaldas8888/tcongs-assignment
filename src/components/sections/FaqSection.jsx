import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus, HelpCircle, MessageCircle, Sparkles, ArrowRight, Zap, Shield, Globe, Rocket } from 'lucide-react'
import Faq3DCanvas from '../3d/Faq3DCanvas'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Services', 'Process', 'Pricing', 'Support']

const faqs = [
  {
    q: 'What services does Tcongs Infotech offer?',
    a: 'We offer end-to-end digital services including Web Development (React, Next.js, Webflow), Mobile App Development (Flutter, React Native), UI/UX & Brand Design, SaaS Product Design, Digital Marketing, and Cloud & AI integrations. Our team covers the full product lifecycle from strategy to launch.',
    category: 'Services',
    icon: Globe,
    color: '#E51A4B',
  },
  {
    q: 'How long does it take to build a website or app?',
    a: 'Timelines depend on scope. A landing page takes 5–10 days, a full website 2–4 weeks, and complex web/mobile apps typically 6–12 weeks. We share a detailed project plan before starting so you always know what to expect.',
    category: 'Process',
    icon: Rocket,
    color: '#3B82F6',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. We work with clients across North America, Europe, Southeast Asia, and the Middle East. Our communication is async-friendly with overlap hours available for most time zones.',
    category: 'Support',
    icon: Globe,
    color: '#10B981',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We offer flexible engagement models: Fixed Price for well-defined projects, Dedicated Team for ongoing development, and Retainer plans for continuous support. Pricing is transparent with no hidden fees — contact us for a free quote.',
    category: 'Pricing',
    icon: Zap,
    color: '#E2EC07',
  },
  {
    q: 'Can you help grow my business after development?',
    a: 'Yes! Post-launch we provide maintenance, SEO optimization, analytics tracking, A/B testing, and digital marketing campaigns. We become your long-term tech partner — not just a vendor.',
    category: 'Support',
    icon: Shield,
    color: '#9333EA',
  },
  {
    q: 'What makes Tcongs Infotech different?',
    a: 'We combine strategic thinking with pixel-perfect execution. Every project gets dedicated designers and developers with deep domain expertise. We\'re obsessed with performance, accessibility, and real business outcomes — not just aesthetics.',
    category: 'Services',
    icon: Sparkles,
    color: '#F97316',
  },
  {
    q: 'How can I get started?',
    a: 'It\'s simple! Book a free 30-minute discovery call via our "Launch Your Idea" button. We\'ll understand your goals, suggest a roadmap, and send you a proposal within 48 hours.',
    category: 'Process',
    icon: MessageCircle,
    color: '#E51A4B',
  },
]

function FaqItem({ item, index, isOpen, onToggle }) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        rotateX: -2.5,
        rotateY: 3,
        scale: 1.012,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`group relative rounded-2xl border transition-all duration-400 cursor-pointer overflow-hidden ${
        isOpen
          ? 'border-[#E51A4B]/40 bg-[#E51A4B]/[0.04] shadow-[0_0_35px_rgba(229,26,75,0.15)]'
          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
      }`}
      onClick={onToggle}
    >
      {/* Accent left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-full transition-all duration-300"
        style={{ background: isOpen ? item.color : 'transparent' }}
      />

      {/* Glow on open */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-30"
             style={{ background: `radial-gradient(ellipse 60% 40% at 0% 50%, ${item.color}20, transparent)` }} />
      )}

      {/* Question row */}
      <button className="w-full flex items-center gap-4 px-6 py-5 text-left">
        {/* Icon badge */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? `${item.color}20` : 'rgba(255,255,255,0.05)',
            border: isOpen ? `1px solid ${item.color}40` : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Icon size={16} style={{ color: isOpen ? item.color : 'rgba(255,255,255,0.4)' }} />
        </div>

        <span className={`flex-1 font-['Syne'] font-semibold text-sm sm:text-[0.95rem] leading-snug transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-white/75 group-hover:text-white'
        }`}>
          {item.q}
        </span>

        {/* Toggle icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-[#E51A4B] text-white shadow-[0_0_15px_rgba(229,26,75,0.5)]' : 'bg-white/[0.06] text-white/50'
          }`}
        >
          <Plus size={14} strokeWidth={2.5} />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }}
          >
            <div className="px-6 pb-6 pl-[72px]">
              <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIdx,   setOpenIdx]   = useState(1)   // second open by default
  const [activeTab, setActiveTab] = useState('All')
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline stagger reveal
      gsap.fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const filtered = activeTab === 'All' ? faqs : faqs.filter(f => f.category === activeTab)

  return (
    <section id="faq" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* ── 3D Interactive WebGL Canvas Background ───────── */}
      <Faq3DCanvas />

      {/* BG glows */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(229,26,75,0.05) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
           style={{ background: 'radial-gradient(circle at 100% 100%, rgba(59,130,246,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* ── Section header ─────────────────────────────────── */}
        <div ref={headlineRef} className="text-center mb-16 opacity-0">
          {/* Label pill */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6
                       bg-[#E51A4B]/10 border border-[#E51A4B]/25 text-[#E51A4B] text-xs font-bold uppercase tracking-widest"
          >
            <HelpCircle size={12} /> FAQS
          </motion.div>

          <h2 className="font-['Syne'] font-extrabold text-white text-[clamp(2.2rem,4.5vw,3.5rem)] tracking-tight leading-tight mb-5">
            Questions?{' '}
            <span className="gradient-text">We've Got Answers</span>
          </h2>
          <p className="text-white/50 text-[clamp(0.9rem,1.5vw,1.05rem)] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about working with Tcongs Infotech.
            Can't find your answer?{' '}
            <a href="#cta" className="text-[#E51A4B] hover:underline font-medium">Talk to us directly.</a>
          </p>
        </div>

        {/* ── Two-column layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: sticky sidebar */}
          <div className="lg:col-span-4 lg:sticky top-28 space-y-6">

            {/* Category filter tabs */}
            <div>
              <p className="text-white/35 text-[11px] uppercase tracking-widest font-semibold mb-3">Browse by topic</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveTab(cat); setOpenIdx(null) }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-250 ${
                      activeTab === cat
                        ? 'bg-[#E51A4B] text-white shadow-[0_0_15px_rgba(229,26,75,0.4)]'
                        : 'bg-white/[0.05] text-white/55 border border-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Still have questions CTA card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative glass-card rounded-2xl p-6 border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl"
                   style={{ background: 'radial-gradient(circle at 100% 0%, rgba(229,26,75,0.2), transparent 60%)' }} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#E51A4B]/15 border border-[#E51A4B]/30 flex items-center justify-center mb-4">
                  <MessageCircle size={18} className="text-[#E51A4B]" />
                </div>
                <h3 className="font-['Syne'] font-bold text-white text-base mb-1.5">
                  Still have questions?
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  Our team is happy to answer anything that's on your mind.
                </p>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2
                             bg-[#E51A4B] rounded-full hover:bg-[#ff2259] transition-colors shadow-[0_0_20px_rgba(229,26,75,0.35)]"
                >
                  Book a Free Call <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>

            {/* Glowing stat pills */}
            <div className="space-y-2.5">
              {[
                { label: '< 2hr', desc: 'Avg response time',       color: '#10B981' },
                { label: '98%',   desc: 'Client satisfaction rate', color: '#E2EC07' },
                { label: '50+',   desc: 'Projects completed',        color: '#3B82F6' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 border border-white/[0.06]">
                  <span className="font-['Syne'] font-extrabold text-lg leading-none" style={{ color: stat.color }}>
                    {stat.label}
                  </span>
                  <span className="text-xs text-white/45">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: accordion list */}
          <div className="lg:col-span-8 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {filtered.map((item, idx) => (
                  <FaqItem
                    key={item.q}
                    item={item}
                    index={idx}
                    isOpen={openIdx === idx}
                    onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
