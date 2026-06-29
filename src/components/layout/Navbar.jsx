import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import logo from '../../assets/logo.webp'

const navLinks = [
  { to: '/',               label: 'Home' },
  { to: '/about',          label: 'About' },
  { to: '/education',      label: 'Education' },
  { to: '/health',         label: 'Health Fund' },
  { to: '/marriage-fund',  label: 'Marriage Fund' },
  { to: '/gallery',        label: 'Gallery' },
  { to: '/contact',        label: 'Contact' },
]

export function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark shadow-nav border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-lg flex items-center justify-between px-5 sm:px-6 h-[72px]">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <img
              src={logo}
              alt="Al-Huda Welfare Society"
              className="h-11 w-11 rounded-xl object-contain bg-white p-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block font-display font-bold text-white text-[15px] leading-tight tracking-tight">
              Al-Huda
            </span>
            <span className="block text-[11px] text-white/60 leading-tight mt-0.5 font-body font-medium tracking-wide">
              Welfare Society
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center px-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/15'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            to="/submit-case"
            className="text-xs text-white/60 hover:text-brand-gold transition-colors font-medium whitespace-nowrap"
          >
            Submit a Case
          </Link>
          <Link to="/donate">
            <Button variant="gold" size="sm" className="whitespace-nowrap shadow-gold">
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-all btn-no-flash ml-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-dark border-t border-white/10 px-5 pt-3 pb-6 space-y-1">
          {navLinks.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white/15 text-white pl-5 border-l-2 border-brand-gold'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`
              }
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-4 flex flex-col gap-2.5 border-t border-white/10 mt-3">
            <Link to="/donate" onClick={() => setOpen(false)}>
              <Button variant="gold" className="w-full">Donate Now</Button>
            </Link>
            <Link to="/submit-case" onClick={() => setOpen(false)}>
              <Button variant="outline-white" className="w-full">Submit a Case</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
