/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors:{
      'primary': '#FFFAE5',
      'secondary': '#FE7124',
      'tertiary': '#FF7CA4',
      'quaternary': '#FFCE62',
      'quinary': '#0BC56D',
      'senary': '#FAF1CB',
      'septenary': '#E0E0E0',
      'octonary': '#575757',
      'nonary': '#FFFFFF',
      
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        sans:['var(--font-ClashDisplay)']
      }
    },
  },
}
