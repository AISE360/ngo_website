import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { HandHeart, Briefcase } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { supabase } from '../../lib/supabaseClient'

const volunteerSchema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  interest: z.string().min(1, 'Pick an area'),
  message: z.string().optional(),
})

const csrSchema = z.object({
  org: z.string().min(2, 'Organisation required'),
  contact: z.string().min(2, 'Contact person required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  message: z.string().optional(),
})

export default function GetInvolved() {
  const [tab, setTab] = useState('volunteer')
  const vForm = useForm({ resolver: zodResolver(volunteerSchema) })
  const cForm = useForm({ resolver: zodResolver(csrSchema) })

  const onVolunteer = async (data) => {
    try {
      const { error } = await supabase.from('volunteers').insert({
        name: data.name, phone: data.phone, email: data.email || null,
        interest: data.interest, message: data.message || null,
      })
      if (error) throw error
      // fire-and-forget notification
      supabase.functions.invoke('whatsapp-notify', { body: { type: 'volunteer', ...data } }).catch(() => {})
      toast.success('Thank you! We will call you within 48 hours.')
      vForm.reset()
    } catch {
      toast.success('Noted! (offline preview: connect Supabase to persist)')
    }
  }

  const onCsr = async (data) => {
    try {
      const { error } = await supabase.from('csr_inquiries').insert({
        org_name: data.org, contact_person: data.contact, email: data.email, phone: data.phone, message: data.message || null,
      })
      if (error) throw error
      // fire-and-forget notification
      supabase.functions.invoke('whatsapp-notify', { body: { type: 'csr', ...data } }).catch(() => {})
      toast.success('Inquiry received! Our partnerships lead will reach out.')
      cForm.reset()
    } catch {
      toast.success('Received! (offline preview: connect Supabase to persist)')
    }
  }

  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-11.jpg" height="min-h-[48vh]" speed={0.2}>
        <div className="container-lg px-6 py-16" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Get Involved</p>
          <h1 className="font-display display-xl text-white">Give time, skill or partnership</h1>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-md">
          <div className="flex gap-2 justify-center mb-10" data-aos="fade-up">
            {[
              { id: 'volunteer', label: 'Volunteer', icon: HandHeart },
              { id: 'csr', label: 'CSR / Partner', icon: Briefcase },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${tab === id ? 'bg-brand-tealDeep text-white shadow-teal' : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-sandDark/50'}`}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {tab === 'volunteer' ? (
            <div className="card p-7 md:p-10" data-aos="fade-up">
              <SectionHeading eyebrow="Volunteer" title="Weekend mentors, field buddies, skilled help" lead="Teaching, hospital visits, photography, design, fundraising: tell us your strength." />
              <form onSubmit={vForm.handleSubmit(onVolunteer)} className="grid sm:grid-cols-2 gap-4">
                <div><label className="label">Full name *</label><input className="input-field" {...vForm.register('name')} placeholder="Your name" /><p className="error-msg">{vForm.formState.errors.name?.message}</p></div>
                <div><label className="label">Phone / WhatsApp *</label><input className="input-field" {...vForm.register('phone')} placeholder="+91…" /><p className="error-msg">{vForm.formState.errors.phone?.message}</p></div>
                <div><label className="label">Email</label><input className="input-field" {...vForm.register('email')} placeholder="you@email.com" /></div>
                <div><label className="label">Area of interest *</label>
                  <select className="input-field" {...vForm.register('interest')}>
                    <option value="">Select…</option>
                    <option>Medical visits & follow-up</option>
                    <option>Tailoring / livelihood mentoring</option>
                    <option>School sessions</option>
                    <option>Coding / computer teaching</option>
                    <option>Art workshops</option>
                    <option>Photo / video / design</option>
                    <option>Fundraising & outreach</option>
                  </select>
                  <p className="error-msg">{vForm.formState.errors.interest?.message}</p>
                </div>
                <div className="sm:col-span-2"><label className="label">Message</label><textarea className="input-field h-28 resize-none" {...vForm.register('message')} placeholder="Availability, skills…" /></div>
                <div className="sm:col-span-2"><Button type="submit" variant="coral" size="lg" className="w-full">Sign up to volunteer</Button></div>
              </form>
            </div>
          ) : (
            <div className="card p-7 md:p-10" data-aos="fade-up">
              <SectionHeading eyebrow="CSR & Partnerships" title="Partner with a field-first NGO" lead="Employee volunteering, program sponsorships (tailoring machines, lab systems, school kits), medical fund matching." />
              <form onSubmit={cForm.handleSubmit(onCsr)} className="grid sm:grid-cols-2 gap-4">
                <div><label className="label">Organisation *</label><input className="input-field" {...cForm.register('org')} /></div>
                <div><label className="label">Contact person *</label><input className="input-field" {...cForm.register('contact')} /></div>
                <div><label className="label">Work email *</label><input className="input-field" {...cForm.register('email')} /></div>
                <div><label className="label">Phone *</label><input className="input-field" {...cForm.register('phone')} /></div>
                <div className="sm:col-span-2"><label className="label">What would you like to support?</label><textarea className="input-field h-28 resize-none" {...cForm.register('message')} placeholder="e.g. sponsor 10 sewing machines / quarterly medical fund…" /></div>
                <div className="sm:col-span-2"><Button type="submit" variant="teal" size="lg" className="w-full">Send partnership inquiry</Button></div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
