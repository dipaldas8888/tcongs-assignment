import { GitBranch, Send, Link, AtSign, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Services: [
    'UI/UX Design',
    'Web Development',
    'Mobile App Dev',
    'Branding & Identity',
    'Figma to Webflow',
    'SaaS Design',
  ],
  Company: [
    'About Us',
    'Our Process',
    'Case Studies',
    'Careers',
    'Blog',
  ],
  Contact: [
    'hello@tcongsinfotech.com',
    '+91 98765 43210',
    'Mumbai, India',
  ],
}

const socials = [
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: AtSign,    href: '#', label: 'Twitter/X' },
  { icon: Link,      href: '#', label: 'LinkedIn' },
  { icon: Send,      href: '#', label: 'Telegram' },
]

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] pt-20 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#E51A4B] flex items-center justify-center">
                <span className="font-['Syne'] font-extrabold text-white text-sm">T</span>
              </div>
              <span className="font-['Syne'] font-bold text-lg text-white tracking-tight">
                tcongs<span className="text-[#E51A4B]">.</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              A UI/UX design agency delivering user-centered digital experiences for web, mobile, and SaaS products worldwide.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08]
                             flex items-center justify-center text-white/50
                             hover:text-white hover:bg-[#E51A4B]/20 hover:border-[#E51A4B]/40
                             transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-['Syne'] font-semibold text-white text-sm mb-5 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/45 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Tcongs Infotech. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
