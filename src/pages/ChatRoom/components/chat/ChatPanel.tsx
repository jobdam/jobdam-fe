/** @format */

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";
import { ChatMessageType } from "@/types/chat";
import SystemMessage from "./ChatSystemMessage";
import { expMap } from "@/types/api";

interface ChatPanelProps {
  messages: ChatMessageType[];
  jobGroup: string;
  jobDetail: string;
  interviewType: string;
  onSend: (content: string) => void;
}

const ChatPanel = ({
  messages,
  onSend,
  jobGroup,
  jobDetail,
  interviewType,
}: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.focus(); // 메시지 전송 후 textarea에 포커스
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100; // 여유 범위

    setAutoScroll(isAtBottom);
  };

  const interviewTypeLabel = expMap[interviewType];

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <header className="h-16 bg-gray-800 text-white flex items-center px-4 shadow-md">
        <h1 className="text-lg font-semibold">
          {jobGroup}
          {"  "}
          {jobDetail}
          {"  "}&middot;{"  "}
          {interviewTypeLabel}
        </h1>
      </header>

      {/* 메시지 리스트 */}
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4"
      >
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
              time={msg.time!}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* 입력창 */}
      <footer className="h-28 bg-white border-t px-4 py-3 flex items-center gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
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
  );
};

export default ChatPanel;
