/** @format */

import { VideoChatUserMessage } from "@/types/videoChat";
import { useEffect, useRef, useState } from "react";

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

  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="absolute bottom-6 left-[90px] w-[350px] h-[240px] rounded-[16px] shadow-lg flex flex-col overflow-hidden z-30">
      {/* 메시지 리스트 */}
      <div
        ref={messageListRef}
        className="flex-1 h-[65%] overflow-y-auto p-4 bg-[#ffffff]/50 backdrop-blur-[1px] space-y-2"
      >
        {messages.map((msg, i) =>
          msg.isMe ? (
            // 내가 보낸 메시지: 오른쪽
            <div key={i} className="flex justify-end">
              <div className="rounded-md px-3 py-2 text-xs font-semibold max-w-[75%] bg-[#D9D9D9] text-gray-900 break-words">
                {msg.content}
              </div>
            </div>
          ) : (
            // 상대방 메시지: 왼쪽 + 이름
            <div key={i} className="">
              <div className="text-xs font-semibold text-gray-300 mb-1">
                {msg.userName}님
              </div>
              <div className="rounded-md px-3 py-2 text-xs font-semibold max-w-[75%] bg-[#D9D9D9] text-gray-900 break-words">
                <div>{msg.content}</div>
              </div>
            </div>
          )
        )}
      </div>

      {/* 입력창 */}
      <div className="relative flex h-[35%] items-center px-4 py-2 bg-[#ffffff] border-t border-gray-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
          rows={3}
          maxLength={100}
          className="w-full absolute left-3 top-1 resize-none bg-transparent text-[13px] placeholder:text-xs placeholder:text-gray-400 pt-2 pl-0 pr-8 border-none outline-none focus:ring-0"
          style={{ minHeight: "30px", maxHeight: "60px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="absolute right-3 bottom-3">
          <img src="/send.svg" alt="send" className="w-5 h-5 opacity-90" />
        </button>
      </div>
    </div>
  );
};

export default ChatOverlay;
