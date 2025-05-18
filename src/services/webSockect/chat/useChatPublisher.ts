/** @format */

import { getWebSocketClient } from "../useWebSocketConnect";

interface ChatSendPayload {
  roomId: string;
  content: string;
}

interface ReadySendPayload {
  roomId: string;
  ready: boolean;
}

export const useChatPublisher = () => {
  const client = getWebSocketClient();

  //채팅방에서 채팅보낼떄
  const sendChat = ({ roomId, content }: ChatSendPayload) => {
    //나중에 공통함수로 빼야함..
    if (!client || !client.connected) {
      console.warn("WebSocket 미연결 상태. 채팅 전송 실패");
      return;
    }
    client.publish({
      destination: `/app/chat/send/${roomId}`,
      body: JSON.stringify({ content }),
    });
  };

  const sendReady = ({ roomId, ready }: ReadySendPayload) => {
    if (!client || !client.connected) {
      console.warn("WebSocket 미연결 상태. 채팅 전송 실패");
      return;
    }
    client.publish({
      destination: `/app/chat/ready/${roomId}`,
      body: JSON.stringify({ ready }),
    });
  };

  const sendChatInVideo = ({ roomId, content }: ChatSendPayload) => {
    if (!client || !client.connected) {
      console.warn("WebSocket 미연결 상태. 화상채팅 전송 실패");
      return;
    }
    client.publish({
      destination: `/app/video/chat/send/${roomId}`,
      body: JSON.stringify({ content }),
    });
  };
  return { sendChat, sendReady, sendChatInVideo };
};
