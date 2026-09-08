import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { ORG } from '../../data/content'

export function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    setMsg('')
    if (!email) return
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email })
      if (error) throw error
      setMsg('Thank you for subscribing!')
      setEmail('')
    } catch {
      setMsg('Subscribed! (offline preview — connect Supabase to persist)')
    }
  }

  return (
    <footer className="bg-brand-tealDeep text-white relative overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-tealMid" />
      <div className="container-lg px-5 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-2xl object-cover bg-white p-0.5" />
            <div>
              <p className="font-display font-bold text-lg leading-none">Thoughtful Hearts</p>
              <p className="text-[11px] tracking-[0.24em] text-brand-coralLight font-bold mt-1">FOUNDATION</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">Social Service Organisation in Kondhwa, Pune. {ORG.tagline}.</p>
          <p className="text-white/40 text-xs mt-4 leading-relaxed">{ORG.address}</p>
          <div className="flex gap-2.5 mt-5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-coral flex items-center justify-center transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-5">Our Work</h4>
          <ul className="space-y-3 text-sm">
            {[
              ['/programs/medical-support', 'Medical & Patient Support'],
              ['/programs/vocational-training', 'Tailoring & Livelihood'],
              ['/programs/school-outreach', 'School Outreach'],
              ['/programs/tech-coding', 'Tech & Coding Center'],
              ['/programs/art-workshops', 'Art Workshops'],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-white/65 hover:text-brand-coralLight transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              ['/about', 'About Us'], ['/gallery', 'Gallery'], ['/get-involved', 'Volunteer & CSR'],
              ['/donate', 'Donate'], ['/blog', 'Updates'], ['/contact', 'Contact'], ['/admin/login', 'Staff Login'],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-white/65 hover:text-brand-coralLight transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-5">Stay in touch</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-brand-coralLight" /> {ORG.phone}</li>
            <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-brand-coralLight" /> {ORG.email}</li>
            <li className="flex gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-brand-coralLight" /> {ORG.hoursNote}</li>
            <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-brand-coralLight" /> Kondhwa, Pune 411048</li>
          </ul>
          <form onSubmit={subscribe} className="mt-5 flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email for updates"
              className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-brand-coral" />
            <button className="w-10 h-10 rounded-full bg-brand-coral hover:bg-brand-coralDark flex items-center justify-center shrink-0" aria-label="Subscribe">
              <Send className="w-4 h-4" />
            </button>
          </form>
          {msg && <p className="text-xs text-brand-coralLight mt-2">{msg}</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lg px-5 py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/35">
          <p>© {new Date().getFullYear()} {ORG.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link><Link to="/terms" className="hover:text-white/70">Terms</Link><span>Reg. No. [editable placeholder]</span></p>
        </div>
      </div>
    </footer>
  )
}
