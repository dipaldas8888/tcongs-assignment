import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const logos = [
  { name: 'Figma',      icon: '◈' },
  { name: 'Webflow',    icon: 'W' },
  { name: 'React',      icon: '⚛' },
  { name: 'Next.js',    icon: 'N' },
  { name: 'Flutter',    icon: '◆' },
  { name: 'Node.js',    icon: '⬡' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Tailwind',   icon: '≋' },
  { name: 'Firebase',   icon: '🔥' },
  { name: 'AWS',        icon: '☁' },
]

// Duplicate for seamless loop
const allLogos = [...logos, ...logos]

export default function LogoTicker() {
  return (
    <div className="relative py-14 overflow-hidden border-y border-white/[0.06]"
         style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)' }}>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 z-10
                      bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10
                      bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

      {/* Label */}
      <p className="text-center text-white/25 text-xs font-semibold uppercase tracking-widest mb-8">
        Technologies we master
      </p>

      {/* Ticker */}
      <div className="flex overflow-hidden">
        <div className="ticker-track flex items-center gap-12 whitespace-nowrap">
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 group shrink-0 cursor-default"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-xl
                               bg-white/[0.05] border border-white/[0.08]
                               text-white/50 font-bold text-base
                               group-hover:text-[#E51A4B] group-hover:border-[#E51A4B]/30
                               group-hover:bg-[#E51A4B]/08 transition-all duration-300">
                {logo.icon}
              </span>
              <span className="text-white/40 text-sm font-medium tracking-wide
                               group-hover:text-white/70 transition-colors duration-300">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
