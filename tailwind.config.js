/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#f7f3ef",
          100: "#efe7df",
          200: "#dfcfbf",
          300: "#cdb39b",
          400: "#b79073",
          500: "#9c6b4b",       // warm coffee brown (primary base)
          600: "#7d5239",
          700: "#5d3c2a",
          800: "#3f281c",
          900: "#24170f"
        },
        crema: "#F6F2E8",        // soft cream secondary
        sage: "#D6E4D3",         // light sage alt-secondary
        espresso: "#6B2E1F"      // deep espresso accent
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji','Segoe UI Emoji']
      }
    },
  },
  plugins: [],
}
