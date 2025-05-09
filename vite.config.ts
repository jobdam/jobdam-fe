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
  resolve: {
    alias: {
      "@": "/src", // src 디렉토리를 @로 alias 설정
    },
  },
  // global is not defined 에러 해결
  define: {
    global: "globalThis",
  },
});
