import { forwardRef } from 'react'

const variants = {
  primary:   'bg-brand-green text-white hover:bg-brand-mid shadow-sm hover:shadow-elevated',
  gold:      'bg-brand-gold text-white hover:bg-[#b8913f] shadow-sm hover:shadow-gold',
  secondary: 'bg-brand-charcoal text-white hover:bg-gray-700 shadow-sm',
  outline:   'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
  'outline-gold': 'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white',
  'outline-white': 'border-2 border-white/40 text-white hover:bg-white hover:text-brand-green',
  ghost:     'text-brand-green hover:bg-brand-green/8',
  danger:    'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  success:   'bg-green-600 text-white hover:bg-green-700 shadow-sm',
}

const sizes = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
  xl: 'px-9 py-4 text-base',
}

export const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', loading = false, icon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`
        btn-no-flash
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
})
