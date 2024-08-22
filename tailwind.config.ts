import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";

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
      gray: colors.slate,
      paragraph: colors.slate,
      colors: {
        blueA1: "hsla(210, 100%, 50%, 0.02)",
        blueA2: "hsla(207, 100%, 50%, 0.04)",
        blueA3: "hsla(205, 100%, 48%, 0.1)",
        blueA4: "hsla(203, 100%, 50%, 0.16)",
        blueA5: "hsla(205, 100%, 50%, 0.24)",
        blueA6: "hsla(207, 100%, 48%, 0.33)",
        blueA7: "hsla(207, 100%, 46%, 0.44)",
        blueA8: "hsla(206, 100%, 45%, 0.63)",
        blueA9: "hsl(206, 100%, 50%)",
        blueA10: "hsla(207, 100%, 47%, 0.98)",
        blueA11: "hsla(208, 100%, 40%, 0.95)",
        blueA12: "hsla(216, 100%, 17%, 0.93)",
        pinkA1: "hsla(320, 100%, 50%, 0.01)",
        pinkA2: "hsla(326, 100%, 44%, 0.03)",
        pinkA3: "hsla(326, 100%, 48%, 0.09)",
        pinkA4: "hsla(323, 100%, 44%, 0.14)",
        pinkA5: "hsla(322, 100%, 41%, 0.19)",
        pinkA6: "hsla(323, 100%, 38%, 0.25)",
        pinkA7: "hsla(323, 100%, 36%, 0.33)",
        pinkA8: "hsla(322, 100%, 34%, 0.42)",
        pinkA9: "hsla(322, 100%, 39%, 0.75)",
        pinkA10: "hsla(322, 100%, 38%, 0.78)",
        pinkA11: "hsla(322, 100%, 36%, 0.84)",
        pinkA12: "hsla(320, 100%, 17%, 0.93)",
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
