import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import logo from '../../assets/logo.png'

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
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll() // check on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-brand-green ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      {/* ── Main bar ── */}
      <div className="container-lg flex items-center justify-between px-4 sm:px-6 h-[72px]">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Al-Huda Welfare Society"
            className="h-12 w-12 rounded-xl object-contain bg-white p-0.5 shadow group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
          />
          <div className="hidden sm:block">
            <span className="block font-display font-bold text-white text-sm leading-tight">
              Al-Huda Welfare Society
            </span>
            <span className="block text-[11px] text-brand-gold leading-tight tracking-wide mt-0.5">
              هدىٌ للإنسان .. عطاءٌ بلا حدود
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center px-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-white/20 text-white border-b-2 border-brand-gold'
                    : 'text-green-100 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            to="/submit-case"
            className="text-xs text-green-200 hover:text-brand-gold transition-colors font-medium whitespace-nowrap"
          >
            Submit a Case
          </Link>
          <Link to="/donate">
            <Button variant="gold" size="sm" className="whitespace-nowrap">
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors btn-no-flash ml-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile menu (slides down) ── */}
      {open && (
        <div className="lg:hidden bg-brand-green border-t border-white/10 px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white border-l-4 border-brand-gold pl-3'
                    : 'text-green-100 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-2">
            <Link to="/donate" onClick={() => setOpen(false)}>
              <Button variant="gold" className="w-full">Donate Now</Button>
            </Link>
            <Link to="/submit-case" onClick={() => setOpen(false)}>
              <Button variant="outline-white" className="w-full">Submit a Case</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
