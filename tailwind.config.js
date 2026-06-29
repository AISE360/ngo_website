/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:   '#1A4731',
          mid:     '#2D6A4F',
          light:   '#52B788',
          sage:    '#A7C4A0',
          gold:    '#C9A052',
          gold2:   '#E8C87A',
          cream:   '#FAF7F2',
          warm:    '#F5EDE3',
          navy:    '#1B2A4A',
          blue:    '#1E6FA6',
          ice:     '#EEF4FA',
          charcoal:'#2C2C2C',
          slate:   '#4A5568',
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
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'slide-up':      'slideUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right':'slideInRight 0.7s ease-out forwards',
        'scale-in':      'scaleIn 0.6s ease-out forwards',
        'blur-in':       'blurIn 0.8s ease-out forwards',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':         'float 6s ease-in-out infinite',
        'shimmer':       'shimmer 2s infinite',
        'spin-slow':     'spin 12s linear infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp:      { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft:  { '0%': { opacity: 0, transform: 'translateX(-40px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: 0, transform: 'translateX(40px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        scaleIn:      { '0%': { opacity: 0, transform: 'scale(0.9)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        blurIn:       { '0%': { opacity: 0, filter: 'blur(10px)' }, '100%': { opacity: 1, filter: 'blur(0)' } },
        float:        { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(160deg, rgba(26,71,49,0.95) 0%, rgba(45,106,79,0.85) 50%, rgba(44,44,44,0.9) 100%)',
        'green-gradient':  'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
        'gold-gradient':   'linear-gradient(135deg, #C9A052 0%, #E8C87A 100%)',
        'card-gradient':   'linear-gradient(145deg, #FAF7F2 0%, #ffffff 100%)',
        'section-alt':     'linear-gradient(180deg, #FAF7F2 0%, #F5EDE3 100%)',
      },
      boxShadow: {
        'card':        '0 4px 24px 0 rgba(26,71,49,0.06)',
        'card-hover':  '0 20px 50px 0 rgba(26,71,49,0.15)',
        'gold':        '0 4px 20px 0 rgba(201,160,82,0.25)',
        'nav':         '0 4px 30px 0 rgba(0,0,0,0.1)',
        'soft':        '0 2px 15px 0 rgba(0,0,0,0.06)',
        'elevated':    '0 10px 40px -10px rgba(26,71,49,0.2)',
        'inner-glow':  'inset 0 1px 0 0 rgba(255,255,255,0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
