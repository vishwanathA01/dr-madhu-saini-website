// Brand colours taken from the Dr. Madhu Saini logo (public/images/logo-original.png).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { primary: '#0b6fbf', 'primary-dark': '#01427e', navy: '#0b2a55', ink: '#0a1628', teal: '#0e8fb5', sky: '#a9d8ff', soft: '#edf5fd' },
      fontFamily: { sans: ['Poppins', 'sans-serif'], display: ['Merriweather', 'serif'] }
    }
  },
  plugins: []
}
