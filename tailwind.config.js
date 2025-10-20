/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#154F54',
          50: '#E6F3F4',
          100: '#CCE7E9',
          200: '#99CFD3',
          300: '#66B7BD',
          400: '#338FA6',
          500: '#154F54',
          600: '#0F3B40',
          700: '#0B2C30',
          800: '#081E21',
          900: '#051315'
        },
        accent: {
          DEFAULT: '#4F797D',
          50: '#EAF1F2',
          100: '#D6E3E5',
          200: '#AEC3C7',
          300: '#86A3A9',
          400: '#63898F',
          500: '#4F797D',
          600: '#416268',
          700: '#344D52',
          800: '#26393D',
          900: '#192628'
        },
        surface: '#0B2C30',      
        card: '#0F3B40',
        foreground: '#EAF1F2',
        muted: '#9FB6B9'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
};
