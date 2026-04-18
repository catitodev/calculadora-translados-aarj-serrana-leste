/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'aarj-blue': '#4A90A4',
        'aarj-green': '#8B9556',
        'aarj-gold': '#C9A227',
        'aarj-cream': '#FDFBF7',
        'aarj-text': '#2C2C2C',
        'aarj-text-light': '#6B6B6B',
        'aarj-success': '#4A7C59',
        'aarj-error': '#C75050',
      },
      fontFamily: {
        'heading': ['Nunito', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
