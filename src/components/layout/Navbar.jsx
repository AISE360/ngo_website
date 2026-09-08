import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, HeartHandshake } from 'lucide-react'
import { Button } from '../ui/Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/programs', label: 'Our Work' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/blog', label: 'Updates' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement bar — Antara style */}
      <div className="bg-brand-tealDeep text-white text-center text-[12px] sm:text-[13px] py-2 px-4 tracking-wide">
        <span className="opacity-80">Kondhwa, Pune • </span>
        <Link to="/get-involved" className="underline underline-offset-4 decoration-brand-coral hover:text-brand-coralLight font-semibold">
          Volunteer with us this month
        </Link>
        <span className="opacity-80 hidden sm:inline"> • Tailoring + Coding batches open</span>
      </div>

      <div className={`transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(11,43,54,0.12)]' : 'bg-white shadow-sm'}`}>
        <div className="container-lg flex items-center justify-between px-5 h-[74px]">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="Thoughtful Hearts Foundation" className="h-12 w-12 rounded-2xl object-cover bg-white shadow-sm ring-1 ring-brand-sandDark" />
            <span className="leading-tight">
              <span className="block font-display font-bold text-brand-tealDeep text-[17px]">Thoughtful Hearts</span>
              <span className="block text-[11px] font-bold tracking-[0.24em] text-brand-coralDark uppercase">Foundation</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) => `px-3.5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all ${isActive ? 'text-brand-coralDark bg-brand-coralSoft' : 'text-brand-charcoal/70 hover:text-brand-tealDeep hover:bg-brand-sand/70'}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/donate">
              <Button variant="coral" size="md"><HeartHandshake className="w-4 h-4" /> Donate Now</Button>
            </Link>
          </div>

          <button className="lg:hidden p-2.5 rounded-xl hover:bg-brand-sand" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[560px]' : 'max-h-0'}`}>
          <div className="px-5 pb-6 pt-1 space-y-1 bg-white border-t border-brand-sandDark/60">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
                className={({ isActive }) => `block px-4 py-3 rounded-2xl text-[15px] font-semibold ${isActive ? 'bg-brand-coralSoft text-brand-coralDark' : 'text-brand-charcoal/75 hover:bg-brand-sand'}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/donate" onClick={() => setOpen(false)} className="block pt-3">
              <Button variant="coral" className="w-full" size="lg">Donate Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
