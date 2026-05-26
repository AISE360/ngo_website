import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import communityImg from '../../assets/ngo_community.png'

const contactDetails = [
  { icon: MapPin, label: 'Address',      value: '123 Welfare Colony, Tolichowki, Hyderabad – 500008' },
  { icon: Phone,  label: 'Phone',        value: '+91 98765 43210',         href: 'tel:+919876543210' },
  { icon: Mail,   label: 'Email',        value: 'info@alhudawelfare.org',  href: 'mailto:info@alhudawelfare.org' },
  { icon: Clock,  label: 'Office Hours', value: 'Mon – Sat, 10 AM – 6 PM' },
]

export default function Contact() {
  return (
    <div className="bg-brand-cream">
      {/* Header with image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={communityImg} alt="Contact" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Get in Touch</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Have a question, want to volunteer, or need urgent assistance? We respond within 24 hours.
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact info */}
            <div>
              <p className="section-tag">Reach Us</p>
              <h2 className="font-display text-xl font-bold text-brand-green mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                  <div key={i} className="glass-card p-4 flex items-start gap-4 cause-card-education">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                      {href
                        ? <a href={href} className="text-sm font-medium text-brand-green hover:text-brand-mid transition-colors">{value}</a>
                        : <p className="text-sm font-medium text-brand-green">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20a%20query%20about%20Al-Huda%20Welfare%20Society"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block"
              >
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1DAE55] border-0 text-white">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Contact form */}
            <div className="glass-card p-7 cause-card-education">
              <p className="section-tag">Send a Message</p>
              <h2 className="font-display text-xl font-bold text-brand-green mb-5">Write to Us</h2>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Thank you! We will respond within 24 hours.') }}>
                <div>
                  <label className="label">Your Name</label>
                  <input className="input-field" placeholder="Mohammed Ali" required />
                </div>
                <div>
                  <label className="label">Phone / WhatsApp</label>
                  <input className="input-field" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea className="input-field resize-none h-28" placeholder="How can we help you?" required />
                </div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

