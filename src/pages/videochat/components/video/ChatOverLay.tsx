/** @format */

import { VideoChatUserMessage } from "@/types/videoChat";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatOverlayProps {
  messages: VideoChatUserMessage[];
  onSend: (content: string) => void;
}

const ChatOverlay = ({ messages, onSend }: ChatOverlayProps) => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input); // 상위에 전달만
    setInput("");
  };

  return (
    <div className="absolute bottom-4 left-[70px] w-[360px] h-[300px] bg-white rounded-[16px] shadow-lg flex flex-col overflow-hidden z-30">
      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#f5f5f5]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl px-3 py-2 text-sm max-w-[75%] break-words ${
                msg.isMe
                  ? "bg-blue-500 text-white"
                  : "bg-[#e5e5e5] text-gray-900"
              }`}
            >
              {!msg.isMe && (
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {msg.userName}님
                </div>
              )}
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex items-center border-t px-3 py-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
          className="flex-1 text-sm px-3 py-2 rounded-lg bg-gray-100 border focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatOverlay;
