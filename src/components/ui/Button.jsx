import { forwardRef } from 'react'

const variants = {
  coral: 'bg-brand-coral text-white hover:bg-brand-coralDark shadow-coral',
  teal: 'bg-brand-teal text-white hover:bg-brand-tealDeep shadow-teal',
  navy: 'bg-brand-navy text-white hover:bg-brand-tealDeep',
  outline: 'border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white',
  'outline-coral': 'border-2 border-brand-coral text-brand-coralDark hover:bg-brand-coral hover:text-white hover:border-brand-coral',
  'outline-white': 'border-2 border-white/50 text-white hover:bg-white hover:text-brand-tealDeep',
  white: 'bg-white text-brand-tealDeep hover:bg-brand-cream',
  ghost: 'text-brand-teal hover:bg-brand-tealSoft',
}

const sizes = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[15px]',
}

export const Button = forwardRef(function Button(
  { children, variant = 'coral', size = 'md', className = '', loading = false, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`btn-no-flash inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral/40 disabled:opacity-50 ${variants[variant] ?? variants.coral} ${sizes[size] ?? sizes.md} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})
