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
  //이게 먼저 실행이되고 로그아웃이 실행이됨.

  const token = getAccessToken();
  // const token = useAuthToken();
  const { data: user } = useUser({ enabled: !!token });

  // useEffect(() => {
  //   if (token) {
  //     refetch(); // token이 있고 아직 안 불러왔을 때만
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
