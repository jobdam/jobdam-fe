/** @format */

import { Outlet } from "react-router";

import LoggedOutHeader from "@/components/common/header/LoggedOutHeader";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <>
      <LoggedOutHeader></LoggedOutHeader>

      <Outlet />
    </>
  );
};

export default AppRoot;
