/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:   '#1A4731',   // deep forest green (logo primary)
          mid:     '#2D6A4F',   // mid green
          light:   '#52B788',   // light green accent
          gold:    '#C9A052',   // warm gold (logo accent)
          gold2:   '#E8C87A',   // light gold highlight
          cream:   '#FDFAF4',   // warm off-white background
          navy:    '#1B2A4A',   // kept for admin
          blue:    '#1E6FA6',   // kept for admin
          ice:     '#EEF4FA',   // kept for admin
        },
        status: {
          pending:  '#E67E22',
          approved: '#27AE60',
          rejected: '#E74C3C',
          disbursed:'#1A4731',
        },
        cause: {
          education: '#1A4731',
          health:    '#2D6A4F',
          marriage:  '#C9A052',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(160deg, rgba(26,71,49,0.93) 0%, rgba(45,106,79,0.85) 50%, rgba(201,160,82,0.75) 100%)',
        'green-gradient':  'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
        'gold-gradient':   'linear-gradient(135deg, #C9A052 0%, #E8C87A 100%)',
        'card-gradient':   'linear-gradient(145deg, #FDFAF4 0%, #ffffff 100%)',
        'section-pattern': 'radial-gradient(circle at 20% 50%, rgba(26,71,49,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,160,82,0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'card':        '0 4px 24px 0 rgba(26,71,49,0.08)',
        'card-hover':  '0 12px 40px 0 rgba(26,71,49,0.18)',
        'gold':        '0 4px 20px 0 rgba(201,160,82,0.25)',
        'nav':         '0 2px 20px 0 rgba(26,71,49,0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
