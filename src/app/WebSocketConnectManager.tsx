/** @format */
import { useWebSocketConnect } from "@/services/webSockect/useWebSocketConnect";
import { Outlet, useLocation } from "react-router";

const connectPaths = ["/interview/matching", "/chatRoom", "/videoChat"];

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
