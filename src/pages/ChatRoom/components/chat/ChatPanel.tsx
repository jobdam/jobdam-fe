/** @format */

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessageType } from "@/types/chat";
import SystemMessage from "./ChatSystemMessage";
import { InterviewTypeLabel } from "@/types/interview";

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
  const enterPressed = useRef(false); //맥북엔터키중복해결
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

  const interviewTypeLabel = InterviewTypeLabel[interviewType];

  return (
    <div className="h-[95%] w-[40%] bg-[#E5F3FF] flex flex-col rounded-[15px] shadow-custom">
      <header className="h-16 bg-[#488FFF] flex items-center px-6 shadow-md rounded-t-[15px]">
        <h1 className="text-[16px] text-white font-semibold">
          {jobGroup}
          {"  "}
          {jobDetail}
          <span className="mx-4 text-[24px] align-middle">&middot;</span>
          {interviewTypeLabel}
        </h1>
      </header>

      {/* 메시지 리스트 */}
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4"
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
      <footer className="relative h-[80px] m-[20px] rounded-[20px] bg-white">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return; // 한글 입력 중이면 무시
            if (e.key === "Enter" && !e.shiftKey) {
              if (enterPressed.current) return;
              enterPressed.current = true;
              setTimeout(() => (enterPressed.current = false), 300); // 0.3초 후 리셋
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="메시지 입력..."
          maxLength={300}
          className="resize-none p-5 h-full w-[90%] outline-none overflow-hidden placeholder:text-[#20202033]"
        />
        <button onClick={handleSend} className="absolute top-4 right-5">
          <img src="/send.svg" alt="send" className="w-5 h-5 opacity-40" />
        </button>
      </footer>
      <style>
        {`
        .chat-scroll::-webkit-scrollbar {
          width: 10px;
          background: #fff;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #E5F3FF;
          border-radius: 8px;
        }
        .chat-scroll {
          scrollbar-color: #E5F3FF #fff;
        }
        `}
      </style>
    </div>
  );
};

export default ChatPanel;
