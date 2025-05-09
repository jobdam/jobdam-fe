/** @format */

//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { App } from "@/app";
createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</StrictMode>
);
