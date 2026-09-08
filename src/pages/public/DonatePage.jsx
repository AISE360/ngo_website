import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { ShieldCheck, HeartHandshake } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { ParallaxBand } from '../../components/effects/Parallax'
import { PROGRAMS } from '../../data/content'
import { supabase } from '../../lib/supabaseClient'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  phone: z.string().min(10, 'Valid phone required'),
  amount: z.coerce.number().min(10, 'Minimum ₹10'),
  program: z.string().default('general'),
  frequency: z.enum(['once', 'monthly']).default('once'),
  pan: z.string().optional(),
})

const AMOUNTS = [500, 1100, 2500, 5100]

export default function DonatePage() {
  const [params] = useSearchParams()
  const defaultAmount = Number(params.get('amount')) || 1100
  const defaultProgram = params.get('program') || 'general'
  const [paying, setPaying] = useState(false)

  const form = useForm({ resolver: zodResolver(schema), defaultValues: { amount: defaultAmount, program: defaultProgram, frequency: 'once' } })
  const amount = form.watch('amount')

  const programLabel = useMemo(() => {
    if (form.watch('program') === 'general') return 'General Fund (most urgent)'
    return PROGRAMS.find((p) => p.slug === form.watch('program'))?.title ?? 'General Fund'
  }, [form.watch('program')])

  const onSubmit = async (data) => {
    setPaying(true)
    try {
      // 1. create DB record (pending)
      const { data: row, error } = await supabase.from('donations').insert({
        donor_name: data.name, donor_email: data.email || null, donor_phone: data.phone,
        amount: data.amount, purpose: data.program, frequency: data.frequency, pan: data.pan || null, status: 'pending',
      }).select('id').single()
      if (error) throw error

      // 2. create Razorpay order via Edge Function
      const { data: order, error: fnError } = await supabase.functions.invoke('razorpay-initiate', {
        body: { amount: data.amount, currency: 'INR', receipt: `THF-${row?.id ?? Date.now()}` },
      })
      if (fnError || !order?.id) throw fnError || new Error('Order failed')

      // 3. open Razorpay checkout
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, currency: order.currency, order_id: order.id,
        name: 'Thoughtful Hearts Foundation', description: programLabel,
        prefill: { name: data.name, email: data.email, contact: data.phone },
        theme: { color: '#E86A5E' },
        handler: async (resp) => {
          await supabase.from('donations').update({
            razorpay_order_id: resp.razorpay_order_id, razorpay_payment_id: resp.razorpay_payment_id, status: 'success',
          }).eq('id', row.id)
          supabase.functions.invoke('whatsapp-notify', { body: { type: 'donation', ...data, paymentId: resp.razorpay_payment_id } }).catch(() => {})
          toast.success('Thank you! Receipt will be emailed/WhatsApped shortly.')
        },
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch (e) {
      console.error(e)
      toast.error('Payment preview mode — connect Supabase + Razorpay keys to go live.')
      setPaying(false)
    }
  }

  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-6.jpg" height="min-h-[44vh]" speed={0.2}>
        <div className="container-lg px-6 py-16" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Donate</p>
          <h1 className="font-display display-xl text-white">Give once, or give monthly</h1>
          <p className="text-white/70 mt-3 max-w-xl">One-time or recurring. Program-specific or general fund. Receipt for every rupee.</p>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-lg grid lg:grid-cols-5 gap-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:col-span-3 card p-7 md:p-9" data-aos="fade-up">
            <div className="flex gap-2 mb-6 bg-brand-cream rounded-full p-1.5 w-fit">
              {['once', 'monthly'].map((f) => (
                <button type="button" key={f} onClick={() => form.setValue('frequency', f)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${form.watch('frequency') === f ? 'bg-brand-tealDeep text-white shadow-teal' : 'text-brand-charcoal/60'}`}>
                  {f === 'once' ? 'One-time' : 'Monthly ❤'}
                </button>
              ))}
            </div>

            <label className="label">Choose amount (₹)</label>
            <div className="grid grid-cols-4 gap-2.5 mb-3">
              {AMOUNTS.map((a) => (
                <button type="button" key={a} onClick={() => form.setValue('amount', a)}
                  className={`py-3.5 rounded-2xl font-bold text-sm border-2 transition-all ${Number(amount) === a ? 'border-brand-coral bg-brand-coralSoft text-brand-coralDark' : 'border-brand-sandDark text-brand-charcoal/70 hover:border-brand-coral/50'}`}>
                  ₹{a.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
            <input type="number" className="input-field mb-1" {...form.register('amount')} min={10} />
            <p className="error-msg mb-4">{form.formState.errors.amount?.message}</p>

            <label className="label">Fund</label>
            <select className="input-field mb-5" {...form.register('program')}>
              <option value="general">General Fund (most urgent)</option>
              {PROGRAMS.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
            </select>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label">Full name *</label><input className="input-field" {...form.register('name')} placeholder="Your name" /><p className="error-msg">{form.formState.errors.name?.message}</p></div>
              <div><label className="label">Phone *</label><input className="input-field" {...form.register('phone')} placeholder="+91…" /><p className="error-msg">{form.formState.errors.phone?.message}</p></div>
              <div><label className="label">Email (receipt)</label><input className="input-field" {...form.register('email')} placeholder="you@email.com" /></div>
              <div><label className="label">PAN (for 80G, optional)</label><input className="input-field" {...form.register('pan')} placeholder="ABCDE1234F" /></div>
            </div>

            <Button type="submit" variant="coral" size="lg" className="w-full mt-7" loading={paying}>
              <HeartHandshake className="w-5 h-5" /> Donate ₹{Number(amount || 0).toLocaleString('en-IN')} {form.watch('frequency') === 'monthly' ? '/ month' : ''}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-brand-slate/60 mt-4"><ShieldCheck className="w-3.5 h-3.5" /> Secured by Razorpay • UPI / Cards / Netbanking • 80G note (placeholder — update with actual reg.)</p>
          </form>

          <aside className="lg:col-span-2 space-y-5" data-aos="fade-left">
            <div className="card p-7 !bg-brand-tealDeep !border-0">
              <h3 className="font-display text-xl text-white">Where your money goes</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>• <b className="text-white">₹500</b> — medicines / school kit / art material</li>
                <li>• <b className="text-white">₹1,100</b> — ration kit for a family in distress</li>
                <li>• <b className="text-white">₹2,500</b> — a week of tailoring consumables</li>
                <li>• <b className="text-white">₹5,100</b> — support a hospital case / lab batch</li>
              </ul>
            </div>
            <div className="card p-7">
              <h4 className="font-bold text-sm uppercase tracking-[0.16em] text-brand-slate">Other ways</h4>
              <p className="text-sm mt-3">Bank transfer / UPI details on request. For CSR, visit <Link to="/get-involved" className="text-brand-coralDark font-bold">partnerships →</Link></p>
              <p className="text-xs text-brand-slate/60 mt-3">Prefer WhatsApp? <a className="font-bold text-brand-teal" href="https://wa.me/919876543210">Chat with us</a></p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
