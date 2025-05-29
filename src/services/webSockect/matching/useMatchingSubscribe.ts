/** @format */

import { useEffect } from "react";
import { IMessage, StompHeaders } from "@stomp/stompjs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setDestination } from "@/store/slices/websockets"; // 선택사항
import { getWebSocketClient } from "../useWebSocketConnect";

interface Props {
  destination: string;
  onMessage: (msg: IMessage) => void;
  headers?: StompHeaders;
  enabled?: boolean;
}

export const useMatchingSubscribe = ({
  destination,
  onMessage,
  headers,
  enabled,
}: Props) => {
  const isConnected = useSelector(
    (state: RootState) => state.websocket.isConnected
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected || !enabled) return;

    const client = getWebSocketClient();
    if (!client || !client.connected) {
      console.warn("WebSocket 연결 안 됨");
      return;
    }

    const subscription = client.subscribe(
      destination,
      onMessage,
      headers ?? {}
    );
    console.log("[구독 완료]", destination);
    dispatch(setDestination(destination));

    return () => {
      subscription.unsubscribe();
      console.log("[구독 취소]", destination);
      dispatch(setDestination(null));
    };
  }, [isConnected, destination, onMessage, headers, enabled]);
};
