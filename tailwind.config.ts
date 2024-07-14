import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        main: colors.indigo,
      },
      width: {
        "side-nav": "14rem",
      },
    },
    size: {
      "side-nav": "14rem", // 224px
    },
  },
  // plugins: [require("tailwindcss-react-aria-components")],
};
export default config;
