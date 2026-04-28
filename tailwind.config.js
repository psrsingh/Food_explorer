/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 24px 70px rgb(0 0 0 / 0.35)",
        glow: "0 0 0 1px rgb(16 185 129 / 0.18), 0 24px 70px rgb(16 185 129 / 0.08)",
      },
    },
  },
  plugins: [],
}
