import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1fb6ff",
        textBlack: "#1B1818",
        textBlueBlack: "#1D2939",
        textDarkGrey: "#403C3C",
        textGreyBlack: "#312F2F",
        textGrey: "#645D5D",
        borderColor: "#D5D8DB",
        success: "#04e03f",
        red: "#E11C1B",
      },
    },
    backgroundImage: {},
  },
  plugins: [],
};
export default config;
