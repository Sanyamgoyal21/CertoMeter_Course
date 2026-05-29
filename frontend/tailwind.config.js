/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#02040a',
          900: '#050810',
          800: '#0a0e1a',
          700: '#111827',
          600: '#1a2236',
        },
        accent: {
          orange: '#ff6b35',
          'orange-light': '#ff8c5a',
          cyan: '#00d9ff',
          'cyan-dark': '#00a8c8',
          purple: '#8b5cf6',
          'purple-light': '#a78bfa',
          pink: '#ec4899',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.7), 0 0 80px rgba(255, 107, 53, 0.2)' },
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.06) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(269,100%,77%,0.08) 0px, transparent 50%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15), transparent), radial-gradient(ellipse 50% 80% at 80% 50%, rgba(0, 217, 255, 0.08), transparent)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'orange-glow': 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
