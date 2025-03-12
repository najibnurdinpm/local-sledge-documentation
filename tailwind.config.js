/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "theme.config.js",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        dark: "#151515",
        "yellow-1": "#F8FFAE",
        "gray-1": "#677487",
        "gray-2": "#2D2D2D",
        "gray-3": "#9C9C9C",
      },
    },
  },
  plugins: [],
};
