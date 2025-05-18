/** @format */

import { useEffect, useRef } from "react";
import { IMessage } from "@stomp/stompjs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setDestination } from "@/store/slices/websockets"; // 선택사항
import { getWebSocketClient } from "../useWebSocketConnect";

interface Props {
  destination: string;
  onMessage: (msg: IMessage) => void;
}

export const useChatSubscribe = ({ destination, onMessage }: Props) => {
  const isConnected = useSelector(
    (state: RootState) => state.websocket.isConnected
  );
  const dispatch = useDispatch();

  //메세지 핸들러 ref해서 중복구독방지
  const handlerRef = useRef(onMessage);
  useEffect(() => {
    handlerRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!isConnected) return;

    const client = getWebSocketClient();
    if (!client || !client.connected) {
      console.warn("WebSocket 연결 안 됨dd");
      return;
    }

    const subscription = client.subscribe(destination, (msg) => {
      handlerRef.current(msg);
    });

    console.log("[구독 완료]", destination);
    dispatch(setDestination(destination));

    return () => {
      subscription.unsubscribe();
      console.log("[구독 취소]", destination);
      dispatch(setDestination(null));
    };
  }, [isConnected, destination]);
};
