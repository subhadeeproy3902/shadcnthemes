import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: {
          DEFAULT: 'hsl(var(--background))',
          oklch: 'oklch(var(--background))'
        },
  			foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          oklch: 'oklch(var(--foreground))'
        },
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
          oklch: 'oklch(var(--card))',
          'foreground-oklch': 'oklch(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))',
          oklch: 'oklch(var(--popover))',
          'foreground-oklch': 'oklch(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
          oklch: 'oklch(var(--primary))',
          'foreground-oklch': 'oklch(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
          oklch: 'oklch(var(--secondary))',
          'foreground-oklch': 'oklch(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
          oklch: 'oklch(var(--muted))',
          'foreground-oklch': 'oklch(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
          oklch: 'oklch(var(--accent))',
          'foreground-oklch': 'oklch(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
          oklch: 'oklch(var(--destructive))',
          'foreground-oklch': 'oklch(var(--destructive-foreground))'
  			},
  			border: {
          DEFAULT: 'hsl(var(--border))',
          oklch: 'oklch(var(--border))'
        },
  			input: {
          DEFAULT: 'hsl(var(--input))',
          oklch: 'oklch(var(--input))'
        },
  			ring: {
          DEFAULT: 'hsl(var(--ring))',
          oklch: 'oklch(var(--ring))'
        },
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
