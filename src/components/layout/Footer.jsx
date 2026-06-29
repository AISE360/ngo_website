import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import logo from '../../assets/logo.webp'

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
    <footer className="bg-brand-charcoal text-white relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="h-1 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green" />

      <div className="container-lg px-5 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1" data-aos="fade-up">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Al-Huda" className="h-12 w-12 rounded-xl object-contain bg-white p-1 shadow-sm" />
              <div>
                <span className="block font-display font-bold text-white text-base leading-tight">Al-Huda</span>
                <span className="block text-xs text-white/40 leading-tight mt-0.5 font-body">Welfare Society</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Empowering 165+ families through education, healthcare, and marriage support since 2010 in Hyderabad.
            </p>
            <p className="text-sm text-brand-gold/80 italic font-display">
              "هدىٌ للإنسان .. عطاءٌ بلا حدود"
            </p>
          </div>

          {/* Our Causes */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-body font-semibold text-white/90 mb-5 text-sm tracking-wide uppercase">Our Causes</h4>
            <ul className="space-y-3">
              {causes.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="group text-sm text-white/50 hover:text-brand-gold transition-all duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 group-hover:bg-brand-gold transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-body font-semibold text-white/90 mb-5 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="group text-sm text-white/50 hover:text-brand-gold transition-all duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 group-hover:bg-brand-gold transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-body font-semibold text-white/90 mb-5 text-sm tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'Welfare Colony, Hyderabad, Telangana' },
                { icon: Phone,  text: '+91 98765 43210',          href: 'tel:+919876543210' },
                { icon: Mail,   text: 'info@alhudawelfare.org',   href: 'mailto:info@alhudawelfare.org' },
              ].map(({ icon: Icon, text, href }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-brand-gold/70" />
                  </div>
                  {href
                    ? <a href={href} className="text-sm text-white/50 hover:text-white transition-colors">{text}</a>
                    : <span className="text-sm text-white/50">{text}</span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Donate CTA in footer */}
        <div className="mt-14 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4" data-aos="fade-up">
          <div>
            <p className="font-display text-lg font-bold text-white">Ready to make a difference?</p>
            <p className="text-sm text-white/40 mt-1">100% of your donation reaches the beneficiary.</p>
          </div>
          <Link to="/donate" className="group">
            <span className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-gold hover:shadow-lg">
              Donate Now
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-lg px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Al-Huda Welfare Society. All rights reserved.</p>
          <p>Registered NGO · Hyderabad, Telangana</p>
        </div>
      </div>
    </footer>
  )
}
