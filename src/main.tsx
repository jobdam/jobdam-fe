/** @format */

//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { App } from "@/app";

//콘솔무력화의 가장 간단한 방식
//-> 빌드시 제거 방법이 가장깔끔하나 빌드방식의 변경으로
//빌드타임이 늘어난다고해서 일단은 이렇게만 처리하였음.
if (import.meta.env.VITE_ENV === "production") {
  console.log("실행");
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
}
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
