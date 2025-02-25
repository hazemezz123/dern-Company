/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        "background-dark": "#121212", // Deep Black
        "surface-dark": "#1E1E1E", // Dark Gray
        "primary-dark": "#4A90E2", // Vibrant Blue
        "secondary-dark": "#21C8A7", // Teal Green
        "text-primary-dark": "#E0E0E0", // Light Gray
        "text-secondary-dark": "#B0B0B0", // Muted Gray
        "border-dark": "#292929", // Soft Gray

        // Light Mode Colors
        "background-light": "#F5F7FA", // Very Light Gray
        "surface-light": "#FFFFFF", // Pure White
        "primary-light": "#007BFF", // Tech Blue
        "secondary-light": "#009688", // Greenish-Teal
        "text-primary-light": "#212121", // Deep Charcoal
        "text-secondary-light": "#4A4A4A", // Medium Gray
        "border-light": "#E0E0E0", // Subtle Gray
      },
    },
  },
  plugins: [],
};
