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
    extend: {
      padding: {
        '0.75': '0.1875rem',
      },
      width: {
        '128': '32rem',
      },
      height: {
        '5.5': '1.375rem',
      },
      maxWidth: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
      }
    }
  },
  plugins: [
    themeSwapper(themeSwapperConfig),
    require('@tailwindcss/line-clamp')
  ],
}

