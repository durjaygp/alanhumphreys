/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './**/*.html',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D1B33',
          'navy-light': '#142742',
          'navy-dark': '#080f1e',
          slate: '#586B8C',
          'slate-light': '#6e82a6',
          gray: '#8D8D8D',
          silver: '#E6E6E6',
          gold: '#C9A84C',
          'gold-light': '#DFCA8A',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Montserrat', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px rgba(201, 168, 76, 0.3)',
      }
    },
  },
  plugins: [],
}
