const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "50": "#f5f5f5",
          "100": "#e1e1e1",
          "200": "#e2e2e2",
          "300": "#7d7d7d",
          "400": "#5d5d5d",
          "500": "#4d4d4d",
          "600": "#3d3d3d",
          "700": "#2d2d2d",
          "800": "#1d1d1d",
          "900": "#0d0d0d",
          "950": "#0f0f0f0",
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), 
    require('tailwind-scrollbar'),
  ],
}