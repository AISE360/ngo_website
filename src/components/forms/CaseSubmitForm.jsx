import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../ui/Button'

const schema = z.object({
  full_name: z.string().min(2, 'Full name required'),
  age: z.preprocess(
    val => (val === '' || val === undefined || val === null || (typeof val === 'number' && Number.isNaN(val)) ? undefined : Number(val)),
    z.number().int('Age must be a whole number').min(1, 'Age must be at least 1').max(120, 'Invalid age').optional()
  ),
  gender: z.preprocess(
    val => (val === '' || val === undefined || val === null ? undefined : String(val)),
    z.enum(['male', 'female', 'other']).optional()
  ),
  category: z.enum(['education', 'health', 'marriage'], { required_error: 'Select a category' }),
  address: z.string().optional(),
  guardian: z.string().optional(),
  guardian_phone: z.string().optional(),
  amount_requested: z.preprocess(
    val => (val === '' || val === undefined || val === null || (typeof val === 'number' && Number.isNaN(val)) ? undefined : Number(val)),
    z.number().positive('Enter a valid positive amount').optional()
  ),
  description: z.string().min(10, 'Please describe the case (min 10 chars)'),
})

export function CaseSubmitForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    try {
      // 1. Insert beneficiary
      const { data: benef, error: be } = await supabase
        .from('beneficiaries')
        .insert({
          full_name:      data.full_name?.trim(),
          age:            data.age ?? null,
          gender:         data.gender || null,
          category:       data.category,
          address:        data.address?.trim() || null,
          guardian:       data.guardian?.trim() || null,
          guardian_phone: data.guardian_phone?.trim() || null,
        })
        .select('id')
        .single()

      if (be || !benef || !benef.id) {
        console.error('Beneficiary insert error:', be)
        toast.error('Submission failed: ' + (be?.message || 'Could not create beneficiary record'))
        return
      }

      // 2. Insert case
      const { error: ce } = await supabase.from('cases').insert({
        beneficiary_id:   benef.id,
        case_type:        data.category,
        amount_requested: data.amount_requested ?? null,
        description:      data.description?.trim(),
      })

      if (ce) {
        console.error('Case insert error:', ce)
        toast.error('Case submission failed: ' + ce.message)
        return
      }

      toast.success('Case submitted successfully! We will review it within 48 hours.')
      reset()
    } catch (err) {
      console.error('Unexpected case submission error:', err)
      toast.error('An unexpected error occurred: ' + (err?.message || 'Please try again.'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input {...register('full_name')} className="input-field" placeholder="Beneficiary's name" />
          {errors.full_name && <p className="error-msg">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="label">Age</label>
          <input {...register('age')} type="number" className="input-field" placeholder="25" />
          {errors.age && <p className="error-msg">{errors.age.message}</p>}
        </div>

        <div>
          <label className="label">Gender</label>
          <select {...register('gender')} className="input-field">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error-msg">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="label">Category *</label>
          <select {...register('category')} className="input-field">
            <option value="">Select category</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="marriage">Marriage Fund</option>
          </select>
          {errors.category && <p className="error-msg">{errors.category.message}</p>}
        </div>

        <div>
          <label className="label">Address</label>
          <input {...register('address')} className="input-field" placeholder="Full address" />
          {errors.address && <p className="error-msg">{errors.address.message}</p>}
        </div>

        <div>
          <label className="label">Guardian Name</label>
          <input {...register('guardian')} className="input-field" placeholder="Parent / guardian" />
          {errors.guardian && <p className="error-msg">{errors.guardian.message}</p>}
        </div>

        <div>
          <label className="label">Guardian Phone</label>
          <input {...register('guardian_phone')} type="tel" className="input-field" placeholder="+91 98765 43210" />
          {errors.guardian_phone && <p className="error-msg">{errors.guardian_phone.message}</p>}
        </div>

        <div>
          <label className="label">Amount Needed (₹)</label>
          <input {...register('amount_requested')} type="number" className="input-field" placeholder="15000" />
          {errors.amount_requested && <p className="error-msg">{errors.amount_requested.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Case Description *</label>
        <textarea
          {...register('description')}
          className="input-field resize-none h-32"
          placeholder="Describe the situation and how the funds will be used…"
        />
        {errors.description && <p className="error-msg">{errors.description.message}</p>}
      </div>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
        Submit Case
      </Button>
    </form>
  )
}
