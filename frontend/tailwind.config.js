/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-teal": "#38A3A5",
        "custom-light-lime": "#80ED99",
      },
    },
  },
  plugins: [],
};
