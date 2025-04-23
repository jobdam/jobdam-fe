/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 부분 중요!
  ],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.30)",
        destructive: "#e11d48", // 빨간색 또는 경고 색상
      },
    },
  },
  plugins: [],
};
