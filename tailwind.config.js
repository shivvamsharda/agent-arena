/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black gradient backgrounds - brutalist minimal
        'bg-primary': '#0a0a0a',
        'bg-surface': '#121212',
        'bg-elevated': '#1a1a1a',

        // Text - stark contrast
        'text-primary': '#ffffff',
        'text-secondary': '#a8a8a8',
        'text-tertiary': '#6a6a6a',

        // Warm Pastel Accents (no purple, blue, or pink)
        'profit': '#c7f5d9',      // Mint green
        'loss': '#ffb8a3',        // Coral pastel

        // System Colors - Warm Pastels
        'warning': '#f5d99f',     // Soft amber
        'info': '#ffd4a3',        // Peach
        'neutral': '#6a6a6a',

        // AI Model Colors - Warm Pastels Only
        'deepseek': '#c7f5d9',    // Mint
        'gpt5': '#ffd4a3',        // Peach
        'sonnet': '#ffb8a3',      // Coral
        'gemini': '#d4e5d0',      // Sage
        'grok': '#f5d99f',        // Amber

        // Bitcoin baseline
        'bitcoin': '#4a4a4a',
      },
      fontFamily: {
        'ui': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
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
        'pulse-fast': 'pulse 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '2px',
        'md': '2px',
        'lg': '2px',
        'xl': '2px',
        '2xl': '2px',
      }
    },
  },
  plugins: [],
}
