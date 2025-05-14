/** @format */

import { getWebSocketClient } from "../useWebSocketConnect";

interface ChatSendPayload {
  roomId: string;
  content: string;
}

export const useChatPublisher = () => {
  const sendChat = ({ roomId, content }: ChatSendPayload) => {
    const client = getWebSocketClient();

    if (!client || !client.connected) {
      console.warn("WebSocket 미연결 상태. 채팅 전송 실패");
      return;
    }

    const destination = `/app/chat/send/${roomId}`;

    client.publish({
      destination,
      body: JSON.stringify({ content }),
    });

    console.log("채팅 전송:", content);
  };

  return { sendChat };
};
