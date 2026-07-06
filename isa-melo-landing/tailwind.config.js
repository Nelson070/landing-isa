/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bege: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE6D8',
          mid: '#E8DFD0',
        },
        oliva: {
          DEFAULT: '#3D4A2E',
          mid: '#4E5E3A',
          light: '#6B7A56',
          pale: '#C5CDB8',
        },
        gold: {
          DEFAULT: '#A89060',
          light: '#C4AA7A',
        },
        text: {
          dark: '#2A2A22',
          mid: '#5A5A4E',
          light: '#8A8A7E',
        }
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 40px rgba(61,74,46,0.08)',
        'soft-lg': '0 20px 60px rgba(61,74,46,0.12)',
      }
    },
  },
  plugins: [],
}