import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useSponsors } from '../../hooks/useSponsors'
import { useDonations } from '../../hooks/useDonations'
import { Button } from '../ui/Button'

const schema = z.object({
  donor_name:      z.string().min(2, 'Your name is required'),
  donor_email:     z.string().email('Valid email required'),
  donor_phone:     z.string().optional(),
  amount_per_year: z.coerce.number().positive('Enter a valid yearly amount'),
  notes:           z.string().optional(),
})

export function SponsorForm({ beneficiaryId, beneficiaryName }) {
  const { create: createSponsor }   = useSponsors()
  const { create: createDonation }  = useDonations()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { amount_per_year: 6000 },
  })

  async function onSubmit(data) {
    // 1. Create sponsor record
    const { data: sponsor, error: se } = await createSponsor({
      ...data,
      beneficiary_id: beneficiaryId ?? null,
      is_active: true,
    })
    if (se) { toast.error(se.message); return }

    // 2. Create corresponding donation record
    const { error: de } = await createDonation({
      donor_name:    data.donor_name,
      donor_email:   data.donor_email,
      amount:        data.amount_per_year,
      purpose:       'sponsor',
      payment_method:'other',
      status:        'pending',
    })
    if (de) { toast.error(de.message); return }

    toast.success(`Thank you, ${data.donor_name}! Your sponsorship has been registered. Our team will contact you within 24 hours.`)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 space-y-4">
      {beneficiaryName && (
        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-4 py-3">
          <p className="text-sm text-brand-navy font-medium">Sponsoring: <strong>{beneficiaryName}</strong></p>
        </div>
      )}

      <div>
        <label className="label">Your Full Name *</label>
        <input {...register('donor_name')} className="input-field" placeholder="Mohammed Farooq" />
        {errors.donor_name && <p className="error-msg">{errors.donor_name.message}</p>}
      </div>

      <div>
        <label className="label">Email *</label>
        <input {...register('donor_email')} type="email" className="input-field" placeholder="you@example.com" />
        {errors.donor_email && <p className="error-msg">{errors.donor_email.message}</p>}
      </div>

      <div>
        <label className="label">WhatsApp / Phone</label>
        <input {...register('donor_phone')} type="tel" className="input-field" placeholder="+91 98765 43210" />
      </div>

      <div>
        <label className="label">Annual Amount (₹) *</label>
        <div className="flex gap-2 mb-2">
          {[3000, 6000, 12000, 24000].map(a => (
            <button
              key={a}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-brand-ice text-xs font-medium text-brand-navy hover:bg-brand-blue hover:text-white transition-colors"
              onClick={() => {}}
            >
              ₹{(a / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
        <input {...register('amount_per_year')} type="number" className="input-field" placeholder="6000" />
        {errors.amount_per_year && <p className="error-msg">{errors.amount_per_year.message}</p>}
      </div>

      <div>
        <label className="label">Notes (optional)</label>
        <textarea {...register('notes')} className="input-field resize-none h-20" placeholder="Any additional information" />
      </div>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
        {beneficiaryName ? `Sponsor ${beneficiaryName}` : 'Register Sponsorship'}
      </Button>
    </form>
  )
}
