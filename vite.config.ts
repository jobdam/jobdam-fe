/** @format */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.mjs"],
  },

  resolve: {
    alias: {
      "@": "/src", // src 디렉토리를 @로 alias 설정
    },
  },
  // global is not defined 에러 해결
  define: {
    global: "globalThis",
  },

  //빌드시 무력화 하는 방법 빌드의 변화로 빌드 타임이 늘어나기때문에 상관없다면
  // /main.tsx에서  console무력화 하고 진행해도 무방함. 빌드시 제거하기때문에
  //번들 크기도 줄고, console자체가 없기때문에 보안, 즉 민감정보가 드러나지않음.

  // build: {
  //   minify: 'terser', // terser로 minify 해야 drop_console 작동
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,   // console.log, warn, error 등 제거
  //       drop_debugger: true,  // debugger 제거
  //     },
  //   },
  // },
});
