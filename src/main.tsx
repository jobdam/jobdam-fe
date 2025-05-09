/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";

import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "@/app";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
