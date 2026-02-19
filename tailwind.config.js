/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: {
          50: '#f0f5f9',
          100: '#dae4ed',
          200: '#b8cdd9',
          300: '#8fafc1',
          400: '#6490a8',
          500: '#4a7590',
          600: '#3c5f77',
          700: '#334e62',
          800: '#2d4252',
          900: '#1a2e3b',
          950: '#0f1c24',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f9f6f1',
          200: '#f3ede3',
          300: '#e9dfd0',
          400: '#d9c9b0',
          500: '#c7b392',
          600: '#b39d79',
          700: '#9a8463',
          800: '#7e6c52',
          900: '#685944',
        },
        ink: {
          50: '#f5f6f6',
          100: '#e5e7e8',
          200: '#cdd0d3',
          300: '#abb0b4',
          400: '#81888e',
          500: '#666d73',
          600: '#575c62',
          700: '#4a4e53',
          800: '#414447',
          900: '#2c2e30',
          950: '#1a1b1c',
        },
        foam: {
          50: '#f4f9fa',
          100: '#e4f0f3',
          200: '#cce3e9',
          300: '#a7d0da',
          400: '#7ab5c4',
          500: '#5a99ab',
          600: '#4a7f91',
          700: '#416977',
          800: '#3b5863',
          900: '#354a54',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
