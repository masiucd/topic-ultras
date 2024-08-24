import type {Config} from "tailwindcss";
// import colors, {gray} from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // blue: {
        "blue-50": "hsl(210, 100%, 99%)",
        "blue-100": "hsl(207, 100%, 98%)",
        "blue-200": "hsl(205, 92%, 95%)",
        "blue-300": "hsl(203, 100%, 92%)",
        "blue-400": "hsl(206, 100%, 88%)",
        "blue-500": "hsl(207, 93%, 83%)",
        "blue-600": "hsl(207, 85%, 76%)",
        "blue-700": "hsl(206, 82%, 65%)",
        "blue-800": "hsl(206, 100%, 50%)",
        "blue-900": "hsl(207, 96%, 48%)",
        "blue-1000": "hsl(208, 88%, 43%)",
        "blue-1100": "hsl(216, 71%, 23%)",
        "blue-50-dark": "hsl(215, 42%, 9%)",
        "blue-100-dark": "hsl(218, 39%, 11%)",
        "blue-200-dark": "hsl(212, 69%, 16%)",
        "blue-300-dark": "hsl(209, 100%, 19%)",
        "blue-400-dark": "hsl(207, 100%, 23%)",
        "blue-500-dark": "hsl(209, 79%, 30%)",
        "blue-600-dark": "hsl(211, 66%, 37%)",
        "blue-700-dark": "hsl(211, 65%, 45%)",
        "blue-800-dark": "hsl(206, 100%, 50%)",
        "blue-900-dark": "hsl(210, 100%, 62%)",
        "blue-1000-dark": "hsl(210, 100%, 72%)",
        "blue-1100-dark": "hsl(205, 100%, 88%)",
        // },
        // gray: {
        "gray-50": "hsl(300, 20%, 99%)",
        "gray-100": "hsl(270, 20%, 98%)",
        "gray-200": "hsl(285, 14%, 95%)",
        "gray-300": "hsl(276, 12%, 92%)",
        "gray-400": "hsl(274, 12%, 89%)",
        "gray-500": "hsl(262, 11%, 86%)",
        "gray-600": "hsl(258, 11%, 82%)",
        "gray-700": "hsl(249, 10%, 75%)",
        "gray-800": "hsl(249, 6%, 57%)",
        "gray-900": "hsl(250, 5%, 53%)",
        "gray-950": "hsl(252, 5%, 41%)",
        "gray-1000": "hsl(257, 10%, 14%)",

        "gray-50-dark": "hsl(270, 6%, 7%)",
        "gray-100-dark": "hsl(270, 4%, 10%)",
        "gray-200-dark": "hsl(260, 4%, 14%)",
        "gray-300-dark": "hsl(270, 5%, 17%)",
        "gray-400-dark": "hsl(264, 5%, 20%)",
        "gray-500-dark": "hsl(270, 5%, 24%)",
        "gray-600-dark": "hsl(257, 5%, 29%)",
        "gray-700-dark": "hsl(258, 5%, 39%)",
        "gray-800-dark": "hsl(251, 5%, 45%)",
        "gray-900-dark": "hsl(251, 4%, 50%)",
        "gray-950-dark": "hsl(258, 7%, 72%)",
        "gray-1000-dark": "hsl(240, 6%, 94%)",
        // },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

// const pinkA = {
// pinkA1: "hsla(320, 100%, 50%, 0.01)",
// pinkA2: "hsla(326, 100%, 44%, 0.03)",
// pinkA3: "hsla(326, 100%, 48%, 0.09)",
// pinkA4: "hsla(323, 100%, 44%, 0.14)",
// pinkA5: "hsla(322, 100%, 41%, 0.19)",
// pinkA6: "hsla(323, 100%, 38%, 0.25)",
// pinkA7: "hsla(323, 100%, 36%, 0.33)",
// pinkA8: "hsla(322, 100%, 34%, 0.42)",
// pinkA9: "hsla(322, 100%, 39%, 0.75)",
// pinkA10: "hsla(322, 100%, 38%, 0.78)",
// pinkA11: "hsla(322, 100%, 36%, 0.84)",
// pinkA12: "hsla(320, 100%, 17%, 0.93)",
// };

// const blueA = {
//   blueA1: "hsla(210, 100%, 50%, 0.02)",
//   blueA2: "hsla(207, 100%, 50%, 0.04)",
//   blueA3: "hsla(205, 100%, 48%, 0.1)",
//   blueA4: "hsla(203, 100%, 50%, 0.16)",
//   blueA5: "hsla(205, 100%, 50%, 0.24)",
//   blueA6: "hsla(207, 100%, 48%, 0.33)",
//   blueA7: "hsla(207, 100%, 46%, 0.44)",
//   blueA8: "hsla(206, 100%, 45%, 0.63)",
//   blueA9: "hsl(206, 100%, 50%)",
//   blueA10: "hsla(207, 100%, 47%, 0.98)",
//   blueA11: "hsla(208, 100%, 40%, 0.95)",
//   blueA12: "hsla(216, 100%, 17%, 0.93)",
// };
