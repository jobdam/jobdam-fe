/** @format */

import { useEffect } from "react";
import { IMessage } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getWebSocketClient } from "../useWebSocketConnect";
import { useSignalPublisher } from "./useSignalPublisher";

// 시그널 메시지 타입
export type SignalMessage =
  | { signalType: "JOIN_LIST"; userIdList: number[] }
  | { signalType: "OFFER" | "ANSWER"; senderId: number; sdp: string }
  | {
      signalType: "CANDIDATE";
      senderId: number;
      candidate: string;
      sdpMid: string;
      sdpMLineIndex: number;
    };

interface Props {
  roomId: string | number;
  onSignal: (data: SignalMessage) => void;
}

export const useSignalSubscription = ({ roomId, onSignal }: Props) => {
  const isConnected = useSelector(
    (state: RootState) => state.websocket.isConnected
  );

  const { sendJoin } = useSignalPublisher();

  useEffect(() => {
    if (!isConnected) return;

    const client = getWebSocketClient();
    if (!client || !client.connected) {
      console.warn(" WebSocket 연결 안 됨");
      return;
    }

    const destination = `/user/queue/signal/${roomId}`;
    const subscription = client.subscribe(destination, (msg: IMessage) => {
      try {
        const parsed = JSON.parse(msg.body);
        onSignal(parsed as SignalMessage);
      } catch (e) {
        console.error(" 시그널 파싱 실패:", msg.body);
      }
    });

    console.log(" 시그널 구독 시작:", destination);

    sendJoin(roomId);

    return () => {
      subscription.unsubscribe();
      console.log(" 시그널 구독 해제:", destination);
    };
  }, [isConnected, roomId, onSignal]);
};
