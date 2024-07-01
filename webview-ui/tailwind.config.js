/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#af73d8",
        red: "#FF1E58",
      },
    },
  },
  plugins: [],
};
