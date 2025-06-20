/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        border: 'background ease infinite',
      },
      keyframes: {
        background: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        background: '#181818',
        'background-soft': '#222222',
        'background-mute': '#282828',
      },
    },
  },
  plugins: [import('@tailwindcss/forms')],
}
