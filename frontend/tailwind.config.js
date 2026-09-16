export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a", // BigBasket Green style
        secondary: "#15803d",
        accent: "#f59e0b", // Amber/Yellow
        background: "#f8fafc", // Very light slate
        surface: "#ffffff",
      }
    },
  },
  plugins: [],
}
