import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight, Globe, Smartphone, Palette, Cpu } from 'lucide-react'

const solutionItems = [
  {
    title: 'Web Development',
    desc: 'High performance React, Next.js & Webflow sites',
    icon: Globe,
    color: '#E51A4B',
    href: '#services',
  },
  {
    title: 'Mobile App Dev',
    desc: 'Native & cross-platform iOS/Android apps',
    icon: Smartphone,
    color: '#3B82F6',
    href: '#services',
  },
  {
    title: 'UI/UX & Branding',
    desc: 'User-centered interfaces & design systems',
    icon: Palette,
    color: '#E2EC07',
    href: '#services',
  },
  {
    title: 'SaaS & Digital Products',
    desc: 'Scalable cloud architectures & web apps',
    icon: Cpu,
    color: '#10B981',
    href: '#services',
  },
]


const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'Company',  href: '#stats' },
  { label: 'Solution', href: '#services', hasDropdown: true },
  { label: 'Connect',  href: '#cta' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const timeoutRef = useRef(null)

  // ── Scroll detection for navbar background only ────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (_label, href) => {
    setMobileOpen(false)
    setDropdownOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const openDropdown  = () => { clearTimeout(timeoutRef.current); setDropdownOpen(true) }
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150) }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        {/* Signature Red Top Bar — stays permanently on home & navigation */}
        <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-[#E51A4B] via-[#FF3B6B] to-[#E51A4B] shadow-[0_0_15px_#E51A4B] z-50 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 flex items-center justify-between h-[76px]">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0" onClick={() => setActiveLink('Home')}>
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L16 4L4 16Z"   fill="#00E5FF" />
                <path d="M12 10H22V30H12Z"   fill="#E51A4B" />
                <path d="M22 4L30 4L22 12Z"  fill="#E2EC07" />
                <path d="M22 18L30 26H22Z"   fill="#3B82F6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Syne'] font-extrabold text-base tracking-wider leading-none text-white">
                TCONGS
              </span>
              <span className="font-['Syne'] font-bold text-[10px] tracking-[0.25em] text-[#00E5FF] leading-tight">
                INFOTECH
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 relative">
            {navLinks.map((link) => {
              const isDropdown = link.hasDropdown
              const isActive   = link.label === 'Home'

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={isDropdown ? openDropdown  : undefined}
                  onMouseLeave={isDropdown ? closeDropdown : undefined}
                >
                  <button
                    onClick={() => handleNavClick(link.label, link.href)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isDropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180 text-[#E51A4B]' : 'text-white/50'
                        }`}
                      />
                    )}

                    {/* Active underline — single shared layout animation */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#E51A4B] shadow-[0_0_8px_#E51A4B]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {isDropdown && (
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          key="sol-dropdown"
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0,  scale: 1    }}
                          exit  ={{ opacity: 0, y: 8,  scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px]
                                     bg-[#0e0e11]/95 backdrop-blur-2xl border border-white/10
                                     rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50"
                        >
                          <div className="grid gap-1">
                            {solutionItems.map((item) => {
                              const ItemIcon = item.icon
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => { handleNavClick('Solution', item.href); setDropdownOpen(false) }}
                                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.06] transition-all group"
                                >
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                                  >
                                    <ItemIcon size={18} style={{ color: item.color }} />
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-white group-hover:text-[#E51A4B] transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-[11px] text-white/40 leading-snug mt-0.5">
                                      {item.desc}
                                    </div>
                                  </div>
                                </a>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Launch CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveLink('Connect')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E51A4B] text-white text-xs font-semibold rounded-full
                         hover:bg-[#ff2259] transition-all duration-300 tracking-wide shadow-[0_0_20px_rgba(229,26,75,0.4)]
                         hover:shadow-[0_0_30px_rgba(229,26,75,0.7)]"
            >
              <span>Launch Your Idea</span>
              <span className="text-sm">🚀</span>
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full
                       bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0   }}
            exit  ={{ opacity: 0, y: -16  }}
            transition={{ duration: 0.3 }}
            className="fixed top-[76px] inset-x-0 z-40 md:hidden
                       bg-[#0a0a0d]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.label, link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      false
                        ? 'text-white bg-[#E51A4B]/15 border border-[#E51A4B]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && <ChevronDown size={14} className="text-white/40" />}
                  </button>

                  {link.hasDropdown && (
                    <div className="pl-4 mt-1 grid gap-1 border-l border-white/10 ml-4 py-1">
                      {solutionItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => handleNavClick('Solution', item.href)}
                          className="px-3 py-2 text-xs text-white/60 hover:text-white flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="#cta"
                onClick={() => handleNavClick('Connect', '#cta')}
                className="mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E51A4B] text-white text-sm font-semibold rounded-full shadow-[0_0_20px_rgba(229,26,75,0.4)]"
              >
                <span>Launch Your Idea</span><span>🚀</span>
                <ArrowUpRight size={16} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
