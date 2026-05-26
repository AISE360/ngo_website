import { forwardRef } from 'react'

const variants = {
  primary:   'bg-brand-green text-white hover:bg-brand-mid shadow-sm hover:shadow-md',
  gold:      'bg-brand-gold text-white hover:bg-brand-gold/90 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-800 text-white hover:bg-gray-700 shadow-sm',
  outline:   'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
  'outline-gold': 'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white',
  'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-brand-green',
  ghost:     'text-brand-green hover:bg-brand-green/10',
  danger:    'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  success:   'bg-green-600 text-white hover:bg-green-700 shadow-sm',
}

const sizes = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-9 py-4 text-lg',
}

export const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', loading = false, icon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      /* NOTE: no active:scale-95, no active:bg-white — that caused the white flash */
      className={`
        btn-no-flash
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
        disabled:opacity-50 disabled:cursor-not-allowed
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
