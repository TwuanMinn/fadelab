import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary": "#2563EB",
                "secondary": "#38BDF8",
                "accent": "#F59E0B",
                "bronze": "#B45309",
                "charcoal": "#0F172A",
                "background-light": "#ffffff",
                "background-dark": "#020617",
                "surface-light": "#f8f9fa",
                "surface-dark": "#1a2430",
            },
            fontFamily: {
                "display": ["var(--font-outfit)", "sans-serif"],
                "sans": ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px" },
            boxShadow: {
                "soft": "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
                "glow": "0 4px 20px -2px rgba(37, 99, 235, 0.2)",
                "card": "0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)",
                "card-hover": "0 0 0 1px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.08)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            }
        },
    },
    plugins: [],
};
export default config;
