/** @format */

import { Outlet, useLocation } from "react-router";
import { getAccessToken } from "@/lib/authSerivices";
import LoggedOutHeader from "@/components/common/header/LoggedOutHeader";
import LoggedInHeader from "@/components/common/header/LoggedInHeader";

import { useWebSocketConnect } from "@/services/webSockect/useWebSocketConnect";
import { useUser } from "@/lib/auth";

const connectPaths = ["/interview/matching", "/chatroom", "/videoChat"];

export const ErrorBoundary = () => {
  return <div> Something went wrong!</div>;
};
export const WebSocketConnect = () => {
  const location = useLocation();
  const shouldConnect = connectPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  useWebSocketConnect(shouldConnect);
  return null;
};

const AppRoot = () => {
  const token = getAccessToken();
  const user = useUser();
  console.log(token);
  console.log("user", user);
  //token이 존재할때만 반응하도록, useUser가 존재하면

  return (
    <>
      {user?.data ? (
        <LoggedInHeader></LoggedInHeader>
      ) : (
        <LoggedOutHeader></LoggedOutHeader>
      )}
      <WebSocketConnect />
      <Outlet />
    </>
  );
};

export default AppRoot;
