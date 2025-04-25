/** @format */

const { mauve, violet, red, blackA, gray } = require("@radix-ui/colors"); // 예시
// const defaultTheme = require("tailwindcss/defaultTheme");

// const mauve = require("@radix-ui/colors/mauve");
// const violet = require("@radix-ui/colors/violet");
// const red = require("@radix-ui/colors/red");
// const blackA = require("@radix-ui/colors/blackA");
// const gray = require("@radix-ui/colors/gray");
/**@type {import('tailwindcss').Config}*/

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 부분 중요!
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
        ...gray,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
