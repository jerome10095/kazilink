/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f4',
          100: '#f4e8dc',
          200: '#e8d0bb',
          300: '#dbb89a',
          400: '#cfa079',
          500: '#c1652f',
          600: '#a85428',
          700: '#8f4421',
          800: '#76331a',
          900: '#5d2213',
        },
        secondary: {
          50: '#f6f7f5',
          100: '#e4e8e0',
          200: '#c9d0c4',
          300: '#aeb9a8',
          400: '#93a18c',
          500: '#5b6e5b',
          600: '#4d5d4d',
          700: '#3f4c3f',
          800: '#313b31',
          900: '#232a23',
        },
        accent: {
          50: '#fdf9f0',
          100: '#f8edcd',
          200: '#f3e0ab',
          300: '#eed488',
          400: '#e9c866',
          500: '#c9a84c',
          600: '#b3943d',
          700: '#9c802e',
          800: '#866c1f',
          900: '#6f5810',
        },
        ink: '#1a1a1a',
        paper: '#fcf9f4',
        'paper-dim': '#f0ebe2',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}