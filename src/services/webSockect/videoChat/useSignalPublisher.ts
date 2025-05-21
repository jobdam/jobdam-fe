/** @format */

import { getWebSocketClient } from "../useWebSocketConnect";

interface BasePayload {
  receiverId: number;
  roomId: string | number;
}
interface SdpSignalPayload extends BasePayload {
  signalType: "OFFER" | "ANSWER";
  signal: {
    sdp: string;
  };
}

interface CandidateSignalPayload extends BasePayload {
  signalType: "CANDIDATE";
  signal: {
    candidate: string;
    sdpMid: string;
    sdpMLineIndex: number;
  };
}

export type SignalPayload = SdpSignalPayload | CandidateSignalPayload;

export const useSignalPublisher = () => {
  //참가 신호
  const sendJoin = (roomId: string | number, destination: string) => {
    const client = getWebSocketClient();

    if (!client || !client.connected) {
      console.warn(" WebSocket 미연결 상태. JOIN 전송 실패");
      return;
    }
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

    const { signalType, receiverId, roomId, signal } = payload;

    const destination = `/app/signal/${signalType.toLowerCase()}/${roomId}`;

    const message = {
      signalType: signalType,
      receiverId: receiverId,
      ...signal,
    };

    client.publish({ destination, body: JSON.stringify(message) });
    console.log("시그널 전송:", payload);
  };

  return { sendJoin, sendSignal };
};
