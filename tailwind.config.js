/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // Пути для вашего проекта
    "./app/**/*.{js,ts,jsx,tsx}",
    "./core/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        1000: 1000,
      },
      borderRadius: {
        inherit: 'inherit'
      }
    },
  },
  darkMode: "class",
};

export default config;