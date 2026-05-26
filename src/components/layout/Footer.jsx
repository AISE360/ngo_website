import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import logo from '../../assets/logo.png'

const causes = [
  { to: '/education',     label: 'Education Support' },
  { to: '/health',        label: 'Health Fund' },
  { to: '/marriage-fund', label: 'Marriage Fund' },
  { to: '/sponsor',       label: 'Sponsor a Child' },
]

const quickLinks = [
  { to: '/about',       label: 'About Us' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/submit-case', label: 'Submit a Case' },
  { to: '/donate',      label: 'Donate Now' },
  { to: '/contact',     label: 'Contact' },
  { to: '/admin/login', label: 'Staff Login' },
]

export function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      <div className="container-lg px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Al-Huda" className="h-14 w-14 rounded-xl object-contain bg-white p-1 shadow-sm" />
              <div>
                <span className="block font-display font-bold text-white text-base leading-tight">Al-Huda Welfare Society</span>
                <span className="block text-xs text-brand-gold leading-tight mt-0.5">هدىٌ للإنسان .. عطاءٌ بلا حدود</span>
              </div>
            </div>
            <p className="text-sm text-green-200 leading-relaxed">
              Empowering 165+ families through education, healthcare, and marriage support since 2010.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook,  href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube,   href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors duration-200 btn-no-flash"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Causes */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Our Causes</h4>
            <ul className="space-y-2.5">
              {causes.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-green-200 hover:text-white hover:pl-1 transition-all duration-200">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-green-200 hover:text-white hover:pl-1 transition-all duration-200">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: '123 Welfare Colony, Hyderabad, Telangana 500001' },
                { icon: Phone,  text: '+91 98765 43210',          href: 'tel:+919876543210' },
                { icon: Mail,   text: 'info@alhudawelfare.org',   href: 'mailto:info@alhudawelfare.org' },
              ].map(({ icon: Icon, text, href }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                  {href
                    ? <a href={href} className="text-sm text-green-200 hover:text-white transition-colors">{text}</a>
                    : <span className="text-sm text-green-200">{text}</span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Bottom bar */}
      <div className="py-4 px-4 sm:px-6">
        <div className="container-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-400">
          <p>© {new Date().getFullYear()} Al-Huda Welfare Society. All rights reserved.</p>
          <p>Registered NGO · Hyderabad, Telangana</p>
        </div>
      </div>
    </footer>
  )
}
