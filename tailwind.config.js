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
        bg: {
          main: '#080B10',
          secondary: '#10151D',
          tertiary: '#181F2B',
          card: '#0D121B',
        },
        terminal: {
          green: '#39FF88',
          cyan: '#00F5FF',
          purple: '#A970FF',
          pink: '#FF4FD8',
          amber: '#FFB84D',
          red: '#FF5C5C',
        },
        muted: '#A8B5C6', /* WCAG AA compliant on #080B10 (4.6:1) */
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(57, 255, 136, 0.25)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.25)',
        'glow-purple': '0 0 20px rgba(169, 112, 255, 0.25)',
        'window': '0 15px 35px rgba(0, 0, 0, 0.75)',
        'inner-highlight': 'inset 0 1px 1px rgba(255,255,255,0.08)',
      },
      animation: {
        'blink': 'blink 1s step-start infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'fluid-slow': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
