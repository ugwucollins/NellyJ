/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        secondary: "#111827",
        sellerDark: "rgb(3 7 18 / 0.5)",
        primary: "#ffffff",
        primary1: "#f3f4f6",
      },
      colors: {
        secondary: "#111827",
        primary: "white",
        primary1: "#f3f4f6",
      },
    },
  },
  plugins: [],
};
