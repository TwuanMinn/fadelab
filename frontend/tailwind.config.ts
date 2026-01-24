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
                "background-light": "#ffffff",
                "background-dark": "#101822",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                "glow": "0 4px 20px -2px rgba(37, 99, 235, 0.2)"
            }
        },
    },
    plugins: [],
};
export default config;
