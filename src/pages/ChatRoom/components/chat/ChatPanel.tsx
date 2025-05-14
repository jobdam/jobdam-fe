/** @format */

import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";
import { ChatMessageType } from "@/types/chat";
import SystemMessage from "./ChatSystemMessage";

interface ChatPanelProps {
  messages: ChatMessageType[];
  onSend: (content: string) => void;
}

const ChatPanel = ({ messages, onSend }: ChatPanelProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <>
      {/* 헤더 */}
      <header className="h-16 bg-gray-800 text-white flex items-center px-4 shadow-md">
        <h1 className="text-lg font-semibold">채팅방</h1>
      </header>

      {/* 메시지 리스트 */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
        {messages.map((msg) =>
          msg.type === "SYSTEM" ? (
            <SystemMessage key={msg.id} content={msg.content} />
          ) : (
            <ChatMessage
              key={msg.id}
              isMe={msg.isMe}
              userName={msg.userName}
              profileImageUrl={msg.profileImageUrl}
              content={msg.content}
              time={msg.time}
            />
          )
        )}
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
    </>
  );
};

export default ChatPanel;
