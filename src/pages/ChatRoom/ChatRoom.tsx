/** @format */
import { useCallback, useState } from "react";
import { Send } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { paths } from "@/config/paths";
import { IMessage } from "@stomp/stompjs";
import { useChatSubscribe } from "@/services/webSockect/chat/useChatSubscribe";
import { v4 as uuidv4 } from "uuid";
import { useChatPublisher } from "@/services/webSockect/chat/useChatPublisher";
import { getUserIdFromJwt } from "@/utils/tokenUtils";
import ChatMessage from "./components/ChatMessage";
import InterviewWaiting from "./components/InterviewWaiting";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const myUserId = getUserIdFromJwt();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const { sendChat } = useChatPublisher();

  const handleMessage = useCallback(
    (msg: IMessage) => {
      const data = JSON.parse(msg.body);
      console.log("📩 수신된 채팅 메시지:", data);
      if (data.chatMessageType === "CHAT") {
        console.log(data.userId);
        console.log(myUserId);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            isMe: data.userId === myUserId, // 본인 판단
            userName: data.userName,
            profileImageUrl: data.profileImageUrl,
            content: data.content,
            time: data.time,
          },
        ]);
      }
    },
    [myUserId]
  );

  useChatSubscribe({
    destination: `/topic/chat/${roomId}`,
    onMessage: handleMessage,
  });

  const handleSend = () => {
    if (!input.trim()) return;

    sendChat({
      roomId: roomId!,
      content: input,
    });

    setInput("");
  };

  return (
    <div className="flex h-screen">
      <InterviewWaiting />
      <div className="flex flex-col flex-1">
        {/* 헤더 */}
        <header className="h-16 bg-gray-800 text-white flex items-center px-4 shadow-md">
          <h1 className="text-lg font-semibold">채팅방</h1>
        </header>

        {/* 메시지 리스트 */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              isMe={msg.isMe}
              userName={msg.userName}
              profileImageUrl={msg.profileImageUrl}
              content={msg.content}
              time={msg.time}
            />
          ))}
        </main>

        {/* 입력창 */}
        <footer className="h-28 bg-white border-t px-4 py-3 flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 resize-none bg-gray-200 rounded-lg p-3 h-full outline-none placeholder:text-gray-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
};
export default ChatRoom;
