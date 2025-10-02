/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        graybg: '#F5F5F5'
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
