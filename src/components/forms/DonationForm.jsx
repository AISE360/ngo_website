import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useDonations } from '../../hooks/useDonations'
import { Button } from '../ui/Button'

const schema = z.object({
  donor_name:    z.string().min(2, 'Name required'),
  donor_email:   z.string().email('Valid email required').optional().or(z.literal('')),
  amount:        z.coerce.number().positive('Enter a valid amount'),
  purpose:       z.enum(['general', 'education', 'health', 'marriage', 'sponsor']),
  payment_method:z.enum(['upi', 'card', 'netbanking', 'cash', 'cheque', 'other']),
})

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000]

export function DonationForm({ defaultAmount = 1000, defaultPurpose = 'general', presets = PRESET_AMOUNTS }) {
  const { create } = useDonations()
  const [customAmt, setCustomAmt] = useState(defaultAmount)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount:         defaultAmount,
      purpose:        defaultPurpose,
      payment_method: 'upi',
    },
  })

  const watchAmt = watch('amount')

  function selectPreset(amt) {
    setCustomAmt(amt)
    setValue('amount', amt)
  }

  async function onSubmit(data) {
    const { error } = await create({ ...data, status: 'pending', currency: 'INR' })
    if (error) { toast.error(error.message); return }

    // ── Razorpay integration (uncomment when key is set) ──
    // const order = await supabase.functions.invoke('razorpay-initiate', {
    //   body: { amount: data.amount, receipt: `RCP-${Date.now()}` },
    // })
    // Open Razorpay checkout here with order.data

    toast.success(`Thank you, ${data.donor_name}! We'll confirm your donation shortly.`)
    reset()
    setCustomAmt(defaultAmount)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Preset amounts */}
      <div>
        <p className="label">Select Amount</p>
        <div className="flex flex-wrap gap-2">
          {presets.map(a => (
            <button
              key={a}
              type="button"
              onClick={() => selectPreset(a)}
              className={`btn-no-flash px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                Number(watchAmt) === a
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'bg-brand-cream border border-gray-200 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green'
              }`}
            >
              ₹{a.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Custom Amount (₹)</label>
        <input
          {...register('amount')}
          type="number"
          className="input-field text-lg font-bold"
          placeholder="Enter amount"
          onChange={e => setCustomAmt(Number(e.target.value))}
        />
        {errors.amount && <p className="error-msg">{errors.amount.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Your Name *</label>
          <input {...register('donor_name')} className="input-field" placeholder="Mohammed Ali" />
          {errors.donor_name && <p className="error-msg">{errors.donor_name.message}</p>}
        </div>
        <div>
          <label className="label">Email (optional)</label>
          <input {...register('donor_email')} type="email" className="input-field" placeholder="you@example.com" />
          {errors.donor_email && <p className="error-msg">{errors.donor_email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Donate For</label>
          <select {...register('purpose')} className="input-field">
            <option value="general">General Fund</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="marriage">Marriage Fund</option>
            <option value="sponsor">Child Sponsorship</option>
          </select>
        </div>
        <div>
          <label className="label">Payment Method</label>
          <select {...register('payment_method')} className="input-field">
            <option value="upi">UPI</option>
            <option value="card">Debit / Credit Card</option>
            <option value="netbanking">Net Banking</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
        Donate ₹{Number(watchAmt).toLocaleString('en-IN')}
      </Button>

      <p className="text-xs text-center text-gray-400">
        Secure payment · No hidden fees · Instant receipt on email
      </p>
    </form>
  )
}
