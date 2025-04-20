/** @format */

import { Outlet } from "react-router";

import { DashboardLayout } from "@/components/layout";
import LoggedOutHeader from "@/components/common/header/LoggedOutHeader";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    // <LoggedOutHeader>
    <Outlet />
    //{" "}
    // </LoggedOutHeader>
  );
};

export default AppRoot;
