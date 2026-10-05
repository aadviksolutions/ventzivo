import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            300: "#93C5FD",
            400: "#60A5FA",
            500: "#2563EB",
            600: "#1D4ED8",
            700: "#0038A8", // Logo Electric Blue
            800: "#0B3B95", // Logo Royal Blue Primary
            900: "#0A2560", // Logo Deep Navy
            950: "#06153B", // Dark Ink
          },
          gold: {
            50: "#FFFBF0",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#F5C869", // Bright Logo Gold Highlight
            500: "#E5A93C", // Mid Logo Gold
            600: "#D49B28", // Primary Logo Metallic Gold
            700: "#B88014", // Deep Gold Accent
            800: "#92630A",
            900: "#78350F",
          },
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Outfit'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        heading: ["'Plus Jakarta Sans'", "'Outfit'", "sans-serif"],
      },
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(11, 59, 149, 0.1), 0 8px 10px -6px rgba(11, 59, 149, 0.1)',
        'gold': '0 10px 25px -5px rgba(212, 155, 40, 0.2), 0 8px 10px -6px rgba(212, 155, 40, 0.1)',
        'card-hover': '0 20px 30px -10px rgba(10, 37, 96, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "radial-gradient(circle at 10% 20%, rgba(11, 59, 149, 0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(212, 155, 40, 0.05) 0%, transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
