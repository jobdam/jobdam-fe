import { useWebSocketConnect } from "@/services/useWebSocketConnect";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const connectPaths = ["/interview/matching", "/chatroom", "/videoChat"];

export const WebSocketConnect = () => {
  const location = useLocation();
  const shouldConnect = connectPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  useWebSocketConnect(shouldConnect);
  return null;
};
const WebSocketConnectManager = () => {
  return (
    <>
      <WebSocketConnect />
      <Outlet />
    </>
  );
};

export default WebSocketConnectManager;
