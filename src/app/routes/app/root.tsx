/** @format */

import { Outlet, useLocation } from "react-router";
import { getAccessToken } from "@/lib/authSerivices";
import LoggedOutHeader from "@/components/common/header/LoggedOutHeader";
import LoggedInHeader from "@/components/common/header/LoggedInHeader";

import { useWebSocketConnect } from "@/services/webSockect/useWebSocketConnect";
import { useUser } from "@/lib/auth";
import React from "react";
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
  //이게 먼저 실행이되고 로그아웃이 실행이됨.

  const token = getAccessToken();
  // if (!token) return null;

  // const token = useAuthToken();
  const {
    data: user,
    isError,
    error,
    refetch,
    isLoading,
  } = useUser({ enabled: !!token });

  console.log(user);
  React.useEffect(() => {
    if (token && !user) {
      refetch();
    }
  }, [token]);

  console.log("token", token);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("error", error);
  console.log("user", user);
  // useEffect(() => {
  //   if (token) {
  //
  //   }
  // }, [token]);
  // useEffect(() => {
  //   if (token && !isFetched) {
  //     refetch();
  //   }
  // }, [token, isFetched, refetch]);
  //token이 존재할때만 반응하도록, useUser가 존재하면

  return (
    <>
      {user ? (
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
