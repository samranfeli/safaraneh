import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'samim': ['samim', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '4.5': '1.125rem',
        '2px': '2px',
        '5px': '5px',
        '550': '550px'
      },
      keyframes: {
        skeleton: {
          '0% ': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        left2right : {
          '0% ': { left: '0' },
          '100%': { left: '100%' },
        }
      },
      animation: {
        skeleton: 'skeleton 1s linear infinite',
        left2right: 'left2right 1.2s cubic-bezier(0.52, 0.22, 0.45, 0.74) infinite alternate',
        
      },
      colors: {

        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        blue: {
          50: '#ebf2f9',
          100: '#cfe3fc',
          200: '#a0c8f8',
          300: '#70acf5',
          400: '#589ef3',
          500: '#2882f0',
          600: '#0f69d7',
          700: '#0d5ab9',
          800: '#0a468f',
          900: '#072f5f',
        },

        'body-background': 'var(--body-background)'

      },
      width: {
        '520':'520px',
        '480':'480px'
      },
      maxWidth: {
        container: 'var(--container-max-width)'
      },
      minHeight: {
        'desktop-main' : 'calc(100vh - 450px)'
      },
      maxHeight: {
        'mobile-nav': 'calc(100vh - 90px)',
      },
      boxShadow: {
        'normal': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      },
      borderWidth: {
        '3': '3px'
      },
      fontSize: {
        '4xs':'10px',
        '3xs':'11px',
        '2xs': '12px',
        xs: '13px',
        sm: '14px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '40px'
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      rotate: {
        '135': '135deg',
      }
    },
  },
  plugins: [],
}
export default config
