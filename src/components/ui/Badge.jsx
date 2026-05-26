const statusStyles = {
  pending:      'bg-amber-100  text-amber-700',
  submitted:    'bg-amber-100  text-amber-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  approved:     'bg-green-100  text-green-700',
  active:       'bg-green-100  text-green-700',
  verified:     'bg-green-100  text-green-700',
  success:      'bg-green-100  text-green-700',
  disbursed:    'bg-teal-100   text-teal-700',
  rejected:     'bg-red-100    text-red-600',
  failed:       'bg-red-100    text-red-600',
  inactive:     'bg-gray-100   text-gray-500',
  education:    'bg-green-100  text-green-700',
  health:       'bg-teal-100   text-teal-700',
  marriage:     'bg-amber-100  text-amber-700',
  general:      'bg-gray-100   text-gray-500',
  sponsor:      'bg-indigo-100 text-indigo-700',
  upi:          'bg-blue-100   text-blue-600',
  cash:         'bg-gray-100   text-gray-600',
}

export function Badge({ label, variant, className = '' }) {
  const key   = (variant ?? label ?? '').toLowerCase().replace(/\s+/g, '_')
  const style = statusStyles[key] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`badge ${style} ${className}`}>
      {label}
    </span>
  )
}
