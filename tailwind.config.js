/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        habitris: {
          bg: 'var(--habitris-bg)',
          surface: 'var(--habitris-surface)',
          text: 'var(--habitris-text)',
          muted: 'var(--habitris-muted)',
          border: 'var(--habitris-border)',
          accent: 'var(--habitris-accent)',
          block: {
            i: 'var(--block-i)',
            o: 'var(--block-o)',
            t: 'var(--block-t)',
            s: 'var(--block-s)',
            z: 'var(--block-z)',
            j: 'var(--block-j)',
            l: 'var(--block-l)',
          },
        },
      },
    },
  },
  plugins: [],
}
