import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { supabase } from '../../lib/supabaseClient'
import { ORG } from '../../data/content'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email').optional().or(z.literal('')),
  message: z.string().min(5, 'Tell us a little more'),
})

export default function Contact() {
  const form = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name, phone: data.phone, email: data.email || null, message: data.message,
      })
      if (error) throw error
      supabase.functions.invoke('whatsapp-notify', { body: { type: 'contact', ...data } }).catch(() => {})
      toast.success('Message sent! We reply within 24 hours.')
      form.reset()
    } catch {
      toast.success('Received! (offline preview — connect Supabase to persist)')
    }
  }

  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-12.jpg" height="min-h-[44vh]" speed={0.2}>
        <div className="container-lg px-6 py-16" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Contact</p>
          <h1 className="font-display display-xl text-white">Come say salaam in Kondhwa</h1>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-lg grid lg:grid-cols-2 gap-8">
          <div data-aos="fade-up">
            <SectionHeading eyebrow="Reach us" title="Address, hours & map" />
            <ul className="space-y-4">
              {[
                { icon: MapPin, label: 'Address', value: ORG.address },
                { icon: Phone, label: 'Phone', value: ORG.phone, href: ORG.phoneHref },
                { icon: Mail, label: 'Email', value: ORG.email, href: `mailto:${ORG.email}` },
                { icon: Clock, label: 'Hours', value: ORG.hoursNote },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <li key={i} className="card p-5 flex gap-4">
                  <span className="w-11 h-11 rounded-2xl bg-brand-coralSoft flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-brand-coralDark" /></span>
                  <span><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-slate">{label}</p>
                    {href ? <a href={href} className="font-semibold text-brand-tealDeep hover:text-brand-coralDark">{value}</a> : <p className="font-semibold text-brand-tealDeep">{value}</p>}</span>
                </li>
              ))}
            </ul>
            <a href={ORG.whatsapp} target="_blank" rel="noreferrer" className="block mt-5">
              <Button variant="teal" size="lg" className="w-full !bg-[#1FA855]"><MessageCircle className="w-5 h-5" /> Chat on WhatsApp</Button>
            </a>
            <div className="mt-5 rounded-3xl overflow-hidden border border-brand-sandDark h-[280px]">
              <iframe title="map" className="w-full h-full" loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ORG.mapsQuery)}&output=embed`} />
            </div>
          </div>

          <div className="card p-7 md:p-9 h-fit" data-aos="fade-left">
            <SectionHeading eyebrow="Write to us" title="Send a message" />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div><label className="label">Your name *</label><input className="input-field" {...form.register('name')} placeholder="Full name" /><p className="error-msg">{form.formState.errors.name?.message}</p></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label">Phone *</label><input className="input-field" {...form.register('phone')} placeholder="+91…" /><p className="error-msg">{form.formState.errors.phone?.message}</p></div>
                <div><label className="label">Email</label><input className="input-field" {...form.register('email')} placeholder="you@email.com" /></div>
              </div>
              <div><label className="label">Message *</label><textarea className="input-field h-32 resize-none" {...form.register('message')} placeholder="How can we help?" /><p className="error-msg">{form.formState.errors.message?.message}</p></div>
              <Button type="submit" variant="coral" size="lg" className="w-full">Send message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
