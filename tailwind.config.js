/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Ini baris paling penting!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}