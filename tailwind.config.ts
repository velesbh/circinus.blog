import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { 50: '#f0f4ff', 100: '#e0e9ff', 500: '#3b5bdb', 600: '#2f4ac5', 700: '#2340a8', 900: '#0f1f5c' },
        accent: { 400: '#f59e0b', 500: '#d97706' },
      },
    },
  },
  plugins: [],
}
export default config
