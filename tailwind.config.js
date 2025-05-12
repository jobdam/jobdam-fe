/** @format */

const { mauve, violet, red, blackA, gray } = require("@radix-ui/colors"); // 예시

/**@type {import('tailwindcss').Config}*/

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 부분 중요!
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 24px 0px rgba(112, 144, 176, 0.30)",
      },

      backgroundImage: {
        "gradient-videochat":
          "linear-gradient(180deg, #C1E1FF 0%, #F2F9FF 100%)",
        "gradient-auth-entry":
          "linear-gradient(180deg, #488EFF 30%, #72BCFF 100%)",
        "gradient-auth-login":
          "linear-gradient(180deg, #C1E1FF 0%, #F2F9FF 100%)",
      },

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
  plugins: [require("tailwind-scrollbar")],
};
