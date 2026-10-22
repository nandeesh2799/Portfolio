/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#04070D',
          900: '#080D1A',
          850: '#0E172A',
          800: '#152238',
          750: '#1D2E4A',
          700: '#253B5E',
        },
        cyan: {
          glow: '#00F2FE',
          electric: '#0EA5E9',
        },
        emerald: {
          glow: '#10B981',
          teal: '#14B8A6',
        },
        amber: {
          glow: '#F59E0B',
          warm: '#FBBF24',
        },
        purple: {
          studio: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.2))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(0, 242, 254, 0.5))' },
        }
      }
    },
  },
  plugins: [],
}
