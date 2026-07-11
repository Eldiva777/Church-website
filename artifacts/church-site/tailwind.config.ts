import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'background-base': '#150E1F',
        'surface': '#2A1B47',
        'accent-gold': '#D4AF37',
        'black-frame': '#0D0A12',
        'text-primary': '#F4F1EA',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        heroFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'hero-fade-up': 'heroFadeUp 1s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
