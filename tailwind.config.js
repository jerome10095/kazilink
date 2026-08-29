/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#DAF1DE',
          100: '#D1E8D6',
          200: '#B9D8C2',
          300: '#9AC0A3',
          400: '#8EB69B',
          500: '#235347',
          600: '#163832',
          700: '#0B2B26',
          800: '#051F20',
          900: '#041A1B',
        },
        secondary: {
          50: '#F3F9F4',
          100: '#E8F4EA',
          200: '#D1E8D9',
          300: '#B9D7C3',
          400: '#9CC2A6',
          500: '#5D8A70',
          600: '#3D6856',
          700: '#295247',
          800: '#1B3B34',
          900: '#0E2926',
        },
        accent: {
          50: '#F6FBF7',
          100: '#EDF8F0',
          200: '#DBF0E1',
          300: '#C8E5D0',
          400: '#A7D3B1',
          500: '#8EB69B',
          600: '#6C9A81',
          700: '#4F7B67',
          800: '#355F4F',
          900: '#1F433D',
        },
        ink: '#051F20',
        paper: '#F8FBF8',
        'paper-dim': '#EAF3EB',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 28px rgba(5, 31, 32, 0.08)',
        strong: '0 20px 40px rgba(5, 31, 32, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
}