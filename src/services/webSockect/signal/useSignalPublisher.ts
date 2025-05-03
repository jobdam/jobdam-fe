/** @format */

import { getWebSocketClient } from "../useWebSocketConnect";

export type SignalType = "OFFER" | "ANSWER" | "CANDIDATE";

interface BasePayload {
  type: SignalType;
  receiverId: number;
  roomId: string | number;
}
interface SdpSignalPayload extends BasePayload {
  type: "OFFER" | "ANSWER";
  signal: {
    sdp: string;
  };
}

interface CandidateSignalPayload extends BasePayload {
  type: "CANDIDATE";
  signal: {
    candidate: string;
    sdpMid: string;
    sdpMLineIndex: number;
  };
}

export type SignalPayload = SdpSignalPayload | CandidateSignalPayload;

export const useSignalPublisher = () => {
  //참가 신호
  const sendJoin = (roomId: string | number) => {
    const client = getWebSocketClient();

    if (!client || !client.connected) {
      console.warn(" WebSocket 미연결 상태. JOIN 전송 실패");
      return;
    }

    const destination = `/app/signal/join/${roomId}`;

    client.publish({
      destination,
      body: "",
    });

    console.log("JOIN 전송:", roomId);
  };

  //시그널 정보교환
  const sendSignal = (payload: SignalPayload) => {
    const client = getWebSocketClient();

    if (!client || !client.connected) {
      console.warn("WebSocket 미연결 상태. SIGNAL 전송 실패");
      return;
    }

    const { type, receiverId, roomId, signal } = payload;

    const destination = `/app/signal/${type.toLowerCase()}/${roomId}`;

    const message = {
      signalType: type,
      receiverId: receiverId,
      ...signal,
    };

    client.publish({ destination, body: JSON.stringify(message) });
    console.log("시그널 전송:", payload);
  };

  return { sendJoin, sendSignal };
};
