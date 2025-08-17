import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0F261A',
          700: '#1E5741',
        },
        moss: {
          500: '#3D6F54',
        },
        fern: {
          300: '#6FA888',
        },
        clay: {
          500: '#A56B43',
        },
        soil: {
          700: '#4B3A2B',
        },
        river: {
          400: '#4886A8',
        },
        sky: {
          200: '#CFE7F2',
        },
        sand: {
          50: '#F7F3EE',
        },
        bone: {
          0: '#FFFFFF',
        },
        ink: {
          900: '#111111',
        },
        mist: {
          200: '#E6E1DB',
        },
        // State colors
        success: '#3D6F54',
        info: '#4886A8',
        warning: '#BD7A2D',
        error: '#9B2C2C',
      },
      borderRadius: {
        card: '16px',
        input: '12px',
        modal: '20px',
      },
      boxShadow: {
        'elev-1': '0 1px 2px rgba(15,38,26,.06), 0 8px 24px rgba(15,38,26,.04)',
        'elev-2': '0 12px 32px rgba(15,38,26,.10)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(32px, 5vw, 56px)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(28px, 3.5vw, 40px)', { lineHeight: '1.15' }],
        'display-md': ['28px', { lineHeight: '34px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['16px', { lineHeight: '26px' }],
        'caption': ['14px', { lineHeight: '22px' }],
        'overline': ['12px', { lineHeight: '18px', letterSpacing: '0.06em' }],
      },
      screens: {
        '2xl': '1536px',
      },
      maxWidth: {
        'prose': '72ch',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      backgroundImage: {
        'canopy-dawn': 'linear-gradient(135deg, #1E5741 0%, #3D6F54 40%, #A56B43 100%)',
        'river-mist': 'linear-gradient(180deg, #CFE7F2 0%, #F7F3EE 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'nature': 'cubic-bezier(.22,.61,.36,1)',
      },
    },
  },
  plugins: [],
}

export default config
