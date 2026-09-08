import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          coral:      '#E86A5E',
          coralDark:  '#C94F44',
          coralLight: '#FF9B8A',
          coralSoft:  '#FDE9E5',
          teal:       '#0E4C5E',
          tealDeep:   '#0A3542',
          tealMid:    '#17768F',
          tealSoft:   '#E3EFF3',
          navy:       '#0B2B36',
          cream:      '#FFFBF6',
          sand:       '#F9EFE4',
          sandDark:   '#EFE0CF',
          charcoal:   '#24313A',
          slate:      '#43575F',
          gold:       '#D9A441',
          // legacy aliases (old Al-Huda theme → mapped)
          green:   '#0E4C5E',
          mid:     '#17768F',
          light:   '#4FA3B8',
          sage:    '#A7C4A0',
          gold2:   '#E8C87A',
          warm:    '#F9EFE4',
          blue:    '#17768F',
          ice:     '#E3EFF3',
        },
        status: {
          pending:  '#E67E22',
          approved: '#27AE60',
          rejected: '#E74C3C',
          disbursed:'#0E4C5E',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
      },
      backgroundImage: {
        'hero-scrim': 'linear-gradient(180deg, rgba(11,43,54,0.55) 0%, rgba(11,43,54,0.35) 40%, rgba(11,43,54,0.78) 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0E4C5E 0%, #17768F 100%)',
        'coral-gradient': 'linear-gradient(135deg, #E86A5E 0%, #C94F44 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFFBF6 0%, #F9EFE4 100%)',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(14,76,94,0.07)',
        'card-hover': '0 24px 60px -12px rgba(14,76,94,0.22)',
        coral: '0 8px 28px -6px rgba(232,106,94,0.45)',
        teal: '0 8px 28px -6px rgba(14,76,94,0.4)',
        soft: '0 2px 15px 0 rgba(0,0,0,0.06)',
        elevated: '0 16px 48px -12px rgba(11,43,54,0.25)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [forms],
}
