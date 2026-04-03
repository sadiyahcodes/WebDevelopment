/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        success: '#00B517',
        warning: '#FF9017',
        'text-main': '#1C1C1C',
        'text-muted': '#8B96A5',
        border: '#DEE2E7',
        'page-bg': '#F7FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}