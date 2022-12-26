const themeSwapper = require('tailwindcss-theme-swapper')
const colors = require('tailwindcss/colors')

const themeSwapperConfig = {
  themes: [
    {
      name: 'base',
      selectors: [':root'],
      theme: {
        colors: {
          base: colors.slate,
          primary: colors.slate,
        },
      },
    },
  ],
}

const colorKey = Object.keys(colors).map((key) => {
  if (typeof colors[key] === 'object' && key.toLowerCase() === key) {
    return {
      name: key,
      selectors: [`.theme-${key}`],
      theme: {
        colors: {
          primary: colors[key],
        },
      }
    }
  }
}).filter(Boolean)

themeSwapperConfig.themes.push(...colorKey)

/** @types {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    themeSwapper(themeSwapperConfig),
    require('@tailwindcss/line-clamp')
  ],
}

