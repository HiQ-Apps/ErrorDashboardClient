/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    colors: {
      default: '#098585',
      primary: '#007bff',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
      overlay: 'rgba(0, 0, 0, 0.5)',
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      yellow: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#0a0e13',
      },
    },
    fontSize: {
      '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
      '2xs': ['0.625rem', { lineHeight: '1rem' }],
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontFamily: {
      sans: ['lexend'],
      serif: ['markazi'],
    },
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        markazi: ['Markazi Text', 'serif'],
      },
      boxShadow: {
        'custom-hiq': '2px 2px rgba(9, 133, 133, 0.4), 4px 4px rgba(9, 133, 133, 0.3), 6px 6px rgba(9, 133, 133, 0.2), 8px 8px rgba(9, 133, 133, 0.1)',
      },
      textShadow: {
        'custom-hiq': '2px 2px 2px rgba(9, 133, 133, 0.4)',
      },
      height: {
        screens: {
          'xs': '480px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
        '4.4': '1.1rem',
        '4.5': '1.125rem',
        '104': '26rem',
        '120': '30rem',
        '140': '35rem',
      },
      width: {
        '4.4  ': '1.1rem',
        '4.5': '1.125rem',
        '88': '22rem',
        '104': '26rem',
        '120': '30rem',
        '130': '32.5rem',
        '140': '35rem',
      },
      maxWidth: {
        '4.4': '1.1rem',
        '4.5': '1.125rem',
        '104': '26rem',
        '120': '30rem',
        '130': '32.5rem',
        '135': '33.75rem',
        '140': '35rem',
        '150': '37.5rem',
        '160': '40rem',
        '170': '42.5rem',
        '180': '45rem',
        '190': '47.5rem',
      },
      spacing: {
        '2.125': '0.53125rem',
        '2.25': '0.5625rem',
        '2.75': '0.6875rem',
        '4.125': '1.03125rem',
        '4.15': '1.0375rem',
        '4.2': '1.05rem',
        '4.225': '1.05625rem',
        '4.23': '1.0575rem',
        '4.24': '1.06rem',
        '4.25': '1.0625rem',
        '4.275': '1.069rem',
        '4.3': '1.075rem',
        '4.4': '1.1rem',
        '4.5': '1.125rem',
        '4.6': '1.15rem',
        '4.7': '1.175rem',
        '4.75': '1.1875rem',
        '4.775': '1.19375rem',
        '4.8': '1.2rem',
        '4.875': '1.21875rem',
        '4.9': '1.225rem',
        '4.925': '1.23125rem',
        '4.95': '1.2375rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "lid-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-5px)" },
        },
        "lid-down": {
          from: { transform: "translateY(-5px)" },
          to: { transform: "translateY(0)" },
        },
        "fade-error": {
          from: { backgroundColor: "white" },
          to: { backgroundColor: "bg-red-500" }
        },
        "ease-in-out-rotation": {
          '0%': {
            transform: "rotate(0deg)",
            "animation-timing-function": "ease-in",
          },
          '50%': {
            transform: "rotate(720deg)",
            "animation-timing-function": "ease-out",
          },
          '100%': {
            transform: "rotate(1440deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "lid-up": "lid-up 0.3s ease-out forwards",
        "lid-down": "lid-down 0.3s ease-out forwards",
        "fade-error": "fade-error 0.3s ease-out forwards",
        "ease-in-out-rotation": "ease-in-out-rotation 1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
  function ({ addUtilities }) {
    addUtilities({
      '.text-shadow-custom-hiq': {
        'text-shadow': '2px 2px 2px #098585',
      },
    });
  },
  ],
}
