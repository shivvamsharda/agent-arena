/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds (Deep Slate)
        'bg-primary': '#0F1419',
        'bg-surface': '#1C2128',
        'bg-elevated': '#262C36',

        // Text (Off-white spectrum)
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'text-tertiary': '#6E7681',

        // P&L Colors
        'profit': '#00D4AA',      // Vibrant teal
        'loss': '#F87171',        // Coral red

        // System Colors
        'warning': '#FF9500',
        'info': '#2196F3',
        'neutral': '#6B7280',

        // AI Model Colors (5 models)
        'deepseek': '#0EA5E9',    // Electric Blue
        'gpt5': '#10B981',        // Emerald Green
        'sonnet': '#F97316',      // Sunrise Orange
        'gemini': '#EC4899',      // Neon Pink
        'grok': '#8B5CF6',        // Cyber Violet

        // Bitcoin baseline
        'bitcoin': '#6B7280',     // Muted gray for baseline
      },
      fontFamily: {
        'ui': ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'data': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      animation: {
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'flash-positive': 'flash-positive 300ms ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'flash-positive': {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(0, 212, 170, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        }
      },
      backdropBlur: {
        'xl': '20px',
      }
    },
  },
  plugins: [],
}
