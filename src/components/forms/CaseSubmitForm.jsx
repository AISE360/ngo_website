import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../ui/Button'

const schema = z.object({
  // Beneficiary basics
  full_name:     z.string().min(2, 'Full name required'),
  age:           z.coerce.number().int().min(1).max(120).optional(),
  gender:        z.enum(['male', 'female', 'other']).optional(),
  category:      z.enum(['education', 'health', 'marriage'], { required_error: 'Select a category' }),
  address:       z.string().optional(),
  guardian:      z.string().optional(),
  guardian_phone:z.string().optional(),
  // Case fields
  amount_requested: z.coerce.number().positive('Enter a valid amount').optional(),
  description:   z.string().min(10, 'Please describe the case (min 10 chars)'),
})

export function CaseSubmitForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    // 1. Insert beneficiary
    const { data: benef, error: be } = await supabase
      .from('beneficiaries')
      .insert({
        full_name:     data.full_name,
        age:           data.age,
        gender:        data.gender,
        category:      data.category,
        address:       data.address,
        guardian:      data.guardian,
        guardian_phone: data.guardian_phone,
      })
      .select('id')
      .single()

    if (be) { toast.error('Submission failed: ' + be.message); return }

    // 2. Insert case
    const { error: ce } = await supabase.from('cases').insert({
      beneficiary_id:   benef.id,
      case_type:        data.category,
      amount_requested: data.amount_requested,
      description:      data.description,
    })

    if (ce) { toast.error('Case failed: ' + ce.message); return }

    toast.success('Case submitted! We will review it within 48 hours.')
    reset()
  }

  const field = (label, name, props = {}) => (
    <div>
      <label className="label">{label}</label>
      <input {...register(name)} {...props} className="input-field" />
      {errors[name] && <p className="error-msg">{errors[name].message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field('Full Name *', 'full_name', { placeholder: 'Beneficiary\'s name' })}
        {field('Age', 'age', { type: 'number', placeholder: '25' })}

        <div>
          <label className="label">Gender</label>
          <select {...register('gender')} className="input-field">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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

        {field('Address', 'address', { placeholder: 'Full address' })}
        {field('Guardian Name', 'guardian', { placeholder: 'Parent / guardian' })}
        {field('Guardian Phone', 'guardian_phone', { type: 'tel', placeholder: '+91 98765 43210' })}
        {field('Amount Needed (₹)', 'amount_requested', { type: 'number', placeholder: '15000' })}
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
