/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E3F2FD",
          200: "#BBDEFB",
          300: "#90CAF9",
          400: "#64B5F6",
          500: "#42A5F5",
          600: "#2196F3",
          700: "#1E88E5",
          800: "#1976D2",
          900: "#cf0068",
          faded: "rgb(207,0,104,0.4)",
        },
        secondary: {
          100: "#FCE4EC",
          200: "#F8BBD0",
          300: "#F48FB1",
          400: "#F06292",
          500: "#EC407A",
          600: "#E91E63",
          700: "#D81B60",
          800: "#C2185B",
          900: "#AD1457",
        },
        white: {
          primary: "#ffffff",
        },
        black: {
          light: "#777777",
          faded: "#5F5F5F",
          200:"#1A202C"
        },
        purple: {
          300: "#9747FF",
          800: "#401E6C",
        },
        red: {
          300: "#CF0068",
          800: "#690035",
        },
        yellow: {
          300: "#F5E235",
          800: "#8F841F",
        },
      },
      fontFamily: {
        bodonimodasc: ["BodoniModaSC", "serif"],
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [],
};
