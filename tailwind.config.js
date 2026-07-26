/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1400px'
        }
      },
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          // Brand palette (THEMEMECADET)
          cadet: {
            ink: '#050706',        // deep black
            night: '#0B120D',      // dark green / night
            olive: '#1F2E22',      // deep military green
            moss: '#2E4230',       // moss highlight
            khaki: '#8A9280',      // muted khaki text
            bone: '#EDEAE0',       // off white
            paper: '#F5F3EE',      // paper white
            gold: '#C9A961',       // golden accent
            'gold-dark': '#9C7F3E'
          }
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
          display: ['var(--font-display)', 'ui-serif', 'Georgia'],
          mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular']
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' }
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' }
          },
          'marquee': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' }
          },
          'scan': {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100%)' }
          }
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'marquee': 'marquee 40s linear infinite',
          'scan': 'scan 6s ease-in-out infinite'
        }
      }
    },
    plugins: [require("tailwindcss-animate")],
  }
