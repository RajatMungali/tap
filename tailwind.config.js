/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#1A1511',
          900: '#1A1511',
          800: '#241D18',
          700: '#2F2620',
          600: '#40352C',
        },
        paper: {
          DEFAULT: '#FAF7F2',
          100: '#FAF7F2',
          200: '#F3EDE3',
          300: '#E6DDCE',
        },
        ember: {
          DEFAULT: '#F26B1D',
          300: '#FFB27A',
          400: '#FF8A3D',
          500: '#F26B1D',
          600: '#D9560B',
        },
      },
    },
  },
  plugins: [],
};
