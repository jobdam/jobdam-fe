/** @format */

import LoggedOutHeader from "@/components/common/header/LoggedOutHeader";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
